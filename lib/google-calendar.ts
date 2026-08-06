import 'server-only';

import { google } from 'googleapis';
import { auth } from '@/auth';

export type VestaCalendarEvent = {
  id: string;
  title: string;
  time: string;
  location?: string;
  calendarName?: string;
  calendarColor?: string;
  allDay: boolean;
  start: string;
  end: string;
};

const HOUSE_TIME_ZONE =
  process.env.VESTA_TIME_ZONE?.trim() || 'America/Chicago';

function getDateParts(date: Date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: HOUSE_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);

  return {
    year: Number(parts.find((part) => part.type === 'year')?.value),
    month: Number(parts.find((part) => part.type === 'month')?.value),
    day: Number(parts.find((part) => part.type === 'day')?.value),
  };
}

function getTimeZoneOffset(date: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'longOffset',
  }).formatToParts(date);

  const offset =
    parts.find((part) => part.type === 'timeZoneName')?.value ??
    'GMT-00:00';

  return offset.replace('GMT', '') || '+00:00';
}

function getTodayBounds() {
  const now = new Date();
  const { year, month, day } = getDateParts(now);
  const offset = getTimeZoneOffset(now, HOUSE_TIME_ZONE);

  const y = String(year).padStart(4, '0');
  const m = String(month).padStart(2, '0');
  const d = String(day).padStart(2, '0');

  return {
    timeMin: `${y}-${m}-${d}T00:00:00${offset}`,
    timeMax: `${y}-${m}-${d}T23:59:59${offset}`,
  };
}

function formatEventTime(start: string, allDay: boolean): string {
  if (allDay) return 'All day';

  return new Intl.DateTimeFormat('en-US', {
    timeZone: HOUSE_TIME_ZONE,
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(start));
}

export async function getTodayGoogleCalendarEvents(): Promise<{
  connected: boolean;
  events: VestaCalendarEvent[];
  error?: string;
}> {
  const session = await auth();

  if (!session?.accessToken) {
    return { connected: false, events: [] };
  }

  if (session.error === 'RefreshAccessTokenError') {
    return {
      connected: false,
      events: [],
      error: 'Your Google connection expired. Sign in again.',
    };
  }

  const oauthClient = new google.auth.OAuth2();
  oauthClient.setCredentials({ access_token: session.accessToken });

  const calendar = google.calendar({
    version: 'v3',
    auth: oauthClient,
  });

  const { timeMin, timeMax } = getTodayBounds();

  try {
    const calendarListResponse = await calendar.calendarList.list({
      minAccessRole: 'reader',
      showDeleted: false,
      showHidden: false,
    });

    const visibleCalendars =
      calendarListResponse.data.items?.filter(
        (item) => item.id && item.selected !== false
      ) ?? [];

    const groups = await Promise.all(
      visibleCalendars.map(async (calendarItem) => {
        const calendarId = calendarItem.id;
        if (!calendarId) return [];

        const response = await calendar.events.list({
          calendarId,
          timeMin,
          timeMax,
          timeZone: HOUSE_TIME_ZONE,
          singleEvents: true,
          orderBy: 'startTime',
          showDeleted: false,
          maxResults: 100,
        });

        return (response.data.items ?? [])
          .filter((item) => item.status !== 'cancelled')
          .map((item): VestaCalendarEvent | null => {
            const start = item.start?.dateTime ?? item.start?.date;
            const end = item.end?.dateTime ?? item.end?.date;

            if (!start || !end) return null;

            const allDay = Boolean(
              item.start?.date && !item.start?.dateTime
            );

            return {
              id: `${calendarId}-${item.id ?? start}`,
              title: item.summary || 'Untitled event',
              time: formatEventTime(start, allDay),
              location: item.location || undefined,
              calendarName:
                calendarItem.summaryOverride ||
                calendarItem.summary ||
                undefined,
              calendarColor:
                calendarItem.backgroundColor || undefined,
              allDay,
              start,
              end,
            };
          })
          .filter(
            (item): item is VestaCalendarEvent => item !== null
          );
      })
    );

    return {
      connected: true,
      events: groups.flat().sort((a, b) => {
        if (a.allDay !== b.allDay) return a.allDay ? -1 : 1;
        return new Date(a.start).getTime() - new Date(b.start).getTime();
      }),
    };
  } catch (error) {
    console.error('Google Calendar API request failed:', error);

    return {
      connected: true,
      events: [],
      error:
        error instanceof Error
          ? error.message
          : 'Vesta could not load Google Calendar.',
    };
  }
}
