import React, { useState, useEffect } from 'react';
import { HeroDesktopSection, HeroTabletSection, HeroMobileSection } from '../components/home/hero';
import '../i18n';

/**
 * DEV PAGE - New Homepage Development
 * 
 * This page is completely isolated from the main website.
 * Route: /dev (no language prefix)
 * 
 * Supports EN, FR, AR languages via query param: /dev?lang=en
 */

// Breakpoints
const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

// Hook to detect mobile screen size (below md = 768px)
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Hook to detect tablet screen size (768px to 1024px)
const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT);
    };

    checkTablet();
    window.addEventListener('resize', checkTablet);

    return () => window.removeEventListener('resize', checkTablet);
  }, []);

  return isTablet;
};

export const DevHome: React.FC = () => {
  // Get language from query param or default to English
  const searchParams = new URLSearchParams(window.location.search);
  const lang = (searchParams.get('lang') || 'en') as 'en' | 'fr' | 'ar';

  // Screen size detection
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Set RTL for Arabic
  useEffect(() => {
    if (lang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [lang]);

  return (
    <div className="w-full">
      {isMobile ? (
        <HeroMobileSection lang={lang} />
      ) : isTablet ? (
        <HeroTabletSection lang={lang} />
      ) : (
        <HeroDesktopSection lang={lang} />
      )}
    </div>
  );
};
