// Admin auth for the API functions.
//
// The admin dashboard sends the admin password as a bearer token on every
// request (header `x-admin-token` or `Authorization: Bearer <token>`). We
// compare it to the ADMIN_PASSWORD env var. Fails closed: if ADMIN_PASSWORD is
// not set, all admin requests are denied.
export function isAdmin(req) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false; // fail closed — env not configured

  const header = req.headers["x-admin-token"];
  const bearer = (req.headers.authorization || "").replace(/^Bearer\s+/i, "");
  const token = header || bearer;
  return Boolean(token) && token === expected;
}

// Helper for handlers: returns true if the response was already ended (denied).
export function denyIfNotAdmin(req, res) {
  if (isAdmin(req)) return false;
  if (!process.env.ADMIN_PASSWORD) {
    res.status(503).json({ error: "Admin not configured: set ADMIN_PASSWORD." });
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
  return true;
}
