import { Loader2 } from "lucide-react";

export default function Loader({ label = "Loading secure workspace" }) {
  return (
    <div className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white/60 text-slate-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
      <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
      <p className="font-semibold">{label}</p>
    </div>
  );
}
