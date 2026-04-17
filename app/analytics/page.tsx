"use client";

import { useEffect, useState, useMemo } from "react";
import posthog from "posthog-js";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface AnalyticsEvent {
  event: string;
  timestamp: string;
  properties: Record<string, any>;
}

interface Visitor {
  id: string;
  ip: string;
  country: string;
  countryCode: string;
  device: string;
  browser: string;
  os: string;
  lastActive: string;
  status: "online" | "idle" | "offline";
}

export default function AnalyticsDashboard() {
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [currentVisitorInfo, setCurrentVisitorInfo] = useState<any>(null);
  const [realVisitors, setRealVisitors] = useState<Visitor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real visitors from our bridge API
  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const res = await fetch('/api/analytics/visitors');
        if (res.ok) {
          const data = await res.json();
          setRealVisitors(data);
        }
      } catch (e) {
        console.error("Failed to fetch live visitors:", e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisitors();
    const interval = setInterval(fetchVisitors, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Collect specific properties for the "Current Visitor" visualization
    const interval = setInterval(() => {
      const info = {
        browser: posthog.get_property('$browser'),
        os: posthog.get_property('$os'),
        device: posthog.get_property('$device_type') || 'Desktop',
        screen: `${window.innerWidth}x${window.innerHeight}`,
        path: window.location.pathname,
      };
      if (info.browser) {
        setCurrentVisitorInfo(info);
        clearInterval(interval);
      }
    }, 1000);

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
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="analytics-page">
      <div className="analytics-container">
        {/* Header */}
        <header className="analytics-header">
          <div className="header-left">
            <div className="dashboard-badge">System Live</div>
            <h1 className="dashboard-title">Basin Intelligence <span className="highlight">Command</span></h1>
            <p className="dashboard-subtitle">Monitoring Golden Jubilee Digital Engagement</p>
          </div>
          <div className="header-right">
            <Link href="/" className="btn-primary compact">
              <span>🏠</span> Back to Base
            </Link>
          </div>
        </header>

        {/* Global Overview Section */}
        <div className="analytics-grid">
          {/* Main Visualizer: Traffic Distribution */}
          <div className="visualizer-card glass-card">
            <div className="card-header">
              <h3>Visitor Distribution</h3>
              <div className="header-actions">
                <span className="live-pill">Live Updates</span>
              </div>
            </div>
            
            <div className="distribution-content">
              <div className="country-list">
                {[
                  { name: 'Nigeria', count: 1242, color: '#4ade80', percent: 65 },
                  { name: 'United States', count: 312, color: '#3b82f6', percent: 18 },
                  { name: 'United Kingdom', count: 184, color: '#c9a84c', percent: 10 },
                  { name: 'Others', count: 132, color: '#94a3b8', percent: 7 },
                ].map((c) => (
                  <div key={c.name} className="country-item">
                    <div className="country-info">
                      <span className="country-name">{c.name}</span>
                      <span className="country-count">{c.count}</span>
                    </div>
                    <div className="progress-bg">
                      <motion.div 
                        className="progress-fill" 
                        initial={{ width: 0 }}
                        animate={{ width: `${c.percent}%` }}
                        style={{ backgroundColor: c.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="device-chart">
                <div className="chart-circle">
                  <div className="chart-inner">
                    <span className="chart-total">1.8k</span>
                    <span className="chart-label">Total Visits</span>
                  </div>
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="circle color-mobile" strokeDasharray="60, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="circle color-desktop" strokeDasharray="30, 100" strokeDashoffset="-60" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    <path className="circle color-tablet" strokeDasharray="10, 100" strokeDashoffset="-90" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  </svg>
                </div>
                <div className="chart-legend">
                  <div className="legend-item"><span className="dot mobile" /> Mobile (60%)</div>
                  <div className="legend-item"><span className="dot desktop" /> Desktop (30%)</div>
                  <div className="legend-item"><span className="dot tablet" /> Tablet (10%)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Monitor */}
          <div className="monitor-card glass-card">
            <div className="card-header">
              <h3>Network Activity</h3>
              <div className="session-id">SID: {activeSession?.slice(0, 8) || '...'}</div>
            </div>
            
            <div className="visitor-table-wrapper">
              <table className="visitor-table">
                <thead>
                  <tr>
                    <th>Visitor ID</th>
                    <th>IP Address</th>
                    <th>Region</th>
                    <th>Device / OS</th>
                    <th>Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {realVisitors.map((v) => (
                    <tr key={v.id}>
                      <td className="vis-id">
                        <span className={`status-icon ${v.status}`} />
                        {v.id}
                      </td>
                      <td className="vis-ip">{v.ip}</td>
                      <td className="vis-geo">
                        <span className="flag-icon">{v.countryCode === 'NG' ? '🇳🇬' : v.countryCode === 'US' ? '🇺🇸' : v.countryCode === 'GB' ? '🇬🇧' : '🌍'}</span>
                        {v.country}
                      </td>
                      <td className="vis-device">
                        <span className="dev-name">{v.device}</span>
                        <span className="os-tag">{v.os}</span>
                      </td>
                      <td className="vis-time">{v.lastActive}</td>
                    </tr>
                  ))}
                  {isLoading && realVisitors.length === 0 && (
                    <tr>
                      <td colSpan={5} className="vis-loading">Syncing with Basin Intelligence...</td>
                    </tr>
                  )}
                  {!isLoading && realVisitors.length === 0 && (
                    <tr>
                      <td colSpan={5} className="vis-empty">No external signals detected.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Lower Grid: Activity Stream & Raw Feed */}
        <div className="secondary-grid">
          <div className="feed-card glass-card">
            <div className="card-header">
              <h3>Live Event Stream</h3>
              <div className="event-counter">{events.length} Captures</div>
            </div>
            <div className="stream-container">
              <AnimatePresence initial={false}>
                {events.map((ev, i) => (
                  <motion.div
                    key={i + ev.timestamp}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="stream-item"
                  >
                    <div className="stream-time">{ev.timestamp}</div>
                    <div className="stream-content">
                      <span className="stream-event">{ev.event.replace('_', ' ')}</span>
                      <div className="stream-tags">
                        {Object.entries(ev.properties)
                          .filter(([key]) => !key.startsWith("$"))
                          .slice(0, 3)
                          .map(([k, v]) => (
                            <span key={k} className="tag-pill">{k}: {String(v)}</span>
                          ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              {events.length === 0 && (
                <div className="stream-empty">
                  Waiting for system signals...
                </div>
              )}
            </div>
          </div>

          <div className="system-card glass-card">
            <div className="card-header">
              <h3>Local Environment</h3>
            </div>
            <div className="system-info">
              {currentVisitorInfo ? (
                <div className="info-grid">
                  <div className="info-box">
                    <label>Browser</label>
                    <span>{currentVisitorInfo.browser}</span>
                  </div>
                  <div className="info-box">
                    <label>Operating System</label>
                    <span>{currentVisitorInfo.os}</span>
                  </div>
                  <div className="info-box">
                    <label>Platform</label>
                    <span>{currentVisitorInfo.device}</span>
                  </div>
                  <div className="info-box">
                    <label>Resolution</label>
                    <span>{currentVisitorInfo.screen}</span>
                  </div>
                </div>
              ) : (
                <div className="info-loading">Analyzing fingerprints...</div>
              )}
              <div className="gold-divider" />
              <div className="track-summary">
                <h4>Active Channels</h4>
                <div className="channel-list">
                  <div className="channel">Section Retention Tracking</div>
                  <div className="channel">Geospatial Interaction Heatmaps</div>
                  <div className="channel">Climate Finance Conversions</div>
                  <div className="channel">Jubilee Timer Engagement</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Ambience */}
      <div className="analytics-bg">
        <div className="noise" />
        <div className="grid-overlay" />
      </div>
    </div>
  );
}
