const STATUS_STYLES: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-300",
  quoted: "bg-amber-500/20 text-amber-300",
  invoiced: "bg-stone-500/20 text-stone-300",
  draft: "bg-stone-500/20 text-stone-300",
  finalized: "bg-amber-500/20 text-amber-300",
  sent: "bg-cyan-500/20 text-cyan-300",
  overdue: "bg-red-500/20 text-red-300",
  paid: "bg-emerald-500/25 text-emerald-300",
  accepted: "bg-emerald-500/25 text-emerald-300",
  declined: "bg-red-500/20 text-red-300",
};

export function Pill({ status }: { status: string }) {
  const cls = STATUS_STYLES[status] || "bg-white/10 text-neutral-300";
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cls}`}>
      {status}
    </span>
  );
}

export function Toast({ message }: { message: string }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-sky-500 text-white px-5 py-3 rounded-xl shadow-lg shadow-black/40 text-sm">
      {message}
    </div>
  );
}
