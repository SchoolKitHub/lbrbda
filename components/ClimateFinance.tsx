"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const cards = [
  {
    icon: "🌍",
    value: "$100B+",
    label: "Global Climate Finance Annually",
    desc: "Yet Africa receives less than 2% — a strategic gap for the Lower Benue Basin to capture.",
  },
  {
    icon: "💹",
    value: "10×",
    label: "Investment Multiplier",
    desc: "Every ₦2B domestic investment per state can attract ₦20B from global Climate and Green Funds.",
  },
  {
    icon: "📈",
    value: "₦80B",
    label: "Total Inflow Unlocked",
    desc: "An ₦8B domestic investment unlocks up to ₦80B total, expanding to ₦110-120B in annual economic activity per state.",
  },
];

export default function ClimateFinance() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section section-alt" id="finance" ref={ref}>
      <div className="container">
        <div className="section-header">
          <motion.div
            className="section-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            💰 Climate Finance Hub
          </motion.div>
          <motion.h2
            className="section-title"
            style={{ fontFamily: "var(--font-playfair), serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            The Economic{" "}
            <span className="highlight">Opportunity</span>
          </motion.h2>
          <div className="gold-divider" />
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            An investment-ready opportunity to position the Lower Benue Basin as
            a viable pipeline for global climate finance.
          </motion.p>
        </div>

        <div className="finance-grid">
          {cards.map((card, i) => (
            <motion.div
              className="finance-card"
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
            >
              <div className="finance-icon">{card.icon}</div>
              <div className="finance-value">{card.value}</div>
              <div className="finance-label">{card.label}</div>
              <p className="finance-desc">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="multiplier-visual"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <h3
            style={{
              textAlign: "center",
              marginBottom: "2rem",
              fontFamily: "var(--font-playfair), serif",
            }}
          >
            The{" "}
            <span className="highlight">Multiplier Effect</span>
          </h3>
          <div className="multiplier-flow">
            <div className="multiplier-step">
              <div className="multiplier-amount">₦2B</div>
              <div className="multiplier-desc">
                Strategic Domestic
                <br />
                Investment / State
              </div>
            </div>
            <div className="multiplier-arrow">→</div>
            <div className="multiplier-step">
              <div className="multiplier-amount">₦20B</div>
              <div className="multiplier-desc">
                Global Climate &
                <br />
                Green Funds
              </div>
            </div>
            <div className="multiplier-arrow">→</div>
            <div className="multiplier-step">
              <div className="multiplier-amount">₦80B</div>
              <div className="multiplier-desc">
                Total Economic
                <br />
                Inflow Unlocked
              </div>
            </div>
            <div className="multiplier-arrow">→</div>
            <div className="multiplier-step">
              <div className="multiplier-amount">₦120B</div>
              <div className="multiplier-desc">
                Annual Economic
                <br />
                Activity / State
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
