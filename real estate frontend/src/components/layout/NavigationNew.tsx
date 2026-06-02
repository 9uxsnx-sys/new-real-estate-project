import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import ButtonWithIcon from '@/components/ui/button-with-icon';

const languages = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'ar', label: 'AR', name: 'العربية' },
];

const themes = [
  { code: 'light', label: 'Light', icon: Sun },
  { code: 'dark', label: 'Dark', icon: Moon },
];

export const NavigationNew: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const currentLang = lang || i18n.language || 'en';

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
    setThemeOpen(false);
  };

  return (
    <nav className="sticky top-0 z-[10000] bg-white/90 backdrop-blur border-b border-white">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-20">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>

          {/* Desktop Navigation Links - Centered */}
          <div className="hidden md:flex items-center justify-center gap-2 flex-1">
            <a
              href={`/${currentLang}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/${currentLang}`);
              }}
              className="text-[14px] font-medium text-[rgb(44,44,44)] hover:text-black transition-colors px-4 py-2 rounded-full hover:bg-gray-100"
              style={{ fontFamily: 'Geist, sans-serif' }}
            >
              Home
            </a>
            <a
              href={`/${currentLang}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/${currentLang}`);
              }}
              className="text-[14px] font-medium text-[rgb(44,44,44)] hover:text-black transition-colors px-4 py-2 rounded-full hover:bg-gray-100"
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
              className="text-[14px] font-medium text-[rgb(44,44,44)] hover:text-black transition-colors px-4 py-2 rounded-full hover:bg-gray-100"
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
                <span>Language</span>
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
                      className="absolute top-full mt-[10px] py-[5px] bg-white border border-gray-200 rounded-xl shadow-lg z-[10000] mb-[10px] pl-[4px] pr-[4px] ml-[3px] mr-[3px] scale-95 origin-top-left"
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeOut" } }}
                      exit={{ opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.15 } }}
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => handleLanguageChange(lang.code)}
                          className={`w-full px-4 py-2 text-start text-xs transition-colors flex items-center gap-2 ${
                            currentLang === lang.code
                              ? 'bg-gray-100 text-black font-medium'
                              : 'text-gray-700 hover:bg-gray-50'
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
                <span>Theme</span>
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
                      className="absolute top-full mt-[9px] py-[6px] bg-white border border-gray-200 rounded-xl shadow-lg z-[10000] mb-[9px] pl-[4px] pr-[4px] ml-[3px] mr-[3px] scale-95 origin-top-left"
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
                            className="w-full px-4 py-2 text-start text-xs transition-colors flex items-center gap-2 text-gray-700 hover:bg-gray-50"
                            style={{ fontFamily: 'Geist, sans-serif' }}
                          >
                            <IconComponent size={14} />
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

          {/* Right Side - Button */}
          <div className="hidden md:flex items-center scale-90">
            <ButtonWithIcon />
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                className="absolute top-full left-0 right-0 bg-white border-t border-[rgb(230,230,230)] shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-b-xl py-4 px-4 md:hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] } }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
              >
                <a
                  href={`/${currentLang}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/${currentLang}`);
                    setMobileMenuOpen(false);
                  }}
                  className="block py-3 text-[16px] font-light text-[rgb(44,44,44)]"
                  style={{ fontFamily: 'Geist, sans-serif' }}
                >
                  Home
                </a>
                <a
                  href={`/${currentLang}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/${currentLang}`);
                    setMobileMenuOpen(false);
                  }}
                  className="block py-3 text-[16px] font-light text-[rgb(44,44,44)]"
                  style={{ fontFamily: 'Geist, sans-serif' }}
                >
                  {t('nav.properties')}
                </a>
                <a
                  href={`/${currentLang}/projects`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/${currentLang}/projects`);
                    setMobileMenuOpen(false);
                  }}
                  className="block py-3 text-[16px] font-light text-[rgb(44,44,44)]"
                  style={{ fontFamily: 'Geist, sans-serif' }}
                >
                  {t('nav.projects')}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
};