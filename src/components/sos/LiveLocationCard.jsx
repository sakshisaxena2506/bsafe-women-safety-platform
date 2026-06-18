import { MapPin, Navigation } from "lucide-react";
import { useSafety } from "../../context/SafetyContext";
import Card from "../common/Card";
import SafetyMap from "../common/SafetyMap";

export default function LiveLocationCard() {
  const { alerts, locationStatus, refreshLocation, safeZones } = useSafety();

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-brand-700 dark:text-brand-100">Live location</p>
          <h2 className="mt-1 text-xl font-bold text-slate-950 dark:text-white">Location sharing is active</h2>
        </div>
        <Navigation className="h-6 w-6 text-brand-600" />
      </div>

      <SafetyMap
        center={locationStatus.coordinates}
        safeZones={safeZones}
        alerts={alerts}
        className="mt-5 overflow-hidden rounded-3xl border border-slate-200 shadow-soft dark:border-slate-800"
      />

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div>
          <span className="text-xs font-bold uppercase text-slate-400">Latitude</span>
          <strong className="block text-slate-950 dark:text-white">{locationStatus.coordinates.lat}</strong>
        </div>
        <div>
          <span className="text-xs font-bold uppercase text-slate-400">Longitude</span>
          <strong className="block text-slate-950 dark:text-white">{locationStatus.coordinates.lng}</strong>
        </div>
        <div>
          <span className="text-xs font-bold uppercase text-slate-400">Updated</span>
          <strong className="flex items-center gap-1 text-slate-950 dark:text-white">
            <MapPin className="h-4 w-4 text-brand-600" />
            {locationStatus.updatedAt}
          </strong>
        </div>
      </div>

      <button
        type="button"
        onClick={refreshLocation}
        className="mt-4 min-h-11 rounded-xl bg-slate-950 px-4 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-soft dark:bg-white dark:text-slate-950"
      >
        Refresh current location
      </button>
    </Card>
  );
}
