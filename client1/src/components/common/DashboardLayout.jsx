import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import { useState } from "react";

export default function DashboardLayout({ title, subtitle, navItems, children }) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="flex">
        <div className="sticky top-0 hidden h-screen lg:block">
          <Sidebar items={navItems} />
        </div>
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute inset-0 bg-black/40"
            />
            <div className="relative z-50 h-full w-72">
              <Sidebar
                items={navItems}
                onNavigate={() => setIsMobileSidebarOpen(false)}
              />
            </div>
          </div>
        )}
        <div className="flex-1">
          <Navbar
            title={title}
            subtitle={subtitle}
            onToggleSidebar={() => setIsMobileSidebarOpen(true)}
          />
          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
