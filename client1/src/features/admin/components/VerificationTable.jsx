import { useEffect, useState } from "react";
import api from "@/services/api";

export default function VerificationTable() {
  const [rows, setRows] = useState([]);

  const load = () => api.get("/admin/caregivers").then(({ data }) => setRows(data?.caregivers || []));

  useEffect(() => {
    load();
  }, []);

  const update = async (id, action) => {
    await api.post(`/admin/caregivers/${id}/${action}`);
    await load();
  };

  return (
    <div className="space-y-3">
      {rows.map((row) => (
        <div key={row._id} className="rounded-2xl border border-white/60 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="font-semibold">{row.name}</p>
              <p className="text-sm text-slate-500">{row.experience} · {row.address}</p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${row.isVerified ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
              {row.isVerified ? "Verified" : "Pending"}
            </span>
          </div>
          <div className="mt-3 flex gap-2">
            <button onClick={() => update(row._id, "approve")} className="rounded-lg bg-emerald-600 px-3 py-2 text-sm text-white">Approve</button>
            <button onClick={() => update(row._id, "reject")} className="rounded-lg bg-rose-600 px-3 py-2 text-sm text-white">Reject</button>
          </div>
        </div>
      ))}
    </div>
  );
}
