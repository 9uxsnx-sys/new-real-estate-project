import React from 'react';
import { FooterDesktopSection, FooterTabletSection, FooterMobileSection } from '@/components/home/footer';
import type { Contact } from '@/services/contact';

// Hook to detect mobile screen size (below md = 768px)
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// Hook to detect tablet screen size (768px to 1024px)
const useIsTablet = () => {
  const [isTablet, setIsTablet] = React.useState(false);

  React.useEffect(() => {
    const checkTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 768 && width < 1024);
    };

    checkTablet();
    window.addEventListener('resize', checkTablet);

    return () => window.removeEventListener('resize', checkTablet);
  }, []);

  return isTablet;
};

interface ResponsiveFooterProps {
  lang: string;
  contact?: Contact | null;
}

export const ResponsiveFooter: React.FC<ResponsiveFooterProps> = ({ lang, contact }) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  if (isMobile) return <FooterMobileSection lang={lang as 'en' | 'fr' | 'ar'} contact={contact} />;
  if (isTablet) return <FooterTabletSection lang={lang as 'en' | 'fr' | 'ar'} contact={contact} />;
  return <FooterDesktopSection lang={lang as 'en' | 'fr' | 'ar'} contact={contact} />;
};