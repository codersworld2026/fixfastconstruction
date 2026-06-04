import { useState } from "react";
import { api, tokenStore } from "./api";

export function Login({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.login(password);
      onLogin(tokenStore.get());
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-neutral-900 border border-white/10 rounded-2xl p-8"
      >
        <h1 className="text-2xl font-bold text-white">
          FixFast <span className="text-sky-400">Admin</span>
        </h1>
        <p className="text-sm text-neutral-400 mt-1 mb-6">
          Sign in to manage leads, quotes and invoices.
        </p>
        <label className="block text-xs text-neutral-400 mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          placeholder="Enter admin password"
          className="w-full px-4 py-3 rounded-lg bg-neutral-950 border border-white/10 text-white placeholder-neutral-600 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
        />
        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
        <button
          disabled={loading}
          className="w-full mt-5 px-6 py-3 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600 transition-colors disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}
