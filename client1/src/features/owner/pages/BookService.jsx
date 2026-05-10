import OwnerLayout from "@/layouts/OwnerLayout";
import ServiceCard from "@/components/cards/ServiceCard";

export default function BookService() {
  return (
    <OwnerLayout>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <ServiceCard title="Dog Walking" subtitle="30-60 minute guided walks" />
        <ServiceCard title="Pet Sitting" subtitle="In-home care with updates" />
        <ServiceCard title="Grooming" subtitle="At-home grooming session" />
      </div>
    </OwnerLayout>
  );
}
