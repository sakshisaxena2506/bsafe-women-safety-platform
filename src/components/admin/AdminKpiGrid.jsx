import { Activity, ShieldCheck, Users, UserRoundCheck } from "lucide-react";
import StatCard from "../dashboard/StatCard";

const kpis = [
  { label: "Total users", value: "12,480", detail: "8,920 active this month", icon: Users },
  { label: "Active alerts", value: "07", detail: "2 critical incidents", icon: Activity },
  { label: "Volunteers", value: "248", detail: "81 online right now", icon: UserRoundCheck },
  { label: "Resolved incidents", value: "1,142", detail: "91% successful assistance", icon: ShieldCheck }
];

export default function AdminKpiGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <StatCard key={kpi.label} {...kpi} />
      ))}
    </div>
  );
}
