import { Building2, Hospital, ShieldCheck } from "lucide-react";
import Badge from "../components/common/Badge";
import Card from "../components/common/Card";
import { safeZones } from "../data/safeZones";

const zoneIcons = {
  Hospital,
  "Police Station": ShieldCheck,
  "Safe Shelter": Building2
};

export default function SafeZonesPage() {
  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm font-bold uppercase text-brand-700 dark:text-brand-100">Safe zones</p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-950 dark:text-white">Nearby verified help locations</h1>
        <p className="mt-3 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
          Hospitals, police stations, and safe shelters can be surfaced to users during emergencies or route sharing.
        </p>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {safeZones.map((zone) => {
          const Icon = zoneIcons[zone.type] || Building2;
          return (
            <article key={zone.id} className="glass-panel rounded-2xl p-5 transition hover:-translate-y-1 hover:shadow-soft">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100">
                <Icon className="h-6 w-6" />
              </span>
              <h2 className="mt-4 text-lg font-bold text-slate-950 dark:text-white">{zone.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{zone.type}</p>
              <div className="mt-4 flex items-center justify-between gap-3">
                <Badge tone="low">{zone.status}</Badge>
                <strong className="text-sm text-slate-950 dark:text-white">{zone.distance}</strong>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{zone.address}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
