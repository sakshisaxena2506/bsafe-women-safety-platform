import { classNames } from "../../utils/formatters";
import { severityStyles, statusStyles } from "../../utils/constants";

export default function Badge({ children, tone = "brand", className = "" }) {
  const toneClass =
    severityStyles[tone] ||
    statusStyles[tone] ||
    "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200";

  return (
    <span className={classNames("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold", toneClass, className)}>
      {children}
    </span>
  );
}
