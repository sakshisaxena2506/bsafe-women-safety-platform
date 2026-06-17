import Badge from "../common/Badge";
import Table from "../common/Table";

export default function ManagementTable({ title, rows, type = "users" }) {
  const columns = type === "users" ? ["Name", "Phone", "Address", "Status"] : ["Name", "Phone", "Distance", "Status"];

  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-slate-950 dark:text-white">{title}</h2>
      <Table
        columns={columns}
        rows={rows}
        renderRow={(row) => (
          <div key={row.id} className="grid gap-2 px-5 py-4 text-sm md:grid-cols-4 md:items-center">
            <div>
              <strong className="text-slate-950 dark:text-white">{row.name}</strong>
              {row.email && <p className="text-slate-500">{row.email}</p>}
            </div>
            <span className="text-slate-600 dark:text-slate-300">{row.phone}</span>
            <span className="text-slate-600 dark:text-slate-300">{row.address || row.distance}</span>
            <Badge tone={row.status?.toLowerCase() || "verified"}>{row.status || "Verified"}</Badge>
          </div>
        )}
      />
    </section>
  );
}
