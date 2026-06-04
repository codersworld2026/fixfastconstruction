import { denyIfNotAdmin } from "../lib/auth.js";
import { handleError, methodNotAllowed } from "../lib/http.js";
import { findDocument } from "../lib/documents.js";
import { renderPdfBuffer } from "../lib/pdf.js";
import { store } from "../lib/store.js";

// /api/generate-pdf (admin only)
//   GET or POST with ?type=invoice|quote & id=<id>
//   Renders the document to a PDF in memory and streams it inline. Always
//   reflects the current document data (no cached file).
export default async function handler(req, res) {
  try {
    if (denyIfNotAdmin(req, res)) return;
    if (req.method !== "GET" && req.method !== "POST") {
      return methodNotAllowed(res, ["GET", "POST"]);
    }

    const type = req.query.type || req.body?.type || "invoice";
    const id = req.query.id || req.body?.id;
    const kind = type === "quote" ? "quote" : "invoice";
    if (!id) return res.status(400).json({ error: "id is required" });

    const doc = await findDocument(kind, id);
    if (!doc) return res.status(404).json({ error: "Not found" });

    const buffer = await renderPdfBuffer(doc);
    await store.update(kind === "quote" ? "quotes" : "invoices", id, {
      pdfGeneratedAt: new Date().toISOString(),
    });

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${doc.number}.pdf"`);
    return res.end(buffer);
  } catch (e) {
    return handleError(res, e);
  }
}
