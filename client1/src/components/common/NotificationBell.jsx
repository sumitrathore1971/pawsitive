import { Bell } from "lucide-react";

export default function NotificationBell({ count = 0 }) {
  return (
    <button className="relative rounded-full border border-white/20 bg-white/60 p-2 text-slate-700 transition hover:bg-white dark:bg-slate-800/80 dark:text-slate-100">
      <Bell size={18} />
      {count > 0 && (
        <span className="absolute -right-1 -top-1 rounded-full bg-rose-500 px-1.5 text-[10px] font-semibold text-white">
          {count}
        </span>
      )}
    </button>
  );
}
