// Shared backend config for the invoicing/quotation API (serverless functions).
export const config = {
  taxRate: Number.isNaN(parseFloat(process.env.TAX_RATE))
    ? 0.2
    : parseFloat(process.env.TAX_RATE),
  currency: process.env.CURRENCY || "GBP",
  currencySymbol: "£",
  paymentTermsDays: 14,
  quoteValidDays: 30,
  company: {
    name: "Fix Fast Construction LTD",
    address: "Greater Manchester, United Kingdom",
    phone: "07828 786 593",
    email: "Fixfasthomerepair@gmail.com",
    website: "https://fixfastconstruction.com",
  },
};

// Default line items used to auto-populate an invoice/quote from a lead's
// chosen service. Admins edit these before finalizing. Prices are examples.
export const serviceCatalog = {
  "Plumbing & Electrical Work": [
    { description: "Plumbing & electrical labour", quantity: 3, unitPrice: 55 },
    { description: "Materials & fittings", quantity: 1, unitPrice: 70 },
  ],
  "General Home Repairs": [
    { description: "Handyman labour", quantity: 2, unitPrice: 45 },
    { description: "Materials", quantity: 1, unitPrice: 40 },
  ],
  "Maintenance Services": [
    { description: "Property maintenance visit", quantity: 1, unitPrice: 95 },
  ],
  "Renovation & Remodelling": [
    { description: "Renovation labour (day rate)", quantity: 2, unitPrice: 220 },
    { description: "Materials (estimate)", quantity: 1, unitPrice: 350 },
  ],
  "Emergency Call Out": [
    { description: "Emergency call out", quantity: 1, unitPrice: 90 },
    { description: "Emergency labour", quantity: 1, unitPrice: 65 },
  ],
  default: [{ description: "Call out & labour", quantity: 1, unitPrice: 80 }],
};

export function lineItemsForService(service) {
  const items = serviceCatalog[service] || serviceCatalog.default;
  return items.map((i) => ({ ...i }));
}
