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