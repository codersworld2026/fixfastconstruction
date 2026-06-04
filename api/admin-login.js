// /api/admin-login — verify the admin password without touching storage, so the
// dashboard can sign in even before a KV database is connected. Returns the
// token (the password itself) which the client then sends as `x-admin-token`.
export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  if (!process.env.ADMIN_PASSWORD) {
    return res
      .status(503)
      .json({ error: "Admin not configured: set the ADMIN_PASSWORD env var." });
  }
  const { password } = req.body || {};
  if (password && password === process.env.ADMIN_PASSWORD) {
    return res.json({ ok: true, token: password });
  }
  return res.status(401).json({ error: "Invalid password" });
}
