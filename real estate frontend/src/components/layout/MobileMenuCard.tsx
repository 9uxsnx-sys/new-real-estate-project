import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, MessageCircle } from 'lucide-react';
import { MenuButton } from '@/components/ui/MenuButton';
import { useContact } from '@/hooks';

const languages = [
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'ar', label: 'AR', name: 'العربية' },
];

const getContent = (lang: string) => {
  const content = {
    en: { whatsApp: 'WhatsApp', fontFamily: "'Geist Mono', monospace", fontWeight: '600' },
    fr: { whatsApp: 'WhatsApp', fontFamily: "'Geist Mono', monospace", fontWeight: '600' },
    ar: { whatsApp: 'واتساب', fontFamily: "'Noto Sans Arabic', sans-serif", fontWeight: '500' },
  };
  return content[lang as keyof typeof content] || content.en;
};

interface MobileMenuCardProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  currentLang: string;
  onLanguageChange: (code: string) => void;
  navHome: string;
  navProperties: string;
  navProjects: string;
  navLanguage: string;
}

export const MobileMenuCard: React.FC<MobileMenuCardProps> = ({
  isOpen,
  onToggle,
  onClose,
  currentLang,
  onLanguageChange,
  navHome,
  navProperties,
  navProjects,
  navLanguage,
}) => {
  const navigate = useNavigate();
  const { contact } = useContact();
  const whatsappURL = contact?.whatsappURL || 'https://wa.me/213551234567';
  const content = getContent(currentLang);

  return (
    <>
      {/* Mobile/Tablet Menu Button */}
      <div
        className="lg:hidden absolute right-[clamp(16px,3.2vw,64px)] top-1/2 z-[10001]"
        style={{ transform: 'translateY(-50%)' }}
      >
        <MenuButton isOpen={isOpen} onClick={onToggle} />

        {/* Morphing Menu Card */}
        {isOpen && (
          <div
            className="absolute right-0 top-full mt-2 w-[280px] bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden"
          >
            {/* Menu Items */}
            <div className="pt-4 px-4 flex flex-col gap-1">
              {[
                { label: navHome, href: `/${currentLang}/` },
                { label: navProperties, href: `/${currentLang}/properties` },
                { label: navProjects, href: `/${currentLang}/projects` },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.href);
                    onClose();
                  }}
                  className="block py-3 px-3 text-base font-medium text-[rgb(44,44,44)] rounded-xl hover:bg-gray-100 transition-colors"
                >
                  {item.label}
                </a>
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
                          ? 'bg-gray-100 text-black'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="px-4 py-3">
              <div className="h-px bg-gray-200" />
            </div>

            {/* WhatsApp Button */}
            <div className="px-4 pb-4">
              <a
                href={whatsappURL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 bg-black text-white rounded-full py-3 px-4 hover:bg-[rgb(44,44,44)] transition-colors no-underline"
                style={{ fontFamily: content.fontFamily, fontWeight: content.fontWeight }}
              >
                <MessageCircle size={18} strokeWidth={2.5} />
                <span className="text-sm">
                  {content.whatsApp}
                </span>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
