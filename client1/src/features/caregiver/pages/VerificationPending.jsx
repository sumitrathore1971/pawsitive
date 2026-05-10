import { ShieldCheck } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function VerificationPending() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 p-6 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
      <div className="mx-auto mt-16 max-w-3xl rounded-3xl border border-white/60 bg-white/80 p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 text-white">
          <ShieldCheck />
        </div>
        <h1 className="mt-4 text-2xl font-bold">Your account is under verification</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">
          Admin will review your documents. Verification may take some time.
        </p>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Info title="Step 1" value="Documents uploaded" />
          <Info title="Step 2" value="Admin review in progress" />
          <Info title="Step 3" value="Dashboard access after approval" />
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm dark:bg-slate-800">
          <p className="font-semibold">Uploaded docs</p>
          <p className="mt-1 text-slate-600 dark:text-slate-300">{user?.idProof || "ID proof submitted during signup"}</p>
          <p className="mt-3 text-slate-500">Need help? Contact support at support@pawsitive.app</p>
        </div>
      </div>
    </div>
  );
}

function Info({ title, value }) {
  return (
    <div className="rounded-2xl border border-white/50 bg-white/80 p-4 dark:border-slate-800 dark:bg-slate-900/80">
      <p className="text-xs font-semibold uppercase text-slate-500">{title}</p>
      <p className="mt-2 text-sm">{value}</p>
    </div>
  );
}
