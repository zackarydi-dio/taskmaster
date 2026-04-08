'use client';
import TaskCard from './taskcard.js';

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-slate-500 text-sm">Nothing here yet.</p>
      </div>
    );
  }

  return (
    <ul className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden mb-5">
      {tasks.map(task => (
        <li key={task.id}>
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