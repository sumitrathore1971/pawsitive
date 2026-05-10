import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OwnerLayout from "@/layouts/OwnerLayout";
import { fetchMyPets } from "@/features/owner/services/ownerService";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import EmptyState from "@/components/common/EmptyState";
import { Plus } from "lucide-react";

export default function MyPets() {
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    fetchMyPets()
      .then(({ data }) => setPets(data?.pets || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <OwnerLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">My Pets</h2>
          <Link to="/owner/add-pet" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm text-white">
            <Plus size={16} /> Add Pet
          </Link>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : pets.length === 0 ? (
          <EmptyState title="No pets yet" description="Create your first pet profile to start booking services." />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {pets.map((pet) => (
              <div key={pet._id} className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <div className="text-2xl">🐾</div>
                <h3 className="mt-2 text-lg font-semibold">{pet.name}</h3>
                <p className="text-sm text-slate-500">{pet.breed || pet.type} · {pet.age} years</p>
                <p className="mt-2 text-xs text-slate-500">Allergies: {pet.allergies || "None"}</p>
                <p className="mt-1 text-xs text-slate-500">Medical: {pet.specialInstructions || "Not provided"}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </OwnerLayout>
  );
}
