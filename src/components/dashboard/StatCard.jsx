import Card from "../common/Card";

export default function StatCard({ label, value, detail, icon: Icon }) {
  return (
    <Card className="transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{label}</p>
          <strong className="mt-2 block text-3xl font-extrabold text-slate-950 dark:text-white">{value}</strong>
          <span className="mt-1 block text-sm text-slate-500 dark:text-slate-400">{detail}</span>
        </div>
        {Icon && (
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand-100 text-brand-700 dark:bg-brand-500/15 dark:text-brand-100">
            <Icon className="h-5 w-5" />
          </span>
        )}
      </div>
    </Card>
  );
}
