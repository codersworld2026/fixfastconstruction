import { useEffect, useState } from "react";
import { tokenStore } from "./api";
import { Login } from "./Login";
import { Dashboard } from "./Dashboard";

/**
 * Admin SPA root. Lives inside the public website at /admin but is:
 *  - protected (password -> token, all API calls require it server-side)
 *  - noindexed (robots meta set while mounted; also disallowed in robots.txt)
 */
export default function AdminApp() {
  const [token, setToken] = useState<string>(tokenStore.get());

  useEffect(() => {
    const prevTitle = document.title;
    document.title = "Admin · Fix Fast Construction";

    let meta = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const created = !meta;
    const prevContent = meta?.getAttribute("content") ?? null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "robots");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "noindex, nofollow");

    return () => {
      document.title = prevTitle;
      if (created) meta?.remove();
      else if (prevContent !== null) meta?.setAttribute("content", prevContent);
    };
  }, []);

  if (!token) return <Login onLogin={(t) => setToken(t)} />;
  return (
    <Dashboard
      onLogout={() => {
        tokenStore.clear();
        setToken("");
      }}
    />
  );
}
