'use client';

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
  const counts = { all: totalCount, active: activeCount, done: completedCount };

  return (
    <div className="flex gap-2 mb-5">
      {FILTERS.map(({ value, label }) => {
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