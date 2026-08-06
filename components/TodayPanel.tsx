import CalendarConnect from '@/components/CalendarConnect';
import {
  getTodayGoogleCalendarEvents,
  type VestaCalendarEvent,
} from '@/lib/google-calendar';
import { todayTasks } from '@/lib/data';

export default async function TodayPanel() {
  const calendarResult = await getTodayGoogleCalendarEvents();
  const events: VestaCalendarEvent[] = calendarResult.events;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <div className="mb-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-300">Events</p>
            <p className="mt-1 text-xs text-slate-500">
              All selected Google calendars
            </p>
          </div>

          {calendarResult.connected ? (
            <CalendarConnect
              connected
              reconnect={Boolean(calendarResult.error)}
            />
          ) : null}
        </div>

        {!calendarResult.connected ? (
          <div className="rounded-2xl border border-sky-300/15 bg-sky-300/[0.05] p-5">
            <p className="text-base font-semibold text-white">
              Connect your Google Calendar
            </p>
            <p className="mt-2 max-w-lg text-sm leading-6 text-slate-400">
              Sign in once so Vesta can read today’s events. Access is read-only.
            </p>
            <div className="mt-4">
              <CalendarConnect connected={false} />
            </div>
          </div>
        ) : calendarResult.error ? (
          <div className="rounded-2xl border border-red-300/15 bg-red-300/[0.06] p-5">
            <p className="text-sm font-semibold text-red-100">
              Calendar unavailable
            </p>
            <p className="mt-2 text-sm leading-6 text-red-100/70">
              {calendarResult.error}
            </p>
          </div>
        ) : events.length === 0 ? (
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
            <p className="text-sm font-medium text-white">
              No events scheduled today
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Vesta checked your selected Google calendars.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {events.map((event) => (
              <div
                key={`${event.id}-${event.start}`}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-1 h-3 w-3 shrink-0 rounded-full"
                    style={{
                      backgroundColor:
                        event.calendarColor ??
                        'rgba(125, 211, 252, 0.85)',
                    }}
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate text-base font-semibold text-white">
                          {event.title}
                        </p>

                        {event.location ? (
                          <p className="mt-1 text-sm text-slate-400">
                            {event.location}
                          </p>
                        ) : null}

                        {event.calendarName ? (
                          <p className="mt-1 text-xs text-slate-500">
                            {event.calendarName}
                          </p>
                        ) : null}
                      </div>

                      <p className="shrink-0 text-sm font-semibold text-sky-100">
                        {event.time}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-slate-300">
          Priority tasks
        </p>

        <div className="space-y-3">
          {todayTasks.map((task) => (
            <div
              key={task.id}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-4"
            >
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-white">
                  {task.title}
                </p>

                <span className="rounded-full border border-amber-300/15 bg-amber-300/8 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-amber-100">
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
