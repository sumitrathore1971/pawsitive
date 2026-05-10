import OwnerLayout from "@/layouts/OwnerLayout";
import EmptyState from "@/components/common/EmptyState";

export default function OwnerNotifications() {
  return (
    <OwnerLayout>
      <EmptyState
        title="Notifications Center"
        description="Realtime booking and caregiver updates will appear here."
      />
    </OwnerLayout>
  );
}
