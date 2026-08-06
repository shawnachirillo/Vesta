import CalendarConnect from '@/components/CalendarConnect';
import {
  getTodayGoogleCalendarEvents,
  type VestaCalendarEvent,
} from '@/lib/google-calendar';
import { todayTasks } from '@/lib/data';

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
  hover:scale-[1.015]
  hover:border-[#ffffff66]
  hover:bg-[#ffffff24]
  hover:shadow-[inset_0_1px_0_#ffffff55,0_22px_50px_#00000059,0_0_28px_#f5bd7a24]
`;

export default async function TodayPanel() {
  const calendarResult = await getTodayGoogleCalendarEvents();
  const events: VestaCalendarEvent[] = calendarResult.events;

  return (
    <div className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
      <div>
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-white">
              Events
            </p>

            <p className="mt-1 text-xs text-sky-100/65">
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
          <div className={`${interactiveGlassClass} p-5`}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-70"
            />

            <p className="relative text-base font-semibold text-white">
              Connect your Google Calendar
            </p>

            <p className="relative mt-2 max-w-lg text-sm leading-6 text-sky-100/65">
              Sign in once so Vesta can read today’s events.
              Access is read-only.
            </p>

            <div className="relative mt-4">
              <CalendarConnect connected={false} />
            </div>
          </div>
        ) : calendarResult.error ? (
          <div className="rounded-[26px] border border-[#fecaca40] bg-[#450a0a80] p-5 shadow-[inset_0_1px_0_#ffffff18,0_14px_35px_#00000038] backdrop-blur-[24px]">
            <p className="text-sm font-semibold text-red-100">
              Calendar unavailable
            </p>

            <p className="mt-2 text-sm leading-6 text-red-100/70">
              {calendarResult.error}
            </p>
          </div>
        ) : events.length === 0 ? (
          <div className={`${interactiveGlassClass} p-5`}>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-70"
            />

            <p className="relative text-sm font-semibold text-white">
              No events scheduled today
            </p>

            <p className="relative mt-2 text-sm leading-6 text-sky-100/65">
              Vesta checked your selected Google calendars.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div
                key={`${event.id}-${event.start}`}
                className={`${interactiveGlassClass} p-5`}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-70"
                />

                <div className="relative flex items-start gap-4">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full shadow-[0_0_18px_currentColor]"
                    style={{
                      backgroundColor:
                        event.calendarColor ?? '#7dd3fc',
                    }}
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="truncate text-lg font-semibold text-white">
                          {event.title}
                        </p>

                        {event.location ? (
                          <p className="mt-2 text-sm text-sky-100/65">
                            {event.location}
                          </p>
                        ) : null}

                        {event.calendarName ? (
                          <p className="mt-2 text-sm text-sky-100/55">
                            {event.calendarName}
                          </p>
                        ) : null}
                      </div>

                      <p className="shrink-0 text-sm font-semibold text-white">
                        {event.time}
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-16 -right-16 h-36 w-36 rounded-full bg-[#f5bd7a00] blur-3xl transition-colors duration-300 group-hover:bg-[#f5bd7a24]"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="mb-4 text-sm font-semibold text-white">
          Priority tasks
        </p>

        <div className="space-y-4">
          {todayTasks.map((task) => (
            <div
              key={task.id}
              className={`${interactiveGlassClass} p-5`}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-70"
              />

              <div className="relative flex items-center justify-between gap-4">
                <p className="text-base font-semibold leading-6 text-white">
                  {task.title}
                </p>

                <span className="shrink-0 rounded-full border border-[#fde68a45] bg-[#fbbf2417] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-amber-100 shadow-[inset_0_1px_0_#ffffff30,0_8px_18px_#00000030] backdrop-blur-xl transition-all duration-300 group-hover:border-[#f5c98a80] group-hover:bg-[#ffffff26] group-hover:shadow-[inset_0_1px_0_#ffffff55,0_10px_24px_#00000045,0_0_20px_#f5bd7a30]">
                  {task.status}
                </span>
              </div>

              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-16 -right-16 h-36 w-36 rounded-full bg-[#f5bd7a00] blur-3xl transition-colors duration-300 group-hover:bg-[#f5bd7a24]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}