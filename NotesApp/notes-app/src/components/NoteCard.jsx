import React from "react";

const NoteCard = ({ note }) => {
  return (
    <div className="group flex h-full flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold text-slate-900">
            {note.title}
          </h2>

          <p className="mt-1 text-xs font-medium text-slate-400">Note</p>
        </div>

        {/* Menu */}
        <button
          type="button"
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
        >
          ⋮
        </button>
      </div>

      {/* Description */}
      <p className="mb-6 line-clamp-4 flex-1 text-sm leading-6 text-slate-600">
        {note.description}
      </p>

      {/* Divider */}
      <div className="mb-4 border-t border-slate-100" />

      {/* Actions */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
        >
          ✏️ Update
        </button>

        <button
          type="button"
          className="flex-1 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
