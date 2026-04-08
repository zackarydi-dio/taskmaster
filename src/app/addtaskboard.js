'use client';
import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="What needs doing?"
        className="
          flex-1 px-4 py-3 rounded-xl
          bg-slate-800 border border-slate-700
          text-white placeholder-slate-500
          focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500
          transition-colors duration-150
        "
      />
      <button
        type="submit"
        className="
          px-5 py-3 rounded-xl font-semibold text-sm
          bg-violet-600 hover:bg-violet-500 active:bg-violet-700
          text-white transition-colors duration-150
          focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
          focus:ring-offset-slate-900
        "
      >
        Add task
      </button>
    </form>
  );
}