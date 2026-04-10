"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { trackMapStateClick, trackMapStateHover } from "@/lib/analytics";

const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);
const GeoJSON = dynamic(
  () => import("react-leaflet").then((m) => m.GeoJSON),
  { ssr: false }
);

// Simplified GeoJSON polygons for the 4 states
const statesGeoJSON = {
  type: "FeatureCollection" as const,
  features: [
    {
      type: "Feature" as const,
      properties: {
        name: "Benue",
        component: "Irrigation Infrastructure",
        desc: "Home to major dam systems and solar-powered irrigation networks serving thousands of hectares. The heart of the basin's water infrastructure.",
        details: "Dams, canals, and solar-powered irrigation systems",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [7.5, 6.4],
            [8.0, 6.5],
            [8.5, 6.6],
            [9.0, 6.8],
            [9.5, 7.0],
            [10.0, 7.2],
            [10.0, 7.8],
            [9.5, 8.0],
            [9.0, 7.8],
            [8.5, 7.6],
            [8.0, 7.5],
            [7.5, 7.3],
            [7.2, 7.0],
            [7.5, 6.4],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        name: "Nasarawa",
        component: "Climate-Smart Agriculture",
        desc: "Pioneering water-efficient farming and drought-resistant crops. A model state for climate-adapted agricultural practices.",
        details: "Efficient water use and drought-resistant crops",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [7.5, 7.8],
            [8.0, 8.0],
            [8.5, 8.2],
            [9.0, 8.4],
            [9.5, 8.5],
            [9.5, 9.0],
            [9.0, 9.2],
            [8.5, 9.0],
            [8.0, 8.8],
            [7.5, 8.5],
            [7.2, 8.2],
            [7.5, 7.8],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        name: "Plateau",
        component: "Digital & Monitoring Systems",
        desc: "Leading digital water management and farmer support platforms. Technology hub for precision agriculture data.",
        details: "Water management tech and farmer support platforms",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [8.5, 8.8],
            [9.0, 9.0],
            [9.5, 9.2],
            [10.0, 9.5],
            [10.0, 10.0],
            [9.5, 10.2],
            [9.0, 10.0],
            [8.5, 9.8],
            [8.2, 9.5],
            [8.5, 8.8],
          ],
        ],
      },
    },
    {
      type: "Feature" as const,
      properties: {
        name: "Kogi",
        component: "Agro-Industrial Hubs",
        desc: "Strategic location for processing zones, cold storage, and logistics networks connecting basin output to markets.",
        details: "Processing zones, storage, and logistics",
      },
      geometry: {
        type: "Polygon" as const,
        coordinates: [
          [
            [5.8, 7.0],
            [6.5, 7.2],
            [7.0, 7.3],
            [7.5, 7.5],
            [7.5, 8.0],
            [7.0, 8.2],
            [6.5, 8.0],
            [6.0, 7.8],
            [5.8, 7.5],
            [5.8, 7.0],
          ],
        ],
      },
    },
  ],
};

import Image from "next/image";

// Governor data mapping
const governorData: Record<string, { name: string; title: string, portrait: string, vision: string }> = {
  Benue: {
    name: "Rev. Fr. Hyacinth Alia",
    title: "Executive Governor, Benue State",
    portrait: "/portrait_gov_benue.png",
    vision: "Transforming Benue into a global agricultural powerhouse through modern irrigation and strategic water resource management.",
  },
  Nasarawa: {
    name: "Engr. Abdullahi Sule",
    title: "Executive Governor, Nasarawa State",
    portrait: "/portrait_gov_nasarawa.png",
    vision: "Driving industrialization and sustainable food security by leveraging the basin's immense water and agricultural potentials.",
  },
  Plateau: {
    name: "Barr. Caleb Mutfwang",
    title: "Executive Governor, Plateau State",
    portrait: "/portrait_gov_plateau.png",
    vision: "Harnessing technology and precision agriculture to secure livelihoods and advance climate-smart farming on the Plateau.",
  },
  Kogi: {
    name: "Alhaji Ahmed Usman Ododo",
    title: "Executive Governor, Kogi State",
    portrait: "/portrait_gov_kogi.png",
    vision: "Strengthening the agro-industrial value chain and logistical connectivity between our farms and the national market.",
  },
};

const components = [
  {
    icon: "🏗️",
    title: "Irrigation Infrastructure",
    desc: "Dams, canals, and solar-powered irrigation systems expanding coverage across the basin.",
  },
  {
    icon: "🌱",
    title: "Climate-Smart Agriculture",
    desc: "Efficient water use and drought-resistant crop varieties for climate resilience.",
  },
  {
    icon: "🏭",
    title: "Agro-Industrial Hubs",
    desc: "Processing zones, storage facilities, and logistics connecting farms to markets.",
  },
  {
    icon: "📡",
    title: "Digital & Monitoring",
    desc: "Water management tech and farmer support platforms for precision agriculture.",
  },
];

function MapComponent({ onStateSelect }: { onStateSelect: (name: string) => void }) {
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  useEffect(() => {
    import("leaflet").then((L) => {
      // Fix default icon path
      delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      setLeafletLoaded(true);
    });
  }, []);

  if (!leafletLoaded) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          minHeight: 500,
          background: "var(--color-dark-card)",
          borderRadius: "var(--radius-lg)",
          color: "var(--color-text-secondary)",
        }}
      >
        Loading Map...
      </div>
    );
  }

  const stateColors: Record<string, string> = {
    Benue: "#2d8f5e",
    Nasarawa: "#c9a84c",
    Plateau: "#3b82f6",
    Kogi: "#06b6d4",
  };

  return (
    <MapContainer
      center={[8.3, 8.5]}
      zoom={7}
      style={{ height: "100%", minHeight: 600, borderRadius: "var(--radius-lg)" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/">CARTO</a>'
      />
      <GeoJSON
        data={statesGeoJSON}
        style={(feature) => ({
          color: stateColors[feature?.properties?.name || ""] || "#c9a84c",
          weight: 2,
          fillOpacity: 0.25,
          fillColor: stateColors[feature?.properties?.name || ""] || "#c9a84c",
        })}
        onEachFeature={(feature, layer) => {
          const props = feature.properties;
          layer.bindPopup(
            `<h3>${props.name} State</h3>
             <p style="font-weight:600;color:#c9a84c;margin-bottom:4px">${props.component}</p>
             <p>${props.desc}</p>`
          );
          layer.on({
            click: () => {
              trackMapStateClick(props.name);
              onStateSelect(props.name);
            },
            mouseover: (e) => {
              trackMapStateHover(props.name);
              const target = e.target;
              target.setStyle({
                fillOpacity: 0.5,
                weight: 3,
              });
            },
            mouseout: (e) => {
              const target = e.target;
              target.setStyle({
                fillOpacity: 0.25,
                weight: 2,
              });
            },
          });
        }}
      />
    </MapContainer>
  );
}

export default function InteractiveMap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedState, setSelectedState] = useState<string>("Benue");

  const gov = governorData[selectedState];

  return (
    <section className="section section-alt map-section" id="map" ref={ref}>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div className="container">
        <div className="section-header">
          <motion.div
            className="section-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            🗺️ Interactive Basin Map
          </motion.div>
          <motion.h2
            className="section-title"
            style={{ fontFamily: "var(--font-playfair), serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Explore the{" "}
            <span className="highlight">Lower Benue Basin</span>
          </motion.h2>
          <div className="gold-divider" />
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Select a state on the map to view infrastructure components and
            leadership vision for the Jubilee transformation.
          </motion.p>
        </div>

        <motion.div
          className="map-layout"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <div className="map-container">
            <MapComponent onStateSelect={setSelectedState} />
          </div>
          <div className="map-sidebar">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedState}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="gov-card"
              >
                <div className="gov-portrait-container">
                  <Image
                    src={gov.portrait}
                    alt={gov.name}
                    width={80}
                    height={80}
                    className="gov-portrait"
                  />
                  <div className="gov-status-dot" />
                </div>
                <div className="gov-info">
                  <h4 className="gov-name">{gov.name}</h4>
                  <p className="gov-title">{gov.title}</p>
                  <p className="gov-vision">
                    &ldquo;{gov.vision}&rdquo;
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="sidebar-divider" />

            <div className="sidebar-grid">
              {components.map((comp, i) => (
                <div className="map-info-card compact" key={i}>
                  <div className="map-info-icon">{comp.icon}</div>
                  <div className="map-info-text">
                    <h5 className="map-info-title">{comp.title}</h5>
                    <p className="map-info-desc mini">{comp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
