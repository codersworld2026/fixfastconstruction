import { config } from "./config.js";

function money(n) {
  return `${config.currencySymbol}${Number(n).toFixed(2)}`;
}

/**
 * Simulate sending an invoice/quote email. On serverless this logs the full
 * email (including a simulated PDF attachment line) to the function logs, which
 * are visible in the Vercel dashboard. Swap for a real provider (Resend /
 * SendGrid / nodemailer) when going live — `pdfBuffer` is ready to attach.
 */
export async function sendDocumentEmail(doc, pdfBuffer) {
  const isQuote = doc.kind === "quote";
  const to = doc.customer?.email || "(no email on record)";
  const subject = `${isQuote ? "Quotation" : "Invoice"} ${doc.number} from ${config.company.name}`;
  const filename = `${doc.number}.pdf`;
  const kb = pdfBuffer ? (pdfBuffer.length / 1024).toFixed(1) : "0.0";

  const body = [
    `Hi ${doc.customer?.name || "there"},`,
    "",
    isQuote
      ? `Please find attached quotation ${doc.number} for ${money(doc.total)}.`
      : `Please find attached invoice ${doc.number} for ${money(doc.total)}.`,
    isQuote
      ? `This quote is valid until ${new Date(doc.validUntil).toLocaleDateString("en-GB")}.`
      : `It is due by ${new Date(doc.dueAt).toLocaleDateString("en-GB")}.`,
    "",
    "Thank you for choosing Fix Fast Construction.",
    "",
    `${config.company.name}`,
    `${config.company.phone} • ${config.company.email}`,
  ].join("\n");

  /* eslint-disable no-console */
  console.log("\n========== SIMULATED EMAIL (not actually sent) ==========");
  console.log(`From:    ${config.company.name} <${config.company.email}>`);
  console.log(`To:      ${to}`);
  console.log(`Subject: ${subject}`);
  console.log(`Attachment: ${filename} (${kb} KB) [simulated]`);
  console.log("--------------------------------------------------------");
  console.log(body);
  console.log("========================================================\n");

  return { simulated: true, to, subject, attachment: filename };
}
