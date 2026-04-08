'use client';

// ══════════════════════════════════════════════════════════════════
// COMPONENT: TaskList
// PURPOSE:   Renders the filtered list of tasks, delegating each
//            individual task row to TaskCard. Acts as a thin "adapter"
//            between TaskBoard (which holds the array) and TaskCard
//            (which handles a single row). Also owns the empty-state UI.
// TYPE:      Client Component ('use client') — passes callbacks to children
// PROPS:
//   tasks    (array)    — the already-filtered subset of tasks to render
//   onToggle (function) — passed through to each TaskCard; owned by TaskBoard
//   onDelete (function) — passed through to each TaskCard; owned by TaskBoard
// ══════════════════════════════════════════════════════════════════
import TaskCard from './taskcard.js';

export default function TaskList({ tasks, onToggle, onDelete }) {

  // Conditional render: when the filtered list is empty, show a helpful
  // empty state instead of a blank area. This improves UX — the user
  // knows the app is working, not broken. We check tasks.length (a
  // derived truth from props) rather than any local state.
  if (tasks.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-slate-500 text-sm">Nothing here yet.</p>
      </div>
    );
  }

  return (
    // The list container: a dark rounded card with a subtle border.
    // overflow-hidden clips the first and last TaskCard's rounded corners
    // so they sit flush inside this wrapper.
    <ul className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden mb-5">

      {/* .map() transforms each task data object into a TaskCard element.
          React renders the array of elements as sibling DOM nodes.
          The key prop (task.id) is critical: without it React can't tell
          which card to update when the list changes — it would re-render
          every card on every update, and could even show stale data in
          uncontrolled inputs inside cards. Using the unique id (not the
          array index) means React correctly identifies cards even if they're
          reordered or items are deleted from the middle. */}
      {tasks.map(task => (
        <li key={task.id}>
          {/* onToggle and onDelete are threaded through from TaskBoard.
              TaskCard doesn't define what happens — it just calls the
              callback with the task id and lets TaskBoard decide. */}
          <TaskCard
            id={task.id}
            title={task.title}
            done={task.done}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}