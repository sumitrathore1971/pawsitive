import OwnerLayout from "@/layouts/OwnerLayout";
import Button from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPet } from "@/features/owner/services/ownerService";
import { PawPrint } from "lucide-react";

export default function AddPet() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    type: "Dog",
    breed: "",
    age: "",
    gender: "",
    allergies: "",
    medicalConditions: "",
    specialInstructions: "",
    photoUrl: "",
  });

  const updateField = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await createPet({
        name: form.name,
        type: form.type,
        breed: form.breed,
        age: Number(form.age),
        allergies: `${form.allergies}${form.medicalConditions ? ` | Medical: ${form.medicalConditions}` : ""}`,
        specialInstructions: form.specialInstructions,
      });
      navigate("/owner/dashboard", { replace: true });
    } catch (err) {
      setError(err?.response?.data?.message || "Could not save pet profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <OwnerLayout>
      <div className="mx-auto grid max-w-4xl gap-5 lg:grid-cols-[1fr_320px]">
        <form onSubmit={handleSubmit} className="rounded-3xl border border-white/60 bg-white/75 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/75">
          <p className="text-sm font-medium text-orange-500">Step 1 of 1 - Pet Onboarding</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">Create your pet profile</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">Add pet details before accessing your dashboard.</p>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <input className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-700 dark:bg-slate-800" placeholder="Pet Name" value={form.name} onChange={(e) => updateField("name", e.target.value)} required />
            <input className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-700 dark:bg-slate-800" placeholder="Pet Type (Dog/Cat)" value={form.type} onChange={(e) => updateField("type", e.target.value)} />
            <input className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-700 dark:bg-slate-800" placeholder="Breed" value={form.breed} onChange={(e) => updateField("breed", e.target.value)} />
            <input type="number" min="0" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-700 dark:bg-slate-800" placeholder="Age" value={form.age} onChange={(e) => updateField("age", e.target.value)} required />
            <input className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-700 dark:bg-slate-800" placeholder="Gender" value={form.gender} onChange={(e) => updateField("gender", e.target.value)} />
            <input className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-700 dark:bg-slate-800" placeholder="Pet Photo URL (optional)" value={form.photoUrl} onChange={(e) => updateField("photoUrl", e.target.value)} />
          </div>
          <textarea className="mt-4 min-h-20 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-700 dark:bg-slate-800" placeholder="Allergies" value={form.allergies} onChange={(e) => updateField("allergies", e.target.value)} />
          <textarea className="mt-4 min-h-20 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-700 dark:bg-slate-800" placeholder="Medical Conditions" value={form.medicalConditions} onChange={(e) => updateField("medicalConditions", e.target.value)} />
          <textarea className="mt-4 min-h-24 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 dark:border-slate-700 dark:bg-slate-800" placeholder="Special Instructions" value={form.specialInstructions} onChange={(e) => updateField("specialInstructions", e.target.value)} />

          {error && <p className="mt-3 text-sm text-rose-600">{error}</p>}
          <Button type="submit" disabled={loading} className="mt-5 h-11 rounded-xl px-6">
            {loading ? "Saving profile..." : "Save Pet and Continue"}
          </Button>
        </form>

        <div className="rounded-3xl border border-white/60 bg-white/75 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/75">
          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white">
            <PawPrint />
          </div>
          <h3 className="mt-3 text-lg font-semibold">Preview Card</h3>
          <div className="mt-3 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800">
            <p className="font-semibold">{form.name || "Your Pet"}</p>
            <p className="text-sm text-slate-500">{form.breed || "Breed"} - {form.age || "Age"} yrs</p>
            <p className="mt-2 text-xs text-slate-500">Keep details editable from My Pets later.</p>
          </div>
        </div>
      </div>
    </OwnerLayout>
  );
}
