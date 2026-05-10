import BookingCard from "@/components/cards/BookingCard";
import { ownerBookings } from "@/utils/mockData";

export default function ActiveServiceCard() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {ownerBookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}
