import React, { useState, useEffect } from "react";
import { useNotes } from "../contexts/NotesContext";

// PUBLIC_INTERFACE
export default function NoteEditor({ noteId, onDoneEdit }) {
  const { notes, updateNote, createNote } = useNotes();
  const initial =
    noteId && Array.isArray(notes)
      ? notes.find(n => n.id === noteId)
      : { title: "", content: "" };
  const [form, setForm] = useState(initial || { title: "", content: "" });
  const [editing, setEditing] = useState(Boolean(noteId));
  const [status, setStatus] = useState("");

  // Sync form when switching notes
  useEffect(() => {
    if (noteId && notes) {
      const n = notes.find(n => n.id === noteId);
      if (n) setForm({ title: n.title, content: n.content });
    } else {
      setForm({ title: "", content: "" });
    }
    setEditing(!!noteId);
    setStatus("");
  }, [noteId, notes]);

  async function handleSave(e) {
    e.preventDefault();
    setStatus("");
    try {
      if (editing && noteId) {
        await updateNote(noteId, form);
        setStatus("Saved.");
      } else {
        await createNote(form);
        setForm({ title: "", content: "" });
        setStatus("Created.");
      }
      onDoneEdit && onDoneEdit();
    } catch {
      setStatus("Failed to save note.");
    }
  }

  return (
    <form className="note-editor" onSubmit={handleSave}>
      <input
        className="note-title-input"
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
        required
        maxLength={100}
      />
      <textarea
        className="note-content-input"
        placeholder="Write your note here..."
        value={form.content}
        onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
        rows={12}
        required
        maxLength={10000}
      />
      <div className="note-editor-actions">
        <button className="btn btn-large" type="submit">
          {editing ? "Save" : "Create"}
        </button>
        {status && <span className="note-status">{status}</span>}
      </div>
    </form>
  );
}
