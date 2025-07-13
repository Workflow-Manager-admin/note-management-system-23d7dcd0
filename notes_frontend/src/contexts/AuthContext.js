import React, { createContext, useState, useContext, useCallback, useEffect } from "react";

// PUBLIC_INTERFACE
const AuthContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * Provides authentication state and actions to children.
 * @param {object} props
 * @returns {JSX.Element}
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  // Validate token and fetch user profile
  useEffect(() => {
    async function fetchUser() {
      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        const resp = await fetch(`${API_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (resp.ok) {
          setUser(await resp.json());
        } else {
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        }
      } catch {
        setUser(null);
      }
      setLoading(false);
    }
    fetchUser();
  }, [token, API_URL]);

  // PUBLIC_INTERFACE
  const login = useCallback(async (username, password) => {
    const body = new URLSearchParams();
    body.append("username", username);
    body.append("password", password);

    const res = await fetch(`${API_URL}/auth/token`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (res.ok) {
      const { access_token } = await res.json();
      localStorage.setItem("token", access_token);
      setToken(access_token);
      return { success: true };
    } else {
      return { success: false, error: "Invalid credentials" };
    }
  }, [API_URL]);

  // PUBLIC_INTERFACE
  const register = useCallback(async (username, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      return { success: true };
    } else {
      let error = "Registration failed";
      try {
        const body = await res.json();
        error = (body && body.detail) ? body.detail : error;
      } catch { /* ignore */ }
      return { success: false, error };
    }
  }, [API_URL]);

  // PUBLIC_INTERFACE
  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  }, []);

  const value = { user, token, login, register, logout, loading, setUser };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}
