import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MobileMenuCard } from '@/components/layout/MobileMenuCard';

/**
 * Navbar Tablet Section
 * 
 * Navigation bar for tablet screens with logo, mobile menu, and WhatsApp CTA
 */

interface NavbarTabletSectionProps {
  logoText?: string;
  className?: string;
}

export const NavbarTabletSection: React.FC<NavbarTabletSectionProps> = ({
  logoText = 'The One',
  className = '',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Get initial language from URL or default to 'en'
  const getInitialLang = () => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang');
    if (lang === 'fr' || lang === 'ar' || lang === 'en') {
      return lang;
    }
    return 'en';
  };
  
  const [currentLang, setCurrentLang] = useState(getInitialLang);

  // Nav content for each language
  const getNavContent = (lang: string) => {
    const content = {
      en: {
        navHome: 'Home',
        navProperties: 'Properties',
        navProjects: 'Projects',
        navLanguage: 'Language',
        fontFamily: "'Geist Mono', monospace",
        fontWeight: '600',
      },
      fr: {
        navHome: 'Accueil',
        navProperties: 'Propriétés',
        navProjects: 'Projets',
        navLanguage: 'Langue',
        fontFamily: "'Geist Mono', monospace",
        fontWeight: '600',
      },
      ar: {
        navHome: 'الرئيسية',
        navProperties: 'العقارات',
        navProjects: 'المشاريع',
        navLanguage: 'اللغة',
        fontFamily: "'Noto Sans Arabic', sans-serif",
        fontWeight: '500',
      },
    };
    return content[lang as keyof typeof content] || content.en;
  };

  const navContent = getNavContent(currentLang);

  const handleLanguageChange = (code: string) => {
    setCurrentLang(code);
    // Update URL with new language and reload
    const url = new URL(window.location.href);
    url.searchParams.set('lang', code);
    window.location.href = url.toString();
  };

  return (
    <nav 
      className={`relative flex items-center justify-between w-full px-5 py-5 bg-white ${className}`}
      dir={currentLang === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Container with max width */}
      <div className={`w-full max-w-screen-2xl mx-auto flex items-center justify-between ${currentLang === 'ar' ? 'flex-row-reverse' : ''}`}>
      
      {/* Logo - Always on left */}
      <Link to="/" className="flex items-center gap-x-3 no-underline">
        {/* Logo SVG - Building icon */}
        <div className="w-10 h-8 flex-shrink-0">
          <svg viewBox="0 0 40 30" className="w-full h-full">
            <path
              d="M 36.968 20.426 L 33.716 26.059 L 24.189 26.048 L 27.223 20.794 L 18.262 5.293 L 28.346 5.337 Z"
              fill="black"
            />
            <path
              d="M 9.807 5.266 L 16.312 5.266 L 21.066 13.522 L 14.999 13.521 L 6.055 29.033 L 1.051 20.277 Z"
              fill="black"
            />
          </svg>
        </div>
        <span 
          className="text-black tracking-[-1.6px] text-xl font-semibold"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {logoText}
        </span>
      </Link>

      {/* Mobile Menu - Right side */}
      <MobileMenuCard
        isOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen(!isMenuOpen)}
        onClose={() => setIsMenuOpen(false)}
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        navHome={navContent.navHome}
        navProperties={navContent.navProperties}
        navProjects={navContent.navProjects}
        navLanguage={navContent.navLanguage}
      />
      
      </div>
    </nav>
  );
};