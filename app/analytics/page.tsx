"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface AnalyticsEvent {
  event: string;
  timestamp: string;
  properties: Record<string, any>;
}

export default function AnalyticsDashboard() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [activeSession, setActiveSession] = useState<string | null>(null);

  useEffect(() => {
    // Poll for events captured by the current client
    // Since we don't have a backend to fetch history, we'll listen to the local PostHog instance's capture calls
    // We can monkey-patch posthog.capture for this session view
    const originalCapture = posthog.capture.bind(posthog);
    
    posthog.capture = (event: string, properties?: Record<string, any>) => {
      const newEvent = {
        event,
        timestamp: new Date().toLocaleTimeString(),
        properties: properties || {},
      };
      setEvents((prev) => [newEvent, ...prev].slice(0, 50));
      return originalCapture(event, properties);
    };

    setActiveSession(posthog.get_session_id());

    return () => {
      posthog.capture = originalCapture;
    };
  }, []);

  return (
    <div className="analytics-dashboard">
      <div className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Live Explorer</h1>
            <p className="dashboard-subtitle">Session Insights & Activity Stream</p>
          </div>
          <Link href="/" className="btn-outline compact">
            ← Back to Site
          </Link>
        </header>

        <div className="dashboard-grid">
          {/* Stats Row */}
          <div className="stats-row">
            <div className="stat-card glass-card">
              <div className="stat-icon-mini">📡</div>
              <div className="stat-info-mini">
                <span className="stat-label-mini">Session Status</span>
                <span className="stat-value-mini green">Active</span>
              </div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-icon-mini">📊</div>
              <div className="stat-info-mini">
                <span className="stat-label-mini">Events Captured</span>
                <span className="stat-value-mini">{events.length}</span>
              </div>
            </div>
            <div className="stat-card glass-card">
              <div className="stat-icon-mini">🆔</div>
              <div className="stat-info-mini">
                <span className="stat-label-mini">Session ID</span>
                <span className="stat-value-mini truncate" style={{ maxWidth: '120px' }}>
                  {activeSession || "Initializing..."}
                </span>
              </div>
            </div>
          </div>

          <div className="dashboard-main">
            <div className="activity-section glass-card">
              <div className="section-header-mini">
                <h3>Live Activity Feed</h3>
                <span className="pulse-dot"></span>
              </div>
              
              <div className="activity-feed">
                <AnimatePresence initial={false}>
                  {events.length === 0 ? (
                    <div className="empty-state">
                      <p>Interact with the site to see events appear here in real-time.</p>
                    </div>
                  ) : (
                    events.map((ev, i) => (
                      <motion.div
                        key={i + ev.timestamp}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="activity-item"
                      >
                        <div className="activity-time">{ev.timestamp}</div>
                        <div className="activity-details">
                          <span className="event-name">{ev.event}</span>
                          <div className="event-props">
                            {Object.entries(ev.properties)
                              .filter(([key]) => !key.startsWith("$"))
                              .map(([k, v]) => (
                                <span key={k} className="prop-tag">
                                  {k}: {String(v)}
                                </span>
                              ))}
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="insights-sidebar">
              <div className="glass-card">
                <h4>Privacy & Transparency</h4>
                <p className="sidebar-text">
                  This dashboard uses <strong>PostHog</strong> to monitor user interactions.
                  All data is anonymized and used exclusively to improve the platform experience.
                </p>
                <div className="gold-divider" style={{ margin: '1rem 0' }} />
                <h4>Implementation</h4>
                <ul className="sidebar-list">
                  <li>Automatic Section Tracking</li>
                  <li>Scroll Depth Checkpoints</li>
                  <li>Interactive Map Heatmaps</li>
                  <li>CTA Click Attribution</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
