import DashboardLayout from "@/components/common/DashboardLayout";
import { ROLE_NAV } from "@/utils/constants";

export default function OwnerLayout({ children }) {
  return (
    <DashboardLayout
      title="Owner Dashboard"
      subtitle="Manage pets, bookings, and live care updates."
      navItems={ROLE_NAV.owner}
    >
      {children}
    </DashboardLayout>
  );
}
