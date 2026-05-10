import { useEffect, useMemo, useState } from "react";
import OwnerLayout from "@/layouts/OwnerLayout";
import { createBooking, fetchMyPets, fetchVerifiedCaregivers } from "@/features/owner/services/ownerService";
import { Star } from "lucide-react";

const SERVICES = [
  { id: "Dog Walking", title: "Dog Walking", description: "Guided neighborhood walks for healthy routines.", duration: "45 mins", price: 399, rating: 4.9, image: "🐕" },
  { id: "Pet Sitting", title: "Pet Sitting", description: "In-home pet care with play and feeding.", duration: "2 hrs", price: 699, rating: 4.8, image: "🏡" },
  { id: "Feeding Service", title: "Feeding Service", description: "Timely food and hydration visits.", duration: "30 mins", price: 299, rating: 4.7, image: "🥣" },
  { id: "Grooming", title: "Grooming", description: "Coat care and hygiene session.", duration: "1 hr", price: 899, rating: 4.9, image: "✂️" },
  { id: "Playtime Session", title: "Playtime Session", description: "Engaging play for active pets.", duration: "45 mins", price: 349, rating: 4.8, image: "🎾" },
  { id: "Vet Visit Assistance", title: "Vet Visit Assistance", description: "Companion support for clinic visits.", duration: "2 hrs", price: 1099, rating: 4.6, image: "🩺" },
];

export default function Services() {
  const [selected, setSelected] = useState(null);
  const [pets, setPets] = useState([]);
  const [caregivers, setCaregivers] = useState([]);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [form, setForm] = useState({ petId: "", scheduledAt: "", caregiverId: "", address: "", paymentMethod: "Card" });

  useEffect(() => {
    fetchMyPets().then(({ data }) => setPets(data?.pets || []));
    fetchVerifiedCaregivers().then(({ data }) => setCaregivers(data?.caregivers || []));
  }, []);

  const summary = useMemo(() => {
    const pet = pets.find((p) => p._id === form.petId);
    const caregiver = caregivers.find((c) => c._id === form.caregiverId);
    return { pet, caregiver };
  }, [pets, caregivers, form.petId, form.caregiverId]);

  const submitBooking = async () => {
    if (!selected) return;
    setSubmitting(true);
    try {
      await createBooking({
        caregiverId: form.caregiverId,
        serviceType: selected.id,
        scheduledAt: form.scheduledAt,
      });
      setBookingComplete(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <OwnerLayout>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {SERVICES.map((service) => (
          <button key={service.id} onClick={() => { setSelected(service); setStep(1); setBookingComplete(false); }} className="rounded-2xl border border-white/60 bg-white/80 p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/80">
            <p className="text-3xl">{service.image}</p>
            <h3 className="mt-2 text-lg font-semibold">{service.title}</h3>
            <p className="text-sm text-slate-500">{service.description}</p>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span>{service.duration}</span>
              <span className="font-semibold">INR {service.price}</span>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-white/40 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold">{selected.title}</h3>
                <p className="text-sm text-slate-500">{selected.description}</p>
                <p className="mt-2 inline-flex items-center gap-1 text-sm"><Star size={14} className="text-amber-500" /> {selected.rating} · {selected.duration}</p>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-lg border px-3 py-1 text-sm">Close</button>
            </div>

            {!bookingComplete ? (
              <div className="mt-4 space-y-4">
                <p className="text-xs font-semibold uppercase text-slate-500">Step {step} of 5</p>
                {step === 1 && (
                  <select className="w-full rounded-xl border bg-white px-3 py-2.5 dark:bg-slate-800" value={form.petId} onChange={(e) => setForm((p) => ({ ...p, petId: e.target.value }))}>
                    <option value="">Select pet</option>
                    {pets.map((pet) => <option key={pet._id} value={pet._id}>{pet.name}</option>)}
                  </select>
                )}
                {step === 2 && <input type="datetime-local" className="w-full rounded-xl border bg-white px-3 py-2.5 dark:bg-slate-800" value={form.scheduledAt} onChange={(e) => setForm((p) => ({ ...p, scheduledAt: e.target.value }))} />}
                {step === 3 && (
                  <select className="w-full rounded-xl border bg-white px-3 py-2.5 dark:bg-slate-800" value={form.caregiverId} onChange={(e) => setForm((p) => ({ ...p, caregiverId: e.target.value }))}>
                    <option value="">Select caregiver</option>
                    {caregivers.map((caregiver) => <option key={caregiver._id} value={caregiver._id}>{caregiver.name}</option>)}
                  </select>
                )}
                {step === 4 && <input placeholder="Service address" className="w-full rounded-xl border bg-white px-3 py-2.5 dark:bg-slate-800" value={form.address} onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))} />}
                {step === 5 && (
                  <div className="space-y-3">
                    <div className="rounded-xl bg-slate-50 p-3 text-sm dark:bg-slate-800">
                      <p>Service: {selected.title}</p>
                      <p>Pet: {summary.pet?.name || "-"}</p>
                      <p>Caregiver: {summary.caregiver?.name || "-"}</p>
                      <p className="font-semibold">Total: INR {selected.price}</p>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-3">
                      {["Card", "UPI", "Wallet"].map((method) => (
                        <button key={method} onClick={() => setForm((p) => ({ ...p, paymentMethod: method }))} className={`rounded-xl border px-3 py-2 text-sm ${form.paymentMethod === method ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20" : ""}`}>{method}</button>
                      ))}
                    </div>
                    <button disabled={submitting} onClick={submitBooking} className="w-full rounded-xl bg-primary px-4 py-2.5 text-white">
                      {submitting ? "Processing payment..." : "Pay & Confirm Booking"}
                    </button>
                  </div>
                )}

                <div className="flex justify-end gap-2">
                  <button disabled={step === 1} onClick={() => setStep((s) => s - 1)} className="rounded-xl border px-4 py-2 text-sm">Back</button>
                  <button disabled={step === 5} onClick={() => setStep((s) => s + 1)} className="rounded-xl bg-primary px-4 py-2 text-sm text-white">Continue</button>
                </div>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-300">
                Booking confirmed. You can now track your caregiver from Live Tracking.
              </div>
            )}
          </div>
        </div>
      )}
    </OwnerLayout>
  );
}
