import { Bone, CalendarCheck2, Heart, MapPinned } from "lucide-react";
import StatCard from "@/components/common/StatCard";
import { ownerKpis } from "@/utils/mockData";

const icons = [Bone, MapPinned, CalendarCheck2, Heart];
const gradients = [
  "from-orange-500 to-amber-400",
  "from-sky-500 to-cyan-400",
  "from-emerald-500 to-lime-400",
  "from-violet-500 to-fuchsia-400",
];

export default function OwnerStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {ownerKpis.map((item, index) => (
        <StatCard
          key={item.label}
          icon={icons[index]}
          label={item.label}
          value={item.value}
          tint={gradients[index]}
        />
      ))}
    </div>
  );
}
