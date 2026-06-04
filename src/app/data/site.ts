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

/** Greater Manchester areas we cover (shared across service pages). */
export const AREAS: string[] = [
  "Manchester city centre",
  "Didsbury",
  "Chorlton",
  "Withington",
  "Fallowfield",
  "Levenshulme",
  "Salford",
  "Eccles",
  "Prestwich",
  "Whitefield",
  "Bury",
  "Stockport",
  "Cheadle",
  "Sale",
  "Altrincham",
  "Urmston",
  "Trafford",
  "Wythenshawe",
];

export interface Faq {
  q: string;
  a: string;
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
  breakdown: { h2: string; body: string }[];
  commonProblems: string[];
  whyChoose: { title: string; body: string }[];
  faqs: Faq[];
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
      "When something goes wrong with your plumbing, you need a team that turns up quickly, works cleanly and gets it right first time. FixFast Construction provides trusted plumbing services for homeowners and landlords across Greater Manchester — from a single dripping tap to the full plumbing behind a brand-new bathroom. Every job is carried out by experienced, fully insured plumbers who respect your home, explain the work clearly and leave everything tidy.",
    breakdown: [
      {
        h2: "Leak detection and repair",
        body: "Even a small leak can lead to damp, mould and expensive damage if it's left unchecked. We trace the source of leaks under sinks, behind walls and beneath floors, then carry out a lasting repair rather than a quick patch. If a pipe has burst, we'll isolate the supply fast to protect your home and get the water flowing again safely.",
      },
      {
        h2: "Taps, toilets, showers and basins",
        body: "We supply and fit taps, toilets, showers, basins and waste systems to a high standard. Whether you're replacing a tired old tap or upgrading to a modern shower, we'll advise on the right fit for your space and water pressure, install it cleanly and test everything thoroughly before we leave.",
      },
      {
        h2: "Blockages and drainage",
        body: "Slow or blocked sinks, baths and toilets are more than an annoyance. We clear blockages quickly and check for any underlying cause so the problem doesn't keep returning. You'll always get a clear explanation of what caused it and simple advice on how to avoid it happening again.",
      },
      {
        h2: "Bathroom and kitchen plumbing",
        body: "Planning a new bathroom or kitchen? We handle all the plumbing behind the scenes — moving supply and waste pipes, connecting appliances and making sure everything runs safely. It links straight into our wider bathroom and kitchen renovation work, so one trusted team manages the whole project.",
      },
    ],
    commonProblems: [
      "Dripping or stiff taps",
      "Leaking pipes and joints",
      "Blocked sinks, baths and toilets",
      "Running or weak-flushing toilets",
      "Low or inconsistent water pressure",
      "No hot water",
      "Burst or frozen pipes",
      "Faulty washing machine or dishwasher connections",
    ],
    whyChoose: [
      {
        title: "Fully insured plumbers",
        body: "Every plumber on our team is experienced and fully insured, so you're protected and confident from the first visit to the final test.",
      },
      {
        title: "Fast response",
        body: "Plumbing problems can't wait. We aim to get to you quickly and offer emergency call outs across Greater Manchester whenever water is involved.",
      },
      {
        title: "Honest, fixed pricing",
        body: "You'll get a clear, fixed-price quote before we start — no hidden extras and no surprises, just fair pricing for quality work.",
      },
      {
        title: "Clean and respectful",
        body: "We protect your floors, work tidily and clear up before we leave. Most of our work comes from repeat customers and word-of-mouth recommendations.",
      },
    ],
    faqs: [
      {
        q: "Do you charge for a quote?",
        a: "No. We provide free, no-obligation quotes for plumbing work. We'll explain exactly what's needed and what it will cost before any work begins.",
      },
      {
        q: "Can you help with a plumbing emergency?",
        a: "Yes. We offer emergency call outs across Greater Manchester for burst pipes, serious leaks and loss of water. Call us as soon as you notice a problem and we'll get to you as quickly as we can.",
      },
      {
        q: "Are your plumbers insured?",
        a: "Absolutely. All of our work is carried out by experienced, fully insured tradespeople, and we stand behind every job with a 12-month workmanship guarantee.",
      },
      {
        q: "Will you fit taps and fittings I've bought myself?",
        a: "Yes, we're happy to fit fixtures you've supplied, or we can recommend and provide quality products that suit your home and budget.",
      },
      {
        q: "Which areas do you cover?",
        a: "We serve homeowners and landlords right across Greater Manchester, including the city centre, Didsbury, Chorlton, Salford, Stockport and the surrounding towns.",
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
      "Electrical work should always be carried out safely and to standard — it's not somewhere to cut corners. FixFast Construction provides certified electrical services for homeowners and landlords across Greater Manchester, covering everything from a single socket to a full rewire. Our electricians are experienced, fully insured and tidy, and we'll always make sure your home is left safe, tested and working exactly as it should.",
    breakdown: [
      {
        h2: "Sockets, switches and lighting",
        body: "We install and replace sockets, switches, light fittings and spotlights, add extra power where you need it and fit indoor and outdoor lighting. Whether you want a brighter kitchen, more sockets in a home office or stylish lighting throughout, we'll do it neatly and safely.",
      },
      {
        h2: "Fault finding and repairs",
        body: "Tripping fuses, dead sockets and flickering lights usually point to a fault that needs proper investigation. We diagnose electrical problems methodically, explain what we find in plain English and carry out a safe, lasting repair — never just a temporary fix.",
      },
      {
        h2: "Fuse board upgrades and rewiring",
        body: "Older consumer units and ageing wiring can be unsafe and unreliable. We upgrade fuse boards to modern standards and carry out full or partial rewires, planning the work to cause as little disruption to your home as possible.",
      },
      {
        h2: "Electrical safety inspections",
        body: "Whether you're a homeowner wanting peace of mind or a landlord who needs an EICR, we carry out thorough electrical safety inspections and provide a clear, honest report on anything that needs attention.",
      },
    ],
    commonProblems: [
      "Fuses or breakers that keep tripping",
      "Flickering or dimming lights",
      "Dead or scorched sockets",
      "A burning smell near outlets",
      "Old or unsafe fuse boards",
      "No power to a room or circuit",
      "Faulty light fittings and switches",
      "Not enough sockets for your needs",
    ],
    whyChoose: [
      {
        title: "Certified and insured",
        body: "Our electrical work is carried out by qualified, fully insured electricians and completed to current safety standards.",
      },
      {
        title: "Safety first",
        body: "We never cut corners on electrics. Every job is tested and left safe, with clear advice on anything you should keep an eye on.",
      },
      {
        title: "Clear, fixed pricing",
        body: "You'll know the cost before we start. Our quotes are fixed and fair, with no inflated charges or hidden extras.",
      },
      {
        title: "Tidy and reliable",
        body: "We turn up when we say we will, work cleanly around your home and tidy up properly once the job is done.",
      },
    ],
    faqs: [
      {
        q: "Do you provide EICRs for landlords?",
        a: "Yes. We carry out Electrical Installation Condition Reports for landlords and provide a clear report, so you can meet your responsibilities and keep tenants safe.",
      },
      {
        q: "Is your electrical work certified?",
        a: "Yes. Our electrical work is completed to current safety standards by qualified, insured electricians, and backed by our 12-month workmanship guarantee.",
      },
      {
        q: "Can you fix a fuse that keeps tripping?",
        a: "We can. A repeatedly tripping fuse usually means a fault on a circuit or appliance. We'll find the cause safely and put it right rather than just resetting it.",
      },
      {
        q: "Do you take on small electrical jobs?",
        a: "Definitely — no job is too small. From a single socket or light fitting to extra sockets and outdoor lighting, we're happy to help.",
      },
      {
        q: "Which areas do you cover?",
        a: "We work across Greater Manchester, including the city centre, Salford, Stockport, Trafford, Bury and the surrounding areas.",
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
      "Some jobs are too small for a big contractor but too important to ignore. FixFast Construction takes care of everyday home repairs and property maintenance across Greater Manchester quickly and to a high standard — and no job is too small. Instead of chasing several different tradespeople, you can call one reliable, fully insured team to work through your whole list, tidily and at a fair fixed price.",
    breakdown: [
      {
        h2: "Doors, windows and locks",
        body: "We ease and rehang sticking doors, fix and replace handles and locks, sort draughty or jammed windows and improve the security of your home. Small repairs like these make a big difference to how your house feels day to day.",
      },
      {
        h2: "Walls, plastering and decorating prep",
        body: "Cracks, holes and tired walls are quickly put right. We patch and repair plaster, fill and make good, and prepare surfaces ready for decorating so everything looks clean and finished.",
      },
      {
        h2: "Flooring and tiling repairs",
        body: "From squeaky or loose floorboards to cracked tiles and worn flooring, we carry out neat repairs that blend in and last. We can also re-seal around baths, sinks and worktops to keep water where it belongs.",
      },
      {
        h2: "Fixtures, fittings and flat-pack",
        body: "Shelves, mirrors, blinds, curtain poles, TV brackets and flat-pack furniture all fitted securely and level. It's the kind of job that's easy to put off — so let us tick it off the list for you.",
      },
    ],
    commonProblems: [
      "Sticking or dropped doors",
      "Broken handles, hinges and locks",
      "Cracked or damaged plaster",
      "Holes and marks in walls",
      "Loose or squeaky floorboards",
      "Failing sealant around baths and sinks",
      "Shelves and fixtures to put up",
      "General wear and tear",
    ],
    whyChoose: [
      {
        title: "No job too small",
        body: "We're happy to take on the small, fiddly jobs many tradespeople won't — and we do them properly.",
      },
      {
        title: "One team, one call",
        body: "Rather than juggling several trades, you get one reliable team to handle your whole list in a single visit where possible.",
      },
      {
        title: "Fully insured",
        body: "All of our work is carried out by experienced, fully insured tradespeople and backed by a 12-month workmanship guarantee.",
      },
      {
        title: "Fair and tidy",
        body: "Clear fixed prices, friendly service and a proper clean-up before we leave — that's how we've built our reputation.",
      },
    ],
    faqs: [
      {
        q: "Is any job too small?",
        a: "No. Small repairs are exactly what we're here for. If it's on your to-do list and needs doing properly, we're happy to help.",
      },
      {
        q: "Can you do several jobs in one visit?",
        a: "Yes, and it often saves you money. Send us your list and we'll work through as much as we can in a single, well-planned visit.",
      },
      {
        q: "Do you help landlords with maintenance?",
        a: "We do. We keep rental properties in great condition for landlords and letting agents with reliable, responsive maintenance between and during tenancies.",
      },
      {
        q: "Do you charge for a quote?",
        a: "Never. Quotes are free and come with no obligation. We'll give you a clear price before any work starts.",
      },
      {
        q: "Which areas do you cover?",
        a: "We cover homes right across Greater Manchester, including Didsbury, Chorlton, Sale, Prestwich, Stockport and nearby areas.",
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
      "A new bathroom should look great and work flawlessly for years. FixFast Construction manages your bathroom renovation from the first idea to the final clean, handling the plumbing, tiling, electrics and fitting all under one roof. Because one experienced, fully insured team covers every trade, there's no juggling contractors and no gaps — just a smooth project, a clear fixed price and a finish you'll be proud of, anywhere across Greater Manchester.",
    breakdown: [
      {
        h2: "Design and planning",
        body: "We start by understanding how you want to use the space, then help you plan a layout, suite and finish that work for your room and budget. Good planning up front is what keeps a renovation on time and stress-free.",
      },
      {
        h2: "Strip-out and installation",
        body: "We carefully remove your old bathroom, make any changes to the layout, and install baths, showers, basins and toilets to a high standard. Everything is fitted properly and tested so it performs as well as it looks.",
      },
      {
        h2: "Tiling and finishing",
        body: "Crisp, level tiling makes all the difference to a bathroom. We tile walls and floors neatly, seal everything against water and finish with the details that turn a functional room into one you enjoy using.",
      },
      {
        h2: "Plumbing, electrics and ventilation",
        body: "From moving pipework to fitting safe lighting, shaver points and extraction to keep damp and mould at bay, we handle all the behind-the-walls work that a lasting bathroom depends on.",
      },
    ],
    commonProblems: [
      "Dated bathrooms in need of a refresh",
      "Leaks, damp and persistent mould",
      "Awkward or wasteful layouts",
      "Cracked tiles and failing grout",
      "Weak or unreliable showers",
      "Poor lighting and ventilation",
      "Limited space in small bathrooms",
      "Accessibility and walk-in shower needs",
    ],
    whyChoose: [
      {
        title: "One team, no stress",
        body: "We cover plumbing, electrics, tiling and fitting in-house, so you deal with one trusted team and one clear quote from start to finish.",
      },
      {
        title: "Built around you",
        body: "Whether it's a compact en-suite or a full family bathroom, we tailor the layout and finish to your space, your style and your budget.",
      },
      {
        title: "Fully insured work",
        body: "Your renovation is carried out by experienced, fully insured tradespeople and backed by a 12-month workmanship guarantee.",
      },
      {
        title: "Fixed-price quotes",
        body: "You'll have a clear, fixed price before we begin, so you can plan your project with complete confidence.",
      },
    ],
    faqs: [
      {
        q: "How long does a bathroom renovation take?",
        a: "Most bathrooms take around one to two weeks depending on the size and the work involved. We'll give you a realistic timescale with your quote and keep you updated throughout.",
      },
      {
        q: "Do you supply the bathroom suite and tiles?",
        a: "We can supply everything or fit items you've chosen yourself. Either way, we'll happily advise on options that suit your space and budget.",
      },
      {
        q: "Can you fit small en-suites or wet rooms?",
        a: "Yes. We renovate everything from compact en-suites and cloakrooms to full family bathrooms and walk-in wet rooms.",
      },
      {
        q: "Will my home be left in a mess?",
        a: "No. We protect your home while we work, keep things as tidy as possible and carry out a full clean before we hand the bathroom back to you.",
      },
      {
        q: "Which areas do you cover?",
        a: "We carry out bathroom renovations across Greater Manchester, including Didsbury, Chorlton, Sale, Altrincham, Stockport and the surrounding areas.",
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
      "The kitchen is the heart of the home, so it pays to get it right. FixFast Construction delivers complete kitchen renovations across Greater Manchester — from removing the old units to the final coat of paint. One experienced, fully insured team manages the whole project, handling units, worktops, appliances, plumbing, electrics and finishing, so the work runs smoothly, stays on budget and disrupts your home as little as possible.",
    breakdown: [
      {
        h2: "Planning your kitchen",
        body: "A great kitchen starts with a great plan. We work with you on layout, storage and finishes to make the most of your space and the way you actually cook and live, then set out clear timings before any work begins.",
      },
      {
        h2: "Fitting units and worktops",
        body: "We install kitchen units and worktops precisely and securely, with doors and drawers aligned and finished to a high standard. Solid fitting is what makes a kitchen feel premium and last for years.",
      },
      {
        h2: "Appliances, plumbing and electrics",
        body: "We connect sinks, taps, hobs, ovens and integrated appliances, and handle the plumbing and electrical work behind them — including extra sockets and lighting — all done safely and to standard.",
      },
      {
        h2: "Tiling, flooring and finishing",
        body: "We finish your kitchen with splashback tiling, durable flooring, lighting and decorating, paying attention to the small details that pull the whole room together.",
      },
    ],
    commonProblems: [
      "Tired, dated kitchen units",
      "Poor layout and not enough storage",
      "Damaged or worn worktops",
      "Faulty or outdated appliances",
      "Too few sockets and weak lighting",
      "Leaks under sinks and around taps",
      "Cracked tiles and worn flooring",
      "Kitchens that don't suit how you live",
    ],
    whyChoose: [
      {
        title: "Full project management",
        body: "One team handles every trade from start to finish, so your kitchen project runs smoothly without you having to coordinate contractors.",
      },
      {
        title: "Quality fitting",
        body: "We take pride in precise, durable fitting and the small details that make a kitchen feel genuinely well made.",
      },
      {
        title: "Fully insured",
        body: "Your renovation is completed by experienced, fully insured tradespeople and backed by a 12-month workmanship guarantee.",
      },
      {
        title: "Fixed, fair pricing",
        body: "You'll get a clear, fixed-price quote up front so there are no surprises along the way.",
      },
    ],
    faqs: [
      {
        q: "How long does a kitchen renovation take?",
        a: "A typical kitchen takes around two to three weeks depending on the size and complexity. We'll give you a clear schedule with your quote and keep you informed at every stage.",
      },
      {
        q: "Do you supply the kitchen or fit one I've bought?",
        a: "Both. We can fit a kitchen you've purchased or help you choose and supply one. We'll always advise on what works best for your space and budget.",
      },
      {
        q: "Can I still use my kitchen during the work?",
        a: "There will be some disruption, but we plan the work to keep your kitchen usable for as long as possible and minimise the time you're without it.",
      },
      {
        q: "Do you offer a free quote?",
        a: "Yes. We provide free, no-obligation quotes for kitchen renovations, with a clear price before any work starts.",
      },
      {
        q: "Which areas do you cover?",
        a: "We renovate kitchens across Greater Manchester, including the city centre, Chorlton, Sale, Prestwich, Stockport and nearby areas.",
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
      "Fast emergency repairs in Manchester. Rapid response for plumbing leaks, electrical faults and urgent property issues. Call FixFast Construction now.",
    h1: "Emergency Repairs in Manchester",
    tagline:
      "Urgent help when something goes wrong — fast response across Greater Manchester.",
    intro:
      "When a pipe bursts, the power fails or your home is left insecure, you need help fast. FixFast Construction offers rapid emergency call outs across Greater Manchester to make your property safe and put the problem right as quickly as possible. We're experienced, fully insured and straight-talking — we'll stop the immediate damage, explain your options clearly and get things back to normal, without the inflated emergency mark-ups some firms add when you're under pressure.",
    breakdown: [
      {
        h2: "Plumbing emergencies",
        body: "Burst pipes, serious leaks, overflowing toilets and loss of water are all jobs we respond to quickly. We'll isolate the supply, stop the damage and carry out a safe repair so your home is protected and usable again.",
      },
      {
        h2: "Electrical emergencies",
        body: "A sudden loss of power, a fuse that won't reset or a burning smell from a socket needs urgent, careful attention. We diagnose electrical faults safely and make the situation secure before completing a proper repair.",
      },
      {
        h2: "Security and weatherproofing",
        body: "A broken lock, a smashed window or a door that won't secure leaves your home vulnerable. We carry out fast repairs to make your property safe and weather-tight again, day or night.",
      },
      {
        h2: "What to do while you wait",
        body: "If it's safe, turn off the water at the stopcock for a leak, or switch off the power at the consumer unit for an electrical fault. Then call us — we'll talk you through the next steps and get to you as soon as we can.",
      },
    ],
    commonProblems: [
      "Burst or leaking pipes",
      "Major water leaks and flooding",
      "Complete loss of power",
      "Fuses that won't reset",
      "Burning smell from sockets",
      "Broken locks and insecure doors",
      "Smashed or unsafe windows",
      "Overflowing toilets and drains",
    ],
    whyChoose: [
      {
        title: "Fast response",
        body: "We prioritise emergencies and aim to reach you quickly across Greater Manchester to limit the damage and stress.",
      },
      {
        title: "Fair pricing",
        body: "We don't inflate our prices just because it's urgent. You'll get honest, transparent pricing even in an emergency.",
      },
      {
        title: "Experienced and insured",
        body: "Our fully insured tradespeople have handled countless urgent jobs and know how to make a property safe quickly and properly.",
      },
      {
        title: "Calm, clear help",
        body: "We'll explain what's happening in plain English and tell you exactly what we're doing and why, so you're never left in the dark.",
      },
    ],
    faqs: [
      {
        q: "How quickly can you get to me?",
        a: "We prioritise emergencies and aim to reach you as fast as possible across Greater Manchester. Call us and we'll give you a realistic time and advice for the meantime.",
      },
      {
        q: "Do you charge more for emergency call outs?",
        a: "We keep our pricing honest and transparent. We won't take advantage of an urgent situation with inflated charges — you'll know the cost clearly.",
      },
      {
        q: "What should I do first in an emergency?",
        a: "If it's safe, turn off the water at the stopcock for a leak, or switch off the power at the consumer unit for an electrical fault, then call us straight away.",
      },
      {
        q: "Are you available outside normal hours?",
        a: "Yes. We offer emergency call outs for urgent problems that can't wait. For the fastest response, call us directly rather than emailing.",
      },
      {
        q: "Which areas do you cover?",
        a: "We respond to emergencies across Greater Manchester, including the city centre, Salford, Stockport, Trafford, Bury and the surrounding areas.",
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
