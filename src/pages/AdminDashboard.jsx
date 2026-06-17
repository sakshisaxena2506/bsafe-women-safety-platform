import AdminKpiGrid from "../components/admin/AdminKpiGrid";
import ManagementTable from "../components/admin/ManagementTable";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import { incidents } from "../data/incidents";
import { users } from "../data/users";
import { volunteers } from "../data/volunteers";

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm font-bold uppercase text-brand-700 dark:text-brand-100">Admin dashboard</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950 dark:text-white">City safety operations</h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
          Monitor emergency load, verify responders, review incidents, and track safety platform performance.
        </p>
      </Card>

      <AdminKpiGrid />

      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <Card>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Analytics placeholder</h2>
          <div className="mt-5 flex min-h-72 items-end gap-3 rounded-2xl bg-white/70 p-5 dark:bg-slate-900/70">
            {[42, 68, 55, 78, 64, 88, 73].map((height, index) => (
              <span
                key={height + index}
                className="flex-1 rounded-t-xl bg-gradient-to-t from-brand-700 to-brand-400"
                style={{ height: `${height}%` }}
                aria-label={`Chart bar ${index + 1}`}
              />
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Recent incidents</h2>
          <div className="mt-4 space-y-3">
            {incidents.slice(0, 4).map((incident) => (
              <div key={incident.id} className="rounded-2xl bg-white/70 p-4 dark:bg-slate-900/70">
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-slate-950 dark:text-white">{incident.location}</strong>
                  <Badge tone={incident.severity}>{incident.severity}</Badge>
                </div>
                <p className="mt-1 text-sm text-slate-500">{incident.date} at {incident.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <ManagementTable title="User management" rows={users} type="users" />
        </Card>
        <Card>
          <ManagementTable title="Volunteer management" rows={volunteers} type="volunteers" />
        </Card>
      </div>
    </div>
  );
}
