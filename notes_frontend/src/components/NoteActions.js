import React from "react";
import { useNotes } from "../contexts/NotesContext";

// PUBLIC_INTERFACE
export default function NoteActions({ noteId, onEdit, onDelete }) {
  const { deleteNote } = useNotes();

  async function handleDelete() {
    if (window.confirm("Delete this note?")) {
      try {
        await deleteNote(noteId);
        if (onDelete) onDelete();
      } catch (err) {
        alert(err.message || "Could not delete note.");
      }
    }
  }

  return (
    <div className="note-actions">
      <button className="btn btn-edit" onClick={onEdit}>Edit</button>
      <button className="btn btn-delete" onClick={handleDelete}>Delete</button>
    </div>
  );
}
