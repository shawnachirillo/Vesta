import Link from 'next/link';
import { routines } from '@/lib/data';

export default function RoutineButtons() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {routines.map((routine) => (
        <Link
          key={routine.id}
          href={`/routines#${routine.id}`}
          className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 transition hover:border-sky-300/30 hover:bg-white/[0.05]"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-base font-semibold text-white">{routine.name}</p>
              <p className="mt-1 text-sm text-slate-400">{routine.people}</p>
            </div>
            <div className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-sky-100">
              Start
            </div>
          </div>
          {routine.suggestedMedia ? (
            <p className="mt-4 text-xs text-slate-400">Suggested media: {routine.suggestedMedia}</p>
          ) : null}
        </Link>
      ))}
    </div>
  );
}
