import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/tasks', label: 'Tasks' },
  { href: '/routines', label: 'Routines' },
  { href: '/library', label: 'Library' },
  { href: '/notes', label: 'Notes' },
  { href: '/settings', label: 'Settings' },
];

export default function NavShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020817] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/VESTA_background1.png')",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-[#020817]/18"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-gradient-to-r from-[#020817]/35 via-transparent to-[#020817]/20"
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1800px] gap-5 p-4 md:p-6">
        <aside className="hidden w-[255px] shrink-0 flex-col rounded-[30px] border border-white/20 bg-white/[0.07] p-5 shadow-[0_24px_90px_rgba(0,0,0,0.22)] backdrop-blur-2xl backdrop-saturate-150 lg:flex">
          <div>
            <Link
              href="/"
              aria-label="Vesta home"
              className="inline-flex"
            >
              <Image
                src="/images/VESTA_logo.png"
                alt="Vesta"
                width={220}
                height={90}
                priority
                className="h-auto w-[150px] object-contain"
              />
            </Link>

            <p className="mt-5 text-2xl font-semibold tracking-tight text-white">
              House OS
            </p>

            <p className="mt-3 max-w-[190px] text-sm leading-6 text-slate-100/80">
              Calm, visible structure for a neurodivergent household.
            </p>
          </div>

          <nav className="mt-10 flex flex-1 flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-white/15 bg-white/[0.05] px-4 py-3 text-sm font-medium text-white/90 backdrop-blur-xl transition hover:border-white/25 hover:bg-white/[0.10]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="rounded-3xl border border-white/15 bg-white/[0.06] p-4 text-sm text-slate-100 backdrop-blur-xl">
            <p className="font-medium text-amber-100">
              Next layer
            </p>

            <p className="mt-2 leading-6 text-white/75">
              Later, tie music and YouTube directly into routines so
              the house can shift modes faster.
            </p>
          </div>
        </aside>

        <main className="min-w-0 flex-1 rounded-[30px] border border-white/20 bg-white/[0.06] p-4 shadow-[0_24px_100px_rgba(0,0,0,0.24)] backdrop-blur-2xl backdrop-saturate-150 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}