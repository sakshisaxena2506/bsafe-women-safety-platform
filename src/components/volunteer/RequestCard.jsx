import { Clock, MapPin } from "lucide-react";
import Badge from "../common/Badge";
import Button from "../common/Button";

export default function RequestCard({ request, onAccept, onDecline, onComplete }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-bold text-slate-950 dark:text-white">{request.title}</h3>
          <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {request.distance}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              ETA {request.eta}
            </span>
          </div>
        </div>
        <Badge tone={request.severity}>{request.severity}</Badge>
      </div>
      <div className="mt-4 flex gap-2">
        <Button className="flex-1" onClick={() => onAccept?.(request.id)}>Accept</Button>
        <Button variant="secondary" className="flex-1" onClick={() => onDecline?.(request.id)}>Decline</Button>
        {onComplete && (
          <Button variant="ghost" className="flex-1" onClick={() => onComplete(request.id)}>
            Complete
          </Button>
        )}
      </div>
    </article>
  );
}
