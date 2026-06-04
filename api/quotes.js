import { denyIfNotAdmin } from "../lib/auth.js";
import { handleError, methodNotAllowed } from "../lib/http.js";
import {
  createDocument,
  updateDocument,
  setStatus,
  listDocuments,
  findDocument,
} from "../lib/documents.js";

const KIND = "quote";

// /api/quotes (admin only)
//   GET    ?id=    -> one quote   |   ?status= -> filtered list   |   list
//   POST   { fromLeadId | customer, lineItems, taxRate, notes }
//   PUT    { id, customer?, lineItems?, taxRate?, notes? }   (recomputes totals)
//   PATCH  { id, status }   (draft -> sent -> accepted | declined)
export default async function handler(req, res) {
  try {
    if (denyIfNotAdmin(req, res)) return;

    if (req.method === "GET") {
      const { id, status } = req.query;
      if (id) {
        const doc = await findDocument(KIND, id);
        return doc ? res.json(doc) : res.status(404).json({ error: "Not found" });
      }
      return res.json(await listDocuments(KIND, status));
    }

    if (req.method === "POST") {
      return res.status(201).json(await createDocument(KIND, req.body || {}));
    }

    if (req.method === "PUT") {
      const { id, ...patch } = req.body || {};
      if (!id) return res.status(400).json({ error: "id is required" });
      return res.json(await updateDocument(KIND, id, patch));
    }

    if (req.method === "PATCH") {
      const { id, status } = req.body || {};
      if (!id) return res.status(400).json({ error: "id is required" });
      return res.json(await setStatus(KIND, id, status));
    }

    return methodNotAllowed(res, ["GET", "POST", "PUT", "PATCH"]);
  } catch (e) {
    return handleError(res, e);
  }
}
