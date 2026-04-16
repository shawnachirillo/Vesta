import SectionCard from '@/components/SectionCard';
import { todayEvents } from '@/lib/data';

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <SectionCard title="Calendar" eyebrow="Events pulled from Google later">
        <p className="max-w-3xl text-sm leading-7 text-slate-300">
          Right now this page uses placeholder data. Later, replace the array in <code className="rounded bg-white/8 px-2 py-1 text-sky-100">lib/data.ts</code>
          {' '}with real Google Calendar data, or wire up the API route to fetch today’s events directly.
        </p>
      </SectionCard>

      <SectionCard title="Today’s events" eyebrow="Daily view">
        <div className="space-y-4">
          {todayEvents.map((event) => (
            <div key={event.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-lg font-semibold text-white">{event.title}</p>
                  <p className="mt-1 text-sm text-slate-400">{event.location}</p>
                </div>
                <p className="text-sm font-semibold text-sky-100">{event.time}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
