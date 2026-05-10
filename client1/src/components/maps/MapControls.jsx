export default function MapControls({ onRefresh }) {
  return (
    <div className="absolute right-3 top-3 z-10">
      <button
        onClick={onRefresh}
        className="rounded-lg bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow dark:bg-slate-900/90 dark:text-slate-100"
      >
        Refresh
      </button>
    </div>
  );
}
