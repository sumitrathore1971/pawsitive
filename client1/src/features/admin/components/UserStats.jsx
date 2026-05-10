import DataTable from "@/components/common/DataTable";
import { adminReports } from "@/utils/mockData";

const columns = [
  { key: "id", label: "Report ID" },
  { key: "metric", label: "Metric" },
  { key: "value", label: "Value" },
  { key: "trend", label: "Trend" },
];

export default function UserStats() {
  return <DataTable columns={columns} rows={adminReports} />;
}
