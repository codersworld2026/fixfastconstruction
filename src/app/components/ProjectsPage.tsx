import { motion } from "motion/react";

import { useSeo } from "../hooks/useSeo";
import { canonical } from "../data/site";
import { PageShell } from "./site/PageShell";
import { CtaBand } from "./site/CtaBand";

const projects = [
  {
    image: "/projects/kitchen-2.jpg",
    title: "Kitchen Renovation",
    location: "Manchester",
  },
  {
    image: "/projects/bathroom.jpg",
    title: "Bathroom Refit",
    location: "Manchester",
  },
  {
    image: "/projects/garden.jpg",
    title: "Garden Decking",
    location: "Manchester",
  },
  {
    image: "/projects/pergola.jpg",
    title: "Pergola & Decking",
    location: "Manchester",
  },
  {
    image: "/projects/kitchen-1.jpg",
    title: "Kitchen Remodel",
    location: "Manchester",
  },
];

export default function ProjectsPage() {
  useSeo({
    title: "Our Work & Projects | FixFast Construction Manchester",
    description:
      "See recent work from FixFast Construction across Manchester — kitchens, bathrooms, decking and more. Get inspired, then request a free quote for your project.",
    canonical: canonical("/projects"),
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
            Our Work
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-neutral-400 max-w-2xl"
          >
            A selection of recent projects delivered across Greater Manchester —
            from kitchens and bathrooms to gardens and outdoor builds.
          </motion.p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="sr-only">Recent projects in Manchester</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-white/10 shadow-2xl shadow-black/40"
              >
                <img
                  src={project.image}
                  alt={`${project.title} in ${project.location} by FixFast Construction`}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-70" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1 drop-shadow-lg">
                    {project.title}
                  </h3>
                  <p className="text-neutral-300 text-sm drop-shadow-md">
                    {project.location}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        heading="Like what you see?"
        subheading="Let's talk about your project. Get a fast, free quote from FixFast Construction today."
      />
    </PageShell>
  );
}
