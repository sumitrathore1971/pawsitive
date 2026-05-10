import { motion } from "framer-motion";

export default function PetCard({ pet }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="rounded-2xl bg-white p-4 shadow-sm dark:bg-slate-900">
      <div className="text-2xl">🐾</div>
      <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{pet.name}</h3>
      <p className="text-sm text-slate-600 dark:text-slate-300">{pet.type} · {pet.age}</p>
      <p className="mt-2 text-xs text-orange-500">Mood: {pet.mood}</p>
    </motion.div>
  );
}
