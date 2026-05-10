import { motion } from "framer-motion";

export default function StatCard({ icon: Icon, label, value, tint = "from-orange-500 to-amber-400" }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-white/50 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-700 dark:bg-slate-900/80"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-300">{label}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
        </div>
        <div className={`rounded-xl bg-gradient-to-br ${tint} p-3 text-white`}>
          <Icon size={20} />
        </div>
      </div>
    </motion.div>
  );
}
