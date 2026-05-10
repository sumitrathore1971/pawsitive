import NotificationBell from "@/components/common/NotificationBell";
import { LogOut, Menu, Settings, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Navbar({ title, subtitle, onToggleSidebar }) {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="sticky top-0 z-10 border-b border-white/50 bg-white/70 px-6 py-4 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/70">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="inline-flex rounded-xl border border-slate-200 p-2 text-slate-700 lg:hidden dark:border-slate-700 dark:text-slate-200"
          >
            <Menu size={18} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">{title}</h1>
            <p className="text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <NotificationBell count={3} />
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-xs font-semibold text-white">
                {user?.name?.slice(0, 1)?.toUpperCase() || "U"}
              </div>
              <span className="hidden sm:block">{user?.name || "Profile"}</span>
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
                  <User size={16} /> Profile
                </button>
                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800">
                  <Settings size={16} /> Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
