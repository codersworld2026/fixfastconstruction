import { Link } from "react-router";
import { motion } from "motion/react";
import {
  Phone,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Clock,
  PoundSterling,
  MapPin,
  Wrench,
} from "lucide-react";

import { useSeo } from "../hooks/useSeo";
import {
  PHONE,
  TEL_HREF,
  AREAS,
  canonical,
  getServiceBySlug,
  servicePages,
} from "../data/site";
import { PageShell } from "./site/PageShell";
import { CtaBand } from "./site/CtaBand";

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "Fully insured" },
  { icon: Clock, label: "Fast response" },
  { icon: PoundSterling, label: "Free quotes" },
  { icon: CheckCircle2, label: "12-month guarantee" },
];

export default function ServiceDetailPage({ slug }: { slug: string }) {
  const service = getServiceBySlug(slug);

  const faqJsonLd = service
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: service.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  useSeo({
    title: service?.seoTitle ?? "Services | FixFast Construction",
    description:
      service?.seoDescription ??
      "Professional home repair and construction services in Manchester.",
    canonical: canonical(service ? `/${service.slug}` : "/services"),
    jsonLd: faqJsonLd,
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
  const related = servicePages
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

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

          {/* Trust badges */}
          <div className="flex flex-wrap gap-3 mb-8">
            {TRUST_BADGES.map((badge) => (
              <span
                key={badge.label}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-neutral-300"
              >
                <badge.icon className="w-4 h-4 text-sky-400" />
                {badge.label}
              </span>
            ))}
          </div>

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

      {/* Intro + breakdown + common problems + sidebar */}
      <section className="py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <p className="text-xl text-neutral-300 leading-relaxed mb-12">
                {service.intro}
              </p>

              {/* Service breakdown */}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                What we do
              </h2>
              <div className="space-y-10 mb-14">
                {service.breakdown.map((section) => (
                  <div key={section.h2}>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                      {section.h2}
                    </h3>
                    <p className="text-lg text-neutral-400 leading-relaxed">
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* Common problems */}
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Common problems we fix
              </h2>
              <p className="text-lg text-neutral-400 leading-relaxed mb-6">
                If you're dealing with any of the following, we can help — and if
                your issue isn't listed, just ask. There's very little we
                haven't seen and put right.
              </p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {service.commonProblems.map((problem) => (
                  <li key={problem} className="flex items-start gap-3">
                    <Wrench className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                    <span className="text-neutral-300">{problem}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar */}
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
                <a
                  href={TEL_HREF}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 mb-3 bg-sky-500 text-white rounded-lg font-medium hover:bg-sky-600 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {PHONE}
                </a>
                <Link
                  to="/contact"
                  className="block w-full text-center px-6 py-3 bg-white/5 border border-white/20 text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  Get a Free Quote
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Why choose FixFast */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Why choose FixFast Construction
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mb-12">
            We've built our reputation across Greater Manchester on reliable,
            tidy work and honest pricing. Here's what you can expect when you
            choose us.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {service.whyChoose.map((reason) => (
              <div
                key={reason.title}
                className="flex gap-4 p-6 bg-white/5 border border-white/10 rounded-xl"
              >
                <CheckCircle2 className="w-6 h-6 text-sky-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed">
                    {reason.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Areas we cover */}
      <section className="py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-7 h-7 text-sky-400" />
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Areas we cover
            </h2>
          </div>
          <p className="text-lg text-neutral-400 max-w-2xl mb-10">
            FixFast Construction provides {service.navLabel.toLowerCase()} help
            to homeowners and landlords right across Greater Manchester. If you
            don&rsquo;t see your area listed, get in touch — we very likely cover
            it.
          </p>
          <div className="flex flex-wrap gap-3">
            {AREAS.map((area) => (
              <span
                key={area}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-neutral-300"
              >
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq) => (
              <div
                key={faq.q}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <h3 className="text-lg font-bold text-white mb-2">{faq.q}</h3>
                <p className="text-neutral-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related services (internal links) */}
      <section className="py-16 bg-neutral-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
            Related services
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
        subheading="Get a fast, free, no-obligation quote from a fully insured local team you can trust."
      />
    </PageShell>
  );
}
