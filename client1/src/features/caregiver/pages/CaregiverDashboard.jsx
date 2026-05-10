import { CheckCircle2, PlayCircle, ThumbsUp } from "lucide-react";
import CaregiverLayout from "@/layouts/CaregiverLayout";
import Button from "@/components/ui/button";
import EarningsCard from "@/features/caregiver/components/EarningsCard";
import LiveLocationStatus from "@/features/caregiver/components/LiveLocationStatus";
import LiveTrackingMap from "@/components/maps/LiveTrackingMap";
import { useEffect, useMemo, useState } from "react";
import api from "@/services/api";
import { useAuth } from "@/hooks/useAuth";
import useSocket from "@/hooks/useSocket";

export default function CaregiverDashboard() {
  const { token } = useAuth();
  const socket = useSocket(token);
  const [bookings, setBookings] = useState([]);

  const refresh = () => api.get("/bookings/mine").then(({ data }) => setBookings(data?.bookings || []));

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (!socket) return;
    const realtimeRefresh = () => refresh();
    socket.on("BookingConfirmed", realtimeRefresh);
    return () => socket.off("BookingConfirmed", realtimeRefresh);
  }, [socket]);

  const incoming = useMemo(() => bookings.filter((b) => b.status === "Incoming"), [bookings]);
  const active = useMemo(() => bookings.filter((b) => ["Accepted", "Arrived"].includes(b.status)), [bookings]);

  const updateStatus = async (bookingId, action) => {
    await api.post(`/bookings/${bookingId}/${action}`);
    await refresh();
  };

  return (
    <CaregiverLayout>
      <div className="space-y-6">
        <section className="grid gap-4 lg:grid-cols-3">
          <EarningsCard />
          <LiveLocationStatus />
          <div className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
            <p className="text-sm text-slate-500">Active Services</p>
            <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{active.length}</p>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
          <h3 className="mb-3 text-lg font-semibold text-slate-900 dark:text-white">Booking Requests</h3>
          <div className="space-y-3">
            {incoming.slice(0, 3).map((booking) => (
              <div key={booking._id} className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                <div>
                  <p className="font-semibold">{booking.serviceType}</p>
                  <p className="text-xs text-slate-500">{booking.ownerId?.name} · {new Date(booking.scheduledAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <Button className="bg-emerald-600 hover:bg-emerald-500" onClick={() => updateStatus(booking._id, "accept")}><ThumbsUp size={15} /> Accept</Button>
                  <Button className="bg-rose-600 hover:bg-rose-500" onClick={() => updateStatus(booking._id, "reject")}>Reject</Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Active Route</h3>
          <LiveTrackingMap markers={[{ lat: 22.726, lng: 75.871, title: active[0]?.ownerId?.name || "Current route", subtitle: active[0]?.status || "No active jobs" }]} />
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
          <h3 className="mb-3 text-lg font-semibold">Service Actions</h3>
          <div className="flex flex-wrap gap-2">
            {active[0] && (
              <>
                <Button className="bg-sky-600 hover:bg-sky-500" onClick={() => updateStatus(active[0]._id, "arrived")}><PlayCircle size={15} /> Mark Arrived</Button>
                <Button className="bg-violet-600 hover:bg-violet-500" onClick={() => updateStatus(active[0]._id, "complete")}><CheckCircle2 size={15} /> Complete</Button>
              </>
            )}
          </div>
        </section>
      </div>
    </CaregiverLayout>
  );
}
