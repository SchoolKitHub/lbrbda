"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { trackRoadmapPhaseView } from "@/lib/analytics";

const phases = [
  {
    phase: "Phase 1",
    period: "0 – 36 Months (Year 1-2)",
    title: "Foundation & Pilot Zones",
    desc: "Infrastructure rehabilitation, pilot irrigation zones across the four states. Target: 5,000 – 10,000 hectares under modern solar-powered irrigation systems.",
    output: "₦25 Billion annual yield per state",
    icon: "🏗️",
    image: "/phase1.png",
    imageAlt: "Solar-powered irrigation infrastructure with dam in background",
  },
  {
    phase: "Phase 2",
    period: "3 – 6 Years",
    title: "Scale & Industrialize",
    desc: "Expand irrigation to 25,000+ hectares per state. Launch agro-industrial clusters with processing zones, cold storage, and logistics infrastructure connecting the basin to national and export markets.",
    output: "₦75 Billion per state annually",
    icon: "🏭",
    image: "/phase2.png",
    imageAlt: "Agro-industrial processing facility with grain silos and logistics",
  },
  {
    phase: "Phase 3",
    period: "5 – 10 Years",
    title: "Full Basin Optimization",
    desc: "Complete optimization across 75,000 hectares per state with export-driven production, precision agriculture drones, smart greenhouses, and digital monitoring across the entire corridor.",
    output: "₦150 – ₦250 Billion annual economic value",
    icon: "🌍",
    image: "/phase3.png",
    imageAlt: "Futuristic smart agriculture with drones and digital monitoring",
  },
];

export default function Roadmap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section" id="roadmap" ref={ref}>
      <div className="container">
        <div className="section-header">
          <motion.div
            className="section-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            🗓️ Implementation Roadmap
          </motion.div>
          <motion.h2
            className="section-title"
            style={{ fontFamily: "var(--font-playfair), serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            The Path to{" "}
            <span className="highlight">Transformation</span>
          </motion.h2>
          <div className="gold-divider" />
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            A phased approach to achieving full basin optimization and
            positioning the Lower Benue as Africa&apos;s agricultural powerhouse.
          </motion.p>
        </div>

        {/* Image-rich phase cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          {phases.map((phase, i) => (
            <motion.div
              className="phase-card"
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.2, duration: 0.7 }}
              onViewportEnter={() => trackRoadmapPhaseView(phase.phase)}
            >
              {/* Image side */}
              <div
                className="phase-card-image"
                style={{ order: i % 2 === 0 ? 0 : 1 }}
              >
                <Image
                  src={phase.image}
                  alt={phase.imageAlt}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div
                  className={
                    i % 2 === 0
                      ? "phase-card-image-overlay-left"
                      : "phase-card-image-overlay-right"
                  }
                />
              </div>

              {/* Content side */}
              <div
                className="phase-card-content"
                style={{ order: i % 2 === 0 ? 1 : 0 }}
              >
                <span className="timeline-phase" style={{ alignSelf: "flex-start" }}>
                  {phase.icon} {phase.phase}
                </span>
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--color-text-muted)",
                    margin: "0.5rem 0",
                  }}
                >
                  {phase.period}
                </p>
                <h3
                  className="timeline-title"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  {phase.title}
                </h3>
                <p className="timeline-desc">{phase.desc}</p>
                <div className="phase-card-output">
                  <p
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--color-text-muted)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    Projected Output
                  </p>
                  <p
                    className="timeline-output"
                    style={{ fontSize: "1.2rem", margin: 0 }}
                  >
                    📊 {phase.output}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full-width climate-smart banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.0, duration: 0.7 }}
          style={{
            marginTop: "3rem",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            position: "relative",
            minHeight: "300px",
            border: "1px solid var(--color-dark-border)",
          }}
        >
          <Image
            src="/climate-smart.png"
            alt="Climate-smart farming with precision irrigation and monitoring systems"
            fill
            style={{ objectFit: "cover" }}
            sizes="100vw"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg, rgba(10,22,40,0.85) 0%, rgba(13,74,46,0.6) 100%)",
              zIndex: 1,
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 2,
              padding: "3rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              minHeight: "300px",
            }}
          >
            <div style={{ maxWidth: "600px" }}>
              <h3
                style={{
                  fontFamily: "var(--font-playfair), serif",
                  fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                  marginBottom: "1rem",
                }}
              >
                Climate-Smart Agriculture for a{" "}
                <span className="highlight">Resilient Future</span>
              </h3>
              <p
                style={{
                  color: "var(--color-text-secondary)",
                  fontSize: "1.05rem",
                  lineHeight: "1.7",
                }}
              >
                Precision drip irrigation, drought-resistant crops, solar-powered
                water management, and digital monitoring systems — building
                resilience against climate volatility across the basin.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
