'use client';

// ══════════════════════════════════════════════════════════════════
// COMPONENT: TaskStats
// PURPOSE:   Displays live task counts (total / active / completed)
//            and a "Clear completed" button. Updates automatically
//            because the counts are passed as props that change when
//            tasks change in TaskBoard — no internal state needed.
// TYPE:      Client Component ('use client') — needs onClick for the button
// PROPS:
//   total            (number)   — total task count
//   active           (number)   — tasks with done === false
//   completed        (number)   — tasks with done === true
//   onClearCompleted (function) — callback to TaskBoard; removes all done tasks
// ══════════════════════════════════════════════════════════════════

export default function TaskStats({ total, active, completed, onClearCompleted }) {

  // Each stat is an object so we can .map() over them rather than repeating
  // three nearly-identical JSX blocks. This is a derived data structure —
  // not state — because it's recomputed from props on every render.
  const stats = [
    { label: 'Total',     value: total,     color: 'text-slate-300' },
    { label: 'Active',    value: active,    color: 'text-violet-400' },
    { label: 'Completed', value: completed, color: 'text-emerald-400' },
  ];

  return (
    <div className="
      flex items-center justify-between px-4 py-3
      bg-slate-800 border border-slate-700 rounded-xl
      text-sm
    ">
      {/* Stat pills: one for each count. flex gap-4 keeps them evenly spaced. */}
      <div className="flex gap-5">
        {stats.map(({ label, value, color }) => (
          // key on list items — React uses this to reconcile changes
          // without re-mounting all three pills on every update.
          <div key={label} className="flex items-baseline gap-1.5">
            <span className={`text-lg font-bold tabular-nums ${color}`}>
              {value}
            </span>
            <span className="text-slate-500 text-xs">{label}</span>
          </div>
        ))}
      </div>

      {/* Conditional render: only show "Clear completed" when there are
          completed tasks to clear. Showing it when completed === 0 would
          confuse the user — clicking a button that does nothing is bad UX. */}
      {completed > 0 && (
        <button
          onClick={onClearCompleted}
          className="
            text-xs text-slate-400 hover:text-red-400
            transition-colors duration-150
            focus:outline-none focus:text-red-400
            underline underline-offset-2
          "
        >
          Clear completed
        </button>
      )}
    </div>
  );
}