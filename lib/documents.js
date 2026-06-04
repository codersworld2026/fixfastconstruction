import { randomUUID } from "node:crypto";

import { config, lineItemsForService } from "./config.js";
import { store } from "./store.js";

// Status lifecycles per document kind.
const STATUSES = {
  invoice: ["draft", "finalized", "sent", "paid"],
  quote: ["draft", "sent", "accepted", "declined"],
};

const collectionFor = (kind) => (kind === "quote" ? "quotes" : "invoices");
const prefixFor = (kind) => (kind === "quote" ? "QUO" : "INV");

function round2(n) {
  return Math.round((Number(n) + Number.EPSILON) * 100) / 100;
}

export function computeTotals(lineItems = [], taxRate = config.taxRate) {
  const subtotal = round2(
    lineItems.reduce(
      (s, li) => s + Number(li.quantity || 0) * Number(li.unitPrice || 0),
      0,
    ),
  );
  const taxAmount = round2(subtotal * Number(taxRate || 0));
  return { subtotal, taxAmount, total: round2(subtotal + taxAmount) };
}

function addDays(iso, days) {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

/**
 * Create an invoice or quote. Source of data:
 *  - fromLeadId  : prefill customer + line items from a lead's service
 *  - fromQuoteId : (invoices only) copy a quote's customer + line items
 *  - or pass customer/lineItems directly
 */
export async function createDocument(
  kind,
  { fromLeadId, fromQuoteId, customer, lineItems, taxRate = config.taxRate, notes = "" } = {},
) {
  let lead = null;
  let sourceQuote = null;

  if (fromLeadId) {
    lead = await store.find("leads", fromLeadId);
    if (!lead) throw httpError(404, "Lead not found");
  }
  if (fromQuoteId && kind === "invoice") {
    sourceQuote = await store.find("quotes", fromQuoteId);
    if (!sourceQuote) throw httpError(404, "Quote not found");
  }

  const resolvedCustomer =
    customer ||
    sourceQuote?.customer || {
      name: lead?.name || "",
      email: lead?.email || "",
      phone: lead?.phone || "",
      address: lead?.address || "",
    };

  const resolvedItems =
    (lineItems && lineItems.length && lineItems) ||
    sourceQuote?.lineItems ||
    lineItemsForService(lead?.service);

  const number = await store.nextNumber(prefixFor(kind));
  const now = new Date().toISOString();
  const totals = computeTotals(resolvedItems, taxRate);

  const doc = {
    id: randomUUID(),
    kind,
    number: `${prefixFor(kind)}-${number}`,
    leadId: fromLeadId || null,
    quoteId: fromQuoteId || null,
    customer: resolvedCustomer,
    service: lead?.service || sourceQuote?.service || "",
    lineItems: resolvedItems,
    taxRate,
    ...totals,
    currency: config.currency,
    status: "draft",
    notes,
    pdfGeneratedAt: null,
    issuedAt: now,
    dueAt: kind === "invoice" ? addDays(now, config.paymentTermsDays) : null,
    validUntil: kind === "quote" ? addDays(now, config.quoteValidDays) : null,
    createdAt: now,
  };

  await store.insert(collectionFor(kind), doc);

  if (lead) {
    await store.update("leads", lead.id, {
      status: kind === "quote" ? "quoted" : "invoiced",
    });
  }
  return doc;
}

export async function updateDocument(kind, id, patch = {}) {
  const col = collectionFor(kind);
  const doc = await store.find(col, id);
  if (!doc) throw httpError(404, "Not found");
  if (doc.status === "paid") throw httpError(409, "Paid invoices cannot be edited");

  const lineItems = patch.lineItems ?? doc.lineItems;
  const taxRate = patch.taxRate ?? doc.taxRate;
  const totals = computeTotals(lineItems, taxRate);

  return store.update(col, id, {
    customer: patch.customer ?? doc.customer,
    lineItems,
    taxRate,
    notes: patch.notes ?? doc.notes,
    ...totals,
  });
}

export async function setStatus(kind, id, status) {
  const allowed = STATUSES[kind] || [];
  if (!allowed.includes(status)) throw httpError(400, `Invalid status: ${status}`);

  const col = collectionFor(kind);
  const doc = await store.find(col, id);
  if (!doc) throw httpError(404, "Not found");

  const now = new Date().toISOString();
  const stampField = {
    finalized: "finalizedAt",
    sent: "sentAt",
    paid: "paidAt",
    accepted: "acceptedAt",
    declined: "declinedAt",
  }[status];

  const patch = { status };
  if (stampField) patch[stampField] = now;
  return store.update(col, id, patch);
}

export async function listDocuments(kind, statusFilter) {
  const all = await store.getAll(collectionFor(kind));
  const filtered = statusFilter ? all.filter((d) => d.status === statusFilter) : all;
  return filtered.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function findDocument(kind, id) {
  return store.find(collectionFor(kind), id);
}

export function httpError(status, message) {
  return Object.assign(new Error(message), { status });
}
