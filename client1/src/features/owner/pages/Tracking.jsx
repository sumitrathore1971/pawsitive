import OwnerLayout from "@/layouts/OwnerLayout";
import LiveTrackingMap from "@/components/maps/LiveTrackingMap";
import { useEffect, useMemo, useState } from "react";
import { fetchMyBookings } from "@/features/owner/services/ownerService";
import { useAuth } from "@/hooks/useAuth";
import useSocket from "@/hooks/useSocket";

export default function Tracking() {
  const { token } = useAuth();
  const socket = useSocket(token);
  const [bookings, setBookings] = useState([]);
  const [liveLocation, setLiveLocation] = useState(null);

  useEffect(() => {
    fetchMyBookings().then(({ data }) => setBookings(data?.bookings || []));
  }, []);

  useEffect(() => {
    if (!socket) return;
    const onLocation = (payload) => setLiveLocation(payload);
    socket.on("caregiverLocation", onLocation);
    return () => socket.off("caregiverLocation", onLocation);
  }, [socket]);

  const active = useMemo(
    () => bookings.find((booking) => ["Accepted", "Arrived"].includes(booking.status)),
    [bookings]
  );

  return (
    <OwnerLayout>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Live Tracking</h2>
        <div className="rounded-2xl border border-white/60 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/80">
          <p className="font-semibold">{active?.caregiverId?.name || "Waiting for caregiver assignment"}</p>
          <p className="text-sm text-slate-500">Status: {active?.status || "No active service"}</p>
          <p className="text-sm text-slate-500">ETA: {liveLocation ? "Live update available" : "Pending location update"}</p>
        </div>
        <LiveTrackingMap
          markers={[
            {
              lat: liveLocation?.lat || 22.734,
              lng: liveLocation?.lng || 75.882,
              title: active?.caregiverId?.name || "Caregiver",
              subtitle: active?.status || "In transit",
            },
          ]}
        />
      </div>
    </OwnerLayout>
  );
}
