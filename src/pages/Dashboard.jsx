import { Activity, Clock, MapPinned, UsersRound } from "lucide-react";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import QuickActions from "../components/dashboard/QuickActions";
import SafetyStatusCard from "../components/dashboard/SafetyStatusCard";
import StatCard from "../components/dashboard/StatCard";
import { useNotifications } from "../context/NotificationContext";
import { useSafety } from "../context/SafetyContext";
import { dashboardStats } from "../data/dashboard";
import { incidents } from "../data/incidents";

const icons = [Activity, Clock, UsersRound, MapPinned];

export default function Dashboard() {
  const { contacts } = useSafety();
  const { notifications } = useNotifications();

  return (
    <div className="space-y-6">
      <SafetyStatusCard />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <StatCard key={stat.label} {...stat} icon={icons[index]} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Recent alerts</h2>
          <div className="mt-4 space-y-3">
            {incidents.slice(0, 3).map((incident) => (
              <article key={incident.id} className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/70 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <strong className="text-slate-950 dark:text-white">{incident.location}</strong>
                  <p className="mt-1 text-sm text-slate-500">{incident.description}</p>
                </div>
                <Badge tone={incident.severity}>{incident.status}</Badge>
              </article>
            ))}
          </div>
        </Card>

        <QuickActions />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Emergency contacts preview</h2>
          <div className="mt-4 grid gap-3">
            {contacts.slice(0, 3).map((contact) => (
              <div key={contact.id} className="flex items-center justify-between rounded-2xl bg-white/70 p-4 dark:bg-slate-900/70">
                <div>
                  <strong className="text-slate-950 dark:text-white">{contact.name}</strong>
                  <p className="text-sm text-slate-500">{contact.relationship} - {contact.phone}</p>
                </div>
                <Badge tone={contact.priority === "Primary" ? "low" : "assigned"}>{contact.priority}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Notifications</h2>
          <div className="mt-4 space-y-3">
            {notifications.slice(0, 3).map((notification) => (
              <div key={notification.id} className="rounded-2xl bg-white/70 p-4 dark:bg-slate-900/70">
                <strong className="text-slate-950 dark:text-white">{notification.title}</strong>
                <p className="mt-1 text-sm text-slate-500">{notification.message}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
