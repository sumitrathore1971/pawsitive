export default function Input(props) {
  return (
    <input
      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 outline-none ring-orange-400 transition focus:ring dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
      {...props}
    />
  );
}
