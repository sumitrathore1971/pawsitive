import PetCard from "@/components/cards/PetCard";
import { pets } from "@/utils/mockData";

export default function PetProfile() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {pets.map((pet) => (
        <PetCard key={pet.id} pet={pet} />
      ))}
    </div>
  );
}
