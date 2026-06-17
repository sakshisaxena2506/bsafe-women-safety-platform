import { X } from "lucide-react";
import Button from "./Button";

export default function Modal({ isOpen, title, children, onClose, footer }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-white/40 bg-white p-5 shadow-glass dark:border-white/10 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">{title}</h2>
          <Button variant="ghost" className="min-h-9 px-2" onClick={onClose} aria-label="Close modal">
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div>{children}</div>
        {footer && <div className="mt-5 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
}
