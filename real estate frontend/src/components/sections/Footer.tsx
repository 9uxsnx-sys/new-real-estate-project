import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { useContact } from '@/hooks';

export const Footer: React.FC = () => {
  const { i18n } = useTranslation();
  const { lang } = useParams<{ lang: string }>();
  const location = useLocation();
  const currentLang = lang || 'en';
  const isRTL = i18n.language === 'ar';

  const { contact } = useContact(currentLang);

  // Get current path without language prefix
  const getCurrentPath = () => {
    const pathParts = location.pathname.split('/').filter(Boolean);
    const langCodes = ['en', 'fr', 'ar'];
    if (langCodes.includes(pathParts[0])) {
      return '/' + pathParts.slice(1).join('/');
    }
    return location.pathname;
  };

  const currentPath = getCurrentPath();

  const content = {
    en: {
      tagline: 'Building Your Dreams Into Reality',
      contactTitle: 'Contact Us',
      address: '123 Business Center, Algiers, Algeria',
      phone: '+213 555 123 456',
      email: 'info@theone.dz',
      followUs: 'Follow Us',
      copyright: '© 2024 The One. All rights reserved.',
    },
    fr: {
      tagline: 'Construisons Vos Rêves En Réalité',
      contactTitle: 'Contactez-nous',
      address: '123 Centre d\'affaires, Alger, Algérie',
      phone: '+213 555 123 456',
      email: 'info@theone.dz',
      followUs: 'Suivez-nous',
      copyright: '© 2024 The One. Tous droits réservés.',
    },
    ar: {
      tagline: 'نبني أحلامك إلى الواقع',
      contactTitle: 'تواصل معنا',
      address: '123 مركز الأعمال، الجزائر، الجزائر',
      phone: '+213 555 123 456',
      email: 'info@theone.dz',
      followUs: 'تابعنا',
      copyright: '© 2024 ذا ون. جميع الحقوق محفوظة.',
    }
  };

  const activeContent = content[i18n.language as keyof typeof content] || content.en;

  return (
    <footer className="w-full bg-gray-50 py-12 md:py-16 px-6 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: Logo, Navigation, Social */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 md:gap-12 mb-12">
          
          {/* Logo & Tagline */}
          <div className={`${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className="text-2xl font-bold text-[#111111] mb-2">THE ONE</h3>
            <p className="text-sm text-gray-500">{activeContent.tagline}</p>
          </div>
          
          {/* Navigation Links */}
          <div className="flex flex-wrap gap-6 md:gap-8">
            <a href={`/${currentLang}`} className="text-sm text-gray-600 hover:text-black transition-colors">Home</a>
            <a href={`/${currentLang}/projects`} className="text-sm text-gray-600 hover:text-black transition-colors">Projects</a>
            <a href={`/${currentLang}/properties`} className="text-sm text-gray-600 hover:text-black transition-colors">Properties</a>
            <a href={`/${currentLang}#about-us`} className="text-sm text-gray-600 hover:text-black transition-colors">About Us</a>
          </div>
          
          {/* Social Icons */}
          <div className="flex gap-3">
            <a href="#" className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.141c-3.904 0-7.071 3.167-7.071 7.071 0 3.904 3.167 7.071 7.071 7.071 3.904 0 7.071-3.167 7.071-7.071 0-3.904-3.167-7.071-7.071-7.071zm0 8.468c-2.103 0-3.814-1.711-3.814-3.814 0-2.103 1.711-3.814 3.814-3.814 2.103 0 3.814 1.711 3.814 3.814 0 2.103-1.711 3.814-3.814 3.814zm6.391-10.845c-1.102 0-1.956.896-1.956 1.956 0 1.102.896 1.956 1.956 1.956 1.102 0 1.956-.896 1.956-1.956 0-1.102-.896-1.956-1.956-1.956z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
          </div>
        </div>
        
        {/* Divider */}
        <div className="w-full h-px bg-gray-200 mb-8" />
        
        {/* Bottom Section: Contact Info & Copyright */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          {/* Contact Info */}
          <div className={`flex flex-col gap-3 ${isRTL ? 'text-right' : 'text-left'}`}>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-400">
              {activeContent.contactTitle}
            </span>
            <div className="flex flex-col gap-1 text-sm text-gray-600">
              {contact?.address && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{contact.address}</span>
                </div>
              )}
              {contact?.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{contact.phone}</span>
                </div>
              )}
              {contact?.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{contact.email}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Copyright & Language */}
          <div className={`flex flex-col gap-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="text-xs text-gray-400">{activeContent.copyright}</p>
            <div className="flex gap-4 text-xs text-gray-500">
              <a href={`/en${currentPath}`} className={`hover:text-black transition-colors ${currentLang === 'en' ? 'text-black font-medium' : ''}`}>EN</a>
              <span className="text-gray-300">|</span>
              <a href={`/fr${currentPath}`} className={`hover:text-black transition-colors ${currentLang === 'fr' ? 'text-black font-medium' : ''}`}>FR</a>
              <span className="text-gray-300">|</span>
              <a href={`/ar${currentPath}`} className={`hover:text-black transition-colors ${currentLang === 'ar' ? 'text-black font-medium' : ''}`}>AR</a>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
};
