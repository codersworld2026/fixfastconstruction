import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { useSeo } from "../hooks/useSeo";
import { canonical, servicePages } from "../data/site";
import { PageShell } from "./site/PageShell";
import { CtaBand } from "./site/CtaBand";

export default function ServicesPage() {
  useSeo({
    title:
      "Construction, Plumbing & Electrical Services | FixFast Construction",
    description:
      "Explore FixFast Construction services including plumbing, electrical work, home repairs, renovations and emergency repair support.",
    canonical: canonical("/services"),
  });

  return (
    <PageShell>
      {/* Header */}
      <section className="pt-28 pb-16 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-white"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-neutral-400 max-w-2xl"
          >
            From plumbing and electrical work to full renovations and emergency
            call outs, FixFast Construction is your one trusted team for every
            job around your Manchester home.
          </motion.p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="sr-only">Services we offer in Manchester</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicePages.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.06, duration: 0.4 }}
              >
                <Link
                  to={`/${service.slug}`}
                  className="block h-full p-8 bg-white/5 border border-white/10 rounded-xl hover:border-sky-500/30 hover:bg-white/[0.08] transition-all group"
                >
                  <div className="w-14 h-14 bg-sky-500/15 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sky-500/25 transition-colors">
                    <service.icon className="w-7 h-7 text-sky-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {service.h1}
                  </h3>
                  <p className="text-neutral-400 leading-relaxed mb-5">
                    {service.tagline}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sky-400 text-sm font-medium group-hover:gap-2.5 transition-all">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">
            Why choose FixFast Construction
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Fully insured and certified tradespeople",
              "Transparent, fixed-price quotes",
              "Clean, tidy and friendly service",
              "12-month workmanship guarantee",
              "Emergency call outs available",
              "Trusted across Greater Manchester",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-sky-400 flex-shrink-0" />
                <span className="text-lg text-neutral-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading="Need a hand with your home?"
        subheading="Tell us what needs doing and we'll give you a fast, free, no-obligation quote."
      />
    </PageShell>
  );
}
