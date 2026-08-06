import Link from 'next/link';

import { routines } from '@/lib/data';

export default function RoutineButtons() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {routines.map((routine) => (
        <Link
          key={routine.id}
          href={`/routines#${routine.id}`}
          className="
            group
            relative
            flex
            min-h-[220px]
            flex-col
            overflow-hidden
            rounded-[26px]
            border
            border-[#ffffff38]
            bg-[#ffffff14]
            p-5
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
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-x-6
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-white/50
              to-transparent
              opacity-70
            "
          />

          <div className="relative flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-lg font-semibold leading-snug text-white">
                {routine.name}
              </p>

              <p className="mt-2 text-sm leading-5 text-sky-100/65">
                {routine.people}
              </p>
            </div>

            <span
              className="
                shrink-0
                rounded-full
                border
                border-[#ffffff3d]
                bg-[#ffffff12]
                px-4
                py-2
                text-[11px]
                font-medium
                uppercase
                tracking-[0.18em]
                text-white
                shadow-[inset_0_1px_0_#ffffff35,0_8px_18px_#00000030]
                backdrop-blur-xl
                transition-all
                duration-300
                group-hover:border-[#f5c98a80]
                group-hover:bg-[#ffffff26]
                group-hover:shadow-[inset_0_1px_0_#ffffff55,0_10px_24px_#00000045,0_0_20px_#f5bd7a30]
              "
            >
              Start
            </span>
          </div>

          {routine.suggestedMedia ? (
            <p className="relative mt-auto pt-8 text-sm leading-6 text-sky-100/65 transition-colors duration-300 group-hover:text-white/85">
              Suggested media: {routine.suggestedMedia}
            </p>
          ) : null}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-16
              -right-16
              h-36
              w-36
              rounded-full
              bg-[#f5bd7a00]
              blur-3xl
              transition-colors
              duration-300
              group-hover:bg-[#f5bd7a24]
            "
          />
        </Link>
      ))}
    </div>
  );
}