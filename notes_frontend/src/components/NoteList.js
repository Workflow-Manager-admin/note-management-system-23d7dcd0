import React from "react";
import { useNotes } from "../contexts/NotesContext";

// PUBLIC_INTERFACE
export default function NoteList({ onSelect, selectedId }) {
  const { notes, loading } = useNotes();

  if (loading) return <div className="notes-loading">Loading notes...</div>;
  if (!notes.length) return <div className="notes-empty">No notes found.</div>;

  return (
    <ul className="note-list">
      {notes.map(note => (
        <li
          key={note.id}
          className={selectedId === note.id ? "note-list-item selected" : "note-list-item"}
          onClick={() => onSelect(note.id)}
        >
          <span className="note-title">{note.title}</span>
          <span className="note-meta">{note.updated_at?.slice(0, 16).replace("T", " ")}</span>
        </li>
      ))}
    </ul>
  );
}
