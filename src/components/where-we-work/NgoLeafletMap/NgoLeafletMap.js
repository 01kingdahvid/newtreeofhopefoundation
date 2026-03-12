'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './NgoLeafletMap.module.css'

/* ─── Data ─────────────────────────────────────────────────────────────── */
const REGIONS = {
  Asia: { color: '#27AE60', dot: '#27AE60' }
}

const LOCATIONS = [
  // Central Asia
  { id: 1, name: 'Kazakhstan', region: 'Asia', lat: 48.02, lng: 66.93 },
  { id: 2, name: 'Kyrgyzstan', region: 'Asia', lat: 41.2, lng: 74.76 },
  { id: 3, name: 'Tajikistan', region: 'Asia', lat: 38.86, lng: 71.28 },
  { id: 4, name: 'Turkmenistan', region: 'Asia', lat: 38.97, lng: 59.56 },
  { id: 5, name: 'Uzbekistan', region: 'Asia', lat: 41.38, lng: 64.59 },

  // East Asia
  { id: 6, name: 'China', region: 'Asia', lat: 35.86, lng: 104.2 },
  { id: 7, name: 'Japan', region: 'Asia', lat: 36.2, lng: 138.25 },
  { id: 8, name: 'Mongolia', region: 'Asia', lat: 46.86, lng: 103.85 },
  { id: 9, name: 'North Korea', region: 'Asia', lat: 40.34, lng: 127.51 },
  { id: 10, name: 'South Korea', region: 'Asia', lat: 35.91, lng: 127.77 },
  { id: 11, name: 'Taiwan', region: 'Asia', lat: 23.69, lng: 120.96 },

  // South Asia
  { id: 12, name: 'Afghanistan', region: 'Asia', lat: 33.94, lng: 67.71 },
  { id: 13, name: 'Bangladesh', region: 'Asia', lat: 23.68, lng: 90.35 },
  { id: 14, name: 'Bhutan', region: 'Asia', lat: 27.51, lng: 90.43 },
  { id: 15, name: 'India', region: 'Asia', lat: 20.59, lng: 78.96 },
  { id: 16, name: 'Maldives', region: 'Asia', lat: 3.2, lng: 73.22 },
  { id: 17, name: 'Nepal', region: 'Asia', lat: 28.39, lng: 84.12 },
  { id: 18, name: 'Pakistan', region: 'Asia', lat: 30.38, lng: 69.35 },
  { id: 19, name: 'Sri Lanka', region: 'Asia', lat: 7.87, lng: 80.77 },

  // Southeast Asia
  { id: 20, name: 'Brunei', region: 'Asia', lat: 4.54, lng: 114.73 },
  { id: 21, name: 'Cambodia', region: 'Asia', lat: 12.57, lng: 104.99 },
  { id: 22, name: 'Indonesia', region: 'Asia', lat: -0.79, lng: 113.92 },
  { id: 23, name: 'Laos', region: 'Asia', lat: 19.86, lng: 102.49 },
  { id: 24, name: 'Malaysia', region: 'Asia', lat: 4.21, lng: 101.98 },
  { id: 25, name: 'Myanmar', region: 'Asia', lat: 21.92, lng: 95.96 },
  { id: 26, name: 'Philippines', region: 'Asia', lat: 12.88, lng: 121.77 },
  { id: 27, name: 'Singapore', region: 'Asia', lat: 1.35, lng: 103.82 },
  { id: 28, name: 'Thailand', region: 'Asia', lat: 15.87, lng: 100.99 },
  { id: 29, name: 'Timor-Leste', region: 'Asia', lat: -8.87, lng: 125.73 },
  { id: 30, name: 'Vietnam', region: 'Asia', lat: 14.06, lng: 108.28 }
]

const LAST_UPDATED = 'February 4, 2026'

/* ─── Particle config ───────────────────────────────────────────────────── */
const PARTICLE_COUNT = 38

function generateParticles () {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 18 + 10,
    delay: Math.random() * 10,
    opacity: Math.random() * 0.35 + 0.08
  }))
}

/* ─── Component ─────────────────────────────────────────────────────────── */
export default function NGOLeafletMap () {
  const mapRef = useRef(null)
  const leafletRef = useRef(null)
  const markersRef = useRef([])
  const [mounted, setMounted] = useState(false)
  const [search, setSearch] = useState('')
  const [activeRegions, setActiveRegions] = useState(new Set(['Asia']))

  const [particles] = useState(generateParticles)
  const [mapReady, setMapReady] = useState(false)

  /* ── Init Leaflet ─────────────────────────────────────────────────────── */
  useEffect(() => {
    setMounted(true)
    let L, map

    async function init () {
      if (typeof window === 'undefined') return

      // Dynamically import Leaflet CSS
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link')
        link.id = 'leaflet-css'
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)
      }

      L = (await import('leaflet')).default

      // Fix default icon path issue with Next.js
      delete L.Icon.Default.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl:
          'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
      })

      if (!mapRef.current || leafletRef.current) return

      map = L.map(mapRef.current, {
        center: [34.05, 100.62], // Roughly the center of Asia
        zoom: 3,
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: true
      })

      // CARTO light tile layer — matches the screenshot exactly
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          subdomains: 'abcd',
          maxZoom: 19
        }
      ).addTo(map)

      // Custom zoom control — bottom right
      L.control.zoom({ position: 'bottomright' }).addTo(map)

      leafletRef.current = { L, map }
      setMapReady(true)
    }

    init()

    return () => {
      if (leafletRef.current?.map) {
        leafletRef.current.map.remove()
        leafletRef.current = null
      }
    }
  }, [])

  /* ── Render markers whenever map/search/regions change ───────────────── */
  useEffect(() => {
    if (!mapReady || !leafletRef.current) return
    const { L, map } = leafletRef.current

    // Clear old markers
    markersRef.current.forEach(m => m.remove())
    markersRef.current = []

    const q = search.trim().toLowerCase()

    LOCATIONS.forEach(loc => {
      const regionMatch = activeRegions.has(loc.region)
      const searchMatch = !q || loc.name.toLowerCase().includes(q)
      if (!regionMatch || !searchMatch) return

      const color = REGIONS[loc.region].dot

      // SVG circle marker
      const svgIcon = L.divIcon({
        className: '',
        html: `
          <div style="
            width:14px;height:14px;
            background:${color};
            border:2.5px solid #fff;
            border-radius:50%;
            box-shadow:0 2px 6px rgba(0,0,0,0.28);
          "></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      })

      const marker = L.marker([loc.lat, loc.lng], { icon: svgIcon })
        .addTo(map)
        .bindTooltip(loc.name, {
          permanent: true,
          direction: 'top',
          offset: [0, -10],
          className: styles.leafletTooltip
        })

      markersRef.current.push(marker)
    })
  }, [mapReady, search, activeRegions])

  /* ── Region toggle ────────────────────────────────────────────────────── */
  const toggleRegion = useCallback(region => {
    setActiveRegions(prev => {
      const next = new Set(prev)
      next.has(region) ? next.delete(region) : next.add(region)
      return next
    })
  }, [])

  if (!mounted) return null

  return (
    <section className={styles.section}>
      {/* ── Particle canvas ── */}
      <div className={styles.particles} aria-hidden='true'>
        {particles.map(p => (
          <span
            key={p.id}
            className={styles.particle}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
              animationDuration: `${p.duration}s`,
              animationDelay: `-${p.delay}s`
            }}
          />
        ))}
      </div>

      <div className={styles.card}>
        {/* ── Top bar ── */}
        <div className={styles.topBar}>
          {/* Search */}
          <div className={styles.searchWrap}>
            <svg className={styles.searchIcon} viewBox='0 0 20 20' fill='none'>
              <circle
                cx='9'
                cy='9'
                r='6'
                stroke='currentColor'
                strokeWidth='1.8'
              />
              <path
                d='M14 14l3 3'
                stroke='currentColor'
                strokeWidth='1.8'
                strokeLinecap='round'
              />
            </svg>
            <input
              className={styles.searchInput}
              type='text'
              placeholder='Search locations...'
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button
                className={styles.clearBtn}
                onClick={() => setSearch('')}
                aria-label='Clear'
              >
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
                className={`${styles.regionBtn} ${
                  !activeRegions.has(name) ? styles.regionBtnOff : ''
                }`}
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
  )
}
