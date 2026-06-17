import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/75 py-8 dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-slate-600 dark:text-slate-300 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-2 font-bold text-slate-950 dark:text-white">
          <Shield className="h-5 w-5 text-brand-600" />
          bSafe Women Safety Platform
        </div>
        <p>Built for fast emergency assistance, trusted contacts, responders, and safety teams.</p>
      </div>
    </footer>
  );
}
