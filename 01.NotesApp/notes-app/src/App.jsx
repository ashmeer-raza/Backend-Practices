import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "./components/NoteCard";

const App = () => {
  const [formVal, setFormVal] = useState({
    title: "",
    description: "",
  });

  const [allNotes, setAllNotes] = useState([]);

  const handleChange = (e) => {
    setFormVal((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3000/notes/create",
        formVal,
      );

      setFormVal({
        title: "",
        description: "",
      });

      // Refresh notes after creating
      getAllNotes();
    } catch (error) {
      console.log("Error creating note:", error);
    }
  };

  const getAllNotes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/notes/allNotes");

      setAllNotes(res.data.data);
    } catch (error) {
      console.log("Error in get All notes API:", error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  let deleteNote = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/notes/${id}`);
      console.log(res);
      await getAllNotes();
    } catch (error) {
      console.log("Error in get All notes API:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Notes App
          </h1>

          <p className="mt-2 text-slate-500">
            Capture your thoughts and ideas in one place.
          </p>
        </div>

        {/* Add Note Form */}
        <div className="mb-10 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="mb-5 text-xl font-semibold text-slate-800">
            Create a new note
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              onChange={handleChange}
              name="title"
              value={formVal.title}
              type="text"
              required
              placeholder="Note title"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />

            <textarea
              onChange={handleChange}
              value={formVal.description}
              minLength={20}
              required
              name="description"
              placeholder="Write your note..."
              rows="4"
              className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-indigo-700 active:scale-95"
              >
                + Add Note
              </button>
            </div>
          </form>
        </div>

        {/* Notes Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Your Notes</h2>

          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-600">
            {allNotes.length} Notes
          </span>
        </div>

        {/* Notes Grid */}
        {allNotes.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
            <p className="text-slate-500">
              No notes yet. Create your first note!
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {allNotes.map((note) => (
              <NoteCard key={note._id} note={note} deleteNote={deleteNote} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
