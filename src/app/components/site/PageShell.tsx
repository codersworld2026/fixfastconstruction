import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Phone, ArrowUp } from "lucide-react";

import { TEL_HREF } from "../../data/site";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

/**
 * Standard page wrapper for the secondary routes: full-height scroll container,
 * fixed nav, footer, a floating call button on mobile and a back-to-top button.
 */
export function PageShell({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setShowTop(el.scrollTop > 600);
    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div
      ref={scrollRef}
      className="size-full overflow-y-auto overflow-x-hidden bg-neutral-950 scroll-smooth"
    >
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />

      {/* Floating call button (mobile) */}
      <a
        href={TEL_HREF}
        className="fixed bottom-6 right-6 z-40 sm:hidden w-14 h-14 bg-sky-500 text-white rounded-full shadow-lg shadow-sky-500/30 flex items-center justify-center hover:bg-sky-600 transition-colors active:scale-95"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6" />
      </a>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-40 w-12 h-12 bg-white/10 border border-white/20 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
