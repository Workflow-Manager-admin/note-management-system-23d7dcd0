import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useAuth } from "./AuthContext";

// PUBLIC_INTERFACE
const NotesContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * Notes state and actions (CRUD) provider.
 * @param {object} props
 * @returns {JSX.Element}
 */
export function NotesProvider({ children }) {
  const { token } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  // PUBLIC_INTERFACE
  const fetchNotes = useCallback(async (q = "") => {
    if (!token) return [];
    setLoading(true);
    const url = new URL(`${API_URL}/notes/`);
    if (q) url.searchParams.append("q", q);
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json();
      setNotes(data);
      setLoading(false);
      return data;
    }
    setLoading(false);
    return [];
  }, [token, API_URL]);

  // PUBLIC_INTERFACE
  const createNote = useCallback(async (note) => {
    const res = await fetch(`${API_URL}/notes/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    if (res.ok) {
      const n = await res.json();
      setNotes((ns) => [n, ...ns]);
      return n;
    }
    throw new Error("Note creation failed");
  }, [token, API_URL]);

  // PUBLIC_INTERFACE
  const updateNote = useCallback(async (id, updates) => {
    const res = await fetch(`${API_URL}/notes/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    if (res.ok) {
      const updated = await res.json();
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, ...updated } : n))
      );
      return updated;
    }
    throw new Error("Could not update note");
  }, [token, API_URL]);

  // PUBLIC_INTERFACE
  const deleteNote = useCallback(async (id) => {
    const res = await fetch(`${API_URL}/notes/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      setNotes((prev) => prev.filter((n) => n.id !== id));
      return true;
    }
    throw new Error("Delete failed");
  }, [token, API_URL]);

  // Initial notes load (on login)
  useEffect(() => {
    if (token) fetchNotes();
    else setNotes([]);
  }, [token, fetchNotes]);

  const value = {
    notes,
    loading,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    setNotes,
  };

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useNotes() {
  return useContext(NotesContext);
}
