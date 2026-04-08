import TaskBoard from './taskboard.js';

export default function Page() {
  return (
    <main className="
      min-h-screen
      bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950
      px-4 py-12 sm:py-20
    ">
      <TaskBoard />
    </main>
  );
}