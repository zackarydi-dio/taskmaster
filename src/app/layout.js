// ══════════════════════════════════════════════════════════════════
// FILE:    src/app/layout.js
// PURPOSE: Root layout — wraps every page in the app.
//          Sets the HTML shell, document metadata, and global font.
//          This is a Server Component; it runs on the server only.
// ══════════════════════════════════════════════════════════════════
import './globals.css';

export const metadata = {
  title: 'Taskmaster',
  description: 'A minimal, dark-mode task manager built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}