'use client';

import { useEffect } from 'react';

// Set the googtrans cookie on BOTH the bare hostname and with a dot-prefixed domain
// This must happen before the script loads to take effect on first visit
function setKoreanCookie() {
  const hostname = window.location.hostname;
  const cookieValue = 'googtrans=/en/ko';

  // Set for current domain
  document.cookie = `${cookieValue}; path=/; domain=${hostname}`;
  // Set for dot-prefixed domain (required by Google Translate to actually apply)
  document.cookie = `${cookieValue}; path=/; domain=.${hostname}`;
  // Also set without domain (catches localhost and edge cases)
  document.cookie = `${cookieValue}; path=/`;
}

function forceKoreanTranslation() {
  // Try using the Google Translate combo-box API to switch language
  const trySwitch = () => {
    const select = document.querySelector('.goog-te-combo');
    if (select) {
      select.value = 'ko';
      select.dispatchEvent(new Event('change'));
      return true;
    }
    return false;
  };

  // Retry a few times since the widget may not be ready immediately
  let attempts = 0;
  const interval = setInterval(() => {
    if (trySwitch() || attempts > 20) clearInterval(interval);
    attempts++;
  }, 150);
}

export default function GoogleTranslateWidget() {
  useEffect(() => {
    // ✅ Set the cookie BEFORE script loads so Google picks it up on first visit
    setKoreanCookie();

    // Prevent duplicate script injection
    if (document.getElementById('google-translate-script')) {
      // Script already loaded — just force the language switch
      forceKoreanTranslation();
      return;
    }

    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages:
            'ko,en,ja,zh-CN,zh-TW,th,vi,id,ms,fil,hi,bn,ta,te,ur,ar,fr,es,de,pt,ru,it,nl,tr,pl,uk',
          layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL,
          autoDisplay: false,
        },
        'google_translate_element'
      );

      // ✅ After widget is ready, programmatically switch to Korean
      forceKoreanTranslation();
    };

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.getElementById('google-translate-script');
      if (existingScript) existingScript.remove();
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <>
      <style>{`
        .goog-te-banner-frame,
        #goog-gt-tt,
        .goog-te-balloon-frame {
          display: none !important;
        }

        body {
          top: 0 !important;
        }

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

        .goog-te-gadget-simple .goog-te-menu-value span:last-child {
          color: #6b7280 !important;
        }
      `}</style>

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
          minWidth: '160px',
        }}
      >
        <span style={{ fontSize: '16px', flexShrink: 0 }}>🌐</span>

        <span
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#6b7280',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            flexShrink: 0,
          }}
        >
          Translate
        </span>

        <div id="google_translate_element" />
      </div>
    </>
  );
}