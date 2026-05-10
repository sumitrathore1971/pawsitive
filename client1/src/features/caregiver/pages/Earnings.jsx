import CaregiverLayout from "@/layouts/CaregiverLayout";
import { useEffect, useMemo, useState } from "react";
import api from "@/services/api";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function Earnings() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/bookings/mine").then(({ data }) => setJobs(data?.bookings || []));
  }, []);

  const stats = useMemo(() => {
    const completed = jobs.filter((job) => job.status === "Completed");
    const total = completed.length * 400;
    return {
      total,
      weekly: Math.round(total * 0.35),
      monthly: total,
      jobs: completed.length,
      graph: [
        { name: "W1", amount: Math.round(total * 0.12) },
        { name: "W2", amount: Math.round(total * 0.22) },
        { name: "W3", amount: Math.round(total * 0.28) },
        { name: "W4", amount: Math.round(total * 0.38) },
      ],
    };
  }, [jobs]);

  return (
    <CaregiverLayout>
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card title="Total Earnings" value={`INR ${stats.total}`} />
          <Card title="Weekly Earnings" value={`INR ${stats.weekly}`} />
          <Card title="Monthly Earnings" value={`INR ${stats.monthly}`} />
          <Card title="Completed Jobs" value={stats.jobs} />
        </div>
        <div className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
          <h3 className="mb-4 text-lg font-semibold">Earnings Graph</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.graph}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="amount" stroke="#f97316" fill="#fdba74" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </CaregiverLayout>
  );
}

function Card({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/60 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/80">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
