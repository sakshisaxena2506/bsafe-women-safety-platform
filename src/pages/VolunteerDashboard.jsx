import { CheckCircle2, Clock, LifeBuoy, Route } from "lucide-react";
import toast from "react-hot-toast";
import Card from "../components/common/Card";
import RequestCard from "../components/volunteer/RequestCard";
import StatCard from "../components/dashboard/StatCard";
import { useSafety } from "../context/SafetyContext";
import { nearbyRequests, volunteers } from "../data/volunteers";

export default function VolunteerDashboard() {
  const { alerts, updateResponderStatus } = useSafety();
  const completedCases = volunteers.reduce((total, volunteer) => total + volunteer.completedCases, 0);
  const activeAlertRequests = alerts
    .filter((alert) => alert.status === "active" || alert.status === "pending")
    .map((alert) => ({
      id: alert.id,
      title: `${alert.severity} SOS near ${alert.location}`,
      distance: "Live route",
      severity: alert.severity,
      eta: "5 min"
    }));
  const requests = [...activeAlertRequests, ...nearbyRequests];

  function handleStatusChange(id, status) {
    if (id.startsWith("REQ-")) {
      toast.success(`Nearby request marked as ${status}.`);
      return;
    }

    updateResponderStatus(id, status);
  }

  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm font-bold uppercase text-brand-700 dark:text-brand-100">Volunteer dashboard</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950 dark:text-white">Responder workspace</h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
          Volunteers can review nearby emergency requests, accept assignments, and update response progress.
        </p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active alerts" value="02" detail="Within 2.5 km" icon={LifeBuoy} />
        <StatCard label="Assigned cases" value="04" detail="Today" icon={Route} />
        <StatCard label="Completed cases" value={completedCases} detail="All-time network" icon={CheckCircle2} />
        <StatCard label="Avg arrival" value="06:20" detail="Volunteer response" icon={Clock} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <Card>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Nearby requests</h2>
          <div className="mt-4 grid gap-3">
            {requests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onAccept={(id) => handleStatusChange(id, "accepted")}
                onDecline={(id) => handleStatusChange(id, "pending")}
                onComplete={(id) => handleStatusChange(id, "completed")}
              />
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">Responder statistics</h2>
          <div className="mt-4 space-y-3">
            {volunteers.map((volunteer) => (
              <div key={volunteer.id} className="rounded-2xl bg-white/70 p-4 dark:bg-slate-900/70">
                <div className="flex items-center justify-between gap-3">
                  <strong className="text-slate-950 dark:text-white">{volunteer.name}</strong>
                  <span className="text-sm font-bold text-brand-700 dark:text-brand-100">{volunteer.responseRate}</span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{volunteer.completedCases} completed cases</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
