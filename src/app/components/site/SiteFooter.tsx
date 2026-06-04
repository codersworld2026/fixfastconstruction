import { Link } from "react-router";
import { Phone, Mail, MapPin } from "lucide-react";

import {
  PHONE,
  EMAIL,
  TEL_HREF,
  servicePages,
} from "../../data/site";

export function SiteFooter() {
  return (
    <footer className="bg-neutral-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="text-lg font-bold text-white">
              Fix Fast <span className="text-sky-400">Construction</span>
            </Link>
            <p className="mt-4 text-sm text-neutral-500 leading-relaxed">
              Reliable plumbing, electrical, construction and home repair
              services across Greater Manchester.
            </p>
          </div>

          {/* Services links */}
          <div>
            <h2 className="text-sm font-semibold text-white mb-4">Services</h2>
            <ul className="space-y-2">
              {servicePages.map((s) => (
                <li key={s.slug}>
                  <Link
                    to={`/${s.slug}`}
                    className="text-sm text-neutral-400 hover:text-sky-400 transition-colors"
                  >
                    {s.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h2 className="text-sm font-semibold text-white mb-4">Company</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services"
                  className="text-sm text-neutral-400 hover:text-sky-400 transition-colors"
                >
                  All Services
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className="text-sm text-neutral-400 hover:text-sky-400 transition-colors"
                >
                  Our Work
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-neutral-400 hover:text-sky-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-semibold text-white mb-4">Get in touch</h2>
            <ul className="space-y-3">
              <li>
                <a
                  href={TEL_HREF}
                  className="flex items-center gap-2 text-sm text-neutral-400 hover:text-sky-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-sky-400" /> {PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex items-center gap-2 text-sm text-neutral-400 hover:text-sky-400 transition-colors break-all"
                >
                  <Mail className="w-4 h-4 text-sky-400" /> {EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-400">
                <MapPin className="w-4 h-4 text-sky-400" /> Manchester, UK
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-center">
          <p className="text-sm text-neutral-500">
            &copy; 2026 Fix Fast Construction LTD. Serving Greater Manchester
            with pride.
          </p>
        </div>
      </div>
    </footer>
  );
}
