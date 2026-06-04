import { Link } from "react-router";
import { motion } from "motion/react";
import { Phone, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";

import { useSeo } from "../hooks/useSeo";
import {
  PHONE,
  TEL_HREF,
  canonical,
  getServiceBySlug,
  servicePages,
} from "../data/site";
import { PageShell } from "./site/PageShell";
import { CtaBand } from "./site/CtaBand";

export default function ServiceDetailPage({ slug }: { slug: string }) {
  const service = getServiceBySlug(slug);

  useSeo({
    title: service?.seoTitle ?? "Services | FixFast Construction",
    description:
      service?.seoDescription ??
      "Professional home repair and construction services in Manchester.",
    canonical: canonical(service ? `/${service.slug}` : "/services"),
  });

  if (!service) {
    return (
      <PageShell>
        <section className="pt-40 pb-24 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Service not found
          </h1>
          <Link to="/services" className="text-sky-400 hover:underline">
            View all services
          </Link>
        </section>
      </PageShell>
    );
  }

  const Icon = service.icon;
  const related = servicePages.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <PageShell>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-sky-400 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            All Services
          </Link>
          <div className="w-16 h-16 bg-sky-500/15 rounded-2xl flex items-center justify-center mb-6">
            <Icon className="w-8 h-8 text-sky-400" />
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-white"
          >
            {service.h1}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-neutral-400 max-w-2xl mb-8"
          >
            {service.tagline}
          </motion.p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={TEL_HREF}
              className="px-8 py-4 bg-sky-500 text-white rounded-lg text-lg font-medium hover:bg-sky-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25"
            >
              <Phone className="w-5 h-5" />
              {PHONE}
            </a>
            <Link
              to="/contact"
              className="px-8 py-4 bg-white/5 text-white border border-white/20 rounded-lg text-lg font-medium hover:bg-white/10 transition-colors text-center"
            >
              Request a Free Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Intro + content */}
      <section className="py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <p className="text-xl text-neutral-300 leading-relaxed mb-12">
                {service.intro}
              </p>

              <div className="space-y-10">
                {service.sections.map((section) => (
                  <div key={section.h2}>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                      {section.h2}
                    </h2>
                    <p className="text-lg text-neutral-400 leading-relaxed">
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Features sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-white/5 border border-white/10 rounded-xl p-8 lg:sticky lg:top-24">
                <h2 className="text-xl font-bold text-white mb-6">
                  What&rsquo;s included
                </h2>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                      <span className="text-neutral-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="block w-full text-center px-6 py-3 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600 transition-colors"
                >
                  Get a Free Quote
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related services (internal links) */}
      <section className="py-16 bg-neutral-900 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Other services we offer
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/${r.slug}`}
                className="flex items-center gap-4 p-6 bg-white/5 border border-white/10 rounded-xl hover:border-sky-500/30 hover:bg-white/[0.08] transition-all group"
              >
                <div className="w-12 h-12 bg-sky-500/15 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500/25 transition-colors">
                  <r.icon className="w-6 h-6 text-sky-400" />
                </div>
                <span className="font-medium text-white">{r.navLabel}</span>
                <ArrowRight className="w-4 h-4 text-sky-400 ml-auto" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading={`Need ${service.navLabel.toLowerCase()} help in Manchester?`}
      />
    </PageShell>
  );
}
