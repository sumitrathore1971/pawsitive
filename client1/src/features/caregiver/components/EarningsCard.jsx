import { Wallet } from "lucide-react";
import StatCard from "@/components/common/StatCard";

export default function EarningsCard() {
  return <StatCard icon={Wallet} label="This Week Earnings" value="Rs 8,450" tint="from-violet-500 to-indigo-400" />;
}
