'use client';

export default function TaskCard({ id, title, done, onToggle, onDelete }) {
  const textClass = done
    ? 'line-through text-slate-500'
    : 'text-slate-100';

  const checkClass = done
    ? 'bg-violet-600 border-violet-600'
    : 'bg-transparent border-slate-600 hover:border-violet-400';

  return (
    <div className="
      group flex items-center gap-3 px-4 py-3
      border-b border-slate-700 last:border-b-0
      hover:bg-slate-750 transition-colors duration-100
    ">
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
        {done && (
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd" />
          </svg>
        )}
      </button>

      <span className={`flex-1 text-sm ${textClass} transition-colors duration-150`}>
        {title}
      </span>

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
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}