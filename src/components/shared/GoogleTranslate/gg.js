'use client'

import { useEffect } from 'react'

// Optional: set to true to auto-translate to user's browser language on first visit
const AUTO_DETECT_BROWSER_LANGUAGE = false

export default function GoogleTranslateWidget () {
  useEffect(() => {
    // Prevent duplicate script injection
    if (document.getElementById('google-translate-script')) return

    // Define the callback before the script loads
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en', // your website language
          includedLanguages: 'ko,en,ja,zh-CN,fr,es,de,ar,ru',
          layout:
            window.google.translate.TranslateElement.InlineLayout.VERTICAL,
          autoDisplay: false
        },
        'google_translate_element'
      )

      // Force Korean as default translation
      const setKoreanDefault = setInterval(() => {
        const select = document.querySelector('.goog-te-combo')

        if (select) {
          select.value = 'ko'
          select.dispatchEvent(new Event('change'))
          clearInterval(setKoreanDefault)
        }
      }, 300)
    }

    const script = document.createElement('script')
    script.id = 'google-translate-script'
    script.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    return () => {
      // Cleanup on unmount
      const existingScript = document.getElementById('google-translate-script')
      if (existingScript) existingScript.remove()
      delete window.googleTranslateElementInit
    }
  }, [])

  return (
    <>
      {/* Inject style overrides to clean up Google's default widget UI */}
      <style>{`
        /* Hide Google's top banner frame */
        .goog-te-banner-frame,
        #goog-gt-tt,
        .goog-te-balloon-frame {
          display: none !important;
        }

        body {
          top: 0 !important;
        }

        /* Style the select dropdown */
        .goog-te-gadget-simple {
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
          font-size: 0 !important;
          white-space: nowrap;
        }

        .goog-te-gadget-simple span,
        .goog-te-gadget-simple .goog-te-menu-value {
          font-size: 13px !important;
          font-family: 'Pretendard', 'Noto Sans KR', sans-serif !important;
          color: #1a1a2e !important;
          font-weight: 500;
        }

        .goog-te-gadget-simple img {
          display: none !important;
        }

        /* Arrow icon */
        .goog-te-gadget-simple .goog-te-menu-value span:last-child {
          color: #6b7280 !important;
        }
      `}</style>

      {/* Floating widget container */}
      <div
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '14px',
          padding: '10px 14px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
          border: '1px solid rgba(0,0,0,0.07)',
          minWidth: '160px'
        }}
      >
        {/* Globe icon */}
        <span style={{ fontSize: '16px', flexShrink: 0 }}>🌐</span>

        {/* Label */}
        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#6b7280',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            flexShrink: 0
          }}
        >
          Translate
        </span>

        {/* Google Translate mount point */}
        <div id='google_translate_element' />
      </div>
    </>
  )
}

/**
 * Attempts to auto-translate the page to the user's browser language.
 * Only works if the detected language differs from the page language (ko).
 * Uses a cookie approach that Google Translate respects.
 */
function autoTranslateToBrowserLanguage () {
  const browserLang = navigator.language?.split('-')[0] || 'en'
  if (browserLang === 'ko') return // Already in page language, no action needed

  // Poll until the widget select is available, then set it
  const maxAttempts = 20
  let attempts = 0

  const interval = setInterval(() => {
    attempts++
    const select = document.querySelector('.goog-te-combo')
    if (select) {
      select.value = browserLang
      select.dispatchEvent(new Event('change'))
      clearInterval(interval)
    }
    if (attempts >= maxAttempts) clearInterval(interval)
  }, 300)
}
