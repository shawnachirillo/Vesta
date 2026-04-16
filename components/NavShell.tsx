import Link from 'next/link';
import { ReactNode } from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/tasks', label: 'Tasks' },
  { href: '/routines', label: 'Routines' },
  { href: '/library', label: 'Library' },
  { href: '/notes', label: 'Notes' },
  { href: '/settings', label: 'Settings' }
];

export default function NavShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1600px] gap-6 px-4 py-4 md:px-6 md:py-6">
      <aside className="card sticky top-4 hidden h-[calc(100vh-2rem)] w-72 rounded-[32px] p-6 lg:flex lg:flex-col">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-sky-200/70">Vesta</p>
          <h1 className="mt-3 text-3xl font-semibold">House OS</h1>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Calm, visible structure for a neurodivergent household.
          </p>
        </div>

        <nav className="mt-10 flex flex-1 flex-col gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-white/6 px-4 py-3 text-sm font-medium text-slate-100 transition hover:border-sky-300/25 hover:bg-white/5"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="rounded-3xl border border-amber-300/10 bg-amber-300/6 p-4 text-sm text-slate-200">
          <p className="font-medium text-amber-200">Next layer</p>
          <p className="mt-2 leading-6 text-slate-300">
            Later, tie music and YouTube directly into routines so the house can shift modes faster.
          </p>
        </div>
      </aside>

      <main className="flex-1">{children}</main>
    </div>
  );
}
