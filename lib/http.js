import { StorageNotConfiguredError } from "./store.js";

// Translate thrown errors into clean JSON responses. Storage-not-configured
// becomes a 503 so the rest of the site is unaffected when KV isn't set up yet.
export function handleError(res, e) {
  if (e instanceof StorageNotConfiguredError || e.code === "STORAGE_NOT_CONFIGURED") {
    return res.status(503).json({ error: e.message, code: "STORAGE_NOT_CONFIGURED" });
  }
  return res.status(e.status || 500).json({ error: e.message || "Server error" });
}

export function methodNotAllowed(res, allow) {
  res.setHeader("Allow", allow.join(", "));
  return res.status(405).json({ error: "Method not allowed" });
}
