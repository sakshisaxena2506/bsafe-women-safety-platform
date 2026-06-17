import { AlertTriangle } from "lucide-react";

export default function ErrorState({ title = "Something went wrong", message }) {
  return (
    <div className="rounded-2xl border border-roseguard-200 bg-roseguard-50 p-5 text-roseguard-700 dark:border-roseguard-500/30 dark:bg-roseguard-500/10 dark:text-roseguard-100">
      <div className="flex gap-3">
        <AlertTriangle className="h-5 w-5 flex-none" />
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="mt-1 text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
}
