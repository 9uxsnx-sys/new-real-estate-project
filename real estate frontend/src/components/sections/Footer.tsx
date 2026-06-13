import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';
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
            <a href={contact?.facebookURL || '#'} target={contact?.facebookURL ? '_blank' : undefined} rel="noopener noreferrer" className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <FaFacebookF className="w-5 h-5 text-white" />
            </a>
            <a href={contact?.instagramURL || '#'} target={contact?.instagramURL ? '_blank' : undefined} rel="noopener noreferrer" className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <FaInstagram className="w-5 h-5 text-white" />
            </a>
            <a href={contact?.tiktokURL || '#'} target={contact?.tiktokURL ? '_blank' : undefined} rel="noopener noreferrer" className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
              <FaTiktok className="w-5 h-5 text-white" />
            </a>
            {contact?.whatsappURL && (
              <a href={contact.whatsappURL} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors">
                <FaWhatsapp className="w-5 h-5 text-white" />
              </a>
            )}
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
