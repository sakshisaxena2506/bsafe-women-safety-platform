import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function Input({ label, error, type = "text", className = "", ...props }) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword && showPassword ? "text" : type;

  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</span>
      <span className="relative block">
        <input
          type={resolvedType}
          className={`min-h-12 w-full rounded-xl border bg-white/85 px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 dark:bg-slate-900/80 dark:text-white ${
            error ? "border-roseguard-500" : "border-slate-200 dark:border-slate-700"
          } ${isPassword ? "pr-11" : ""}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </span>
      {error && <span className="mt-2 block text-sm text-roseguard-600">{error}</span>}
    </label>
  );
}
