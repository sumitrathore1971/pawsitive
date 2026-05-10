import DataTable from "@/components/common/DataTable";
import { caregiverJobs } from "@/utils/mockData";

const columns = [
  { key: "id", label: "Job ID" },
  { key: "owner", label: "Pet Owner" },
  { key: "service", label: "Service" },
  { key: "slot", label: "Slot" },
  { key: "status", label: "Status" },
];

export default function JobTable() {
  return <DataTable columns={columns} rows={caregiverJobs} />;
}
