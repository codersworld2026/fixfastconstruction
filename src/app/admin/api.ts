// Admin API client. The admin password doubles as the bearer token and is sent
// on every request as `x-admin-token`. Stored in localStorage after login.
const TOKEN_KEY = "ff_admin_token";

export const tokenStore = {
  get: () => localStorage.getItem(TOKEN_KEY) || "",
  set: (t: string) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export class ApiError extends Error {
  status: number;
  code?: string;
  constructor(message: string, status: number, code?: string) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

async function request(path: string, opts: { method?: string; body?: unknown } = {}) {
  const res = await fetch("/api" + path, {
    method: opts.method || "GET",
    headers: {
      "Content-Type": "application/json",
      "x-admin-token": tokenStore.get(),
    },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    if (res.status === 401) tokenStore.clear();
    throw new ApiError(data.error || `Request failed (${res.status})`, res.status, data.code);
  }
  return data;
}

export const api = {
  get: (p: string) => request(p),
  post: (p: string, body?: unknown) => request(p, { method: "POST", body }),
  put: (p: string, body?: unknown) => request(p, { method: "PUT", body }),
  patch: (p: string, body?: unknown) => request(p, { method: "PATCH", body }),

  async login(password: string) {
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new ApiError(data.error || "Login failed", res.status);
    tokenStore.set(data.token);
    return true;
  },

  // Fetch a PDF as a Blob (auth via header) so it can be opened without putting
  // the token in the URL.
  async pdfBlob(query: string) {
    const res = await fetch("/api/generate-pdf" + query, {
      headers: { "x-admin-token": tokenStore.get() },
    });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      throw new ApiError(d.error || "Could not generate PDF", res.status);
    }
    return res.blob();
  },
};

/* ------------------------------ Types ------------------------------ */
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  service: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export type DocKind = "invoice" | "quote";

export interface Doc {
  id: string;
  kind: DocKind;
  number: string;
  customer: Customer;
  service?: string;
  lineItems: LineItem[];
  taxRate: number;
  subtotal: number;
  taxAmount: number;
  total: number;
  status: string;
  notes?: string;
  issuedAt: string;
  dueAt?: string | null;
  validUntil?: string | null;
}

/* ----------------------------- Helpers ----------------------------- */
export const money = (n: number) => "£" + Number(n || 0).toFixed(2);
export const fmtDate = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

export function computeTotals(lineItems: LineItem[], taxRate: number) {
  const subtotal = (lineItems || []).reduce(
    (s, li) => s + Number(li.quantity || 0) * Number(li.unitPrice || 0),
    0,
  );
  const taxAmount = subtotal * Number(taxRate || 0);
  return { subtotal, taxAmount, total: subtotal + taxAmount };
}
