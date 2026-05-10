import DashboardLayout from "@/components/common/DashboardLayout";
import { ROLE_NAV } from "@/utils/constants";

export default function CaregiverLayout({ children }) {
  return (
    <DashboardLayout
      title="Caregiver Workspace"
      subtitle="Handle jobs, earnings, and live service status."
      navItems={ROLE_NAV.caregiver}
    >
      {children}
    </DashboardLayout>
  );
}
