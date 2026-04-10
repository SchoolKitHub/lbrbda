"use client";

import { useEffect, useRef, useCallback } from "react";
import posthog from "posthog-js";
import {
  trackSectionView,
  trackSectionTimeSpent,
  trackScrollDepth,
  type SectionId,
} from "@/lib/analytics";

/* ============================================
   AnalyticsProvider
   ============================================
   Wraps the page and automatically tracks:
   • Section visibility (via IntersectionObserver)
   • Time-on-section (entry/exit timestamps)
   • Max scroll depth (25/50/75/100 checkpoints)
   ============================================ */

const SECTION_IDS: SectionId[] = [
  "hero",
  "reality",
  "highlights",
  "finance",
  "roadmap",
  "map",
  "board",
  "contact",
];

const SCROLL_THRESHOLDS = [25, 50, 75, 100];

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const sectionTimers = useRef<Map<string, number>>(new Map());
  const reportedScrollDepths = useRef<Set<number>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ---- Section visibility observer ----
  const setupSectionObservers = useCallback(() => {
    if (typeof window === "undefined") return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id as SectionId;
          if (!sectionId) return;

          if (entry.isIntersecting) {
            // Section entered viewport
            trackSectionView(sectionId);
            sectionTimers.current.set(sectionId, Date.now());
          } else {
            // Section left viewport — calculate dwell time
            const enterTime = sectionTimers.current.get(sectionId);
            if (enterTime) {
              const duration = Date.now() - enterTime;
              if (duration > 1000) {
                // Only track if >1s
                trackSectionTimeSpent(sectionId, duration);
              }
              sectionTimers.current.delete(sectionId);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe all sections
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
  }, []);

  // ---- Scroll depth tracker ----
  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    const scrollPercent = Math.round(
      (window.scrollY / scrollHeight) * 100
    );

    SCROLL_THRESHOLDS.forEach((threshold) => {
      if (
        scrollPercent >= threshold &&
        !reportedScrollDepths.current.has(threshold)
      ) {
        reportedScrollDepths.current.add(threshold);
        trackScrollDepth(threshold);
      }
    });
  }, []);

  useEffect(() => {
    // Wait for DOM sections to render
    const timer = setTimeout(() => {
      setupSectionObservers();
    }, 500);

    // Scroll tracking (throttled)
    let scrollTimeout: ReturnType<typeof setTimeout>;
    const throttledScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 200);
    };
    window.addEventListener("scroll", throttledScroll, { passive: true });

    // Track session start properties
    posthog.capture("session_start", {
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
      device_type:
        window.innerWidth < 768
          ? "mobile"
          : window.innerWidth < 1024
          ? "tablet"
          : "desktop",
      referrer: document.referrer || "direct",
      user_agent: navigator.userAgent,
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", throttledScroll);
      observerRef.current?.disconnect();
    };
  }, [setupSectionObservers, handleScroll]);

  return <>{children}</>;
}
