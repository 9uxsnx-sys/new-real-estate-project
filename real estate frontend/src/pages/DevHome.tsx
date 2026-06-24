import React from 'react';
import { HeroDesktopSection } from '../components/home/hero';
import '../i18n';

/**
 * DEV PAGE - New Homepage Development
 * 
 * This page is completely isolated from the main website.
 * Route: /dev (no language prefix)
 * 
 * Supports EN, FR, AR languages via query param: /dev?lang=en
 */

export const DevHome: React.FC = () => {
  // Get language from query param or default to English
  const searchParams = new URLSearchParams(window.location.search);
  const lang = (searchParams.get('lang') || 'en') as 'en' | 'fr' | 'ar';
  
  // Set RTL for Arabic
  if (lang === 'ar') {
    document.documentElement.dir = 'rtl';
  } else {
    document.documentElement.dir = 'ltr';
  }
  
  return (
    <div className="w-full">
      <HeroDesktopSection lang={lang} />
    </div>
  );
};
