import Badge from "@/components/ui/Badge";

export default function BookingCard({ booking }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
      <p className="text-sm text-slate-500">{booking.id}</p>
      <h4 className="mt-1 font-semibold text-slate-900 dark:text-white">{booking.service}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-300">{booking.caregiver}</p>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-slate-500">{booking.date}</span>
        <Badge>{booking.status}</Badge>
      </div>
    </div>
  );
}
