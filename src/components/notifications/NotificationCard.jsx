import { BellRing, CheckCircle2, MapPin, UserRound } from "lucide-react";
import Button from "../common/Button";

const icons = {
  alert: BellRing,
  location: MapPin,
  profile: UserRound,
  "safe-zone": CheckCircle2
};

export default function NotificationCard({ notification, onRead }) {
  const Icon = icons[notification.type] || BellRing;

  return (
    <article className={`rounded-2xl border p-4 ${notification.read ? "border-slate-200 bg-white/70 dark:border-slate-800 dark:bg-slate-900/70" : "border-brand-200 bg-brand-50/80 dark:border-brand-500/20 dark:bg-brand-500/10"}`}>
      <div className="flex gap-3">
        <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl bg-white text-brand-700 shadow-sm dark:bg-slate-900 dark:text-brand-100">
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-bold text-slate-950 dark:text-white">{notification.title}</h3>
            <span className="text-xs font-semibold text-slate-500">{notification.time}</span>
          </div>
          <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">{notification.message}</p>
          {!notification.read && (
            <Button variant="ghost" className="mt-2 min-h-8 px-0 text-brand-700 dark:text-brand-100" onClick={() => onRead(notification.id)}>
              Mark as read
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
