import { useMemo, useState } from "react";
import Badge from "../components/common/Badge";
import Card from "../components/common/Card";
import EmptyState from "../components/common/EmptyState";
import { incidents } from "../data/incidents";

export default function IncidentHistory() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");

  const filteredIncidents = useMemo(
    () =>
      incidents.filter((incident) => {
        const matchesStatus = statusFilter === "all" || incident.status === statusFilter;
        const matchesSeverity = severityFilter === "all" || incident.severity === severityFilter;
        return matchesStatus && matchesSeverity;
      }),
    [severityFilter, statusFilter]
  );

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-brand-700 dark:text-brand-100">Incident history</p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-950 dark:text-white">Past alerts and emergency outcomes</h1>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white">
              <option value="all">All statuses</option>
              <option value="active">Active</option>
              <option value="assigned">Assigned</option>
              <option value="resolved">Resolved</option>
            </select>
            <select value={severityFilter} onChange={(event) => setSeverityFilter(event.target.value)} className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white">
              <option value="all">All severity</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </Card>

      {filteredIncidents.length === 0 ? (
        <EmptyState title="No incidents match the filters" message="Adjust the status or severity filter to view more records." />
      ) : (
        <div className="space-y-4">
          {filteredIncidents.map((incident) => (
            <article key={incident.id} className="glass-panel rounded-2xl p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-950 dark:text-white">{incident.location}</h2>
                    <Badge tone={incident.severity}>{incident.severity}</Badge>
                    <Badge tone={incident.status}>{incident.status}</Badge>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{incident.description}</p>
                </div>
                <div className="text-sm font-semibold text-slate-500 lg:text-right">
                  <span className="block">{incident.date}</span>
                  <span className="block">{incident.time}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
