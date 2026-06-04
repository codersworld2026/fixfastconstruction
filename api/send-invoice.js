import { denyIfNotAdmin } from "../lib/auth.js";
import { handleError, methodNotAllowed } from "../lib/http.js";
import { findDocument, setStatus } from "../lib/documents.js";
import { renderPdfBuffer } from "../lib/pdf.js";
import { sendDocumentEmail } from "../lib/email.js";
import { store } from "../lib/store.js";

// /api/send-invoice (admin only)
//   POST { id, type=invoice|quote }
//   Renders the PDF, simulates an email (logged to the function logs), stamps
//   the PDF time and marks the document "sent".
export default async function handler(req, res) {
  try {
    if (denyIfNotAdmin(req, res)) return;
    if (req.method !== "POST") return methodNotAllowed(res, ["POST"]);

    const { id, type = "invoice" } = req.body || {};
    const kind = type === "quote" ? "quote" : "invoice";
    if (!id) return res.status(400).json({ error: "id is required" });

    const doc = await findDocument(kind, id);
    if (!doc) return res.status(404).json({ error: "Not found" });

    const buffer = await renderPdfBuffer(doc);
    const email = await sendDocumentEmail(doc, buffer);
    await store.update(kind === "quote" ? "quotes" : "invoices", id, {
      pdfGeneratedAt: new Date().toISOString(),
    });
    const document = await setStatus(kind, id, "sent");

    return res.json({ ok: true, email, document });
  } catch (e) {
    return handleError(res, e);
  }
}
