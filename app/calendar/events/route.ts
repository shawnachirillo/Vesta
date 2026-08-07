import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

import { auth } from '@/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type CreateEventBody = {
  title?: string;
  start?: string;
  end?: string;
  location?: string;
  description?: string;
};

function cleanOptionalText(value: unknown): string | undefined {
  if (typeof value !== 'string') {
    return undefined;
  }

  const cleaned = value.trim();

  return cleaned.length > 0 ? cleaned : undefined;
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.accessToken) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Google Calendar is not connected.',
      },
      {
        status: 401,
      }
    );
  }

  if (session.error === 'RefreshAccessTokenError') {
    return NextResponse.json(
      {
        ok: false,
        error:
          'Your Google connection expired. Reconnect Google and try again.',
      },
      {
        status: 401,
      }
    );
  }

  let body: CreateEventBody;

  try {
    body = (await request.json()) as CreateEventBody;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: 'The event form could not be read.',
      },
      {
        status: 400,
      }
    );
  }

  const title = cleanOptionalText(body.title);
  const location = cleanOptionalText(body.location);
  const description = cleanOptionalText(body.description);

  if (!title) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Add an event title.',
      },
      {
        status: 400,
      }
    );
  }

  if (!body.start || !body.end) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Choose a start and end time.',
      },
      {
        status: 400,
      }
    );
  }

  const start = new Date(body.start);
  const end = new Date(body.end);

  if (
    Number.isNaN(start.getTime()) ||
    Number.isNaN(end.getTime())
  ) {
    return NextResponse.json(
      {
        ok: false,
        error: 'The event date or time is invalid.',
      },
      {
        status: 400,
      }
    );
  }

  if (end.getTime() <= start.getTime()) {
    return NextResponse.json(
      {
        ok: false,
        error: 'The event must end after it starts.',
      },
      {
        status: 400,
      }
    );
  }

  const oauthClient = new google.auth.OAuth2();

  oauthClient.setCredentials({
    access_token: session.accessToken,
  });

  const calendar = google.calendar({
    version: 'v3',
    auth: oauthClient,
  });

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      sendUpdates: 'none',

      requestBody: {
        summary: title,
        location,
        description,

        start: {
          dateTime: start.toISOString(),
          timeZone: 'America/Chicago',
        },

        end: {
          dateTime: end.toISOString(),
          timeZone: 'America/Chicago',
        },
      },
    });

    return NextResponse.json(
      {
        ok: true,

        event: {
          id: response.data.id,
          title: response.data.summary,
          htmlLink: response.data.htmlLink,
          start: response.data.start,
          end: response.data.end,
        },
      },
      {
        status: 201,

        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error) {
    console.error(
      'Google Calendar event creation failed:',
      error
    );

    return NextResponse.json(
      {
        ok: false,

        error:
          error instanceof Error
            ? error.message
            : 'Google Calendar could not create the event.',
      },
      {
        status: 500,
      }
    );
  }
}