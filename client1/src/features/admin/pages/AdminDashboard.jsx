import AdminLayout from "@/layouts/AdminLayout";
import AnalyticsCards from "@/features/admin/components/AnalyticsCards";
import VerificationTable from "@/features/admin/components/VerificationTable";
import UserStats from "@/features/admin/components/UserStats";
import LiveTrackingMap from "@/components/maps/LiveTrackingMap";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <AnalyticsCards />
        <section className="space-y-3">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Active Services Map</h3>
          <LiveTrackingMap
            markers={[
              { lat: 22.742, lng: 75.881, title: "Service #SRV-11", subtitle: "In progress" },
              { lat: 22.713, lng: 75.852, title: "Service #SRV-12", subtitle: "Assigned" },
            ]}
          />
        </section>
        <VerificationTable />
        <UserStats />
      </div>
    </AdminLayout>
  );
}
