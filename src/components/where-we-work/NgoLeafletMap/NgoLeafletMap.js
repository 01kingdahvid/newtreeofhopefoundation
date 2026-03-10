"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./NgoLeafletMap.module.css";

/* ─── Data ─────────────────────────────────────────────────────────────── */
const REGIONS = {
  "Middle East": { color: "#4A90D9", dot: "#4A90D9" },
  Africa:        { color: "#E8524A", dot: "#E8524A" },
  America:       { color: "#F5A623", dot: "#F5A623" },
  Asia:          { color: "#27AE60", dot: "#27AE60" },
};

const LOCATIONS = [
  { id: 1,  name: "United States",  region: "America",     lat: 39.5,   lng: -98.35  },
  { id: 2,  name: "Morocco",        region: "Africa",      lat: 31.79,  lng: -7.09   },
  { id: 3,  name: "Libya",          region: "Africa",      lat: 26.33,  lng: 17.23   },
  { id: 4,  name: "Türkiye",        region: "Middle East", lat: 38.96,  lng: 35.24   },
  { id: 5,  name: "Syria",          region: "Middle East", lat: 34.80,  lng: 38.99   },
  { id: 6,  name: "Palestine",      region: "Middle East", lat: 31.95,  lng: 35.23   },
  { id: 7,  name: "Yemen",          region: "Middle East", lat: 15.55,  lng: 48.52   },
  { id: 8,  name: "Sudan",          region: "Africa",      lat: 12.86,  lng: 30.22   },
  { id: 9,  name: "Somalia",        region: "Africa",      lat: 5.15,   lng: 46.20   },
  { id: 10, name: "Pakistan",       region: "Asia",        lat: 30.38,  lng: 69.35   },
  { id: 11, name: "Bangladesh",     region: "Asia",        lat: 23.68,  lng: 90.35   },
  { id: 12, name: "India",          region: "Asia",        lat: 20.59,  lng: 78.96   },
  { id: 13, name: "Ethiopia",       region: "Africa",      lat: 9.15,   lng: 40.49   },
  { id: 14, name: "Kenya",          region: "Africa",      lat: -0.02,  lng: 37.91   },
  { id: 15, name: "Tanzania",       region: "Africa",      lat: -6.37,  lng: 34.89   },
  { id: 16, name: "Mozambique",     region: "Africa",      lat: -18.67, lng: 35.53   },
  { id: 17, name: "Madagascar",     region: "Africa",      lat: -18.77, lng: 46.87   },
];

const LAST_UPDATED = "February 4, 2026";

/* ─── Particle config ───────────────────────────────────────────────────── */
const PARTICLE_COUNT = 38;

function generateParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 18 + 10,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.35 + 0.08,
  }));
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function NGOLeafletMap() {
  const mapRef       = useRef(null);
  const leafletRef   = useRef(null);
  const markersRef   = useRef([]);
  const [mounted, setMounted]               = useState(false);
  const [search, setSearch]                 = useState("");
  const [activeRegions, setActiveRegions]   = useState(new Set(Object.keys(REGIONS)));
  const [particles]                         = useState(generateParticles);
  const [mapReady, setMapReady]             = useState(false);

  /* ── Init Leaflet ─────────────────────────────────────────────────────── */
  useEffect(() => {
    setMounted(true);
    let L, map;

    async function init() {
      if (typeof window === "undefined") return;

      // Dynamically import Leaflet CSS
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id   = "leaflet-css";
        link.rel  = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }

      L = (await import("leaflet")).default;

      // Fix default icon path issue with Next.js
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:       "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:     "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      if (!mapRef.current || leafletRef.current) return;

      map = L.map(mapRef.current, {
        center:           [20, 20],
        zoom:             2,
        zoomControl:      false,
        scrollWheelZoom:  false,
        attributionControl: true,
      });

      // CARTO light tile layer — matches the screenshot exactly
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: "abcd",
          maxZoom:    19,
        }
      ).addTo(map);

      // Custom zoom control — bottom right
      L.control.zoom({ position: "bottomright" }).addTo(map);

      leafletRef.current = { L, map };
      setMapReady(true);
    }

    init();

    return () => {
      if (leafletRef.current?.map) {
        leafletRef.current.map.remove();
        leafletRef.current = null;
      }
    };
  }, []);

  /* ── Render markers whenever map/search/regions change ───────────────── */
  useEffect(() => {
    if (!mapReady || !leafletRef.current) return;
    const { L, map } = leafletRef.current;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    const q = search.trim().toLowerCase();

    LOCATIONS.forEach((loc) => {
      const regionMatch = activeRegions.has(loc.region);
      const searchMatch = !q || loc.name.toLowerCase().includes(q);
      if (!regionMatch || !searchMatch) return;

      const color = REGIONS[loc.region].dot;

      // SVG circle marker
      const svgIcon = L.divIcon({
        className: "",
        html: `
          <div style="
            width:14px;height:14px;
            background:${color};
            border:2.5px solid #fff;
            border-radius:50%;
            box-shadow:0 2px 6px rgba(0,0,0,0.28);
          "></div>`,
        iconSize:   [14, 14],
        iconAnchor: [7, 7],
      });

      const marker = L.marker([loc.lat, loc.lng], { icon: svgIcon })
        .addTo(map)
        .bindTooltip(loc.name, {
          permanent:  true,
          direction:  "top",
          offset:     [0, -10],
          className:  styles.leafletTooltip,
        });

      markersRef.current.push(marker);
    });
  }, [mapReady, search, activeRegions]);

  /* ── Region toggle ────────────────────────────────────────────────────── */
  const toggleRegion = useCallback((region) => {
    setActiveRegions((prev) => {
      const next = new Set(prev);
      next.has(region) ? next.delete(region) : next.add(region);
      return next;
    });
  }, []);

  if (!mounted) return null;

  return (
    <section className={styles.section}>
      {/* ── Particle canvas ── */}
      <div className={styles.particles} aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className={styles.particle}
            style={{
              left:              `${p.x}%`,
              top:               `${p.y}%`,
              width:             `${p.size}px`,
              height:            `${p.size}px`,
              opacity:           p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay:    `-${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className={styles.card}>
        {/* ── Top bar ── */}
        <div className={styles.topBar}>
          {/* Search */}
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M14 14l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Search locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className={styles.clearBtn} onClick={() => setSearch("")} aria-label="Clear">
                ×
              </button>
            )}
          </div>

          {/* Legend / region filters */}
          <div className={styles.legend}>
            <span className={styles.legendLabel}>Regions</span>
            {Object.entries(REGIONS).map(([name, { dot }]) => (
              <button
                key={name}
                className={`${styles.regionBtn} ${!activeRegions.has(name) ? styles.regionBtnOff : ""}`}
                onClick={() => toggleRegion(name)}
              >
                <span className={styles.dot} style={{ background: dot }} />
                {name}
              </button>
            ))}
            <span className={styles.updated}>Last updated: {LAST_UPDATED}</span>
          </div>
        </div>

        {/* ── Map ── */}
        <div className={styles.mapContainer}>
          <div ref={mapRef} className={styles.map} />
        </div>
      </div>
    </section>
  );
}