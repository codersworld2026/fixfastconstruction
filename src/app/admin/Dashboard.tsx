import { useState } from "react";
import { Link } from "react-router";
import { LeadsPanel } from "./LeadsPanel";
import { DocsPanel } from "./DocsPanel";
import { DocEditor } from "./DocEditor";
import { Toast } from "./ui";
import type { Doc, DocKind } from "./api";

type Tab = "leads" | "quotes" | "invoices";

export function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("leads");
  const [toast, setToast] = useState("");
  const [editing, setEditing] = useState<Doc | null>(null);
  const [reload, setReload] = useState<{ invoice: number; quote: number }>({
    invoice: 0,
    quote: 0,
  });

  const notify = (m: string) => {
    setToast(m);
    setTimeout(() => setToast(""), 3200);
  };
  const bump = (kind: DocKind) =>
    setReload((r) => ({ ...r, [kind]: r[kind] + 1 }));

  const tabs: { id: Tab; label: string }[] = [
    { id: "leads", label: "Leads" },
    { id: "quotes", label: "Quotes" },
    { id: "invoices", label: "Invoices" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950">
      <header className="sticky top-0 z-20 bg-neutral-900/95 backdrop-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <div className="font-bold text-white">
            FixFast <span className="text-sky-400">Admin</span>
          </div>
          <nav className="flex gap-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  tab === t.id
                    ? "bg-sky-500 text-white"
                    : "text-neutral-300 hover:bg-white/5"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-neutral-400 hover:text-sky-400 hidden sm:inline">
              View site
            </Link>
            <button
              onClick={onLogout}
              className="px-3 py-2 rounded-lg border border-white/10 text-sm text-neutral-200 hover:bg-white/5"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {tab === "leads" && (
          <LeadsPanel
            notify={notify}
            onCreated={(kind, doc) => {
              bump(kind);
              setEditing(doc);
            }}
          />
        )}
        {tab === "quotes" && (
          <DocsPanel kind="quote" reloadKey={reload.quote} notify={notify} openDoc={setEditing} />
        )}
        {tab === "invoices" && (
          <DocsPanel kind="invoice" reloadKey={reload.invoice} notify={notify} openDoc={setEditing} />
        )}
      </main>

      {editing && (
        <DocEditor
          doc={editing}
          notify={notify}
          onClose={() => setEditing(null)}
          onChanged={() => bump(editing.kind)}
          onOpenDoc={(d) => {
            bump(d.kind);
            setEditing(d);
          }}
        />
      )}

      <Toast message={toast} />
    </div>
  );
}
