import SectionCard from '@/components/SectionCard';
import { notes } from '@/lib/data';

export default function NotesPage() {
  return (
    <div className="space-y-6">
      <SectionCard title="Notes" eyebrow="Fast capture">
        <textarea
          className="min-h-56 w-full resize-none rounded-[24px] border border-white/8 bg-[#07111f] p-5 text-sm text-white outline-none placeholder:text-slate-500"
          placeholder="Write anything you need to grab fast..."
        />
      </SectionCard>

      <SectionCard title="Recent notes" eyebrow="Saved prompts">
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-sm text-slate-200">
              {note}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
