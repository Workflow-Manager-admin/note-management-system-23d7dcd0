import React, { useState } from "react";
import { useNotes } from "../contexts/NotesContext";

// PUBLIC_INTERFACE
export default function Sidebar({ onSearch }) {
  const [q, setQ] = useState("");
  const { fetchNotes } = useNotes();

  function handleSearch(e) {
    e.preventDefault();
    if (onSearch) onSearch(q);
    fetchNotes(q);
  }

  return (
    <aside className="sidebar">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={q}
          placeholder="Search notes..."
          onChange={e => setQ(e.target.value)}
        />
        <button type="submit" className="btn btn-small">Search</button>
      </form>
      {/* Categories/tag filter could be added here */}
    </aside>
  );
}
