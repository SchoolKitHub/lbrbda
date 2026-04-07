"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CurrentVsFuture from "@/components/CurrentVsFuture";
import JubileeHighlights from "@/components/JubileeHighlights";
import ClimateFinance from "@/components/ClimateFinance";
import Roadmap from "@/components/Roadmap";
import Contact from "@/components/Contact";

const InteractiveMap = dynamic(() => import("@/components/InteractiveMap"), {
  ssr: false,
});

const BoardSlider = dynamic(() => import("@/components/BoardSlider"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <CurrentVsFuture />
        <JubileeHighlights />
        <ClimateFinance />
        <Roadmap />
        <InteractiveMap />
        <BoardSlider />
        <Contact />
      </main>
      <footer className="footer">
        <p>
          © 2026 Lower Benue River Basin Development Authority (LBRBDA). All
          rights reserved. 50 Years of Development & Resilience.
        </p>
      </footer>
    </>
  );
}
