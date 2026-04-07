"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
}: {
  value: string;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <span className="stat-value">
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

const currentStats = [
  {
    icon: "💧",
    value: "<5%",
    label: "Irrigation coverage across the basin",
  },
  {
    icon: "📉",
    value: "₦3-5T",
    label: "National food import bill annually",
  },
  {
    icon: "🌊",
    value: "High",
    label: "Climate risks — flooding & drought cycles",
  },
];

const futureStats = [
  {
    icon: "🌾",
    value: "150,000+",
    label: "Hectares irrigated within 5 years",
  },
  {
    icon: "👷",
    value: "120,000+",
    label: "Jobs generated across the basin",
  },
  {
    icon: "💰",
    value: "₦125B",
    label: "Annual food import bill reduction per state",
  },
];

export default function CurrentVsFuture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section section-alt" id="reality" ref={ref}>
      <div className="container">
        <div className="section-header">
          <motion.div
            className="section-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            📊 The Transformation Agenda
          </motion.div>
          <motion.h2
            className="section-title"
            style={{ fontFamily: "var(--font-playfair), serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Our Current Reality vs.{" "}
            <span className="highlight">The Future</span>
          </motion.h2>
          <div className="gold-divider" />
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Transforming from a legacy institution to an engine of Middle-Belt
            food production — delivering food security, jobs, and
            climate-financed economic growth.
          </motion.p>
        </div>

        <div className="reality-grid">
          <motion.div
            className="reality-panel current"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            <div className="panel-icon">⚠️</div>
            <h3 className="panel-title red">Current Reality</h3>
            <p className="panel-desc">
              Critical challenges threatening food security and agricultural
              productivity in the basin.
            </p>
            <div className="stat-grid">
              {currentStats.map((stat, i) => (
                <div className="stat-item" key={i}>
                  <span className="stat-icon">{stat.icon}</span>
                  <div className="stat-info">
                    <h4 style={{ color: "#ef4444" }}>
                      <AnimatedCounter value={stat.value} />
                    </h4>
                    <p>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="reality-panel future"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <div className="panel-icon">🚀</div>
            <h3 className="panel-title green">The Future Vision</h3>
            <p className="panel-desc">
              Bold targets that will position the basin as Africa&apos;s leading
              agricultural corridor.
            </p>
            <div className="stat-grid">
              {futureStats.map((stat, i) => (
                <div className="stat-item" key={i}>
                  <span className="stat-icon">{stat.icon}</span>
                  <div className="stat-info">
                    <h4 style={{ color: "#2d8f5e" }}>
                      <AnimatedCounter value={stat.value} />
                    </h4>
                    <p>{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
