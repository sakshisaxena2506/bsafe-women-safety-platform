export default function Table({ columns, rows, renderRow }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80">
      <div className="hidden grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-4 bg-slate-50 px-5 py-3 text-sm font-bold text-slate-500 dark:bg-slate-800/80 md:grid" style={{ "--cols": columns.length }}>
        {columns.map((column) => (
          <span key={column}>{column}</span>
        ))}
      </div>
      <div className="divide-y divide-slate-200 dark:divide-slate-800">
        {rows.map((row) => renderRow(row))}
      </div>
    </div>
  );
}
