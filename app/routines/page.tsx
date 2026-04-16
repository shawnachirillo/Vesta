import SectionCard from '@/components/SectionCard';
import { routines } from '@/lib/data';

export default function RoutinesPage() {
  return (
    <div className="space-y-6">
      <SectionCard title="Routines" eyebrow="Person-specific flows">
        <p className="max-w-3xl text-sm leading-7 text-slate-300">
          This is where you build the household mode engine. Later, each routine can trigger specific media, timers,
          visual prompts, and automation.
        </p>
      </SectionCard>

      <div className="space-y-6">
        {routines.map((routine) => (
          <SectionCard key={routine.id} title={routine.name} eyebrow={routine.people} className="scroll-mt-8" >
            <div id={routine.id} className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
              <ol className="space-y-3">
                {routine.steps.map((step, index) => (
                  <li key={step} className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <span className="text-sm text-slate-200">{step}</span>
                  </li>
                ))}
              </ol>

              <div className="rounded-[24px] border border-amber-300/10 bg-amber-300/6 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-amber-100">Suggested media tie-in</p>
                <p className="mt-3 text-xl font-semibold text-white">{routine.suggestedMedia}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  Later, this card can launch a YouTube link, a Spotify playlist, a timer, or a smart-home scene.
                </p>
              </div>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
