import SectionCard from '@/components/SectionCard';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <SectionCard title="Settings" eyebrow="System controls">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[
            'Connect Google Calendar',
            'Set weather location',
            'Add YouTube links',
            'Add music links',
            'Reorder homepage cards',
            'Set startup behavior'
          ].map((item) => (
            <div key={item} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-5 text-sm text-slate-200">
              {item}
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
