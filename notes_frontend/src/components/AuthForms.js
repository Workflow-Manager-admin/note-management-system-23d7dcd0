import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

// PUBLIC_INTERFACE
export function LoginForm({ onSuccess, goToRegister }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const resp = await login(form.username, form.password);
    if (resp.success) onSuccess && onSuccess();
    else setError(resp.error || "Login failed");
    setLoading(false);
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Sign In</h2>
      {error && <span className="form-error">{error}</span>}
      <input
        autoFocus
        type="text"
        placeholder="Username"
        value={form.username}
        onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
        required
      />
      <button type="submit" className="btn btn-large" disabled={loading}>
        {loading ? "Signing in..." : "Login"}
      </button>
      <div className="alt-action">
        <span>No account?</span>
        <a href="#register" onClick={e => {e.preventDefault();goToRegister();}}>Register</a>
      </div>
    </form>
  );
}

// PUBLIC_INTERFACE
export function RegisterForm({ onSuccess, goToLogin }) {
  const { register } = useAuth();
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setRegistered(false);
    const resp = await register(form.username, form.password);
    if (resp.success) {
      setRegistered(true);
      setTimeout(() => { onSuccess && onSuccess(); }, 600);
    } else setError(resp.error || "Registration failed");
    setLoading(false);
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      {error && <span className="form-error">{error}</span>}
      {registered && (
        <span className="form-success">Registration successful! Redirecting to login...</span>
      )}
      <input
        autoFocus
        type="text"
        placeholder="Choose a username"
        value={form.username}
        onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
        required
        minLength={3}
        maxLength={32}
      />
      <input
        type="password"
        placeholder="Choose a password"
        value={form.password}
        onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
        required
        minLength={6}
      />
      <button type="submit" className="btn btn-large" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
      <div className="alt-action">
        <span>Have an account?</span>
        <a href="#login" onClick={e => {e.preventDefault();goToLogin();}}>Login</a>
      </div>
    </form>
  );
}
