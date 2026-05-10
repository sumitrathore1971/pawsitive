import AdminLayout from "@/layouts/AdminLayout";
import UserStats from "@/features/admin/components/UserStats";

export default function UserManagement() {
  return (
    <AdminLayout>
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">User Management</h2>
        <UserStats />
      </div>
    </AdminLayout>
  );
}
