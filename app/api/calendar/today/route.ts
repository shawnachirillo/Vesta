import { NextResponse } from 'next/server';
import { getTodayGoogleCalendarEvents } from '@/lib/google-calendar';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const result = await getTodayGoogleCalendarEvents();

  if (!result.connected) {
    return NextResponse.json(
      {
        ok: false,
        connected: false,
        events: [],
        error: result.error ?? 'Google Calendar is not connected.',
      },
      {
        status: 401,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }

  if (result.error) {
    return NextResponse.json(
      {
        ok: false,
        connected: true,
        events: [],
        error: result.error,
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }

  return NextResponse.json(
    {
      ok: true,
      connected: true,
      events: result.events,
    },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    }
  );
}