import OwnerLayout from "@/layouts/OwnerLayout";
import EmptyState from "@/components/common/EmptyState";

export default function OwnerSettings() {
  return (
    <OwnerLayout>
      <EmptyState
        title="Settings"
        description="Profile, address, notifications, and billing settings can be configured here."
      />
    </OwnerLayout>
  );
}
