import QuickLaunch from '@/components/QuickLaunch';
import RoutineButtons from '@/components/RoutineButtons';
import SectionCard from '@/components/SectionCard';
import TodayPanel from '@/components/TodayPanel';
import {
  librarySections,
  notes,
  todaySummary,
} from '@/lib/data';

export default function HomePage() {
  return (
    <div className="space-y-12 pb-16">
      <section className="min-h-[330px] py-8 md:py-14">
        <div className="grid gap-10 xl:grid-cols-[1.35fr_0.65fr] xl:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/55">
              Vesta
            </p>

            <h1 className="font-display mt-5 max-w-[820px] text-6xl leading-[0.94] tracking-[-0.035em] text-white md:text-7xl xl:text-[88px]">
              Your home,
              <br />
              in rhythm.
            </h1>

            <p className="mt-7 max-w-[620px] text-base leading-7 text-white/72 md:text-lg">
              Keep the day visible, reduce friction, and guide the
              household into what comes next.
            </p>
          </div>

          <div className="grid gap-3">
            <div className="glass-control rounded-[24px] p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                Today
              </p>

              <p className="font-display mt-2 text-3xl text-white">
                {todaySummary.dateLabel}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="glass-control rounded-[24px] p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                  Weather
                </p>

                <p className="mt-2 text-lg font-medium text-white">
                  {todaySummary.weather}
                </p>
              </div>

              <div className="glass-control rounded-[24px] p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-white/45">
                  Status
                </p>

                <p className="mt-2 text-sm leading-6 text-white/75">
                  {todaySummary.status}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-10 xl:grid-cols-[1.15fr_0.85fr] xl:items-start">
        <SectionCard title="Today" frosted>
          <TodayPanel />
        </SectionCard>

        <SectionCard title="Quick launch">
          <QuickLaunch />
        </SectionCard>
      </div>

      <div className="grid gap-10 xl:grid-cols-[1.35fr_0.65fr] xl:items-start">
        <SectionCard title="Routines" frosted>
          <RoutineButtons />
        </SectionCard>

        <SectionCard title="Notes">
          <textarea
            className="glass-control min-h-44 w-full resize-none rounded-[24px] p-5 text-sm text-white outline-none placeholder:text-white/35 focus:border-sky-200/30"
            placeholder="Drop a reminder here..."
            defaultValue={notes[0]}
          />

          <div className="mt-3 space-y-3">
            {notes.slice(1).map((note) => (
              <div
                key={note}
                className="glass-control rounded-2xl px-4 py-3 text-sm text-white/72"
              >
                {note}
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Library">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {librarySections.map((section) => (
            <div
              key={section.id}
              className="glass-control rounded-[24px] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/25"
            >
              <p className="font-display text-2xl text-white">
                {section.title}
              </p>

              <p className="mt-3 text-sm leading-6 text-white/58">
                {section.description}
              </p>

              <ul className="mt-5 space-y-2 text-sm text-white/72">
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