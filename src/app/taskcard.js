'use client';

// ══════════════════════════════════════════════════════════════════
// COMPONENT: TaskCard
// PURPOSE:   Displays a single task row with a custom checkbox, the
//            task title (struck through when done), and a delete button.
//            This component is entirely display-driven — it owns no
//            state and fires events up via callback props.
// TYPE:      Client Component ('use client') — needs onClick handlers
// PROPS:
//   id       (string)   — unique task identifier from crypto.randomUUID()
//   title    (string)   — the user's task text
//   done     (boolean)  — true = task is completed
//   onToggle (function) — called with id when user clicks the checkbox;
//                         owned by TaskBoard, which flips done with .map()
//   onDelete (function) — called with id when user clicks delete;
//                         owned by TaskBoard, which removes via .filter()
// ══════════════════════════════════════════════════════════════════

export default function TaskCard({ id, title, done, onToggle, onDelete }) {

  // Derived class strings — NOT state — because they are 100% determined
  // by the done prop. If we stored them in state we'd have to remember to
  // update them every time done changes; as derived values they're always
  // correct automatically.
  //
  // Completed tasks get muted text + line-through to signal they're done
  // without removing them from the list (the user can still see them).
  const textClass = done
    ? 'line-through text-slate-500'
    : 'text-slate-100';

  // The custom checkbox circle changes fill and shows a checkmark when done.
  // This is a visual affordance — users recognise the filled circle as "checked."
  const checkClass = done
    ? 'bg-violet-600 border-violet-600'
    : 'bg-transparent border-slate-600 hover:border-violet-400';

  return (
    // group class enables Tailwind's group-hover: selector on child elements,
    // so the delete button only becomes visible when the row is hovered.
    // This keeps the UI clean — delete targets aren't competing for attention
    // with the task text in normal reading mode.
    <div className="
      group flex items-center gap-3 px-4 py-3
      border-b border-slate-700 last:border-b-0
      hover:bg-slate-750 transition-colors duration-100
    ">

      {/* Custom checkbox button: clicking toggles done via the onToggle callback.
          Using a button (not <input type="checkbox">) gives us full control over
          styling while remaining keyboard-accessible (buttons are focusable by default).
          We pass THIS task's id so TaskBoard can identify which task to flip. */}
      <button
        onClick={() => onToggle(id)}
        aria-label={done ? `Mark "${title}" as incomplete` : `Mark "${title}" as complete`}
        className={`
          flex-shrink-0 w-5 h-5 rounded-full border-2
          flex items-center justify-center
          transition-colors duration-150 focus:outline-none
          focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
          focus:ring-offset-slate-800
          ${checkClass}
        `}
      >
        {/* Conditional render: the checkmark SVG only appears when done is true.
            When done is false this renders nothing (null). The ternary avoids
            mounting a hidden element — we simply don't render the icon at all. */}
        {done && (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* Task title: grows to fill all remaining horizontal space (flex-1).
          The class changes based on done to visually distinguish completed tasks. */}
      <span className={`flex-1 text-sm ${textClass} transition-colors duration-150`}>
        {title}
      </span>

      {/* Delete button: hidden by default (opacity-0), revealed on row hover
          via group-hover:opacity-100. This "reveal on hover" pattern reduces
          visual clutter in long lists — only one delete target is prominent
          at a time. Clicking fires onDelete with this task's id, which
          TaskBoard handles with .filter() to remove it from state. */}
      <button
        onClick={() => onDelete(id)}
        aria-label={`Delete "${title}"`}
        className="
          opacity-0 group-hover:opacity-100
          text-slate-600 hover:text-red-400
          transition-all duration-150 p-1 rounded
          focus:outline-none focus:opacity-100 focus:text-red-400
        "
      >
        {/* Trash icon SVG — inline so there's no icon library dependency */}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}