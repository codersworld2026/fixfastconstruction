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
type Num = number | string;

const toDateInput = (iso?: string | null) =>
  iso ? new Date(iso).toISOString().slice(0, 10) : "";
const fromDateInput = (v: string) =>
  v ? new Date(v + "T00:00:00").toISOString() : null;

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
  const [service, setService] = useState(doc.service || "");
  const [items, setItems] = useState<EditItem[]>(
    (doc.lineItems || []).map((li) => ({ ...li })),
  );
  const [labourCost, setLabour] = useState<Num>(doc.labourCost ?? 0);
  const [materialsCost, setMaterials] = useState<Num>(doc.materialsCost ?? 0);
  const [discount, setDiscount] = useState<Num>(doc.discount ?? 0);
  const [taxRate, setTaxRate] = useState<number>(doc.taxRate ?? 0.2);
  const [notes, setNotes] = useState(doc.notes || "");
  const [paymentTerms, setPaymentTerms] = useState(doc.paymentTerms || "");
  const [dateValue, setDateValue] = useState(
    toDateInput(kind === "quote" ? doc.validUntil : doc.dueAt),
  );
  const [busy, setBusy] = useState(false);

  const isNew = !current.id;
  const locked = current.status === "paid";
  const totals = computeTotals(items as LineItem[], taxRate, {
    labourCost: Number(labourCost),
    materialsCost: Number(materialsCost),
    discount: Number(discount),
  });

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

  const payload = () => ({
    customer,
    service,
    lineItems: items.map((li) => ({
      description: li.description,
      quantity: Number(li.quantity),
      unitPrice: Number(li.unitPrice),
    })),
    labourCost: Number(labourCost),
    materialsCost: Number(materialsCost),
    discount: Number(discount),
    taxRate: Number(taxRate),
    notes,
    paymentTerms,
    ...(kind === "quote"
      ? { validUntil: fromDateInput(dateValue) }
      : { dueAt: fromDateInput(dateValue) }),
  });

  const save = () =>
    run(async () => {
      if (isNew) {
        const created: Doc = await api.post(path, payload());
        setCurrent(created);
        return created;
      }
      const updated: Doc = await api.put(path, { id: current.id, ...payload() });
      setCurrent(updated);
      return updated;
    }, isNew ? `${kind === "quote" ? "Quote" : "Invoice"} created` : "Saved");

  const changeStatus = (status: string) =>
    run(async () => {
      const updated: Doc = await api.patch(path, { id: current.id, status });
      setCurrent(updated);
    }, `Marked ${status}`);

  const generatePdf = () =>
    run(async () => {
      const blob = await api.pdfBlob(`?type=${kind}&id=${current.id}`);
      window.open(URL.createObjectURL(blob), "_blank");
    }, "PDF ready");

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

  const field =
    "w-full px-3 py-2 rounded-lg bg-neutral-950 border border-white/10 text-white text-sm disabled:opacity-60";
  const btn =
    "px-4 py-2 rounded-lg border border-white/10 text-sm text-neutral-200 hover:bg-white/5 disabled:opacity-60";

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start justify-center p-3 sm:p-4 overflow-y-auto" onClick={onClose}>
      <div className="w-full max-w-2xl bg-neutral-900 border border-white/10 rounded-2xl p-4 sm:p-6 my-4 sm:my-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3">
          <h2 className="text-lg sm:text-xl font-bold text-white">
            {isNew ? (kind === "quote" ? "New Quote" : "New Invoice") : current.number}
          </h2>
          <Pill status={current.status} />
          <div className="flex-1" />
          <button onClick={onClose} className="text-neutral-400 hover:text-white text-sm">✕ Close</button>
        </div>
        <p className="text-neutral-500 text-xs mt-1 mb-5">
          {kind === "quote" ? "Quotation" : "Invoice"}
          {!isNew && ` · Issued ${fmtDate(current.issuedAt)}`}
          {locked && " · paid invoices are locked"}
        </p>

        {/* Customer */}
        <h3 className="text-white font-semibold mb-2">Customer</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {(["name", "email", "phone", "address"] as (keyof Customer)[]).map((f) => (
            <div key={f}>
              <label className="block text-xs text-neutral-400 mb-1 capitalize">{f}</label>
              <input
                value={(customer[f] as string) || ""}
                disabled={locked}
                onChange={(e) => setCustomer({ ...customer, [f]: e.target.value })}
                className={field}
              />
            </div>
          ))}
        </div>

        {/* Job / service description */}
        <div className="mt-3">
          <label className="block text-xs text-neutral-400 mb-1">Job / service description</label>
          <input value={service} disabled={locked} onChange={(e) => setService(e.target.value)} className={field} placeholder="e.g. Bathroom leak repair" />
        </div>

        {/* Line items */}
        <h3 className="text-white font-semibold mt-5 mb-2">Line items</h3>
        <div className="grid grid-cols-[1fr_56px_76px_76px_24px] gap-2 text-xs text-neutral-500 mb-1">
          <div>Description</div><div>Qty</div><div>Unit £</div><div className="text-right">Amount</div><div />
        </div>
        {items.map((li, i) => (
          <div key={i} className="grid grid-cols-[1fr_56px_76px_76px_24px] gap-2 mb-2 items-center">
            <input value={li.description} disabled={locked} onChange={(e) => setItem(i, "description", e.target.value)} className={field} />
            <input type="number" min="0" value={li.quantity} disabled={locked} onChange={(e) => setItem(i, "quantity", e.target.value)} className={field + " px-2"} />
            <input type="number" min="0" step="0.01" value={li.unitPrice} disabled={locked} onChange={(e) => setItem(i, "unitPrice", e.target.value)} className={field + " px-2"} />
            <div className="text-right text-neutral-300 text-sm self-center">{money(Number(li.quantity || 0) * Number(li.unitPrice || 0))}</div>
            <button onClick={() => removeItem(i)} disabled={locked} className="text-neutral-500 hover:text-red-400 disabled:opacity-40">✕</button>
          </div>
        ))}
        {!locked && <button onClick={addItem} className="mt-1 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-neutral-200 hover:bg-white/5">+ Add line</button>}

        {/* Costs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Labour £</label>
            <input type="number" min="0" step="0.01" value={labourCost} disabled={locked} onChange={(e) => setLabour(e.target.value)} className={field} />
          </div>
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Materials £</label>
            <input type="number" min="0" step="0.01" value={materialsCost} disabled={locked} onChange={(e) => setMaterials(e.target.value)} className={field} />
          </div>
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Discount £</label>
            <input type="number" min="0" step="0.01" value={discount} disabled={locked} onChange={(e) => setDiscount(e.target.value)} className={field} />
          </div>
          <div>
            <label className="block text-xs text-neutral-400 mb-1">VAT / tax</label>
            <select value={taxRate} disabled={locked} onChange={(e) => setTaxRate(Number(e.target.value))} className={field}>
              <option value={0}>0%</option>
              <option value={0.05}>5%</option>
              <option value={0.2}>20%</option>
            </select>
          </div>
        </div>

        {/* Terms + date + notes */}
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          <div>
            <label className="block text-xs text-neutral-400 mb-1">Payment terms</label>
            <input value={paymentTerms} disabled={locked} onChange={(e) => setPaymentTerms(e.target.value)} className={field} />
          </div>
          <div>
            <label className="block text-xs text-neutral-400 mb-1">
              {kind === "quote" ? "Quote expiry date" : "Due date"}
            </label>
            <input type="date" value={dateValue} disabled={locked} onChange={(e) => setDateValue(e.target.value)} className={field} />
          </div>
        </div>
        <div className="mt-3">
          <label className="block text-xs text-neutral-400 mb-1">Notes</label>
          <textarea value={notes} disabled={locked} rows={2} onChange={(e) => setNotes(e.target.value)} className={field} />
        </div>

        {/* Totals */}
        <div className="text-right mt-4 text-sm text-neutral-300 leading-7">
          {Number(labourCost) > 0 && <div>Labour: {money(Number(labourCost))}</div>}
          {Number(materialsCost) > 0 && <div>Materials: {money(Number(materialsCost))}</div>}
          <div>Subtotal: {money(totals.subtotal)}</div>
          {totals.discountAmount > 0 && <div>Discount: −{money(totals.discountAmount)}</div>}
          <div>VAT ({Math.round(taxRate * 100)}%): {money(totals.taxAmount)}</div>
          <div className="text-lg font-bold text-white">Total: {money(totals.total)}</div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/10">
          {isNew ? (
            <button onClick={save} disabled={busy} className="px-4 py-2 rounded-lg bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 disabled:opacity-60">
              {busy ? "Creating…" : `Create ${kind === "quote" ? "Quote" : "Invoice"}`}
            </button>
          ) : (
            <>
              {!locked && (
                <button onClick={save} disabled={busy} className="px-4 py-2 rounded-lg bg-sky-500 text-white text-sm font-medium hover:bg-sky-600 disabled:opacity-60">
                  Save changes
                </button>
              )}
              <button onClick={generatePdf} disabled={busy} className={btn}>Download PDF</button>
              <button onClick={send} disabled={busy} className={btn}>Send (simulate)</button>
              {kind === "invoice" && current.status !== "paid" && (
                <button onClick={() => changeStatus("paid")} disabled={busy} className={btn}>Mark paid</button>
              )}
              {kind === "invoice" && current.status !== "paid" && current.status !== "overdue" && (
                <button onClick={() => changeStatus("overdue")} disabled={busy} className={btn}>Mark overdue</button>
              )}
              {kind === "quote" && (
                <>
                  <button onClick={() => changeStatus("accepted")} disabled={busy} className={btn}>Mark accepted</button>
                  <button onClick={() => changeStatus("declined")} disabled={busy} className={btn}>Mark declined</button>
                  <button onClick={convert} disabled={busy} className="px-4 py-2 rounded-lg border border-sky-500/40 text-sm text-sky-300 hover:bg-sky-500/10">Convert to invoice</button>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
