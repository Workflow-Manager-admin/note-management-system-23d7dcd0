import React from "react";
import { useAuth } from "../contexts/AuthContext";

// PUBLIC_INTERFACE
export default function Header({ onLogout }) {
  const { user } = useAuth();
  return (
    <header className="app-header">
      <h1 className="logo-title">📝 Notes App</h1>
      <nav className="user-nav">
        <span className="username">
          {user ? `Logged in as ${user.username}` : ""}
        </span>
        <button className="btn btn-logout" onClick={onLogout}>Logout</button>
      </nav>
    </header>
  );
}
