'use client';

import { useEffect } from 'react';

export default function ConsentWrapper() {
  useEffect(() => {
    // Initialize GA4 with denied consent by default
    window.gtag?.('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });

    // Check stored consent
    const stored = localStorage.getItem('tonegen_cookie_consent');
    if (stored) {
      try {
        const prefs = JSON.parse(stored);
        if (prefs.analytics) {
          window.gtag?.('consent', 'update', { analytics_storage: 'granted' });
        }
        if (prefs.advertising) {
          window.gtag?.('consent', 'update', {
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
          });
        }
      } catch {
        // Invalid stored consent, ignore
      }
    }
  }, []);

  return null;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
