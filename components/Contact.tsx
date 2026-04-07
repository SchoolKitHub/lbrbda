"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section contact-section" id="contact" ref={ref}>
      <div className="contact-bg" />
      <div className="container">
        <div className="contact-content">
          <motion.div
            className="section-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{ display: "inline-flex" }}
          >
            🤝 Partner With Us
          </motion.div>

          <motion.h2
            className="contact-title"
            style={{ fontFamily: "var(--font-playfair), serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Join Us in{" "}
            <span className="highlight">Transforming</span> the Lower Benue
            Basin
          </motion.h2>

          <motion.p
            className="contact-desc"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Join us in transforming the Lower Benue Basin into Africa&apos;s
            leading climate-smart agricultural corridor. Whether you&apos;re a
            government partner, investor, or development agency — there&apos;s a
            place for you in this transformation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <a href="mailto:info@lbrbda.gov.ng" className="btn-primary">
              🌍 Get In Touch
            </a>
          </motion.div>

          <motion.div
            className="contact-links"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="contact-link-item">
              <span>🏛️</span>
              <span>Federal Ministry of Water Resources & Sanitation</span>
            </div>
            <div className="contact-link-item">
              <span>💼</span>
              <span>Investment Facilitation Unit — LBRBDA</span>
            </div>
            <div className="contact-link-item">
              <span>🌾</span>
              <span>
                Project Sponsor: Lower Benue River Basin Development Authority
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
