import { Loader2 } from "lucide-react";
import { classNames } from "../../utils/formatters";

const variants = {
  primary: "bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-500",
  danger: "bg-roseguard-600 text-white hover:bg-roseguard-700 focus:ring-roseguard-500",
  secondary:
    "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800",
  ghost: "text-slate-700 hover:bg-slate-100 focus:ring-brand-500 dark:text-slate-200 dark:hover:bg-slate-800"
};

export default function Button({
  children,
  variant = "primary",
  isLoading = false,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={classNames(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-slate-950",
        variants[variant],
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
}
