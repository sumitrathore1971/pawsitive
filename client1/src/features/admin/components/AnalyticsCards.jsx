import { Activity, ShieldCheck, Users } from "lucide-react";
import StatCard from "@/components/common/StatCard";

export default function AnalyticsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard icon={Users} label="User Growth" value="+14%" tint="from-sky-500 to-cyan-400" />
      <StatCard icon={ShieldCheck} label="Approval Rate" value="92%" tint="from-emerald-500 to-teal-400" />
      <StatCard icon={Activity} label="Active Services" value="67" tint="from-orange-500 to-amber-400" />
    </div>
  );
}
