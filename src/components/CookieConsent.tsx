'use client';

import { useState, useEffect } from 'react';
import { CogIcon } from '@heroicons/react/24/outline';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('burns-farm-cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      // Load saved preferences
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allAccepted);
    localStorage.setItem('burns-farm-cookie-consent', JSON.stringify(allAccepted));
    setShowBanner(false);
    setShowSettings(false);
    
    // Initialize analytics and marketing cookies if accepted
    initializeCookies(allAccepted);
  };

  const handleDeclineAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(onlyNecessary);
    localStorage.setItem('burns-farm-cookie-consent', JSON.stringify(onlyNecessary));
    setShowBanner(false);
    setShowSettings(false);
    
    // Clear any existing analytics/marketing cookies
    clearNonEssentialCookies();
  };

  const handleSavePreferences = () => {
    localStorage.setItem('burns-farm-cookie-consent', JSON.stringify(preferences));
    setShowBanner(false);
    setShowSettings(false);
    
    // Initialize or clear cookies based on preferences
    initializeCookies(preferences);
  };

  const initializeCookies = (prefs: CookiePreferences) => {
    // Set necessary cookies (always required)
    document.cookie = "burns-farm-necessary=true; path=/; max-age=31536000"; // 1 year
    
    if (prefs.analytics) {
      // Initialize analytics (Google Analytics, etc.)
      document.cookie = "burns-farm-analytics=true; path=/; max-age=31536000";
      console.log('Analytics cookies enabled');
      // Here you would initialize your analytics tracking
    } else {
      document.cookie = "burns-farm-analytics=false; path=/; max-age=31536000";
    }
    
    if (prefs.marketing) {
      // Initialize marketing cookies
      document.cookie = "burns-farm-marketing=true; path=/; max-age=31536000";
      console.log('Marketing cookies enabled');
      // Here you would initialize marketing tracking
    } else {
      document.cookie = "burns-farm-marketing=false; path=/; max-age=31536000";
    }
  };

  const clearNonEssentialCookies = () => {
    // Clear analytics and marketing cookies
    document.cookie = "burns-farm-analytics=false; path=/; max-age=0";
    document.cookie = "burns-farm-marketing=false; path=/; max-age=0";
  };

  const handlePreferenceChange = (type: keyof CookiePreferences, value: boolean) => {
    if (type === 'necessary') return; // Can't change necessary cookies
    setPreferences(prev => ({ ...prev, [type]: value }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                We use cookies
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                We use cookies to enhance your browsing experience, serve personalized content, 
                and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies. 
                You can customize your preferences or learn more in our{' '}
                <a href="/privacy-policy" className="text-green-600 hover:text-green-700 underline">
                  Privacy Policy
                </a>.
              </p>
              
              {showSettings && (
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Necessary Cookies</p>
                      <p className="text-xs text-gray-500">Required for the website to function properly</p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={preferences.necessary}
                        disabled
                        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Analytics Cookies</p>
                      <p className="text-xs text-gray-500">Help us understand how visitors interact with our website</p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => handlePreferenceChange('analytics', e.target.checked)}
                        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Marketing Cookies</p>
                      <p className="text-xs text-gray-500">Used to deliver relevant advertisements and marketing campaigns</p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                        className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 lg:ml-6">
              {!showSettings ? (
                <>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <CogIcon className="w-4 h-4 mr-2" />
                    Customize
                  </button>
                  <button
                    onClick={handleDeclineAll}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Decline All
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Accept All
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Save Preferences
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
