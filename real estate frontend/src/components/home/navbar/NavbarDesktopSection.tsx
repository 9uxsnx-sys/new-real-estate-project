import React, { useState, useRef, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MessageCircle, Globe, ChevronDown, Check } from 'lucide-react';
import { useContact } from '@/hooks';

const supportedLangs = ['en', 'fr', 'ar'];

/**
 * Navbar Desktop Section
 * 
 * Navigation bar for desktop screens with logo, nav links, language selector, and WhatsApp CTA
 */

interface NavbarDesktopSectionProps {
  logoText?: string;
  isRTL?: boolean;
  className?: string;
}

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
        { label: 'Accueil', href: `/${lang}/` },
        { label: 'Propriétés', href: `/${lang}/properties` },
        { label: 'Projets', href: `/${lang}/projects` },
      ],
      whatsApp: 'WhatsApp',
      fontFamily: "'Geist Mono', monospace",
      fontWeight: '600',
    },
    ar: {
      navItems: [
        { label: 'الرئيسية', href: `/${lang}/` },
        { label: 'العقارات', href: `/${lang}/properties` },
        { label: 'المشاريع', href: `/${lang}/projects` },
      ],
      whatsApp: 'واتساب',
      fontFamily: "'Noto Sans Arabic', sans-serif",
      fontWeight: '500',
    },
  };
  return content[lang as keyof typeof content] || content.en;
};

export const NavbarDesktopSection: React.FC<NavbarDesktopSectionProps> = ({
  logoText = 'The One',
  isRTL = false,
  className = '',
}) => {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { lang: urlLang } = useParams<{ lang: string }>();
  const [currentLang, setCurrentLang] = useState(urlLang || 'en');
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Fetch contact data for WhatsApp URL
  const { contact } = useContact();
  
  // Determine isRTL based on current language
  const isRTLLanguage = currentLang === 'ar';
  const navContent = getNavContent(currentLang);

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
    setCurrentLang(code);
    setIsLangOpen(false);
    
    // Update URL path with new language
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    if (pathParts.length > 0 && supportedLangs.includes(pathParts[0])) {
      pathParts[0] = code;
    } else {
      pathParts.unshift(code);
    }
    window.location.pathname = '/' + pathParts.join('/');
  };

  const currentLangData = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <nav 
      className={`flex items-center justify-between w-full px-4 md:px-6 lg:px-9 py-3 lg:py-4 bg-white ${className}`}
      dir={isRTLLanguage ? 'rtl' : 'ltr'}
    >
      {/* Container with max width */}
      <div className="w-full max-w-screen-2xl mx-auto flex items-center justify-between">
      
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
          {logoText}
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
            <span className="hidden lg:inline">{currentLangData.name}</span>
            <span className="lg:hidden">{currentLangData.code.toUpperCase()}</span>
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
                    className="w-full flex items-center px-6 py-3 text-left gap-3"
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
        href={contact?.whatsappURL || '#'}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => !contact?.whatsappURL && e.preventDefault()}
        className="flex items-center justify-center gap-1 lg:gap-2 bg-black text-white rounded-full py-2 lg:py-3 px-3 lg:px-4 hover:bg-[rgb(44,44,44)] transition-colors no-underline"
        style={{ fontFamily: navContent.fontFamily, fontWeight: navContent.fontWeight }}
      >
        <MessageCircle size={16} strokeWidth={2.5} className="lg:[&amp;]:w-[18px] lg:[&;]:h-[18px]" />
        <span className="text-xs lg:text-sm">
          {navContent.whatsApp}
        </span>
      </a>
      
      </div>
    </nav>
  );
};
