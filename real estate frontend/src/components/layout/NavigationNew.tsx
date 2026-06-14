import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ActionPill, ActionPillRTL } from '@/components/ui';
import { MobileMenuCard } from './MobileMenuCard';
import { useContact } from '@/hooks';

const languages = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'ar', label: 'AR', name: 'العربية' },
];

export const NavigationNew: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const currentLang = lang || i18n.language || 'en';
  const { contact } = useContact();
  const whatsappURL = contact?.whatsappURL || 'https://wa.me/213551234567';

  const handleLanguageChange = (code: string) => {
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
    i18n.changeLanguage(code);
    navigate(newPath);
    setLangOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[10000] bg-white/90 backdrop-blur border-b border-white">
      <nav className="w-full px-4 md:px-8 lg:px-16 xl:px-20 h-[clamp(60px,7vh,80px)] flex items-center">
        <div className="w-full flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <span className="text-[clamp(14px,1.5vw,20px)] font-bold">VistaHaven</span>
        </div>

        {/* Desktop Navigation Links - Centered */}
        <div className="hidden lg:flex items-center justify-center gap-2 flex-1">
          <a
            href={`/${currentLang}`}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${currentLang}`);
            }}
            className="text-sm lg:text-[clamp(12px,1vw,14px)] font-medium text-[rgb(44,44,44)] hover:text-black transition-colors px-3 lg:px-4 py-2 rounded-full hover:bg-gray-100"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            {t('nav.home')}
          </a>
          <a
            href={`/${currentLang}/properties`}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${currentLang}/properties`);
            }}
            className="text-sm lg:text-[clamp(12px,1vw,14px)] font-medium text-[rgb(44,44,44)] hover:text-black transition-colors px-3 lg:px-4 py-2 rounded-full hover:bg-gray-100"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            {t('nav.properties')}
          </a>
          <a
            href={`/${currentLang}/projects`}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${currentLang}/projects`);
            }}
            className="text-sm lg:text-[clamp(12px,1vw,14px)] font-medium text-[rgb(44,44,44)] hover:text-black transition-colors px-3 lg:px-4 py-2 rounded-full hover:bg-gray-100"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            {t('nav.projects')}
          </a>
          
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setLangOpen(!langOpen);
              }}
              className="flex items-center gap-1 px-4 py-2 text-[14px] font-medium text-[rgb(44,44,44)] hover:text-black transition-colors rounded-full hover:bg-gray-100"
              style={{ fontFamily: 'Geist, sans-serif' }}
            >
              <span>{t('nav.language')}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${langOpen ? 'rotate-180' : ''}`}>
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </button>
            {langOpen && (
              <>
                <div
                  className="fixed inset-0 z-[9999]"
                  onClick={() => setLangOpen(false)}
                />
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 py-3 px-3 bg-white border border-gray-200 rounded-2xl shadow-xl z-[10000] origin-top"
                >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full px-4 py-2.5 text-start text-sm transition-colors flex items-center gap-3 rounded-xl ${
                          currentLang === lang.code
                            ? 'bg-gray-100 text-black'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        style={{ fontFamily: 'Geist, sans-serif' }}
                      >
                        <span className="font-medium">{lang.label}</span>
                        <span className="text-gray-400">{lang.name}</span>
                      </button>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Desktop WhatsApp Button */}
        <div className="flex-shrink-0 hidden lg:block">
          {currentLang === 'ar' ? (
            <ActionPillRTL
              text="واتساب"
              href={whatsappURL}
            />
          ) : (
            <ActionPill
              text="WhatsApp"
              href={whatsappURL}
              isRTL={false}
            />
          )}
        </div>

        {/* Mobile/Tablet Menu Card with new MenuButton */}
        <MobileMenuCard
          isOpen={menuOpen}
          onToggle={() => setMenuOpen(!menuOpen)}
          onClose={() => setMenuOpen(false)}
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          navHome={t('nav.home')}
          navProperties={t('nav.properties')}
          navProjects={t('nav.projects')}
          navLanguage={t('nav.language')}
        />
      </div>
      </nav>
    </header>
  );
};
