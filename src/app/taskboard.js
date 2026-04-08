'use client';
import { useState, useEffect } from 'react';
import AddTaskForm from './addtaskboard.js';
import TaskList    from './tasklist.js';
import TaskStats   from './taskstats.js';
import FilterBar   from './filterbar.js';

export default function TaskBoard() {
  const [tasks, setTasks] = useState(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('taskmaster-tasks');
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('taskmaster-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const completedCount = tasks.filter(t => t.done).length;
  const activeCount = tasks.length - completedCount;

  const visibleTasks =
    filter === 'done'   ? tasks.filter(t => t.done) :
    filter === 'active' ? tasks.filter(t => !t.done) :
    tasks;

  function handleToggle(id) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  function handleDelete(id) {
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  function handleAdd(title) {
    setTasks(prev => [
      ...prev,
      { id: crypto.randomUUID(), title, done: false, createdAt: Date.now() }
    ]);
  }

  function handleClearCompleted() {
    setTasks(prev => prev.filter(t => !t.done));
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white mb-1">
          taskmaster
        </h1>
        <p className="text-slate-400 text-sm">stay on top of it</p>
      </div>

      <AddTaskForm onAdd={handleAdd} />

      <FilterBar
        filter={filter}
        onFilterChange={setFilter}
        activeCount={activeCount}
        completedCount={completedCount}
        totalCount={tasks.length}
      />

      <TaskList
        tasks={visibleTasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />

      {tasks.length > 0 && (
        <TaskStats
          total={tasks.length}
          active={activeCount}
          completed={completedCount}
          onClearCompleted={handleClearCompleted}
        />
      )}
    </div>
  );
}
