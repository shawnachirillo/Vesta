import Link from 'next/link';
import { quickLinks } from '@/lib/data';

const launches = [
  { label: 'YouTube', href: quickLinks.youtube, icon: '▶' },
  { label: 'Music', href: quickLinks.music, icon: '♫' },
  { label: 'Calendar', href: quickLinks.calendar, icon: '◷' },
  { label: 'Tasks', href: quickLinks.tasks, icon: '✓' },
  { label: 'Notes', href: quickLinks.notes, icon: '✎' },
  { label: 'Library', href: quickLinks.library, icon: '⌘' },
  { label: 'Routines', href: quickLinks.routines, icon: '☰' }
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
            className="group rounded-[24px] border border-white/8 bg-white/[0.03] px-4 py-5 transition hover:border-sky-300/30 hover:bg-white/[0.06]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-lg text-sky-100">
                {item.icon}
              </div>
              <div>
                <p className="text-base font-semibold text-white">{item.label}</p>
                <p className="text-xs text-slate-400 group-hover:text-slate-300">Open fast</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
