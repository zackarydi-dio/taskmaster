# Taskmaster

A minimal, dark-mode task manager built with Next.js 15, React 19, and Tailwind CSS v4.

## Features

- ✅ Add tasks with input validation (no blank tasks)
- ✅ Toggle tasks complete/incomplete with a custom animated checkbox
- ✅ Delete individual tasks (revealed on hover for a clean UI)
- ✅ Filter view: All / Active / Done with live count badges
- ✅ Live stats bar showing total, active, and completed counts
- ✅ Clear all completed tasks in one click
- ✅ Persists across browser refreshes using localStorage

## Design

**Direction: Dark Mode / Minimal**

- Background: deep slate-950/900 gradient
- Accent colour: violet-600 (interactive elements, active states)
- Success colour: emerald-400 (completed count badge)
- Typography: Geist Sans via `next/font/google`
- Custom hover-reveal delete button (trash icon appears only on row hover)
- Custom circular checkbox (replaces the browser default)
- Filter buttons with live count badges

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/
    page.js         Server Component — renders TaskBoard
    layout.js       Root HTML shell, font setup, metadata
    globals.css     Tailwind CSS import only
  components/
    TaskBoard.js    Client Component — owns all state (tasks + filter)
    AddTaskForm.js  Controlled form — captures new task title
    FilterBar.js    Three filter buttons with count badges
    TaskList.js     Renders the filtered array via TaskCard
    TaskCard.js     Single task row: checkbox, title, delete button
    TaskStats.js    Live stat counts + clear-completed action
```

## AI Usage Log

- **Asked Claude to suggest Tailwind dark-mode colour palette options** for a productivity app. It offered several combinations; I chose the slate + violet + emerald palette and adjusted the specific shade values myself (e.g. slate-750 for hover states, violet-500 for badge fills).

- **Used Claude to check my `typeof window` comment** — I wrote "guards against window not being defined on the server" and asked if that was technically accurate. Claude confirmed it was correct and added that Node.js (where Next.js SSR runs) genuinely has no `window` global, so the check throws rather than returning undefined. Updated my comment to explain this more precisely.

- **Asked Claude to explain why `key` on list items matters** beyond "React needs it." Learned that without a stable key React uses position-based reconciliation, which can cause state from one card to bleed into a different card if items are reordered or deleted from the middle. Updated the TaskList comment to reflect this.