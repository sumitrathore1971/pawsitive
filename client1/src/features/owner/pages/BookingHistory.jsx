import { useEffect, useMemo, useState } from "react";
import OwnerLayout from "@/layouts/OwnerLayout";
import { fetchMyBookings } from "@/features/owner/services/ownerService";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import EmptyState from "@/components/common/EmptyState";

export default function BookingHistory() {
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchMyBookings()
      .then(({ data }) => setBookings(data?.bookings || []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () =>
      bookings.filter((booking) => {
        const matchQuery = `${booking.serviceType} ${booking.caregiverId?.name || ""}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchFilter = filter === "All" || booking.status === filter;
        return matchQuery && matchFilter;
      }),
    [bookings, query, filter]
  );

  return (
    <OwnerLayout>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search service or caregiver" className="w-full rounded-xl border bg-white px-3 py-2.5 md:w-72 dark:bg-slate-800" />
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border bg-white px-3 py-2.5 dark:bg-slate-800">
            {["All", "Incoming", "Accepted", "Rejected", "Arrived", "Completed"].map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : filtered.length === 0 ? (
          <EmptyState title="No bookings found" description="Try adjusting filters or create a new booking from Services." />
        ) : (
          <div className="space-y-3">
            {filtered.map((booking) => (
              <div key={booking._id} className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-semibold">{booking.serviceType}</p>
                    <p className="text-sm text-slate-500">{new Date(booking.scheduledAt).toLocaleString()}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold dark:bg-slate-800">{booking.status}</span>
                </div>
                <p className="mt-2 text-sm text-slate-500">Caregiver: {booking.caregiverId?.name || "Pending assignment"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </OwnerLayout>
  );
}
