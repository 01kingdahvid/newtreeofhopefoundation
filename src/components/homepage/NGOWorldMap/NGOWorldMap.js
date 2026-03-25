'use client'

import { useState, useCallback } from 'react'
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup
} from 'react-simple-maps'
import styles from './NGOWorldMap.module.css'

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

const activeCountries = {
  // 4: 'Afghanistan',
  // 50: 'Bangladesh',
  // 64: 'Bhutan',
  // 96: 'Brunei',
  // 116: 'Cambodia',
  // 156: 'China',
  // 162: 'Christmas Island',
  // 166: 'Cocos (Keeling) Islands',
  // 184: 'Cook Islands',
  // 268: 'Georgia',
  // 316: 'Guam',
  // 344: 'Hong Kong',
  // 356: 'India',
  // 360: 'Indonesia',
  // 398: 'Kazakhstan',
  // 408: 'North Korea',
  410: 'South Korea',
  // 417: 'Kyrgyzstan',
  // 418: 'Laos',
  // 446: 'Macao',
  // 458: 'Malaysia',
  // 462: 'Maldives',
  // 496: 'Mongolia',
  // 104: 'Myanmar',
  // 524: 'Nepal',
  // 586: 'Pakistan',
  // 608: 'Philippines',
  // 702: 'Singapore',
  // 144: 'Sri Lanka',
  // 158: 'Taiwan',
  // 762: 'Tajikistan',
  // 764: 'Thailand',
  // 626: 'East Timor',
  // 860: 'Uzbekistan',
  // 704: 'Vietnam'
}

const MIN_ZOOM = 1
const MAX_ZOOM = 8

export default function NgoWorldMap () {
  const [tooltip, setTooltip] = useState({
    visible: false,
    name: '',
    x: 0,
    y: 0
  })
  const [zoom, setZoom] = useState(3) // Zoom in on Asia
  const [center, setCenter] = useState([78.5, 36.5]) // Center on Asia

  const handleZoomIn = () => setZoom(z => Math.min(z * 1.5, MAX_ZOOM))
  const handleZoomOut = () => setZoom(z => Math.max(z / 1.5, MIN_ZOOM))

  const handleMoveEnd = useCallback(({ coordinates, zoom: newZoom }) => {
    setCenter(coordinates)
    setZoom(newZoom)
  }, [])

  const handleMouseEnter = useCallback((evt, name) => {
    setTooltip({ visible: true, name, x: evt.clientX, y: evt.clientY })
  }, [])

  const handleMouseMove = useCallback(evt => {
    setTooltip(prev => ({ ...prev, x: evt.clientX, y: evt.clientY }))
  }, [])

  const handleMouseLeave = useCallback(() => {
    setTooltip(prev => ({ ...prev, visible: false }))
  }, [])

  return (
    <section className={styles.mapSection}>
      <div className={styles.container}>
        <div className={styles.mapWrapper}>
          {/* Tooltip */}
          {tooltip.visible && (
            <div
              className={styles.tooltip}
              style={{ top: tooltip.y - 42, left: tooltip.x + 12 }}
            >
              {tooltip.name}
            </div>
          )}

          <ComposableMap
            projectionConfig={{ scale: 150 }}
            className={styles.map}
          >
            <ZoomableGroup
              zoom={zoom}
              center={center}
              onMoveEnd={handleMoveEnd}
              minZoom={MIN_ZOOM}
              maxZoom={MAX_ZOOM}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map(geo => {
                    const countryName = activeCountries[geo.id]
                    const isActive = Boolean(countryName)

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        className={styles.country}
                        onMouseEnter={
                          isActive
                            ? evt => handleMouseEnter(evt, countryName)
                            : undefined
                        }
                        onMouseMove={isActive ? handleMouseMove : undefined}
                        onMouseLeave={isActive ? handleMouseLeave : undefined}
                        style={{
                          default: {
                            fill: isActive ? '#03a1de' : '#e0e0e0',
                            outline: 'none'
                          },
                          hover: {
                            fill: isActive ? '#0285b8' : '#ececec',
                            outline: 'none'
                          },
                          pressed: {
                            fill: isActive ? '#0285b8' : '#ececec',
                            outline: 'none'
                          }
                        }}
                      />
                    )
                  })
                }
              </Geographies>
            </ZoomableGroup>
          </ComposableMap>

          {/* Zoom Controls */}
          <div className={styles.zoomControls}>
            <button
              className={styles.zoomBtn}
              onClick={handleZoomIn}
              disabled={zoom >= MAX_ZOOM}
              aria-label='Zoom in'
            >
              +
            </button>
            <div className={styles.zoomDivider} />
            <button
              className={styles.zoomBtn}
              onClick={handleZoomOut}
              disabled={zoom <= MIN_ZOOM}
              aria-label='Zoom out'
            >
              −
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
