import { PawPrint } from "lucide-react";
import { NavLink } from "react-router-dom";
import { APP_NAME } from "@/utils/constants";

export default function Sidebar({ items = [], onNavigate }) {
  return (
    <aside className="w-72 border-r border-white/30 bg-white/50 p-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/60">
      <div className="mb-6 flex items-center gap-2 rounded-2xl bg-white/70 p-3 shadow-sm dark:bg-slate-900/70">
        <PawPrint className="text-orange-500" size={20} />
        <span className="font-semibold text-slate-900 dark:text-white">{APP_NAME}</span>
      </div>
      <nav className="space-y-2.5">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `block w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition ${
                isActive
                  ? "bg-gradient-to-r from-orange-500 to-amber-400 text-white shadow-md"
                  : "text-slate-700 hover:bg-white dark:text-slate-200 dark:hover:bg-slate-800"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
