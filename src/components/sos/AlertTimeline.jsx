import { alertTimeline } from "../../data/alerts";
import Card from "../common/Card";

export default function AlertTimeline() {
  return (
    <Card>
      <h2 className="text-xl font-bold text-slate-950 dark:text-white">Alert timeline</h2>
      <div className="mt-5 space-y-4">
        {alertTimeline.map((item, index) => (
          <div key={item.id} className="grid grid-cols-[32px_1fr] gap-3">
            <div className="flex flex-col items-center">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-600 text-sm font-bold text-white">
                {index + 1}
              </span>
              {index < alertTimeline.length - 1 && <span className="h-full w-px bg-slate-200 dark:bg-slate-700" />}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex items-center justify-between gap-3">
                <strong className="text-slate-950 dark:text-white">{item.title}</strong>
                <span className="text-sm font-semibold text-slate-500">{item.time}</span>
              </div>
              <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
