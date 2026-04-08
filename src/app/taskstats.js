'use client';

export default function TaskStats({ total, active, completed, onClearCompleted }) {
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
      <div className="flex gap-5">
        {stats.map(({ label, value, color }) => (
          <div key={label} className="flex items-baseline gap-1.5">
            <span className={`text-lg font-bold tabular-nums ${color}`}>
              {value}
            </span>
            <span className="text-slate-500 text-xs">{label}</span>
          </div>
        ))}
      </div>

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