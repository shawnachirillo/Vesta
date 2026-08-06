import Link from 'next/link';

import { quickLinks } from '@/lib/data';

const launches = [
  { label: 'YouTube', href: quickLinks.youtube, icon: '▶' },
  { label: 'Music', href: quickLinks.music, icon: '♫' },
  { label: 'Calendar', href: quickLinks.calendar, icon: '◷' },
  { label: 'Tasks', href: quickLinks.tasks, icon: '✓' },
  { label: 'Notes', href: quickLinks.notes, icon: '✎' },
  { label: 'Library', href: quickLinks.library, icon: '⌘' },
  { label: 'Routines', href: quickLinks.routines, icon: '☰' },
];

export default function QuickLaunch() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
      {launches.map((item) => {
        const external = item.href.startsWith('http');

        return (
          <Link
            key={item.label}
            href={item.href}
            target={external ? '_blank' : undefined}
            rel={external ? 'noreferrer' : undefined}
            className="quick-launch-tile group relative overflow-hidden rounded-[24px] px-4 py-5 transition duration-300 hover:-translate-y-1"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-60"
            />

            <div className="relative flex items-center gap-3">
              <div className="quick-launch-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl text-sky-100 transition duration-300 group-hover:scale-105 group-hover:text-white">
                {item.icon}
              </div>

              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-white">
                  {item.label}
                </p>

                <p className="mt-1 text-xs text-slate-400 transition group-hover:text-slate-200">
                  Open fast
                </p>
              </div>
            </div>

            <span
              aria-hidden="true"
              className="absolute bottom-3 right-4 translate-x-1 text-sm text-white/30 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
            >
              →
            </span>
          </Link>
        );
      })}
    </div>
  );
}