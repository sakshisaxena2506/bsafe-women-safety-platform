import { ShieldAlert } from "lucide-react";

export default function SOSButton({ onClick, isActive }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mx-auto grid aspect-square w-full max-w-[280px] place-items-center rounded-full border-[10px] border-roseguard-100 bg-gradient-to-br from-roseguard-500 via-roseguard-600 to-roseguard-700 text-white shadow-[0_28px_70px_rgba(226,61,87,0.35)] transition hover:-translate-y-1 hover:shadow-[0_34px_86px_rgba(226,61,87,0.44)]"
    >
      <span className="flex flex-col items-center">
        <ShieldAlert className="mb-2 h-14 w-14" />
        <strong className="text-6xl font-extrabold tracking-normal">SOS</strong>
        <small className="mt-2 text-sm font-bold">{isActive ? "Alert active" : "Press to activate"}</small>
      </span>
    </button>
  );
}
