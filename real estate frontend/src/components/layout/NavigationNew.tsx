import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { ActionPill, ActionPillRTL } from '@/components/ui';
import { MobileMenuCard } from './MobileMenuCard';

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
  const [themeOpen, setThemeOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('light');
  const currentLang = lang || i18n.language || 'en';

  const themes = [
    { code: 'light', label: t('nav.light'), icon: Sun },
    { code: 'dark', label: t('nav.dark'), icon: Moon },
  ];

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

  const handleThemeChange = (code: string) => {
    setCurrentTheme(code);
    setThemeOpen(false);
  };

  return (
    <nav className="sticky top-0 z-[10000] bg-white/90 backdrop-blur border-b border-white">
      <div className="relative h-[clamp(60px,7vh,80px)] flex items-center pt-2">
        
        {/* Logo - Position changes based on language */}
        <div 
          className={`absolute top-1/2 -translate-y-1/2 ${
            currentLang === 'ar' 
              ? 'right-[clamp(16px,3.2vw,64px)] lg:right-[clamp(16px,3.2vw,64px)]' 
              : 'left-[clamp(16px,3.2vw,64px)] lg:left-[clamp(16px,3.2vw,64px)]'
          }`}
          style={{ transform: 'translateY(-50%)' }}
        >
          <span className="text-[clamp(14px,1.5vw,20px)] md:text-base lg:text-[clamp(14px,1.5vw,20px)] font-bold">Logo</span>
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
            href={`/${currentLang}`}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${currentLang}`);
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
                setThemeOpen(false);
              }}
              className="flex items-center gap-1 px-4 py-2 text-[14px] font-medium text-[rgb(44,44,44)] hover:text-black transition-colors rounded-full hover:bg-gray-100"
              style={{ fontFamily: 'Geist, sans-serif' }}
            >
              <span>{t('nav.language')}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${langOpen ? 'rotate-180' : ''}`}>
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </button>
            <AnimatePresence>
              {langOpen && (
                <>
                  <motion.div
                    className="fixed inset-0 z-[9999]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setLangOpen(false)}
                  />
                  <motion.div 
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 py-3 px-3 bg-[#F5F5F5] border border-gray-200 rounded-2xl shadow-xl z-[10000] scale-95 origin-top"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeOut" } }}
                    exit={{ opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.15 } }}
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`w-full px-4 py-2.5 text-start text-sm transition-colors flex items-center gap-3 rounded-xl ${
                          currentLang === lang.code
                            ? 'bg-[#E8E8E8] text-black'
                            : 'text-gray-700'
                        }`}
                        style={{ fontFamily: 'Geist, sans-serif' }}
                      >
                        <span className="font-medium">{lang.label}</span>
                        <span className="text-gray-400">{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setThemeOpen(!themeOpen);
                setLangOpen(false);
              }}
              className="flex items-center gap-1 px-4 py-2 text-[14px] font-medium text-[rgb(44,44,44)] hover:text-black transition-colors rounded-full hover:bg-gray-100"
              style={{ fontFamily: 'Geist, sans-serif' }}
            >
              <span>{t('nav.theme')}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform ${themeOpen ? 'rotate-180' : ''}`}>
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </button>
            <AnimatePresence>
              {themeOpen && (
                <>
                  <motion.div
                    className="fixed inset-0 z-[9999]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setThemeOpen(false)}
                  />
                  <motion.div 
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 py-3 px-3 bg-[#F5F5F5] border border-gray-200 rounded-2xl shadow-xl z-[10000] scale-95 origin-top"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeOut" } }}
                    exit={{ opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.15 } }}
                  >
                    {themes.map((theme) => {
                      const IconComponent = theme.icon;
                      return (
                        <button
                          key={theme.code}
                          onClick={() => handleThemeChange(theme.code)}
                          className={`w-full px-4 py-2.5 text-start text-sm transition-colors flex items-center gap-3 rounded-xl ${
                            currentTheme === theme.code
                              ? 'bg-[#E8E8E8] text-black'
                              : 'text-gray-700'
                          }`}
                          style={{ fontFamily: 'Geist, sans-serif' }}
                        >
                          <IconComponent size={16} />
                          <span className="font-medium">{theme.label}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop WhatsApp Button - Position changes based on language */}
        <div 
          className={`absolute top-1/2 hidden lg:block ${
            currentLang === 'ar' 
              ? 'left-[clamp(16px,3.2vw,64px)] lg:left-[clamp(16px,3.2vw,64px)]' 
              : 'right-[clamp(16px,3.2vw,64px)] lg:right-[clamp(16px,3.2vw,64px)]'
          }`}
          style={{ transform: 'translateY(-50%)' }}
        >
          {currentLang === 'ar' ? (
            <ActionPillRTL
              text="واتساب"
              href="./#contact"
              onClick={() => console.log('WhatsApp clicked')}
            />
          ) : (
            <ActionPill
              text="WhatsApp"
              href="./#contact"
              onClick={() => console.log('WhatsApp clicked')}
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
          currentTheme={currentTheme}
          onThemeChange={handleThemeChange}
          navHome={t('nav.home')}
          navProperties={t('nav.properties')}
          navProjects={t('nav.projects')}
          navLanguage={t('nav.language')}
          navTheme={t('nav.theme')}
          navLight={t('nav.light')}
          navDark={t('nav.dark')}
        />
      </div>
    </nav>
  );
};