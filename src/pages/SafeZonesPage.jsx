import { useMemo, useState } from "react";
import { Building2, Hospital, ShieldCheck } from "lucide-react";
import Badge from "../components/common/Badge";
import Card from "../components/common/Card";
import EmptyState from "../components/common/EmptyState";
import SafetyMap from "../components/common/SafetyMap";
import SearchBar from "../components/common/SearchBar";
import { useSafety } from "../context/SafetyContext";

const zoneIcons = {
  Hospital,
  "Police Station": ShieldCheck,
  "Safe Shelter": Building2
};

export default function SafeZonesPage() {
  const { alerts, locationStatus, safeZones } = useSafety();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(safeZones.map((zone) => zone.type || zone.category))],
    [safeZones]
  );

  const filteredZones = useMemo(
    () =>
      safeZones.filter((zone) => {
        const type = zone.type || zone.category;
        const text = `${zone.name} ${zone.address} ${type} ${zone.status}`.toLowerCase();
        const matchesQuery = text.includes(query.toLowerCase());
        const matchesCategory = category === "All" || type === category;
        return matchesQuery && matchesCategory;
      }),
    [category, query, safeZones]
  );

  return (
    <div className="space-y-6">
      <Card className="mesh-card">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-brand-700 dark:text-brand-100">Safe zones</p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-950 dark:text-white">Nearby verified help locations</h1>
            <p className="mt-3 max-w-3xl leading-7 text-slate-600 dark:text-slate-300">
              Hospitals, police stations, and safe shelters can be surfaced during emergencies or route sharing.
            </p>
          </div>
          <div className="grid w-full gap-3 sm:grid-cols-[1fr_auto] lg:max-w-xl">
            <SearchBar value={query} onChange={setQuery} placeholder="Search by name, address, or status" />
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            >
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <SafetyMap
        center={locationStatus.coordinates}
        safeZones={filteredZones}
        alerts={alerts}
        className="overflow-hidden rounded-3xl border border-white/60 shadow-glass dark:border-white/10"
      />

      {filteredZones.length === 0 ? (
        <EmptyState title="No safe zones found" message="Try another category or search phrase." />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {filteredZones.map((zone) => {
            const type = zone.type || zone.category;
            const Icon = zoneIcons[type] || Building2;
            return (
              <article key={zone.id} className="glass-panel rounded-3xl p-5 transition hover:-translate-y-1 hover:shadow-soft">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100">
                  <Icon className="h-6 w-6" />
                </span>
                <h2 className="mt-4 text-lg font-bold text-slate-950 dark:text-white">{zone.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{type}</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <Badge tone="low">{zone.status}</Badge>
                  <strong className="text-sm text-slate-950 dark:text-white">{zone.distance}</strong>
                </div>
                <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{zone.address}</p>
                <p className="mt-3 text-sm font-semibold text-brand-700 dark:text-brand-100">
                  Contact: {zone.contact || zone.contact_number || "+91 080 4567 1000"}
                </p>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
