import posthog from "posthog-js";

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_TOKEN!, {
  api_host: "/ingest",
  ui_host: "https://us.posthog.com",
  defaults: "2026-01-30",
  capture_pageview: true,
  capture_pageleave: true,
  capture_heatmaps: true,
  person_profiles: 'identified_only',
});
