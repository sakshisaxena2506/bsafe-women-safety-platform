import { BellRing, Contact, MapPinned, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants";
import Card from "../common/Card";

const actions = [
  { label: "Trigger SOS", path: ROUTES.sos, icon: ShieldAlert, tone: "text-roseguard-600 bg-roseguard-100" },
  { label: "Add Contact", path: ROUTES.contacts, icon: Contact, tone: "text-brand-700 bg-brand-100" },
  { label: "Find Safe Zone", path: ROUTES.safeZones, icon: MapPinned, tone: "text-blue-700 bg-blue-100" },
  { label: "Notifications", path: ROUTES.notifications, icon: BellRing, tone: "text-amber-700 bg-amber-100" }
];

export default function QuickActions() {
  return (
    <Card>
      <h2 className="text-xl font-bold text-slate-950 dark:text-white">Quick actions</h2>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.label}
              to={action.path}
              className="rounded-2xl border border-slate-200 bg-white/70 p-4 transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900/70"
            >
              <span className={`grid h-10 w-10 place-items-center rounded-xl ${action.tone}`}>
                <Icon className="h-5 w-5" />
              </span>
              <strong className="mt-3 block text-sm text-slate-950 dark:text-white">{action.label}</strong>
            </Link>
          );
        })}
      </div>
    </Card>
  );
}
