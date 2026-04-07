"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const events = [
  {
    icon: "🏛️",
    title: "National Agricultural Investment Summit",
    desc: "High-level gathering of policymakers, investors, and development partners to unlock strategic funding for basin-wide agricultural transformation.",
  },
  {
    icon: "💧",
    title: "Smart Irrigation Expansion Plan",
    desc: "Launch of solar-powered irrigation systems across pilot zones, targeting 10,000 hectares of newly irrigated farmland within 36 months.",
  },
  {
    icon: "🌍",
    title: "Climate Finance Roundtable",
    desc: "Connecting the Lower Benue Basin with global Climate, Adaptation and Green Funds to mobilize ₦80B+ in total investments.",
  },
  {
    icon: "🎖️",
    title: "Presidential Recognition Event",
    desc: "Celebrating 50 years of service with a landmark ceremony honoring the institution's journey from legacy agency to growth engine.",
  },
  {
    icon: "🎬",
    title: "Legacy Documentary",
    desc: "A cinematic telling of the LBRBDA story — documenting five decades of resilience, impact, and the vision for the next frontier.",
  },
];

export default function JubileeHighlights() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section" id="highlights" ref={ref}>
      <div className="container">
        <div className="section-header">
          <motion.div
            className="section-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            🎉 2026 Jubilee Events
          </motion.div>
          <motion.h2
            className="section-title"
            style={{ fontFamily: "var(--font-playfair), serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Golden Jubilee{" "}
            <span className="highlight">Highlights</span>
          </motion.h2>
          <div className="gold-divider" />
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Five landmark events that will define the next chapter of
            agricultural transformation in the Middle Belt.
          </motion.p>
        </div>

        <div className="highlights-grid">
          {events.map((event, i) => (
            <motion.div
              className="highlight-card"
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            >
              <div className="highlight-number">{i + 1}</div>
              <div className="highlight-icon">{event.icon}</div>
              <h3 className="highlight-title">{event.title}</h3>
              <p className="highlight-desc">{event.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
