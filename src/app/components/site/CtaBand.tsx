import { Link } from "react-router";
import { Phone } from "lucide-react";

import { PHONE, TEL_HREF } from "../../data/site";

export function CtaBand({
  heading = "Ready to get started?",
  subheading = "Get a free, no-obligation quote from Manchester's trusted home repair team today.",
}: {
  heading?: string;
  subheading?: string;
}) {
  return (
    <section className="py-20 bg-neutral-900 border-t border-white/10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {heading}
        </h2>
        <p className="text-lg text-neutral-400 mb-8 max-w-2xl mx-auto">
          {subheading}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={TEL_HREF}
            className="px-8 py-4 bg-sky-500 text-white rounded-lg text-lg font-medium hover:bg-sky-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25"
          >
            <Phone className="w-5 h-5" />
            {PHONE}
          </a>
          <Link
            to="/contact"
            className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white border border-white/20 rounded-lg text-lg font-medium hover:bg-white/10 transition-colors"
          >
            Request a Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
