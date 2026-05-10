import { cnStatus } from "@/utils/helpers";

export default function Badge({ children }) {
  return <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${cnStatus(children)}`}>{children}</span>;
}
