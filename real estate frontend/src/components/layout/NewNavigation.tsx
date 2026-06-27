import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { MessageCircle, Globe, ChevronDown, Check } from 'lucide-react';
import { MobileMenuCard } from './MobileMenuCard';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇩🇿' },
];

// Nav content for each language
const getNavContent = (lang: string) => {
  const content = {
    en: {
      navItems: [
        { label: 'Home', href: `/${lang}/` },
        { label: 'Properties', href: `/${lang}/properties` },
        { label: 'Projects', href: `/${lang}/projects` },
      ],
      whatsApp: 'WhatsApp',
      fontFamily: "'Geist Mono', monospace",
      fontWeight: '600',
    },
    fr: {
      navItems: [
        { label: 'Home', href: `/${lang}/` },
        { label: 'Properties', href: `/${lang}/properties` },
        { label: 'Projects', href: `/${lang}/projects` },
      ],
      whatsApp: 'WhatsApp',
      fontFamily: "'Geist Mono', monospace",
      fontWeight: '600',
    },
    ar: {
      navItems: [
        { label: 'Home', href: `/${lang}/` },
        { label: 'Properties', href: `/${lang}/properties` },
        { label: 'Projects', href: `/${lang}/projects` },
      ],
      whatsApp: 'واتساب',
      fontFamily: "'Noto Sans Arabic', sans-serif",
      fontWeight: '500',
    },
  };
  return content[lang as keyof typeof content] || content.en;
};

export const NewNavigation: React.FC = () => {
  const { lang: urlLang } = useParams<{ lang: string }>();
  const currentLang = urlLang || 'en';
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageSelect = (code: string) => {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(Boolean);
    const langCodes = languages.map(l => l.code);
    const firstSegment = pathParts[0];
    const hasLangPrefix = langCodes.includes(firstSegment);
    
    let newPath: string;
    if (hasLangPrefix) {
      const restOfPath = pathParts.slice(1).join('/');
      newPath = `/${code}/${restOfPath}`;
    } else {
      newPath = `/${code}${currentPath}`;
    }
    
    navigate(newPath);
    setIsLangOpen(false);
  };

  const navContent = getNavContent(currentLang);
  const isRTL = currentLang === 'ar';

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-[10000] bg-white/95 backdrop-blur-md border-b border-gray-100"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <nav 
        className={`relative flex items-center justify-between w-full px-4 md:px-6 lg:px-9 py-3 lg:py-4`}
      >
        {/* Container with max width */}
        <div className={`w-full max-w-screen-2xl mx-auto flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
        
        {/* Logo */}
        <Link to={`/${currentLang}/`} className="flex items-center gap-x-2 lg:gap-x-3 no-underline">
          {/* Logo SVG - Building icon */}
          <div className="w-8 lg:w-10 h-6 lg:h-8 flex-shrink-0">
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
            className="text-black tracking-[-1.6px] text-xl lg:text-2xl font-semibold"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            The One
          </span>
        </Link>

        {/* Nav Links - Center (hidden on mobile) */}
        <div className="hidden md:flex items-center gap-x-1 lg:gap-x-2">
          {navContent.navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="px-3 lg:px-5 py-2 lg:py-3 text-black tracking-[1.6px] uppercase text-xs lg:text-sm no-underline hover:opacity-70 transition-opacity"
              style={{ fontFamily: navContent.fontFamily, fontWeight: navContent.fontWeight }}
            >
              {item.label}
            </Link>
          ))}

          {/* Language Selector */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-3 lg:px-5 py-2 lg:py-3 text-black tracking-[1.6px] uppercase text-xs lg:text-sm hover:opacity-70 transition-opacity"
              style={{ fontFamily: navContent.fontFamily, fontWeight: navContent.fontWeight }}
            >
              <Globe size={14} />
              <span className="hidden lg:inline">{currentLang.toUpperCase()}</span>
              <ChevronDown 
                size={12} 
                className={`transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Language Dropdown */}
            {isLangOpen && (
              <div 
                className="absolute left-1/2 -translate-x-1/2 mt-2 bg-neutral-100 rounded-2xl shadow-lg border border-gray-200 py-2 z-50"
              >
                {languages.map((lang) => {
                  const langFont = lang.code === 'ar' ? "'Noto Sans Arabic', sans-serif" : "'Geist Mono', monospace";
                  const langWeight = lang.code === 'ar' ? '500' : '600';
                  return (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className="w-full flex items-center px-6 py-3 text-left gap-3 hover:bg-neutral-200 transition-colors"
                    >
                      <span 
                        className="text-xs text-gray-500 uppercase"
                        style={{ fontFamily: langFont, fontWeight: langWeight }}
                      >
                        {lang.code}
                      </span>
                      <span 
                        className="text-sm text-black"
                        style={{ fontFamily: langFont, fontWeight: langWeight }}
                      >
                        {lang.name}
                      </span>
                      {currentLang === lang.code && (
                        <Check size={16} className="text-black ml-auto" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* WhatsApp Button - Right */}
        <a
          href="https://wa.me/213551234567"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1 lg:gap-2 bg-black text-white rounded-full py-2 lg:py-3 px-3 lg:px-4 hover:bg-[rgb(44,44,44)] transition-colors no-underline"
          style={{ fontFamily: navContent.fontFamily, fontWeight: navContent.fontWeight }}
        >
          <MessageCircle size={16} strokeWidth={2.5} className="lg:[&amp;]:w-[18px] lg:[&;]:h-[18px]" />
          <span className="text-xs lg:text-sm hidden sm:inline">
            {navContent.whatsApp}
          </span>
        </a>

        {/* Mobile Menu - Right side (only on mobile/tablet) */}
        <div className="md:hidden">
          <MobileMenuCard
            isOpen={isMenuOpen}
            onToggle={() => setIsMenuOpen(!isMenuOpen)}
            onClose={() => setIsMenuOpen(false)}
            currentLang={currentLang}
            onLanguageChange={handleLanguageSelect}
            navHome="Home"
            navProperties="Properties"
            navProjects="Projects"
            navLanguage="Language"
          />
        </div>
        
        </div>
      </nav>
    </header>
  );
};