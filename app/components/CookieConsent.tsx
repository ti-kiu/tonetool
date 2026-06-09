'use client';

import { useState, useEffect } from 'react';

interface ConsentPreferences {
  analytics: boolean;
  advertising: boolean;
  timestamp: string;
}

const CONSENT_KEY = 'tonegen_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if consent already given
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setVisible(true);
    } else {
      // Apply stored preferences
      try {
        const prefs: ConsentPreferences = JSON.parse(stored);
        applyConsent(prefs);
      } catch {
        setVisible(true);
      }
    }
  }, []);

  const applyConsent = (prefs: ConsentPreferences) => {
    // Analytics consent
    if (prefs.analytics) {
      // Enable GA4
      window.gtag?.('consent', 'update', {
        analytics_storage: 'granted',
      });
    } else {
      window.gtag?.('consent', 'update', {
        analytics_storage: 'denied',
      });
    }

    // Advertising consent
    if (prefs.advertising) {
      window.gtag?.('consent', 'update', {
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
      // Enable AdSense
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch {
        // AdSense may not be initialized yet — ignore
      }
    } else {
      window.gtag?.('consent', 'update', {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
      });
    }
  };

  const saveConsent = (analytics: boolean, advertising: boolean) => {
    try {
      const prefs: ConsentPreferences = {
        analytics,
        advertising,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(CONSENT_KEY, JSON.stringify(prefs));
      applyConsent(prefs);
    } catch {
      // localStorage may be disabled (private mode) — still apply consent for this session
      applyConsent({ analytics, advertising, timestamp: new Date().toISOString() });
    }
    setVisible(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => {
    saveConsent(true, true);
  };

  const handleRejectNonEssential = () => {
    saveConsent(false, false);
  };

  const handleSavePreferences = () => {
    // This would be called from a preferences panel
    // For now, default to reject
    saveConsent(false, false);
  };

  if (!mounted || !visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {!showPreferences ? (
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-white font-semibold mb-1">Cookie Consent</h3>
              <p className="text-gray-400 text-sm">
                We use cookies to analyze traffic and serve personalized ads. 
                See our{' '}
                <a href="/cookie-policy" className="text-cyan-400 hover:underline">
                  Cookie Policy
                </a>{' '}
                for details. Essential cookies are always active.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowPreferences(true)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition"
              >
                Preferences
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 text-sm bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Cookie Preferences</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">Essential</p>
                  <p className="text-gray-400 text-sm">Required for the site to function</p>
                </div>
                <span className="text-gray-500 text-sm">Always On</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">Analytics</p>
                  <p className="text-gray-400 text-sm">Helps us understand how visitors use our site</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-cyan-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                <div>
                  <p className="text-white font-medium">Advertising</p>
                  <p className="text-gray-400 text-sm">Used to deliver relevant ads</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:ring-2 peer-focus:ring-cyan-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>
            </div>
            
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white transition"
              >
                Back
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-4 py-2 text-sm bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition"
              >
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// TypeScript declarations for global objects
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    adsbygoogle?: unknown[];
  }
}