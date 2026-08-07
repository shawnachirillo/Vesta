import CalendarConnect from '@/components/CalendarConnect';
import CreateEventButton from '@/components/CreateEventButton';
import SectionCard from '@/components/SectionCard';

import {
  getTodayGoogleCalendarEvents,
  type VestaCalendarEvent,
} from '@/lib/google-calendar';

const interactiveGlassClass = `
  group
  relative
  overflow-hidden
  rounded-[26px]
  border
  border-[#ffffff38]
  bg-[#ffffff14]
  shadow-[inset_0_1px_0_#ffffff35,0_14px_35px_#00000038]
  backdrop-blur-[24px]
  backdrop-saturate-[140%]
  transition-all
  duration-300
  ease-out
  hover:-translate-y-1
  hover:scale-[1.01]
  hover:border-[#ffffff66]
  hover:bg-[#ffffff24]
  hover:shadow-[inset_0_1px_0_#ffffff55,0_22px_50px_#00000059,0_0_28px_#f5bd7a24]
`;

function formatToday(): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());
}

export default async function CalendarPage() {
  const calendarResult = await getTodayGoogleCalendarEvents();
  const events: VestaCalendarEvent[] = calendarResult.events;

  const allDayEvents = events.filter((event) => event.allDay);
  const timedEvents = events.filter((event) => !event.allDay);

  const canCreateEvents =
    calendarResult.connected && !calendarResult.error;

  return (
    <div className="space-y-10 pb-16">
      <section className="border-b border-white/10 pb-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/55">
              Household schedule
            </p>

            <h1 className="font-display mt-4 text-5xl leading-none text-white md:text-6xl">
              Calendar
            </h1>

            <p className="mt-5 max-w-[720px] text-sm leading-7 text-white/70 md:text-base">
              One clear view of what the household needs to know today.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <CreateEventButton connected={canCreateEvents} />

            <div className="glass-control rounded-[24px] px-5 py-4">
              <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                Today
              </p>

              <p className="font-display mt-2 text-2xl text-white">
                {formatToday()}
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionCard title="Today’s events" frosted>
        <div className="mb-6 flex flex-col gap-4 border-b border-white/15 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">
              Google Calendar
            </p>

            <p className="mt-1 text-sm text-sky-100/60">
              All selected calendars
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
          <div className={`${interactiveGlassClass} p-6`}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-70"
            />

            <p className="relative text-xl font-semibold text-white">
              Connect Google Calendar
            </p>

            <p className="relative mt-3 max-w-xl text-sm leading-7 text-sky-100/65">
              Sign in once so Vesta can securely read and create
              household calendar events.
            </p>

            <div className="relative mt-5">
              <CalendarConnect connected={false} />
            </div>
          </div>
        ) : calendarResult.error ? (
          <div className="rounded-[26px] border border-[#fecaca40] bg-[#450a0a80] p-6 shadow-[inset_0_1px_0_#ffffff18,0_14px_35px_#00000038] backdrop-blur-[24px]">
            <p className="text-base font-semibold text-red-100">
              Calendar unavailable
            </p>

            <p className="mt-3 text-sm leading-7 text-red-100/70">
              {calendarResult.error}
            </p>
          </div>
        ) : events.length === 0 ? (
          <div className={`${interactiveGlassClass} p-6`}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-70"
            />

            <p className="relative text-xl font-semibold text-white">
              Nothing scheduled today
            </p>

            <p className="relative mt-3 text-sm leading-7 text-sky-100/65">
              Your day is currently clear. Use Add to calendar to plan
              something.
            </p>
          </div>
        ) : (
          <div className="space-y-9">
            {allDayEvents.length > 0 ? (
              <section>
                <div className="mb-4 flex items-center gap-3">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/55">
                    All day
                  </p>

                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {allDayEvents.map((event) => (
                    <CalendarEventCard
                      key={`${event.id}-${event.start}`}
                      event={event}
                    />
                  ))}
                </div>
              </section>
            ) : null}

            {timedEvents.length > 0 ? (
              <section>
                <div className="mb-4 flex items-center gap-3">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/55">
                    Schedule
                  </p>

                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <div className="space-y-4">
                  {timedEvents.map((event) => (
                    <CalendarEventCard
                      key={`${event.id}-${event.start}`}
                      event={event}
                    />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        )}
      </SectionCard>
    </div>
  );
}

function CalendarEventCard({
  event,
}: {
  event: VestaCalendarEvent;
}) {
  return (
    <article className={`${interactiveGlassClass} p-5 md:p-6`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-70"
      />

      <div className="relative flex items-start gap-4">
        <span
          aria-hidden="true"
          className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full shadow-[0_0_18px_currentColor]"
          style={{
            backgroundColor: event.calendarColor ?? '#7dd3fc',
          }}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-lg font-semibold leading-snug text-white md:text-xl">
                {event.title}
              </h2>

              {event.location ? (
                <p className="mt-2 text-sm text-sky-100/65">
                  {event.location}
                </p>
              ) : null}

              {event.calendarName ? (
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-sky-100/50">
                  {event.calendarName}
                </p>
              ) : null}
            </div>

            <div className="shrink-0">
              <span className="inline-flex rounded-full border border-[#ffffff3d] bg-[#ffffff12] px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-white shadow-[inset_0_1px_0_#ffffff35,0_8px_18px_#00000030] backdrop-blur-xl transition-all duration-300 group-hover:border-[#f5c98a80] group-hover:bg-[#ffffff26] group-hover:shadow-[inset_0_1px_0_#ffffff55,0_10px_24px_#00000045,0_0_20px_#f5bd7a30]">
                {event.time}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-16 -right-16 h-36 w-36 rounded-full bg-[#f5bd7a00] blur-3xl transition-colors duration-300 group-hover:bg-[#f5bd7a24]"
      />
    </article>
  );
}