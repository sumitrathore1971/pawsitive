import { motion } from "framer-motion";
import { CalendarDays, Map, Plus } from "lucide-react";
import OwnerLayout from "@/layouts/OwnerLayout";
import Button from "@/components/ui/button";
import LiveTrackingMap from "@/components/maps/LiveTrackingMap";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { fetchMyBookings, fetchMyPets } from "@/features/owner/services/ownerService";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function OwnerDashboard() {
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    Promise.all([fetchMyPets(), fetchMyBookings()])
      .then(([petsRes, bookingsRes]) => {
        setPets(petsRes.data?.pets || []);
        setBookings(bookingsRes.data?.bookings || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const activeBookings = useMemo(
    () => bookings.filter((b) => ["Incoming", "Accepted", "Arrived"].includes(b.status)),
    [bookings]
  );

  return (
    <OwnerLayout>
      {loading ? (
        <LoadingSpinner />
      ) : (
      <div className="space-y-6">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-gradient-to-r from-orange-500 to-amber-400 p-6 text-white shadow-lg"
        >
          <p className="text-sm opacity-90">Welcome back, pet parent</p>
          <h2 className="mt-1 text-3xl font-bold">{pets[0]?.name || "Your pet"} is ready for today’s care 🐶</h2>
          <p className="mt-2 text-sm opacity-90">Track caregivers live, manage bookings, and keep your pets happy.</p>
          <div className="mt-4 flex gap-3">
            <Button asChild className="bg-white text-slate-900 hover:bg-slate-100"><Link to="/owner/services"><Plus size={16} /> Book Service</Link></Button>
            <Button asChild className="bg-slate-900/20 hover:bg-slate-900/30"><Link to="/owner/bookings"><CalendarDays size={16} /> Booking History</Link></Button>
          </div>
        </motion.section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat title="Total Pets" value={pets.length} />
          <Stat title="Total Bookings" value={bookings.length} />
          <Stat title="Active Services" value={activeBookings.length} />
          <Stat title="Completed" value={bookings.filter((b) => b.status === "Completed").length} />
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Your Pets</h3>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pets.slice(0, 3).map((pet) => (
              <div key={pet._id} className="rounded-2xl border border-white/60 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/80">
                <p className="font-semibold">{pet.name}</p>
                <p className="text-sm text-slate-500">{pet.breed || pet.type} · {pet.age} years</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Active Bookings</h3>
          <div className="space-y-2">
            {activeBookings.slice(0, 3).map((booking) => (
              <div key={booking._id} className="rounded-2xl border border-white/60 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/80">
                <p className="font-semibold">{booking.serviceType}</p>
                <p className="text-sm text-slate-500">{booking.caregiverId?.name || "Caregiver pending"} · {booking.status}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="flex items-center gap-2 text-xl font-semibold text-slate-900 dark:text-white"><Map size={18} /> Live Caregiver Tracking</h3>
          <LiveTrackingMap
            markers={[
              { lat: 22.724, lng: 75.861, title: activeBookings[0]?.caregiverId?.name || "Caregiver", subtitle: activeBookings[0]?.status || "Awaiting updates" },
            ]}
          />
        </section>

        <section className="space-y-3">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Upcoming Appointments</h3>
          <div className="space-y-2">
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking._id} className="rounded-2xl border border-white/60 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/80">
                <p className="font-semibold">{booking.serviceType}</p>
                <p className="text-sm text-slate-500">{new Date(booking.scheduledAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
      )}
    </OwnerLayout>
  );
}

function Stat({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/60 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/80">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}
