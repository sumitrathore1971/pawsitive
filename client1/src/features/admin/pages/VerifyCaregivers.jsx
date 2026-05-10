import AdminLayout from "@/layouts/AdminLayout";
import VerificationTable from "@/features/admin/components/VerificationTable";

export default function VerifyCaregivers() {
  return (
    <AdminLayout>
      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Verify Caregivers</h2>
        <VerificationTable />
      </div>
    </AdminLayout>
  );
}
