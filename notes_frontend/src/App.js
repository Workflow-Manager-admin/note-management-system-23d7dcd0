import React, { useState, useEffect } from "react";
import "./App.css";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { NotesProvider } from "./contexts/NotesContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NoteList from "./components/NoteList";
import NoteEditor from "./components/NoteEditor";
import NoteActions from "./components/NoteActions";
import { LoginForm, RegisterForm } from "./components/AuthForms";

function MainApp() {
  const { user, logout, loading } = useAuth();
  const [view, setView] = useState("app"); // 'app', 'login', 'register'
  const [selectedId, setSelectedId] = useState(null);
  const [editing, setEditing] = useState(false);

  // Theme - persisted in localStorage
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  const toggleTheme = () =>
    setTheme(t => (t === "light" ? "dark" : "light"));

  // Show auth forms if not loaded or logged in
  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (!user)
    return (
      <div className="App auth-bg">
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>
        {view === "login" || view === "app" ? (
          <LoginForm
            goToRegister={() => setView("register")}
            onSuccess={() => setView("app")}
          />
        ) : (
          <RegisterForm
            goToLogin={() => setView("login")}
            onSuccess={() => setView("login")}
          />
        )}
      </div>
    );

  // Main notes app UI
  return (
    <div className="App">
      <Header onLogout={logout} />
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>
      <div className="main-layout">
        <Sidebar />
        <main className="main-content">
          <section className="notes-section">
            <div className="notes-list-area">
              <button
                className="btn btn-new"
                onClick={() => {
                  setEditing(false);
                  setSelectedId(null);
                }}
              >
                + New Note
              </button>
              <NoteList selectedId={selectedId} onSelect={id => {
                setEditing(false);
                setSelectedId(id);
              }} />
            </div>
            <div className="note-workspace">
              {/* Either show editor for new or existing note, or display note */}
              {(editing || selectedId === null) ? (
                <NoteEditor
                  noteId={editing ? selectedId : null}
                  onDoneEdit={() => {
                    setEditing(false);
                    setSelectedId(null);
                  }}
                />
              ) : (
                <NoteView
                  noteId={selectedId}
                  onEdit={() => setEditing(true)}
                  onDelete={() => {
                    setEditing(false);
                    setSelectedId(null);
                  }}
                />
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function NoteView({ noteId, onEdit, onDelete }) {
  // Helper component for displaying a single note
  const { notes } = React.useContext(
    require("./contexts/NotesContext").NotesContext
  );
  const note = notes.find(n => n.id === noteId);
  if (!note)
    return (
      <div className="note-view">
        <p>Note not found.</p>
      </div>
    );
  return (
    <div className="note-view">
      <h2>{note.title}</h2>
      <div className="note-view-meta">
        <span>
          {note.updated_at?.slice(0, 16).replace("T", " ")}
        </span>
      </div>
      <div className="note-view-content">
        <pre style={{whiteSpace: "pre-wrap"}}>{note.content}</pre>
      </div>
      <NoteActions noteId={noteId} onEdit={onEdit} onDelete={onDelete} />
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  // Compose providers for auth and notes
  return (
    <AuthProvider>
      <NotesProvider>
        <MainApp />
      </NotesProvider>
    </AuthProvider>
  );
}

export default App;
