import {
  Droplets,
  Zap,
  Home,
  Bath,
  Utensils,
  ShieldAlert,
  type LucideIcon,
} from "lucide-react";

export const SITE_URL = "https://fixfastconstruction.com";
export const PHONE = "07828 786 593";
export const EMAIL = "Fixfasthomerepair@gmail.com";

/** tel: href with spaces stripped */
export const TEL_HREF = `tel:${PHONE.replace(/\s/g, "")}`;
/** WhatsApp link: +44, drop the leading 0 */
export const WHATSAPP_HREF = `https://wa.me/44${PHONE.replace(/\s/g, "").slice(1)}`;

/** Build an absolute canonical URL for a given path ("/", "/contact", ...). */
export function canonical(path: string): string {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path}`;
}

export interface ServicePage {
  slug: string; // path without leading slash, e.g. "plumbing-services"
  navLabel: string; // short label for nav/footer
  icon: LucideIcon;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  tagline: string;
  intro: string;
  sections: { h2: string; body: string }[];
  features: string[];
}

export const servicePages: ServicePage[] = [
  {
    slug: "plumbing-services",
    navLabel: "Plumbing",
    icon: Droplets,
    seoTitle: "Plumbing Services in Manchester | FixFast Construction",
    seoDescription:
      "Reliable plumbing services in Manchester from FixFast Construction. Leak repairs, tap and toilet installs, blockages and bathroom plumbing. Get a fast, free quote.",
    h1: "Plumbing Services in Manchester",
    tagline:
      "Fast, tidy and reliable plumbing for homes and rental properties across Greater Manchester.",
    intro:
      "From a dripping tap to a full bathroom plumbing install, FixFast Construction handles plumbing jobs of every size. Our plumbers turn up on time, work cleanly and explain exactly what needs doing before any work starts.",
    sections: [
      {
        h2: "What our plumbers do",
        body: "We repair leaks, replace taps, toilets and showers, clear blocked sinks and drains, fix low water pressure and install washing machines and dishwashers. If water runs through it, we can fix or fit it.",
      },
      {
        h2: "Emergency plumbing when you need it",
        body: "Burst pipes and leaks rarely happen at a convenient time. We offer rapid emergency call outs across Manchester to stop the damage and put things right quickly.",
      },
      {
        h2: "Why Manchester homeowners choose FixFast",
        body: "Fully insured, fair fixed-price quotes and a 12-month workmanship guarantee. We treat your home with respect and always clean up after ourselves.",
      },
    ],
    features: [
      "Leak detection and repair",
      "Tap, toilet and shower installation",
      "Blocked sink and drain clearance",
      "Bathroom and kitchen plumbing",
      "Appliance installation",
      "Emergency plumbing call outs",
    ],
  },
  {
    slug: "electrical-services",
    navLabel: "Electrical",
    icon: Zap,
    seoTitle: "Electrical Services in Manchester | FixFast Construction",
    seoDescription:
      "Certified electrical services in Manchester. Sockets, lighting, fault finding, safety inspections and rewiring. Fast, professional electricians — get a free quote.",
    h1: "Electrical Services in Manchester",
    tagline:
      "Safe, certified electrical work for homes and landlords throughout Greater Manchester.",
    intro:
      "Electrical work should always be done safely and to standard. FixFast Construction provides certified electrical installations, repairs and inspections, so your home is safe and everything works exactly as it should.",
    sections: [
      {
        h2: "Electrical work we carry out",
        body: "We install and replace sockets, switches and light fittings, fit spotlights and outdoor lighting, find and fix faults, upgrade fuse boards and carry out full or partial rewires.",
      },
      {
        h2: "Electrical safety inspections",
        body: "Whether you're a homeowner or a landlord needing an EICR, we carry out thorough electrical safety inspections and provide clear, honest reports on what needs attention.",
      },
      {
        h2: "Local, certified and reliable",
        body: "Our electricians are experienced and fully insured. We quote up front, work tidily and make sure every job is left safe and signed off.",
      },
    ],
    features: [
      "Socket and switch installation",
      "Lighting and spotlight fitting",
      "Electrical fault finding",
      "Fuse board upgrades",
      "Full and partial rewiring",
      "Safety inspections and EICRs",
    ],
  },
  {
    slug: "home-repairs",
    navLabel: "Home Repairs",
    icon: Home,
    seoTitle: "Home Repairs in Manchester | FixFast Construction",
    seoDescription:
      "Professional home repairs in Manchester. Doors, windows, flooring, walls, fixtures and general maintenance. No job too small — get fast, reliable help today.",
    h1: "Home Repairs in Manchester",
    tagline:
      "Your local handyman team for the jobs around the house that never seem to get done.",
    intro:
      "Some jobs are too small for a big contractor but too important to ignore. FixFast Construction takes care of everyday home repairs and maintenance quickly and to a high standard — no job is too small.",
    sections: [
      {
        h2: "Repairs and odd jobs we handle",
        body: "We fix and hang doors, repair windows, lay and patch flooring, plaster and repair walls, put up shelves and fixtures, and tackle the long list of small jobs most tradespeople won't.",
      },
      {
        h2: "Property maintenance for landlords",
        body: "We help landlords and letting agents keep rental properties in great condition with reliable, responsive maintenance between tenancies and throughout the year.",
      },
      {
        h2: "One call, sorted",
        body: "Rather than chasing several tradespeople, call FixFast once and we'll handle the lot — tidily, on time and at a fair fixed price.",
      },
    ],
    features: [
      "Door hanging and repairs",
      "Window and lock repairs",
      "Flooring repairs and fitting",
      "Plastering and wall repairs",
      "Shelving and fixture fitting",
      "General property maintenance",
    ],
  },
  {
    slug: "bathroom-renovations",
    navLabel: "Bathrooms",
    icon: Bath,
    seoTitle: "Bathroom Renovations in Manchester | FixFast Construction",
    seoDescription:
      "Full bathroom renovations in Manchester. Design, plumbing, tiling and fitting for stylish, functional bathrooms. Get a free quote from FixFast Construction.",
    h1: "Bathroom Renovations in Manchester",
    tagline:
      "Beautiful, practical bathrooms designed and fitted by one trusted local team.",
    intro:
      "A new bathroom should look great and work flawlessly for years. FixFast Construction manages your bathroom renovation from first idea to final clean — plumbing, tiling, electrics and fitting all handled in-house.",
    sections: [
      {
        h2: "A complete bathroom service",
        body: "We strip out the old, reconfigure the layout if needed, install baths, showers, basins and toilets, tile walls and floors, and finish with lighting and ventilation — all by our own team.",
      },
      {
        h2: "Bathrooms built around you",
        body: "Whether it's a compact en-suite or a full family bathroom, we help you choose a layout and finish that suits your space, your style and your budget.",
      },
      {
        h2: "One team, no stress",
        body: "Because we cover plumbing, electrics and finishing ourselves, there's no juggling trades — just one reliable team and one clear quote.",
      },
    ],
    features: [
      "Full bathroom design and fitting",
      "Bath, shower and wet room installation",
      "Wall and floor tiling",
      "Bathroom plumbing and electrics",
      "Ventilation and lighting",
      "Complete removal and clean up",
    ],
  },
  {
    slug: "kitchen-renovations",
    navLabel: "Kitchens",
    icon: Utensils,
    seoTitle: "Kitchen Renovations in Manchester | FixFast Construction",
    seoDescription:
      "Complete kitchen renovations in Manchester. Fitting, plumbing, electrics and finishing for your dream kitchen. Get a free, no-obligation quote today.",
    h1: "Kitchen Renovations in Manchester",
    tagline:
      "Stunning, hard-working kitchens fitted by a team that takes pride in the details.",
    intro:
      "The kitchen is the heart of the home, so it pays to get it right. FixFast Construction delivers complete kitchen renovations across Manchester — from removing the old units to the final coat of paint.",
    sections: [
      {
        h2: "Everything your new kitchen needs",
        body: "We fit kitchen units and worktops, install sinks, taps and appliances, handle plumbing and electrics, tile splashbacks and finish flooring, decorating and lighting.",
      },
      {
        h2: "Planned around your life",
        body: "We work with you on layout and finishes to make the most of your space, and plan the work to keep disruption to your home and routine as low as possible.",
      },
      {
        h2: "Quality you can rely on",
        body: "Fixed-price quotes, fully insured work and a 12-month workmanship guarantee — so you can enjoy your new kitchen with complete peace of mind.",
      },
    ],
    features: [
      "Kitchen unit and worktop fitting",
      "Appliance installation",
      "Kitchen plumbing and electrics",
      "Splashback and floor tiling",
      "Lighting and decorating",
      "Full project management",
    ],
  },
  {
    slug: "emergency-repairs",
    navLabel: "Emergency",
    icon: ShieldAlert,
    seoTitle: "Emergency Repairs in Manchester | FixFast Construction",
    seoDescription:
      "24/7 emergency repairs in Manchester. Rapid response for plumbing leaks, electrical faults and urgent property issues. Call FixFast Construction now.",
    h1: "Emergency Repairs in Manchester",
    tagline:
      "Urgent help when something goes wrong — fast response across Greater Manchester.",
    intro:
      "When a pipe bursts or the power fails, you need help fast. FixFast Construction offers emergency call outs across Manchester to make your property safe and put the problem right as quickly as possible.",
    sections: [
      {
        h2: "Emergencies we respond to",
        body: "Burst pipes and serious leaks, electrical faults and loss of power, broken locks and insecure doors, and any urgent issue that puts your home or safety at risk.",
      },
      {
        h2: "Fast, focused and fair",
        body: "We aim to reach you quickly, stop the immediate damage and explain your options clearly — with no inflated emergency mark-ups or surprises.",
      },
      {
        h2: "Call us first",
        body: `For the quickest response, call us straight away on ${PHONE}. We'll talk through the problem and get to you as soon as possible.`,
      },
    ],
    features: [
      "Burst pipe and leak response",
      "Electrical fault call outs",
      "Lock and door security repairs",
      "Rapid Manchester-wide response",
      "Clear, honest pricing",
      "Friendly, professional help",
    ],
  },
];

export function getServiceBySlug(slug: string): ServicePage | undefined {
  return servicePages.find((s) => s.slug === slug);
}

/** Primary nav links used across the new pages. */
export const navPages: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];
