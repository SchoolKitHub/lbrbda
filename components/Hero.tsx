"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function CountdownTimer() {
  const targetDate = useMemo(() => new Date("2026-06-12T00:00:00").getTime(), []);
  const [mounted, setMounted] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);
    const calc = () => {
      const now = Date.now();
      const diff = Math.max(0, targetDate - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="countdown">
        {["Days", "Hours", "Minutes", "Seconds"].map((label, i) => (
          <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem" }}>
            {i > 0 && <span className="countdown-separator">:</span>}
            <div className="countdown-item">
              <span className="countdown-value">00</span>
              <span className="countdown-label">{label}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="countdown">
      {(
        [
          ["days", "Days"],
          ["hours", "Hours"],
          ["minutes", "Minutes"],
          ["seconds", "Seconds"],
        ] as const
      ).map(([key, label], i) => (
        <div key={key} style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem" }}>
          {i > 0 && <span className="countdown-separator">:</span>}
          <div className="countdown-item">
            <span className="countdown-value">
              {String(timeLeft[key]).padStart(2, "0")}
            </span>
            <span className="countdown-label">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${seededRandom(i * 7 + 1) * 100}%`,
        delay: `${seededRandom(i * 13 + 2) * 8}s`,
        duration: `${6 + seededRandom(i * 19 + 3) * 6}s`,
        size: `${2 + seededRandom(i * 23 + 4) * 4}px`,
      })),
    []
  );

  return (
    <div className="hero-particles">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <Image
          src="/hero-bg.png"
          alt="Lower Benue River Basin aerial view"
          fill
          priority
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="hero-overlay" />
      <Particles />

      <div className="hero-content">
        <motion.div
          className="hero-logo"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/jubilee-logo.png"
            alt="LBRBDA 50th Anniversary Logo"
            width={160}
            height={160}
            priority
          />
        </motion.div>

        <motion.div
          className="hero-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          🏛️ Golden Jubilee 2026
        </motion.div>

        <motion.h1
          className="hero-title"
          style={{ fontFamily: "var(--font-playfair), serif" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          50 Years of{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #c9a84c 0%, #e8d48b 50%, #c9a84c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Strategic Repositioning
          </span>
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Advancing the Renewed Hope Agenda in Water and Agricultural
          Transformation — under a visionary leadership driving food security,
          climate resilience, and economic empowerment across the Middle Belt.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <a href="#finance" className="btn-primary">
            🌍 Explore Investment Opportunities
          </a>
          <a href="#map" className="btn-outline">
            🗺️ Explore the Basin
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <CountdownTimer />
        </motion.div>
      </div>
    </section>
  );
}
