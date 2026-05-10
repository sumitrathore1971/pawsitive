import CaregiverLayout from "@/layouts/CaregiverLayout";
import { useEffect, useState } from "react";
import api from "@/services/api";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/bookings/mine").then(({ data }) => setJobs(data?.bookings || []));
  }, []);

  return (
    <CaregiverLayout>
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Booking Requests</h2>
        <div className="space-y-2">
          {jobs.map((job) => (
            <div key={job._id} className="rounded-2xl border border-white/60 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/80">
              <p className="font-semibold">{job.serviceType}</p>
              <p className="text-sm text-slate-500">{job.ownerId?.name} · {new Date(job.scheduledAt).toLocaleString()}</p>
              <p className="mt-1 text-xs font-semibold uppercase text-orange-500">{job.status}</p>
            </div>
          ))}
        </div>
      </div>
    </CaregiverLayout>
  );
}
