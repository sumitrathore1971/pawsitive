export const cnStatus = (status) => {
  const value = String(status || "").toLowerCase();
  if (value.includes("active") || value.includes("accepted") || value.includes("progress")) {
    return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300";
  }
  if (value.includes("upcoming") || value.includes("pending")) {
    return "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300";
  }
  if (value.includes("rejected")) {
    return "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300";
  }
  return "bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-300";
};
