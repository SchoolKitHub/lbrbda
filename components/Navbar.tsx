"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { trackNavClick } from "@/lib/analytics";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Vision", href: "#reality" },
  { label: "Events", href: "#highlights" },
  { label: "Finance", href: "#finance" },
  { label: "Roadmap", href: "#roadmap" },
  { label: "Map", href: "#map" },
  { label: "Board", href: "#board" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} id="main-navbar">
      <div className="navbar-inner">
        <a href="#hero" className="navbar-logo">
          <Image
            src="/jubilee-logo.png"
            alt="LBRBDA Logo"
            width={60}
            height={60}
          />
          <div className="navbar-logo-text">
            LBRBDA
            <span>Golden Jubilee 2026</span>
          </div>
        </a>
        <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => {
                  trackNavClick(link.label);
                  setMenuOpen(false);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
}
