import { Edit3, Phone, Trash2 } from "lucide-react";
import { getInitials } from "../../utils/formatters";
import Badge from "../common/Badge";
import Button from "../common/Button";

export default function ContactCard({ contact, onEdit, onDelete }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white/80 p-4 transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-roseguard-500 to-brand-500 font-bold text-white">
            {getInitials(contact.name)}
          </span>
          <div>
            <h3 className="font-bold text-slate-950 dark:text-white">{contact.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">{contact.relationship}</p>
          </div>
        </div>
        <Badge tone={contact.priority === "Primary" ? "low" : "assigned"}>{contact.priority}</Badge>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
        <Phone className="h-4 w-4 text-brand-600" />
        {contact.phone}
      </div>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{contact.email}</p>

      <div className="mt-4 flex gap-2">
        <Button variant="secondary" className="flex-1" onClick={() => onEdit(contact)}>
          <Edit3 className="h-4 w-4" />
          Edit
        </Button>
        <Button variant="ghost" className="px-3 text-roseguard-600" onClick={() => onDelete(contact.id)} aria-label={`Delete ${contact.name}`}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </article>
  );
}
