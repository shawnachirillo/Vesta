import QuickLaunch from '@/components/QuickLaunch';
import RoutineButtons from '@/components/RoutineButtons';
import SectionCard from '@/components/SectionCard';
import TodayPanel from '@/components/TodayPanel';
import { librarySections, notes, todaySummary } from '@/lib/data';

export default function HomePage() {
  return (
    <div className="space-y-6">
      <section className="card overflow-hidden rounded-[32px] p-6 md:p-8">
        <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="panel-title text-xs uppercase text-sky-200/70">Vesta dashboard</p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-white md:text-5xl">
              The front door for your house system.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
              Keep the day visible, reduce friction, and route the house into the right mode fast.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            <div className="rounded-[28px] border border-white/8 bg-white/[0.04] p-5">
              <p className="text-sm text-slate-400">Today</p>
              <p className="mt-2 text-2xl font-semibold text-white">{todaySummary.dateLabel}</p>
            </div>
            <div className="rounded-[28px] border border-white/8 bg-white/[0.04] p-5">
              <p className="text-sm text-slate-400">Weather</p>
              <p className="mt-2 text-2xl font-semibold text-white">{todaySummary.weather}</p>
            </div>
            <div className="rounded-[28px] border border-white/8 bg-white/[0.04] p-5">
              <p className="text-sm text-slate-400">Status</p>
              <p className="mt-2 text-sm leading-6 text-slate-200">{todaySummary.status}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[1.18fr_0.82fr]">
        <SectionCard title="Today" eyebrow="Calendar + tasks">
          <TodayPanel />
        </SectionCard>

        <SectionCard title="Quick launch" eyebrow="Fast access">
          <QuickLaunch />
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <SectionCard title="Routines" eyebrow="Mode switching">
          <RoutineButtons />
        </SectionCard>

        <SectionCard title="Notes" eyebrow="Brain dump">
          <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
            <textarea
              className="min-h-40 w-full resize-none rounded-2xl border border-white/8 bg-[#07111f] p-4 text-sm text-white outline-none placeholder:text-slate-500"
              placeholder="Drop a reminder here..."
              defaultValue={notes[0]}
            />
          </div>
          <div className="mt-4 space-y-3">
            {notes.slice(1).map((note) => (
              <div key={note} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                {note}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Library shortcuts" eyebrow="Household archive">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {librarySections.map((section) => (
            <div key={section.id} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5">
              <p className="text-lg font-semibold text-white">{section.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{section.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-300">
                {section.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
