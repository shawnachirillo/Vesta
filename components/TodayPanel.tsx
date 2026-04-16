import { todayEvents, todayTasks } from '@/lib/data';

export default function TodayPanel() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p className="mb-3 text-sm font-medium text-slate-300">Events</p>
        <div className="space-y-3">
          {todayEvents.map((event) => (
            <div key={event.id} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-base font-semibold text-white">{event.title}</p>
                  <p className="mt-1 text-sm text-slate-400">
                    {event.location ? event.location : 'No location'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-sky-100">{event.time}</p>
                  {event.type ? <p className="mt-1 text-xs text-slate-500">{event.type}</p> : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-medium text-slate-300">Priority tasks</p>
        <div className="space-y-3">
          {todayTasks.map((task) => (
            <div key={task.id} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-medium text-white">{task.title}</p>
                <span className="rounded-full border border-amber-300/15 bg-amber-300/8 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-amber-100">
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
