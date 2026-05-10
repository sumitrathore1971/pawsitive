import Badge from "@/components/ui/Badge";

export default function DataTable({ columns = [], rows = [] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 dark:bg-slate-800">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-3 text-left font-semibold text-slate-600 dark:text-slate-200">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={row.id || rowIndex} className="border-t border-slate-100 dark:border-slate-800">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3 text-slate-700 dark:text-slate-300">
                  {column.key === "status" ? <Badge>{row[column.key]}</Badge> : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
