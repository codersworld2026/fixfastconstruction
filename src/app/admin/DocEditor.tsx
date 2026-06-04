import { useState } from "react";
import {
  api,
  money,
  fmtDate,
  computeTotals,
  type Doc,
  type DocKind,
  type Customer,
  type LineItem,
} from "./api";
import { Pill } from "./ui";

type EditItem = { description: string; quantity: number | string; unitPrice: number | string };

export function DocEditor({
  doc,
  notify,
  onClose,
  onChanged,
  onOpenDoc,
}: {
  doc: Doc;
  notify: (m: string) => void;
  onClose: () => void;
  onChanged: () => void;
  onOpenDoc: (doc: Doc) => void;
}) {
  const kind: DocKind = doc.kind;
  const path = kind === "quote" ? "/quotes" : "/invoices";

  const [current, setCurrent] = useState<Doc>(doc);
  const [customer, setCustomer] = useState<Customer>({ ...doc.customer });
  const [items, setItems] = useState<EditItem[]>(doc.lineItems.map((li) => ({ ...li })));
  const [taxRate, setTaxRate] = useState<number>(doc.taxRate);
  const [notes, setNotes] = useState<string>(doc.notes || "");
  const [busy, setBusy] = useState(false);

  const locked = current.status === "paid";
  const totals = computeTotals(items as LineItem[], taxRate);

  const setItem = (i: number, k: keyof EditItem, v: string) =>
    setItems((arr) => arr.map((it, idx) => (idx === i ? { ...it, [k]: v } : it)));
  const addItem = () =>
    setItems((arr) => [...arr, { description: "", quantity: 1, unitPrice: 0 }]);
  const removeItem = (i: number) => setItems((arr) => arr.filter((_, idx) => idx !== i));

  const run = async <T,>(fn: () => Promise<T>, ok?: string): Promise<T | undefined> => {
    setBusy(true);
    try {
      const r = await fn();
      if (ok) notify(ok);
      onChanged();
      return r;
    } catch (e) {
      notify((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const save = () =>
    run(async () => {
      const updated: Doc = await api.put(path, {
        id: current.id,
        customer,
        lineItems: items.map((li) => ({
          description: li.description,
          quantity: Number(li.quantity),
          unitPrice: Number(li.unitPrice),
        })),
        taxRate: Number(taxRate),
        notes,
      });
      setCurrent(updated);
    }, "Saved");

  const changeStatus = (status: string) =>
    run(async () => {
      const updated: Doc = await api.patch(path, { id: current.id, status });
      setCurrent(updated);
    }, `Marked ${status}`);

  const generatePdf = () =>
    run(async () => {
      const blob = await api.pdfBlob(`?type=${kind}&id=${current.id}`);
      window.open(URL.createObjectURL(blob), "_blank");
    }, "PDF generated");

  const send = () =>
    run(async () => {
      const res = await api.post("/send-invoice", { id: current.id, type: kind });
      setCurrent(res.document);
    }, "Sent (email simulated — see Vercel logs)");

  const convert = () =>
    run(async () => {
      const inv: Doc = await api.post("/invoices", { fromQuoteId: current.id });
      notify(`Created invoice ${inv.number} from quote`);
      onOpenDoc(inv);
    });

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-2xl p-6 my-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-bold text-white">{current.number}</h2>
          <Pill status={current.status} />
          <div className="flex-1" />
          <button onClick={onClose} className="text-neutral-400 hover:text-white text-sm">✕ Close</button>
        </div>
        <p className="text-neutral-500 text-xs mt-1 mb-5">
          {kind === "quote" ? "Quotation" : "Invoice"} · Issued {fmtDate(current.issuedAt)} ·{" "}
          {kind === "quote"
            ? `Valid until ${fmtDate(current.validUntil)}`
            : `Due ${fmtDate(current.dueAt)}`}
          {locked && " · paid invoices are locked"}
        </p>

        {/* Customer */}
        <div className="grid sm:grid-cols-2 gap-3">
          {(["name", "email", "phone", "address"] as (keyof Customer)[]).map((field) => (
            <div key={field}>
              <label className="block text-xs text-neutral-400 mb-1 capitalize">{field}</label>
              <input
                value={(customer[field] as string) || ""}
                disabled={locked}
                onChange={(e) => setCustomer({ ...customer, [field]: e.target.value })}
                className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-white/10 text-white text-sm disabled:opacity-60"
              />
            </div>
          ))}
        </div>

        {/* Line items */}
        <h3 className="text-white font-semibold mt-5 mb-2">Line items</h3>
        <div className="grid grid-cols-[1fr_64px_84px_84px_28px] gap-2 text-xs text-neutral-500 mb-1">
          <div>Description</div><div>Qty</div><div>Unit £</div><div className="text-right">Amount</div><div />
        </div>
        {items.map((li, i) => (
          <div key={i} className="grid grid-cols-[1fr_64px_84px_84px_28px] gap-2 mb-2 items-center">
            <input value={li.description} disabled={locked} onChange={(e) => setItem(i, "description", e.target.value)} className="px-3 py-2 rounded-lg bg-neutral-950 border border-white/10 text-white text-sm disabled:opacity-60" />
            <input type="number" min="0" value={li.quantity} disabled={locked} onChange={(e) => setItem(i, "quantity", e.target.value)} className="px-2 py-2 rounded-lg bg-neutral-950 border border-white/10 text-white text-sm disabled:opacity-60" />
            <input type="number" min="0" step="0.01" value={li.unitPrice} disabled={locked} onChange={(e) => setItem(i, "unitPrice", e.target.value)} className="px-2 py-2 rounded-lg bg-neutral-950 border border-white/10 text-white text-sm disabled:opacity-60" />
            <div className="text-right text-neutral-300 text-sm self-center">{money(Number(li.quantity || 0) * Number(li.unitPrice || 0))}</div>
            <button onClick={() => removeItem(i)} disabled={locked} className="text-neutral-500 hover:text-red-400 disabled:opacity-40">✕</button>
          </div>
        ))}
        {!locked && (
          <button onClick={addItem} className="mt-1 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-neutral-200 hover:bg-white/5">
            + Add line
          </button>
        )}

        {/* Tax + notes + totals */}
        <div className="flex gap-3 mt-4 items-end flex-wrap">
          <div className="w-28">
            <label className="block text-xs text-neutral-400 mb-1">Tax rate</label>
            <select value={taxRate} disabled={locked} onChange={(e) => setTaxRate(Number(e.target.value))} className="w-full px-2 py-2 rounded-lg bg-neutral-950 border border-white/10 text-white text-sm">
              <option value={0}>0%</option>
              <option value={0.05}>5%</option>
              <option value={0.2}>20%</option>
            </select>
          </div>
          <div className="flex-1 min-w-[180px]">
            <label className="block text-xs text-neutral-400 mb-1">Notes</label>
            <input value={notes} disabled={locked} onChange={(e) => setNotes(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-white/10 text-white text-sm disabled:opacity-60" />
          </div>
        </div>

        <div className="text-right mt-4 text-sm text-neutral-300 leading-7">
          <div>Subtotal: {money(totals.subtotal)}</div>
          <div>Tax ({Math.round(taxRate * 100)}%): {money(totals.taxAmount)}</div>
          <div className="text-lg font-bold text-white">Total: {money(totals.total)}</div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/10">
          {!locked && (
            <button onClick={save} disabled={busy} className="px-4 py-2 rounded-lg bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 disabled:opacity-60">
              Save changes
            </button>
          )}
          <button onClick={generatePdf} disabled={busy} className="px-4 py-2 rounded-lg border border-white/10 text-sm text-neutral-200 hover:bg-white/5">
            Generate PDF
          </button>
          <button onClick={send} disabled={busy} className="px-4 py-2 rounded-lg border border-white/10 text-sm text-neutral-200 hover:bg-white/5">
            Send (simulate)
          </button>
          {kind === "invoice" && current.status === "draft" && (
            <button onClick={() => changeStatus("finalized")} disabled={busy} className="px-4 py-2 rounded-lg border border-white/10 text-sm text-neutral-200 hover:bg-white/5">
              Mark finalized
            </button>
          )}
          {kind === "invoice" && current.status !== "paid" && (
            <button onClick={() => changeStatus("paid")} disabled={busy} className="px-4 py-2 rounded-lg border border-white/10 text-sm text-neutral-200 hover:bg-white/5">
              Mark paid
            </button>
          )}
          {kind === "quote" && (
            <>
              <button onClick={() => changeStatus("accepted")} disabled={busy} className="px-4 py-2 rounded-lg border border-white/10 text-sm text-neutral-200 hover:bg-white/5">
                Mark accepted
              </button>
              <button onClick={() => changeStatus("declined")} disabled={busy} className="px-4 py-2 rounded-lg border border-white/10 text-sm text-neutral-200 hover:bg-white/5">
                Mark declined
              </button>
              <button onClick={convert} disabled={busy} className="px-4 py-2 rounded-lg border border-sky-500/40 text-sm text-sky-300 hover:bg-sky-500/10">
                Convert to invoice
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
