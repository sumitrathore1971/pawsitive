import DashboardLayout from "@/components/common/DashboardLayout";
import { ROLE_NAV } from "@/utils/constants";

export default function AdminLayout({ children }) {
  return (
    <DashboardLayout
      title="Admin Control Center"
      subtitle="Track platform health, approvals, and user growth."
      navItems={ROLE_NAV.admin}
    >
      {children}
    </DashboardLayout>
  );
}
