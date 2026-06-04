import { useCallback, useEffect, useState } from "react";
import { api, money, fmtDate, type Doc, type DocKind } from "./api";
import { Pill } from "./ui";

const STATUS_OPTIONS: Record<DocKind, string[]> = {
  invoice: ["draft", "finalized", "sent", "paid"],
  quote: ["draft", "sent", "accepted", "declined"],
};

export function DocsPanel({
  kind,
  reloadKey,
  notify,
  openDoc,
}: {
  kind: DocKind;
  reloadKey: number;
  notify: (m: string) => void;
  openDoc: (doc: Doc) => void;
}) {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const path = kind === "quote" ? "/quotes" : "/invoices";
  const label = kind === "quote" ? "Quotes" : "Invoices";

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const q = status ? `?status=${status}` : "";
      setDocs(await api.get(path + q));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [status, path]);

  useEffect(() => {
    load();
  }, [load, reloadKey]);

  return (
    <div>
      <div className="flex items-center gap-3 flex-wrap">
        <h2 className="text-xl font-bold text-white">{label}</h2>
        <div className="flex-1" />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 rounded-lg bg-neutral-950 border border-white/10 text-sm text-white"
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS[kind].map((s) => (
            <option key={s} value={s}>
              {s[0].toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
        <button
          onClick={load}
          className="px-3 py-2 rounded-lg border border-white/10 text-sm text-neutral-200 hover:bg-white/5"
        >
          Refresh
        </button>
      </div>

      <div className="mt-4 bg-neutral-900 border border-white/10 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-neutral-400">Loading…</div>
        ) : error ? (
          <div className="p-10 text-center text-amber-300">{error}</div>
        ) : docs.length === 0 ? (
          <div className="p-10 text-center text-neutral-400">
            No {label.toLowerCase()} yet. Create one from a lead.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-neutral-400 text-xs uppercase tracking-wide">
                <th className="px-4 py-3">{kind === "quote" ? "Quote" : "Invoice"}</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Issued</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {docs.map((d) => (
                <tr key={d.id} className="border-t border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 font-semibold text-white">{d.number}</td>
                  <td className="px-4 py-3 text-neutral-300">
                    {d.customer?.name || "—"}
                    <div className="text-neutral-500">{d.customer?.email}</div>
                  </td>
                  <td className="px-4 py-3 text-neutral-200">{money(d.total)}</td>
                  <td className="px-4 py-3">
                    <Pill status={d.status} />
                  </td>
                  <td className="px-4 py-3 text-neutral-400">{fmtDate(d.issuedAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => openDoc(d)}
                      className="px-3 py-1.5 rounded-lg border border-white/10 text-xs text-neutral-200 hover:bg-white/5"
                    >
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
