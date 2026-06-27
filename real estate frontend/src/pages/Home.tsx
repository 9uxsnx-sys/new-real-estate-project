import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SEO } from '@/components/seo';

// Hero sections
import { HeroDesktopSection, HeroTabletSection, HeroMobileSection } from '@/components/home/hero';

// About Us sections
import { AboutUsSection, AboutUsTabletSection, AboutUsSectionMobile } from '@/components/home/about-us';

// Services sections
import { ServicesDesktopSection, ServicesTabletSection, ServicesMobileSection } from '@/components/home/services';

// Gateway sections
import { GatewayDesktopSection, GatewayTabletSection, GatewayMobileSection } from '@/components/home/gateway';

// FAQ sections
import { FaqDesktopSection, FaqTabletSection, FaqMobileSection } from '@/components/home/faq';

// Footer sections
import { FooterDesktopSection, FooterTabletSection, FooterMobileSection } from '@/components/home/footer';

// Hooks
import { useContact } from '@/hooks';

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

export const Home: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = (lang || 'en') as 'en' | 'fr' | 'ar';
  
  // Screen size detection
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  // Fetch contact data for footer
  const { contact } = useContact();

  // Set RTL for Arabic
  useEffect(() => {
    if (currentLang === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [currentLang]);

  return (
    <main className="min-h-screen bg-white">
      <SEO 
        title="Premium Real Estate in Algeria"
        description="Discover exceptional living spaces designed for those who appreciate refined elegance and timeless quality. Premium apartments, commercial spaces, and offices in Algeria."
        lang={currentLang}
        url=""
      />

      {/* Hero Section */}
      {isMobile ? (
        <HeroMobileSection lang={currentLang} />
      ) : isTablet ? (
        <HeroTabletSection lang={currentLang} />
      ) : (
        <HeroDesktopSection lang={currentLang} />
      )}

      {/* About Us Section */}
      {isMobile ? (
        <AboutUsSectionMobile lang={currentLang} />
      ) : isTablet ? (
        <AboutUsTabletSection lang={currentLang} />
      ) : (
        <AboutUsSection lang={currentLang} />
      )}

      {/* Services Section */}
      {isMobile ? (
        <ServicesMobileSection lang={currentLang} />
      ) : isTablet ? (
        <ServicesTabletSection lang={currentLang} />
      ) : (
        <ServicesDesktopSection lang={currentLang} />
      )}

      {/* Gateway Section */}
      {isMobile ? (
        <GatewayMobileSection lang={currentLang} />
      ) : isTablet ? (
        <GatewayTabletSection lang={currentLang} />
      ) : (
        <GatewayDesktopSection lang={currentLang} />
      )}

      {/* FAQ Section */}
      {isMobile ? (
        <FaqMobileSection lang={currentLang} />
      ) : isTablet ? (
        <FaqTabletSection lang={currentLang} />
      ) : (
        <FaqDesktopSection lang={currentLang} />
      )}

      {/* Footer Section */}
      {isMobile ? (
        <FooterMobileSection lang={currentLang} contact={contact} />
      ) : isTablet ? (
        <FooterTabletSection lang={currentLang} contact={contact} />
      ) : (
        <FooterDesktopSection lang={currentLang} contact={contact} />
      )}
    </main>
  );
};