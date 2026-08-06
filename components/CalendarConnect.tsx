'use client';

import { signIn, signOut } from 'next-auth/react';

type CalendarConnectProps = {
  connected: boolean;
  reconnect?: boolean;
};

export default function CalendarConnect({
  connected,
  reconnect = false,
}: CalendarConnectProps) {
  if (connected && !reconnect) {
    return (
      <button
        type="button"
        onClick={() => signOut({ callbackUrl: '/' })}
        className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/[0.08] hover:text-white"
      >
        Disconnect
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => signIn('google', { callbackUrl: '/' })}
      className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
    >
      {reconnect ? 'Reconnect Google' : 'Connect Google Calendar'}
    </button>
  );
}
