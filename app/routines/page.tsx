import SectionCard from '@/components/SectionCard';
import { routines } from '@/lib/data';

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

export default function RoutinesPage() {
  return (
    <div className="space-y-10 pb-16">
      <section className="border-b border-white/10 pb-8">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/55">
          Household mode engine
        </p>

        <h1 className="font-display mt-4 text-5xl leading-none text-white md:text-6xl">
          Routines
        </h1>

        <p className="mt-5 max-w-[800px] text-sm leading-7 text-white/70 md:text-base">
          This is where you build the household mode engine. Later,
          each routine can trigger specific media, timers, visual
          prompts, and automation.
        </p>
      </section>

      <div className="space-y-10">
        {routines.map((routine) => (
          <div
            key={routine.id}
            id={routine.id}
            className="scroll-mt-8"
          >
            <SectionCard
              title={routine.name}
              frosted
              className="scroll-mt-8"
            >
              <p className="-mt-2 mb-6 text-sm font-medium text-sky-100/65">
                {routine.people}
              </p>

              <div className="grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-start">
                <ol className="space-y-3">
                  {routine.steps.map((step, index) => (
                    <li
                      key={step}
                      className={`${interactiveGlassClass} flex min-h-[76px] items-center gap-4 p-4`}
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-70"
                      />

                      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#ffffff3d] bg-[#ffffff14] text-sm font-semibold text-white shadow-[inset_0_1px_0_#ffffff35,0_8px_18px_#00000030] backdrop-blur-xl transition-all duration-300 group-hover:border-[#f5c98a80] group-hover:bg-[#ffffff26] group-hover:shadow-[inset_0_1px_0_#ffffff55,0_10px_24px_#00000045,0_0_20px_#f5bd7a30]">
                        {index + 1}
                      </span>

                      <span className="relative text-sm font-medium leading-6 text-white/85 transition-colors duration-300 group-hover:text-white">
                        {step}
                      </span>

                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -bottom-16 -right-16 h-36 w-36 rounded-full bg-[#f5bd7a00] blur-3xl transition-colors duration-300 group-hover:bg-[#f5bd7a24]"
                      />
                    </li>
                  ))}
                </ol>

                <div className="sticky top-8">
                  <div className={`${interactiveGlassClass} min-h-[220px] p-6`}>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-70"
                    />

                    <p className="relative text-xs font-medium uppercase tracking-[0.2em] text-amber-100/80">
                      Suggested media tie-in
                    </p>

                    <p className="relative mt-4 text-xl font-semibold leading-snug text-white">
                      {routine.suggestedMedia}
                    </p>

                    <p className="relative mt-4 text-sm leading-7 text-sky-100/65 transition-colors duration-300 group-hover:text-white/80">
                      Later, this card can launch a YouTube link, a
                      YouTube Music playlist, a timer, or a smart-home
                      scene.
                    </p>

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -bottom-20 -right-20 h-44 w-44 rounded-full bg-[#f5bd7a0d] blur-3xl transition-colors duration-300 group-hover:bg-[#f5bd7a2b]"
                    />
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
        ))}
      </div>
    </div>
  );
}