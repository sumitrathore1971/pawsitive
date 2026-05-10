import DataTable from "@/components/common/DataTable";
import { ownerBookings } from "@/utils/mockData";

const columns = [
  { key: "id", label: "Booking ID" },
  { key: "service", label: "Service" },
  { key: "caregiver", label: "Caregiver" },
  { key: "date", label: "Schedule" },
  { key: "status", label: "Status" },
];

export default function BookingTable() {
  return <DataTable columns={columns} rows={ownerBookings} />;
}
