// ══════════════════════════════════════════════════════════════════
// FILE:    src/app/page.js
// PURPOSE: The root route ("/") of the Next.js App Router.
//          This is a Server Component — it runs on the server,
//          generates static HTML for fast initial load, and does NOT
//          ship any JavaScript for this file to the browser.
//          Server Components cannot use useState, useEffect, or browser
//          APIs, which is why all interactive logic lives in TaskBoard.
// TYPE:    Server Component (default in Next.js App Router — no 'use client')
// ══════════════════════════════════════════════════════════════════

// TaskBoard is a Client Component. Next.js knows to treat it as a
// "client boundary" — the server renders its initial HTML, then the
// browser takes over and makes it interactive (hydration).
import TaskBoard from './taskboard.js';

export default function Page() {
  return (
    // min-h-screen ensures the dark background covers the full viewport.
    // The gradient gives depth without being distracting — a very subtle
    // vignette from slate-950 (edges) to slate-900 (center).
    <main className="
      min-h-screen
      bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950
      px-4 py-12 sm:py-20
    ">
      <TaskBoard />
    </main>
  );
}