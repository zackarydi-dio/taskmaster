'use client';

// ══════════════════════════════════════════════════════════════════
// COMPONENT: AddTaskForm
// PURPOSE:   Controlled form that captures a new task title and fires
//            it up to TaskBoard. This component does NOT know about
//            the task list — it only knows about what the user is
//            currently typing. Single responsibility: capture input.
// TYPE:      Client Component ('use client') — needs useState + events
// PROPS:
//   onAdd (function) — callback fired with the trimmed title string
//                      when the user submits a valid task. Owned by
//                      TaskBoard, which appends the new task to state.
// ══════════════════════════════════════════════════════════════════
import { useState } from 'react';

export default function AddTaskForm({ onAdd }) {

  // title is local state because only this component cares what the
  // user is currently typing. There's no reason to lift it to TaskBoard —
  // lifting state is only necessary when multiple components need the
  // same value simultaneously. Here, only the input and the submit
  // handler ever need to see the draft text.
  const [title, setTitle] = useState('');

  function handleSubmit(e) {
    // e.preventDefault() stops the browser's default form submission
    // behaviour: a full-page reload that would wipe all in-memory state
    // and send a GET/POST request. We handle the data entirely in JS,
    // so we suppress the default and take over.
    e.preventDefault();

    // Guard: .trim() removes leading/trailing whitespace.
    // If the result is an empty string the user typed nothing useful
    // (or only spaces), so we bail early rather than adding a blank task.
    if (!title.trim()) return;

    // Fire the event UP to TaskBoard with the cleaned title.
    // TaskBoard will assign an id and add it to the tasks array.
    onAdd(title.trim());

    // Reset the input so the field is immediately ready for the next task.
    // This is why title lives in state — we can programmatically reset it.
    setTitle('');
  }

  return (
    // onSubmit fires both when the user presses Enter in the text field
    // AND when they click the Add button (type="submit"). Using onSubmit
    // on the form (rather than onClick on the button) handles both cases
    // and is better for keyboard accessibility — screen reader users and
    // keyboard-only users expect Enter to submit forms.
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">

      {/* Controlled input: value is always driven by state.
          onChange fires on every keystroke, keeping state and the DOM
          in sync. Without this, the input would be "uncontrolled"
          (React wouldn't know what it contains) and we couldn't reset it. */}
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

      {/* type="submit" makes this button trigger the form's onSubmit
          handler, which is the same handler Enter triggers. */}
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