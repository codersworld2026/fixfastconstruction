import PDFDocument from "pdfkit";
import { config } from "./config.js";

function money(n) {
  return `${config.currencySymbol}${Number(n).toFixed(2)}`;
}
function fmtDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/**
 * Render an invoice or quote to a PDF Buffer in memory (no filesystem writes —
 * safe on serverless). `doc.kind` decides the heading and the date row.
 */
export function renderPdfBuffer(doc) {
  const isQuote = doc.kind === "quote";
  return new Promise((resolve, reject) => {
    const pdf = new PDFDocument({ size: "A4", margin: 50 });
    const chunks = [];
    pdf.on("data", (c) => chunks.push(c));
    pdf.on("end", () => resolve(Buffer.concat(chunks)));
    pdf.on("error", reject);

    const { company } = config;
    const accent = "#0ea5e9";

    pdf
      .fillColor("#0f172a")
      .fontSize(22)
      .text(company.name, 50, 50)
      .fillColor("#64748b")
      .fontSize(10)
      .text(company.address)
      .text(`${company.phone}  •  ${company.email}`)
      .text(company.website);

    pdf
      .fillColor(accent)
      .fontSize(26)
      .text(isQuote ? "QUOTATION" : "INVOICE", 360, 50, { align: "right" });
    pdf
      .fillColor("#0f172a")
      .fontSize(10)
      .text(doc.number, 360, 82, { align: "right" })
      .fillColor("#64748b")
      .text(`Issued: ${fmtDate(doc.issuedAt)}`, { align: "right" })
      .text(
        isQuote
          ? `Valid until: ${fmtDate(doc.validUntil)}`
          : `Due: ${fmtDate(doc.dueAt)}`,
        { align: "right" },
      )
      .text(`Status: ${String(doc.status).toUpperCase()}`, { align: "right" });

    const c = doc.customer || {};
    pdf
      .fillColor("#0f172a")
      .fontSize(12)
      .text(isQuote ? "Quote For" : "Bill To", 50, 150)
      .fillColor("#334155")
      .fontSize(10)
      .text(c.name || "—")
      .text(c.email || "")
      .text(c.phone || "")
      .text(c.address || "");
    if (doc.service) pdf.fillColor("#64748b").text(`Service: ${doc.service}`);

    let y = 230;
    const cols = { desc: 50, qty: 320, price: 380, amount: 470 };
    pdf.fillColor("#0f172a").fontSize(10);
    pdf.text("Description", cols.desc, y);
    pdf.text("Qty", cols.qty, y);
    pdf.text("Unit", cols.price, y);
    pdf.text("Amount", cols.amount, y, { align: "right", width: 75 });
    y += 16;
    pdf.moveTo(50, y).lineTo(545, y).strokeColor("#e2e8f0").stroke();
    y += 10;

    pdf.fillColor("#334155");
    (doc.lineItems || []).forEach((li) => {
      const amount = Number(li.quantity || 0) * Number(li.unitPrice || 0);
      pdf.text(li.description || "—", cols.desc, y, { width: 260 });
      pdf.text(String(li.quantity ?? ""), cols.qty, y);
      pdf.text(money(li.unitPrice ?? 0), cols.price, y);
      pdf.text(money(amount), cols.amount, y, { align: "right", width: 75 });
      y += 22;
    });

    y += 6;
    pdf.moveTo(320, y).lineTo(545, y).strokeColor("#e2e8f0").stroke();
    y += 10;
    const row = (label, value, bold) => {
      pdf
        .fillColor(bold ? "#0f172a" : "#64748b")
        .fontSize(bold ? 12 : 10)
        .text(label, 320, y)
        .text(value, cols.amount, y, { align: "right", width: 75 });
      y += bold ? 20 : 16;
    };
    row("Subtotal", money(doc.subtotal));
    row(`Tax (${Math.round(doc.taxRate * 100)}%)`, money(doc.taxAmount));
    row("Total", money(doc.total), true);

    y += 16;
    if (doc.notes) {
      pdf.fillColor("#0f172a").fontSize(10).text("Notes", 50, y);
      pdf.fillColor("#64748b").text(doc.notes, 50, y + 14, { width: 495 });
    }
    pdf
      .fillColor("#94a3b8")
      .fontSize(9)
      .text(
        isQuote
          ? `This quotation is valid until ${fmtDate(doc.validUntil)}. Thank you for considering ${company.name}.`
          : `Payment due within ${config.paymentTermsDays} days. Thank you for choosing ${company.name}.`,
        50,
        780,
        { align: "center", width: 495 },
      );

    pdf.end();
  });
}
