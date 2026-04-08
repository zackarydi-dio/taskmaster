'use client';

// ══════════════════════════════════════════════════════════════════
// COMPONENT: FilterBar
// PURPOSE:   Renders the All / Active / Done filter buttons and live
//            counts next to each label. Fires onFilterChange when
//            the user picks a different view. This component is purely
//            presentational — it holds no state of its own.
// TYPE:      Client Component ('use client') — needs onClick handlers
// PROPS:
//   filter         (string)   — currently active filter ('all' | 'active' | 'done')
//   onFilterChange (function) — callback with new filter string; owned by TaskBoard
//   totalCount     (number)   — total tasks (for "All" badge)
//   activeCount    (number)   — incomplete tasks (for "Active" badge)
//   completedCount (number)   — done tasks (for "Done" badge)
// ══════════════════════════════════════════════════════════════════

// Each filter option is defined as a data structure rather than repeated JSX.
// This keeps the render logic DRY — adding a new filter is one array entry,
// not copying three nearly-identical button blocks.
const FILTERS = [
  { value: 'all',    label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'done',   label: 'Done' },
];

export default function FilterBar({
  filter,
  onFilterChange,
  totalCount,
  activeCount,
  completedCount,
}) {
  // Map each filter value to the count that belongs in its badge.
  // This is a derived lookup — not state — because the counts come
  // from props and are just being routed to the right button.
  const counts = { all: totalCount, active: activeCount, done: completedCount };

  return (
    <div className="flex gap-2 mb-5">
      {/* .map() transforms each filter descriptor into a button.
          React requires the key prop on list items so it can efficiently
          reconcile (identify) which button changed without re-rendering all. */}
      {FILTERS.map(({ value, label }) => {
        // Conditional class: the active button gets a filled violet background;
        // inactive buttons are ghost-style with a subtle border.
        // This tells the user at a glance which view they're in.
        const isActive = filter === value;

        return (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
              transition-colors duration-150 focus:outline-none
              focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
              focus:ring-offset-slate-900
              ${isActive
                ? 'bg-violet-600 text-white'
                : 'bg-slate-800 text-slate-400 border border-slate-700 hover:border-slate-500 hover:text-slate-200'
              }
            `}
          >
            {label}
            {/* Badge showing the count for this filter's subset.
                Conditional style: active button gets a lighter violet badge;
                inactive gets a darker slate badge. Both are non-interactive — 
                they just display information. */}
            <span className={`
              px-1.5 py-0.5 rounded text-xs font-semibold
              ${isActive ? 'bg-violet-500 text-white' : 'bg-slate-700 text-slate-400'}
            `}>
              {counts[value]}
            </span>
          </button>
        );
      })}
    </div>
  );
}