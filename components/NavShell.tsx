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
    <div className="relative min-h-screen overflow-hidden bg-[#050a12] text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-cover bg-center bg-no-repeat brightness-[0.88] saturate-[0.95]"
        style={{
          backgroundImage: "url('/images/VESTA_background1.png')",
        }}
      />

      <div
        aria-hidden="true"
       className="pointer-events-none fixed inset-0 bg-[#030711]/16"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 bg-gradient-to-b from-[#02050c]/25 via-transparent to-[#02050c]/65"
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1800px] gap-5 p-4 md:p-6">
        <aside className="glass-subtle hidden w-[255px] shrink-0 flex-col rounded-[30px] p-5 lg:flex">
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

            <p className="font-display mt-6 text-[30px] leading-none text-white">
              House OS
            </p>

            <p className="mt-4 max-w-[190px] text-sm leading-6 text-white/70">
              Calm, visible structure for a neurodivergent household.
            </p>
          </div>

          <nav className="mt-10 flex flex-1 flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-white/80 transition duration-300 hover:border-white/15 hover:bg-white/[0.07] hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-white/10 pt-5 text-sm text-white/65">
            <p className="font-display text-xl text-white">
              The next layer
            </p>

            <p className="mt-3 leading-6">
              Music, light, and household modes working together.
            </p>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-1 py-4 md:px-5 md:py-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}