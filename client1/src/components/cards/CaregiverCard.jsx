export default function CaregiverCard({ name, services, rating }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
      <h4 className="font-semibold text-slate-900 dark:text-white">{name}</h4>
      <p className="text-sm text-slate-600 dark:text-slate-300">{services}</p>
      <p className="mt-2 text-xs text-amber-500">Rating: {rating}</p>
    </div>
  );
}
