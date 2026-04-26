import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router";

import {
  Hammer,
  Wrench,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Paintbrush,
  Droplets,
  Zap,
  Home,
  ShieldAlert,
  Settings,
  Star,
  ChevronDown,
  Menu,
  X,
  ArrowUp,
} from "lucide-react";

const PHONE = "07828 786 593";
const EMAIL = "Fixfasthomerepair@gmail.com";

export default function HomePage() {
  const heroRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.5]);

  useEffect(() => {
    const container = document.querySelector(".main-scroll-container");
    if (!container) return;
    const handleScroll = () => {
      setShowBackToTop(container.scrollTop > 600);
      setNavScrolled(container.scrollTop > 50);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTop = () => {
    const container = document.querySelector(".main-scroll-container");
    if (container) container.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { label: "Services", id: "services" },
    { label: "Our Work", id: "projects" },
    { label: "Why Us", id: "trust" },
    { label: "Reviews", id: "reviews" },
    { label: "Contact", id: "contact" },
  ];

  const services = [
    {
      icon: Droplets,
      title: "Plumbing & Electrical Work",
      description:
        "Expert plumbing and electrical services for your home. From leaky taps to light and switch installs, we handle it all.",
    },
    {
      icon: Home,
      title: "General Home Repairs",
      description:
        "No job too small. We fix doors, windows, flooring, walls and everything in between.",
    },
    {
      icon: Settings,
      title: "Maintenance Services",
      description:
        "Regular maintenance to keep your property in top condition year-round.",
    },
    {
      icon: Paintbrush,
      title: "Renovation & Remodelling",
      description:
        "Complete property renovations and remodelling to transform your living space.",
    },
    {
      icon: ShieldAlert,
      title: "Emergency Call Outs",
      description:
        "24/7 emergency response for urgent repairs. We're here when you need us most.",
    },
    {
      icon: Zap,
      title: "Electrical Work",
      description:
        "Certified electrical installations, repairs and safety inspections across Manchester.",
    },
  ];

  const testimonials = [
    {
      name: "A S",
      rating: 5,
      text: "Fantastic service, highly skilled and professional. Yunus was very speedy and responsive and got it sorted in a timely manner. No mess left behind unlike other tradespeople. Cannot recommend enough! Thank you.",
    },
    {
      name: "Josiah",
      rating: 5,
      text: "I had a great experience with Fix Fast Construction LTD. He came to my house to fix my wall heaters and replaced the ones that weren't working with brand-new units. The job was done professionally, efficiently, and to a very high standard.",
    },
    {
      name: "Divine Nwosu",
      rating: 5,
      text: "Eunice & the team at fix fast efficient & reliable. He arrived promptly and fixed the dishwasher within minutes would definitely recommend and I will be reaching out for any other issues.",
    },
    {
      name: "Elise McDowell",
      rating: 5,
      text: "When issues came up at my flat (e.g. a leak in the bathroom, electrical problems etc) it used to feel utterly overwhelming and stressful. Then I met Yunas and the team at fix fast home repairs. They are friendly, kind and excellent trades.",
    },
    {
      name: "Dannish Hussain",
      rating: 5,
      text: "Brilliant work from the team at Fixfast. Came in urgently and managed to solve a few issues (bathroom and lighting) I was having whilst describing it in great detail to me. Very professional, efficient and friendly.",
    },
    {
      name: "Roger Gibbons",
      rating: 5,
      text: "This is the third time I have used Fix Fast, and I am always satisfied with the work they have carried out. The price is reasonable and accurately reflects the quality of the work. I would definitely recommend them.",
    },
    {
      name: "Kate Coates",
      rating: 5,
      text: "Very impressed with Fix Fast's quick response to call outs and attention to detail with jobs at my rental property. Yunus is great to deal with and I would highly recommend them.",
    },
    {
      name: "Sarah Murenzi",
      rating: 5,
      text: "Excellent service from start to finish. The team quickly identified the source of the leak and installed a new panel and seal with great care and precision. They were extremely friendly, professional, and respectful throughout the visit.",
    },
    {
      name: "Sarah Jones",
      rating: 5,
      text: "I highly recommend Fix Fast Construction LTD. He arrived at the job quickly and was friendly and professional throughout.",
    },
  ];

  return (
    <div className="main-scroll-container size-full overflow-y-auto overflow-x-hidden bg-neutral-950 scroll-smooth">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          navScrolled
            ? "bg-neutral-950/95 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">Fix Fast <span className="text-sky-400">Construction</span></span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm text-neutral-400 hover:text-sky-400 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              className="text-neutral-300 hover:text-sky-400 transition-colors hidden sm:inline text-sm"
            >
              Get a Quote
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
            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-sky-400"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden bg-neutral-950/95 backdrop-blur-md border-t border-white/10"
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="block w-full text-left px-4 py-3 text-neutral-300 hover:bg-white/5 hover:text-sky-400 rounded-md transition-colors"
                  >
                    {link.label}
                  </button>
                ))}
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-left px-4 py-3 text-sky-400 font-medium hover:bg-white/5 rounded-md transition-colors"
                >
                  Get a Quote
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1605021149343-bb75d2a2fa44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Manchester Deansgate skyline"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/90 via-neutral-950/70 to-neutral-950/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/30" />
        </motion.div>

        <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-block mb-4 px-4 py-1.5 bg-sky-500/20 border border-sky-500/30 rounded-full text-sm font-medium text-sky-300"
            >
              Manchester's Trusted Home Repair Experts
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
            >
              Fix Fast
              <br />
              <span className="text-sky-400">Construction LTD</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl mb-8 text-neutral-300"
            >
              Your local experts who take pride in reliability, tidiness and
              friendly service.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href={`tel:${PHONE.replace(/\s/g, "")}`}
                className="px-8 py-4 bg-sky-500 text-white rounded-lg text-lg font-medium hover:bg-sky-600 transition-colors text-center flex items-center justify-center gap-2 shadow-lg shadow-sky-500/25"
              >
                <Phone className="w-5 h-5" />
                {PHONE}
              </a>
              <Link
                to="/contact"
                className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white border border-white/20 rounded-lg text-lg font-medium hover:bg-white/10 transition-colors text-center"
              >
                Free Quote
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.button
            onClick={() => scrollToSection("services")}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-white/50 hover:text-white transition-colors"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.button>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-neutral-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Specialising In
            </h2>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
              From small repairs to complete renovations, we deliver exceptional
              results across Manchester.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="p-8 bg-white/5 border border-white/10 rounded-xl hover:border-sky-500/30 hover:bg-white/[0.08] transition-all group cursor-pointer"
              >
                <div className="w-14 h-14 bg-sky-500/15 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sky-500/25 transition-colors">
                  <service.icon className="w-7 h-7 text-sky-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-neutral-400 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-neutral-950 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Work
            </h2>
            <p className="text-xl text-neutral-400">
              Real projects delivered across Manchester.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { image: "/projects/kitchen-2.jpg", title: "Kitchen Renovation", location: "Manchester" },
              { image: "/projects/bathroom.jpg", title: "Bathroom Refit", location: "Manchester" },
              { image: "/projects/garden.jpg", title: "Garden Decking", location: "Manchester" },
              { image: "/projects/pergola.jpg", title: "Pergola & Decking", location: "Manchester" },
              { image: "/projects/kitchen-1.jpg", title: "Kitchen Remodel", location: "Manchester" },
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer"
                style={{ perspective: "800px" }}
              >
                <motion.div
                  whileHover={{ rotateY: -4, rotateX: 4, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl group-hover:ring-sky-400/30 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold mb-1 drop-shadow-lg">{project.title}</h3>
                    <p className="text-neutral-300 text-sm drop-shadow-md">{project.location}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section id="trust" className="py-24 bg-neutral-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Manchester's Most Trusted Builders
              </h2>
              <p className="text-xl text-neutral-400 mb-8">
                Your local experts who take pride in reliability, tidiness and
                friendly service. We've built our reputation on quality work,
                fair pricing, and finishing on time.
              </p>

              <div className="space-y-4">
                {[
                  "Fully insured and certified",
                  "Transparent, fixed-price quotes",
                  "Clean, tidy and friendly service",
                  "12-month workmanship guarantee",
                  "Emergency call outs available",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6 text-sky-400 flex-shrink-0" />
                    <span className="text-lg text-neutral-300">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1642888622462-878e87572286?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                alt="Manchester city architecture"
                className="w-full rounded-xl border border-white/10"
              />
              <div className="absolute bottom-0 left-0 bg-sky-500 text-white p-6 md:p-8 rounded-tr-xl shadow-xl shadow-sky-500/20">
                <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
                <div className="text-base md:text-lg text-sky-100">Projects Completed</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="py-24 bg-neutral-950 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What Our Customers Say
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-xl font-bold text-white">5.0</span>
              <span className="text-neutral-500">on Google (77 reviews)</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.06, duration: 0.5 }}
                className="bg-white/5 border border-white/10 p-6 rounded-xl hover:border-sky-500/30 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center text-sky-400 font-bold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-white">
                      {testimonial.name}
                    </p>
                    <div className="flex gap-0.5">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-neutral-400 leading-relaxed text-sm">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-neutral-900 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-neutral-400">
              Get a free, no-obligation quote today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Phone,
                title: "Call Us",
                detail: PHONE,
                href: `tel:${PHONE.replace(/\s/g, "")}`,
              },
              {
                icon: Mail,
                title: "Email Us",
                detail: EMAIL,
                href: `mailto:${EMAIL}`,
              },
              {
                icon: MapPin,
                title: "Based In",
                detail: "Manchester, UK",
                href: "#",
              },
            ].map((contact, index) => (
              <motion.a
                key={contact.title}
                href={contact.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="text-center p-8 bg-white/5 border border-white/10 rounded-xl hover:border-sky-500/30 transition-all group"
              >
                <div className="w-14 h-14 bg-sky-500/15 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-500/25 transition-colors">
                  <contact.icon className="w-7 h-7 text-sky-400" />
                </div>
                <h3 className="text-lg font-medium text-neutral-400 mb-2">
                  {contact.title}
                </h3>
                <p className="text-lg md:text-xl font-bold text-white break-all">
                  {contact.detail}
                </p>
              </motion.a>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/contact"
              className="inline-block px-10 py-4 bg-sky-500 text-white rounded-lg text-lg font-medium hover:bg-sky-600 transition-colors shadow-lg shadow-sky-500/25"
            >
              Go to Contact Page
            </Link>
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

      {/* Floating Call Button (mobile) */}
      <a
        href={`tel:${PHONE.replace(/\s/g, "")}`}
        className="fixed bottom-6 right-6 z-40 sm:hidden w-14 h-14 bg-sky-500 text-white rounded-full shadow-lg shadow-sky-500/30 flex items-center justify-center hover:bg-sky-600 transition-colors active:scale-95"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6" />
      </a>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
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
