import SectionCard from '@/components/SectionCard';
import { todayTasks } from '@/lib/data';

const columns = [
  { label: 'Now', key: 'now' },
  { label: 'Next', key: 'next' },
  { label: 'Later', key: 'later' }
] as const;

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <SectionCard title="Tasks" eyebrow="Action system">
        <div className="grid gap-4 md:grid-cols-3">
          {columns.map((column) => (
            <div key={column.key} className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4">
              <p className="text-lg font-semibold text-white">{column.label}</p>
              <div className="mt-4 space-y-3">
                {todayTasks
                  .filter((task) => task.status === column.key)
                  .map((task) => (
                    <div key={task.id} className="rounded-2xl border border-white/8 bg-[#07111f] p-4 text-sm text-slate-200">
                      {task.title}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
