import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Globe } from 'lucide-react';
import { ActionPill, ActionPillRTL } from '@/components/ui';
import { MenuButton } from '@/components/ui/MenuButton';
import { useContact } from '@/hooks';

const languages = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'ar', label: 'AR', name: 'العربية' },
];

interface MobileMenuCardProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  currentLang: string;
  onLanguageChange: (code: string) => void;
  currentTheme: string;
  onThemeChange: (code: string) => void;
  navHome: string;
  navProperties: string;
  navProjects: string;
  navLanguage: string;
  navTheme: string;
  navLight: string;
  navDark: string;
}

export const MobileMenuCard: React.FC<MobileMenuCardProps> = ({
  isOpen,
  onToggle,
  onClose,
  currentLang,
  onLanguageChange,
  currentTheme,
  onThemeChange,
  navHome,
  navProperties,
  navProjects,
  navLanguage,
  navTheme,
  navLight,
  navDark,
}) => {
  const navigate = useNavigate();
  const { contact } = useContact();
  const whatsappURL = contact?.whatsappURL || 'https://wa.me/213551234567';

  const themes = [
    { code: 'light', label: navLight, icon: Sun },
    { code: 'dark', label: navDark, icon: Moon },
  ];

  return (
    <>
      {/* Mobile/Tablet Menu Button */}
      <div
        className="lg:hidden absolute right-[clamp(16px,3.2vw,64px)] top-1/2 z-[10001]"
        style={{ transform: 'translateY(-50%)' }}
      >
        <MenuButton isOpen={isOpen} onClick={onToggle} />

        {/* Morphing Menu Card */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute right-0 top-full mt-2 w-[320px] bg-[#F5F5F5] border border-gray-200 rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: -20, transformOrigin: 'top right' }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              {/* Menu Items */}
              <motion.div 
                className="pt-4 px-4 flex flex-col gap-1"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
                  }
                }}
                initial="hidden"
                animate="visible"
              >
                {[
                  { label: navHome, href: `/${currentLang}` },
                  { label: navProperties, href: `/${currentLang}/properties` },
                  { label: navProjects, href: `/${currentLang}/projects` },
                ].map((item) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href);
                      onClose();
                    }}
                    className="block py-3 px-3 text-base font-medium text-[rgb(44,44,44)] rounded-xl hover:bg-gray-200 transition-colors"
                    variants={{
                      hidden: { opacity: 0, x: 20 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.a>
                ))}

                {/* Divider */}
                <div className="h-px bg-gray-200 my-2" />

                {/* Language Selector */}
                <div className="px-3 py-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-500 font-medium">{navLanguage}</span>
                  </div>
                  <div className="flex gap-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onLanguageChange(lang.code);
                          onClose();
                        }}
                        className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                          currentLang === lang.code
                            ? 'bg-[#E8E8E8] text-black'
                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Theme Selector */}
                <div className="px-3 pb-2">
                  <span className="text-sm text-gray-500 font-medium mb-2 block">{navTheme}</span>
                  <div className="flex gap-2">
                    {themes.map((theme) => {
                      const IconComponent = theme.icon;
                      return (
                        <button
                          key={theme.code}
                          onClick={() => onThemeChange(theme.code)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                            currentTheme === theme.code
                              ? 'bg-[#E8E8E8] text-black'
                              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <IconComponent size={14} />
                          <span>{theme.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>

              {/* Divider */}
              <div className="px-4 py-3">
                <div className="h-px bg-gray-200" />
              </div>

              {/* WhatsApp Button */}
              <div className="px-4 pb-4">
                {currentLang === 'ar' ? (
                  <ActionPillRTL
                    text="واتساب"
                    href={whatsappURL}
                    onClick={onClose}
                  />
                ) : (
                  <ActionPill
                    text="WhatsApp"
                    href={whatsappURL}
                    onClick={onClose}
                    isRTL={false}
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};