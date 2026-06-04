import { useCallback, useEffect, useState } from "react";
import { api, fmtDate, type Lead, type Doc, type DocKind } from "./api";
import { Pill } from "./ui";

export function LeadsPanel({
  notify,
  onCreated,
}: {
  notify: (m: string) => void;
  onCreated: (kind: DocKind, doc: Doc) => void;
}) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const q = status ? `?status=${status}` : "";
      setLeads(await api.get("/leads" + q));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    load();
  }, [load]);

  const create = async (lead: Lead, kind: DocKind) => {
    try {
      const doc = await api.post(kind === "quote" ? "/quotes" : "/invoices", {
        fromLeadId: lead.id,
      });
      notify(`${kind === "quote" ? "Quote" : "Invoice"} ${doc.number} created`);
      load();
      onCreated(kind, doc);
    } catch (e) {
      notify((e as Error).message);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 flex-wrap">
        <h2 className="text-xl font-bold text-white">Leads</h2>
        <div className="flex-1" />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2 rounded-lg bg-neutral-950 border border-white/10 text-sm text-white"
        >
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="quoted">Quoted</option>
          <option value="invoiced">Invoiced</option>
        </select>
        <button
          onClick={load}
          className="px-3 py-2 rounded-lg border border-white/10 text-sm text-neutral-200 hover:bg-white/5"
        >
          Refresh
        </button>
      </div>

      <div className="mt-4 bg-neutral-900 border border-white/10 rounded-xl overflow-x-auto">
        {loading ? (
          <div className="p-10 text-center text-neutral-400">Loading…</div>
        ) : error ? (
          <div className="p-10 text-center text-amber-300">{error}</div>
        ) : leads.length === 0 ? (
          <div className="p-10 text-center text-neutral-400">No leads yet.</div>
        ) : (
          <table className="w-full text-sm min-w-[720px]">
            <thead>
              <tr className="text-left text-neutral-400 text-xs uppercase tracking-wide">
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-t border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-white">{l.name}</div>
                    {l.message && (
                      <div className="text-neutral-500 text-xs max-w-xs truncate">
                        {l.message}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-neutral-300">
                    {l.email}
                    <div className="text-neutral-500">{l.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-neutral-300">{l.service || "—"}</td>
                  <td className="px-4 py-3">
                    <Pill status={l.status} />
                  </td>
                  <td className="px-4 py-3 text-neutral-400">{fmtDate(l.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => create(l, "quote")}
                        className="px-3 py-1.5 rounded-lg border border-white/10 text-xs text-neutral-200 hover:bg-white/5 whitespace-nowrap"
                      >
                        Create Quote from Lead
                      </button>
                      <button
                        onClick={() => create(l, "invoice")}
                        className="px-3 py-1.5 rounded-lg bg-sky-500 text-white text-xs font-medium hover:bg-sky-600 whitespace-nowrap"
                      >
                        Create Invoice
                      </button>
                    </div>
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
