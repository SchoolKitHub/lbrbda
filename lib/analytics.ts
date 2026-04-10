import posthog from "posthog-js";

/* ============================================
   LBRBDA Analytics — Custom Event Helpers
   ============================================
   Thin wrappers around posthog.capture() that enforce
   a consistent event taxonomy across the site.
   ============================================ */

// ---- Section identifiers ----
export type SectionId =
  | "hero"
  | "reality"
  | "highlights"
  | "finance"
  | "roadmap"
  | "map"
  | "board"
  | "contact";

// ---- Page-level ----
export function trackPageView(path: string) {
  posthog.capture("$pageview", { path });
}

// ---- Section engagement ----
export function trackSectionView(section: SectionId) {
  posthog.capture("section_viewed", { section });
}

export function trackSectionTimeSpent(section: SectionId, durationMs: number) {
  posthog.capture("section_time_spent", {
    section,
    duration_ms: durationMs,
    duration_seconds: Math.round(durationMs / 1000),
  });
}

// ---- Scroll depth ----
export function trackScrollDepth(percent: number) {
  posthog.capture("scroll_depth", { percent });
}

// ---- Click events ----
export function trackCTAClick(
  cta: string,
  location: string,
  props?: Record<string, unknown>
) {
  posthog.capture("cta_clicked", { cta, location, ...props });
}

export function trackNavClick(destination: string) {
  posthog.capture("nav_clicked", { destination });
}

// ---- Interactive Map ----
export function trackMapStateClick(state: string) {
  posthog.capture("map_state_clicked", { state });
}

export function trackMapStateHover(state: string) {
  posthog.capture("map_state_hovered", { state });
}

// ---- Board Slider ----
export function trackBoardMemberView(name: string, title: string) {
  posthog.capture("board_member_viewed", { name, title });
}

// ---- Countdown ----
export function trackCountdownSeen(daysRemaining: number) {
  posthog.capture("countdown_seen", { days_remaining: daysRemaining });
}

// ---- Contact ----
export function trackContactLinkClick(linkType: string) {
  posthog.capture("contact_link_clicked", { link_type: linkType });
}

// ---- Climate Finance ----
export function trackFinanceCardView(cardTitle: string) {
  posthog.capture("finance_card_viewed", { card_title: cardTitle });
}

// ---- Roadmap ----
export function trackRoadmapPhaseView(phase: string) {
  posthog.capture("roadmap_phase_viewed", { phase });
}
