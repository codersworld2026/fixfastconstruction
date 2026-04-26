import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router";

import {
  Hammer,
  Phone,
  Mail,
  MapPin,
  ArrowLeft,
  Send,
  Droplets,
  Zap,
  Paintbrush,
  Home,
  ShieldAlert,
  Settings,
} from "lucide-react";

const PHONE = "07828 786 593";
const EMAIL = "Fixfasthomerepair@gmail.com";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="size-full overflow-y-auto overflow-x-hidden bg-neutral-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">Fix Fast <span className="text-sky-400">Construction</span></span>
          </Link>
          <a
            href={`https://wa.me/44${PHONE.replace(/\s/g, "").slice(1)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
            aria-label="WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          </a>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-28 pb-16 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-sky-400 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4 text-white"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-neutral-400 max-w-2xl"
          >
            Get in touch for a free, no-obligation quote. We're here to help
            with all your home repair and construction needs.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 bg-neutral-950 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: Phone,
                title: "Phone",
                detail: PHONE,
                href: `tel:${PHONE.replace(/\s/g, "")}`,
              },
              {
                icon: Mail,
                title: "Email",
                detail: EMAIL,
                href: `mailto:${EMAIL}`,
              },
              {
                icon: MapPin,
                title: "Location",
                detail: "Manchester, UK",
                href: "#",
              },
            ].map((item, index) => (
              <motion.a
                key={item.title}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="flex items-start gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:border-sky-500/30 hover:bg-white/[0.08] transition-all group"
              >
                <div className="w-12 h-12 bg-sky-500/15 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500/25 transition-colors">
                  <item.icon className="w-6 h-6 text-sky-400" />
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">{item.title}</p>
                  <p className="font-bold text-white break-all">
                    {item.detail}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Services */}
      <section className="py-20 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">
                Send Us a Message
              </h2>

              {submitted ? (
                <div className="p-12 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-400 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-green-300/80">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-neutral-600 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                        placeholder="John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-neutral-600 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                        placeholder="07xxx xxx xxx"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-neutral-600 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                      Service Required
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                    >
                      <option value="" className="bg-neutral-900">Select a service...</option>
                      <option className="bg-neutral-900">Plumbing & Electrical Work</option>
                      <option className="bg-neutral-900">General Home Repairs</option>
                      <option className="bg-neutral-900">Maintenance Services</option>
                      <option className="bg-neutral-900">Renovation & Remodelling</option>
                      <option className="bg-neutral-900">Emergency Call Out</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-400 mb-2">
                      Tell us about your project
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-neutral-600 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all resize-none"
                      placeholder="Describe the work you need..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-sky-500 text-white rounded-lg text-lg font-medium hover:bg-sky-600 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Services sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">
                Our Services
              </h2>
              <div className="space-y-4">
                {[
                  { icon: Droplets, label: "Plumbing and Electrical work" },
                  { icon: Home, label: "General Home Repairs" },
                  { icon: Settings, label: "Maintenance Services" },
                  { icon: Paintbrush, label: "Renovation and Remodelling" },
                  { icon: ShieldAlert, label: "Emergency Call outs" },
                ].map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-center gap-4 p-5 bg-white/5 rounded-xl border border-white/10 hover:border-sky-500/30 hover:bg-white/[0.08] transition-all group"
                  >
                    <div className="w-12 h-12 bg-sky-500/15 rounded-lg flex items-center justify-center group-hover:bg-sky-500/25 transition-colors">
                      <s.icon className="w-6 h-6 text-sky-400" />
                    </div>
                    <span className="text-lg font-medium text-neutral-200">
                      {s.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA card */}
              <div className="mt-8 p-8 bg-sky-500 rounded-xl text-white shadow-lg shadow-sky-500/20">
                <h3 className="text-2xl font-bold mb-3">Need urgent help?</h3>
                <p className="text-sky-100 mb-6">
                  We offer emergency call outs across Greater Manchester.
                </p>
                <a
                  href={`tel:${PHONE.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-sky-600 rounded-lg font-medium hover:bg-sky-50 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  Call {PHONE}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-neutral-950 border-t border-white/10 text-neutral-500 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-lg font-bold text-white">Fix Fast <span className="text-sky-400">Construction</span></span>
          </div>
          <p className="text-sm">
            &copy; 2026 Fix Fast Construction LTD. Serving Greater Manchester
            with pride.
          </p>
        </div>
      </footer>
    </div>
  );
}
