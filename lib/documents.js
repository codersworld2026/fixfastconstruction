import { randomUUID } from "node:crypto";

import { config, lineItemsForService } from "./config.js";
import { store } from "./store.js";

// Status lifecycles per document kind.
const STATUSES = {
  invoice: ["draft", "sent", "paid", "overdue"],
  quote: ["draft", "sent", "accepted", "declined"],
};

const collectionFor = (kind) => (kind === "quote" ? "quotes" : "invoices");
const prefixFor = (kind) => (kind === "quote" ? "QUO" : "INV");

function round2(n) {
  return Math.round((Number(n) + Number.EPSILON) * 100) / 100;
}

/**
 * Totals from line items + labour + materials, a fixed-amount discount and a
 * tax/VAT rate. subtotal = items + labour + materials (before discount).
 */
export function computeTotals(lineItems = [], taxRate = config.taxRate, extras = {}) {
  const labour = Number(extras.labourCost || 0);
  const materials = Number(extras.materialsCost || 0);
  const itemsTotal = (lineItems || []).reduce(
    (s, li) => s + Number(li.quantity || 0) * Number(li.unitPrice || 0),
    0,
  );
  const subtotal = round2(itemsTotal + labour + materials);
  const discountAmount = round2(
    Math.min(Math.max(Number(extras.discount || 0), 0), subtotal),
  );
  const taxable = round2(subtotal - discountAmount);
  const taxAmount = round2(taxable * Number(taxRate || 0));
  return { subtotal, discountAmount, taxAmount, total: round2(taxable + taxAmount) };
}

function addDays(iso, days) {
  const d = new Date(iso);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

function defaultPaymentTerms(kind) {
  return kind === "quote"
    ? `This quotation is valid for ${config.quoteValidDays} days.`
    : `Payment due within ${config.paymentTermsDays} days of the invoice date.`;
}

/**
 * Create an invoice or quote. Data source:
 *  - fromLeadId  : prefill customer + line items from a lead's service
 *  - fromQuoteId : (invoices) copy a quote's details
 *  - or pass the fields directly (create from scratch)
 */
export async function createDocument(kind, opts = {}) {
  const {
    fromLeadId,
    fromQuoteId,
    customer,
    service,
    lineItems,
    labourCost = 0,
    materialsCost = 0,
    discount = 0,
    taxRate = config.taxRate,
    notes = "",
    paymentTerms,
    dueAt,
    validUntil,
  } = opts;

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

  const resolvedLabour = labourCost || sourceQuote?.labourCost || 0;
  const resolvedMaterials = materialsCost || sourceQuote?.materialsCost || 0;
  const resolvedDiscount = discount || sourceQuote?.discount || 0;

  const number = await store.nextNumber(prefixFor(kind));
  const now = new Date().toISOString();
  const totals = computeTotals(resolvedItems, taxRate, {
    labourCost: resolvedLabour,
    materialsCost: resolvedMaterials,
    discount: resolvedDiscount,
  });

  const doc = {
    id: randomUUID(),
    kind,
    number: `${prefixFor(kind)}-${number}`,
    leadId: fromLeadId || null,
    quoteId: fromQuoteId || null,
    customer: resolvedCustomer,
    service: service || lead?.service || sourceQuote?.service || "",
    lineItems: resolvedItems,
    labourCost: resolvedLabour,
    materialsCost: resolvedMaterials,
    discount: resolvedDiscount,
    taxRate,
    ...totals,
    currency: config.currency,
    status: "draft",
    notes: notes || sourceQuote?.notes || "",
    paymentTerms: paymentTerms || defaultPaymentTerms(kind),
    pdfGeneratedAt: null,
    issuedAt: now,
    dueAt: kind === "invoice" ? dueAt || addDays(now, config.paymentTermsDays) : null,
    validUntil: kind === "quote" ? validUntil || addDays(now, config.quoteValidDays) : null,
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
  const labourCost = patch.labourCost ?? doc.labourCost ?? 0;
  const materialsCost = patch.materialsCost ?? doc.materialsCost ?? 0;
  const discount = patch.discount ?? doc.discount ?? 0;
  const totals = computeTotals(lineItems, taxRate, { labourCost, materialsCost, discount });

  return store.update(col, id, {
    customer: patch.customer ?? doc.customer,
    service: patch.service ?? doc.service,
    lineItems,
    labourCost,
    materialsCost,
    discount,
    taxRate,
    notes: patch.notes ?? doc.notes,
    paymentTerms: patch.paymentTerms ?? doc.paymentTerms,
    ...(kind === "invoice" && patch.dueAt ? { dueAt: patch.dueAt } : {}),
    ...(kind === "quote" && patch.validUntil ? { validUntil: patch.validUntil } : {}),
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
    sent: "sentAt",
    paid: "paidAt",
    overdue: "overdueAt",
    accepted: "acceptedAt",
    declined: "declinedAt",
  }[status];

  const patch = { status };
  if (stampField) patch[stampField] = now;
  return store.update(col, id, patch);
}

export async function listDocuments(kind, statusFilter) {
  const all = await store.getAll(collectionFor(kind));
  const live = all.filter((d) => !d.deletedAt); // hide soft-deleted documents
  const filtered = statusFilter ? live.filter((d) => d.status === statusFilter) : live;
  return filtered.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export async function findDocument(kind, id) {
  const doc = await store.find(collectionFor(kind), id);
  return doc && !doc.deletedAt ? doc : null;
}

/**
 * Soft-delete a document: stamp deletedAt so it is hidden from lists and lookups
 * but the record (and its number) is preserved. Leads and invoice numbering are
 * untouched.
 */
export async function deleteDocument(kind, id) {
  const col = collectionFor(kind);
  const doc = await store.find(col, id);
  if (!doc || doc.deletedAt) throw httpError(404, "Not found");
  await store.update(col, id, { deletedAt: new Date().toISOString() });
  return { id, deleted: true };
}

export function httpError(status, message) {
  return Object.assign(new Error(message), { status });
}
