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
            {/* Facebook */}
            <a href="#" className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 4.052.014 5.35 0 5.75 0 8c0 2.25.014 2.7.072 4.05.2 1.36.637 2.74 1.979 3.36C3.02 17.948 4.13 19.063 5.36 19.927c1.36.37 2.74.63 4.05.72 1.35.06 1.75.072 4.05.072 2.25 0 2.7-.014 4.05-.072 1.36-.2 2.74-.637 3.36-1.979.37-1.36.63-2.74.72-4.05.06-1.35.072-1.75.072-4.05 0-2.25-.014-2.7-.072-4.05-.2-1.36-.637-2.74-1.979-3.36C17.02 4.052 15.87 2.937 14.64 2.073 13.28 1.702 11.9 1.442 10.54 1.362 9.19 1.302 8.79 1.29 6.54 1.29 4.29 1.29 3.89 1.302 2.54 1.362 1.18 1.702-.1 3.02-.9 4.38-.63 2.74-.37 4.12-.29 5.48-.23 6.83-.22 7.23-.22 10c0 2.75.01 3.15.23 4.49.06 1.36.37 2.74.9 4.1.53 1.36 1.58 2.41 2.94 2.94 1.36.53 2.74.84 4.1.9 1.35.18 1.75.23 4.49.23s3.15-.01 4.49-.23c1.36-.2 2.74-.63 4.1-.9 1.36-.53 2.41-1.58 2.94-2.94.53-1.36.84-2.74.9-4.1.18-1.35.23-1.75.23-4.5 0-2.75-.01-3.15-.23-4.49-.06-1.36-.37-2.74-.9-4.1-.53-1.36-1.58-2.41-2.94-2.94-1.36-.53-2.74-.84-4.1-.9C15.15.014 14.75.002 12 .002 8.741.002 8.333.016 7.053.074 2.695.274.273 2.692.073 4.054.014 5.352 0 5.752 0 8.002c0 2.25.014 2.7.074 4.05.2 1.36.637 2.74 1.979 3.36.37 1.36.84 2.02 1.307 2.66.62.85 1.38 1.53 2.34 2.11 1.2.73 2.52 1.17 4.02 1.37.75.1 1.52.16 2.3.16 3.25 0 4.05-.01 4.49-.16 1.5-.2 2.82-.64 4.02-1.37.96-.58 1.72-1.26 2.34-2.11.467-.64.937-1.3 1.307-2.66.2-1.36.637-2.74 1.979-3.36 1.36-.37 2.74-.63 4.1-.72 1.35-.06 1.75-.072 4.49-.072s3.15.014 4.49.072c1.36.2 2.74.63 4.1.9 1.36.53 2.41 1.58 2.94 2.94.53 1.36.84 2.74.9 4.1.18 1.35.23 1.75.23 4.5 0 2.75-.01 3.15-.23 4.49-.06 1.36-.37 2.74-.9 4.1-.53 1.36-1.58 2.41-2.94 2.94-1.36.53-2.74.84-4.1.9-1.35.18-1.75.23-4.49.23s-3.15-.01-4.49-.23c-1.5-.2-2.82-.64-4.02-1.37-.96-.58-1.72-1.26-2.34-2.11-.467-.64-.937-1.3-1.307-2.66-.2-1.36-.637-2.74-1.979-3.36-.37-1.36-.84-2.02-1.307-2.66-.62-.85-1.38-1.53-2.34-2.11-1.2-.73-2.52-1.17-4.02-1.37C15.15 12.014 14.75 12.002 12 12.002zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            {/* TikTok */}
            <a href="#" className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.98-1.14s-1.4-1.12-2.56-1.38c-.36-.08-.73-.12-1.1-.12-.22.01-.43.02-.65.02.33 1.82 2.29 3.24 4.37 3.33v4.57c-2.95-.1-5.69-.56-8.14-1.64-.16-.07-.32-.15-.48-.24.05.45.09.91.13 1.37.15 1.49.42 2.95.88 4.34.42 1.28 1.06 2.48 1.87 3.46.77.93 1.72 1.7 2.76 2.24 1.18.61 2.51 1.02 3.87 1.19.68.08 1.37.13 2.06.14-.24 1.5-1.03 2.93-2.13 3.97-.96.91-2.21 1.62-3.56 2.06-1.26.41-2.64.6-4.01.55-1.77-.06-3.49-.43-5.02-1.12-1.64-.74-3.04-1.88-4.05-3.43-.98-1.5-1.51-3.23-1.62-4.97-.11-1.67.28-3.33 1.12-4.81 1.14-2.01 3.08-3.52 5.27-4.09C5.36 5.57 8.56 5.27 11.75 5.28c.14-.01.28-.01.42-.01.02.42.04 1.14.04 1.97-.01 2.39.01 2.78.07 4.15.09 2.01.5 3.97 1.23 5.8.76 1.91 1.9 3.61 3.31 4.98 1.27 1.23 2.83 2.2 4.53 2.77 1.59.53 3.32.81 5.04.88.51.02.93.04 1.21.04.41 0 .82-.02 1.23-.04.66-.04 1.32-.16 1.95-.39 1.35-.5 2.59-1.25 3.61-2.24 1.06-1.03 1.89-2.26 2.45-3.63.51-1.25.77-2.61.77-3.97 0-2.78-.99-5.39-2.67-7.34-1.57-1.82-3.79-2.96-6.19-3.26-.98-.12-1.97-.18-2.96-.18z"/>
              </svg>
            </a>
            {/* WhatsApp */}
            <a href="#" className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.868-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
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
