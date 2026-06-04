import { randomUUID } from "node:crypto";

import { store } from "../lib/store.js";
import { denyIfNotAdmin } from "../lib/auth.js";
import { handleError, methodNotAllowed } from "../lib/http.js";

// /api/leads
//   POST (public) — store a customer lead (e.g. from the website contact form)
//   GET  (admin)  — list leads, optional ?status=new|quoted|invoiced
export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { name, email, phone, service, message, address } = req.body || {};
      if (!name || !email) {
        return res.status(400).json({ error: "name and email are required" });
      }
      const lead = {
        id: randomUUID(),
        name,
        email,
        phone: phone || "",
        address: address || "",
        service: service || "",
        message: message || "",
        status: "new",
        createdAt: new Date().toISOString(),
      };
      await store.insert("leads", lead);
      return res.status(201).json(lead);
    }

    if (req.method === "GET") {
      if (denyIfNotAdmin(req, res)) return;
      const all = await store.getAll("leads");
      const { status } = req.query;
      const list = (status ? all.filter((l) => l.status === status) : all).sort(
        (a, b) => (a.createdAt < b.createdAt ? 1 : -1),
      );
      return res.json(list);
    }

    return methodNotAllowed(res, ["GET", "POST"]);
  } catch (e) {
    return handleError(res, e);
  }
}
