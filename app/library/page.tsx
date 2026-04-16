import SectionCard from '@/components/SectionCard';
import { librarySections } from '@/lib/data';

export default function LibraryPage() {
  return (
    <div className="space-y-6">
      <SectionCard title="Library" eyebrow="Household archive">
        <p className="max-w-3xl text-sm leading-7 text-slate-300">
          Library is the deeper house brain. Keep the homepage light, and use this page for entry points into finances,
          records, home info, and family logistics.
        </p>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-2">
        {librarySections.map((section) => (
          <SectionCard key={section.id} title={section.title} eyebrow="Shortcut group">
            <p className="text-sm leading-6 text-slate-300">{section.description}</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {section.items.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-4 text-left text-sm text-slate-200 transition hover:border-sky-300/25 hover:bg-white/[0.05]"
                >
                  {item}
                </button>
              ))}
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
