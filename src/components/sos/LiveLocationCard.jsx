import { MapPin, Navigation } from "lucide-react";
import { useSafety } from "../../context/SafetyContext";
import Card from "../common/Card";

export default function LiveLocationCard() {
  const { locationStatus } = useSafety();

  return (
    <Card>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-brand-700 dark:text-brand-100">Live location</p>
          <h2 className="mt-1 text-xl font-bold text-slate-950 dark:text-white">Location sharing is active</h2>
        </div>
        <Navigation className="h-6 w-6 text-brand-600" />
      </div>

      <div className="relative mt-5 min-h-64 overflow-hidden rounded-2xl bg-[linear-gradient(90deg,rgba(15,159,138,0.14)_1px,transparent_1px),linear-gradient(0deg,rgba(15,159,138,0.14)_1px,transparent_1px)] bg-[length:36px_36px]">
        <span className="absolute left-[12%] top-[18%] rounded-xl bg-white px-3 py-2 text-xs font-bold shadow-soft dark:bg-slate-900">Safe shelter</span>
        <span className="absolute bottom-[18%] right-[10%] rounded-xl bg-white px-3 py-2 text-xs font-bold shadow-soft dark:bg-slate-900">Responder 0.8 km</span>
        <span className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-roseguard-600 shadow-[0_0_0_18px_rgba(226,61,87,0.16)]" />
      </div>

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
    </Card>
  );
}
