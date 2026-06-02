"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { 
  Menubar, 
  MenubarMenu, 
  MenubarTrigger, 
} from "@/components/ui/menubar"; 
 
const languages = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'ar', label: 'AR', name: 'العربية' },
];

const themes = [
  { code: 'light', label: 'Light', icon: Sun },
  { code: 'dark', label: 'Dark', icon: Moon },
];

const LanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const [isOpen, setIsOpen] = React.useState(false);

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
    
    if (newPath === `/${code}/` || newPath === `/${code}`) {
      newPath = `/${code}/`;
    }
    
    i18n.changeLanguage(code);
    navigate(newPath);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-xs font-medium text-gray-700 hover:text-gray-900 transition-colors"
      >
        <span>Language</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[9999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              className="absolute top-full mt-[21px] py-[6px] bg-white border border-gray-200 rounded-xl shadow-lg z-[10000] min-w-max mb-[21px] pl-[4px] pr-[4px] -ml-[15px] -mr-[15px] scale-95 origin-top-left"
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 0.95, transition: { duration: 0.2, ease: "easeOut" } }}
              exit={{ opacity: 0, y: -8, scale: 0.96, transition: { duration: 0.15 } }}
            >
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageChange(language.code)}
                  className={`w-full px-4 py-2 text-start text-xs transition-colors flex items-center gap-2 ${
                    currentLang === language.code
                      ? 'bg-gray-100 text-black font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span className="font-medium">{language.label}</span>
                  <span className="text-gray-400">{language.name}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const ThemeDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentTheme, setCurrentTheme] = React.useState('light');

  const handleThemeChange = (code: string) => {
    setCurrentTheme(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center text-xs font-medium text-gray-700 hover:text-gray-900 transition-colors"
      >
        <span>Theme</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-[9999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              className="absolute top-full mt-[21px] py-[6px] bg-white border border-gray-200 rounded-xl shadow-lg z-[10000] min-w-max mb-[21px] pl-[4px] pr-[4px] -ml-[15px] -mr-[15px] scale-95 origin-top-left"
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
                      className={`w-full px-4 py-2 text-start text-xs transition-colors flex items-center gap-2 ${
                        currentTheme === theme.code
                          ? 'bg-gray-100 text-black font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <IconComponent size={14} className="text-gray-500" />
                      <span className="font-medium">{theme.label}</span>
                    </button>
                  );
                })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function NavbarContainer() { 
  return ( 
    <Menubar> 
      <MenubarMenu>
        <MenubarTrigger>Home</MenubarTrigger>
      </MenubarMenu>
 
      <MenubarMenu>
        <MenubarTrigger>Projects</MenubarTrigger>
      </MenubarMenu>
 
      <MenubarMenu>
        <MenubarTrigger>Properties</MenubarTrigger>
      </MenubarMenu>
 
      <MenubarMenu>
        <MenubarTrigger>
          <LanguageDropdown />
        </MenubarTrigger>
      </MenubarMenu>
 
      <MenubarMenu>
        <MenubarTrigger>
          <ThemeDropdown />
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar> 
  ); 
}