import { CheckCircle2, MapPin } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useSafety } from "../../context/SafetyContext";
import Card from "../common/Card";

export default function SafetyStatusCard() {
  const { user } = useAuth();
  const { locationStatus } = useSafety();

  return (
    <Card>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-brand-700 dark:text-brand-100">Welcome back</p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-950 dark:text-white">Hi, {user?.name}</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Your safety profile is active and location sharing is ready for emergency use.
          </p>
        </div>
        <div className="rounded-2xl bg-brand-50 p-4 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100">
          <CheckCircle2 className="h-7 w-7" />
          <strong className="mt-2 block">Status: {user?.safetyStatus}</strong>
          <span className="mt-1 flex items-center gap-1 text-sm">
            <MapPin className="h-4 w-4" />
            {locationStatus.coordinates.lat}, {locationStatus.coordinates.lng}
          </span>
        </div>
      </div>
    </Card>
  );
}
