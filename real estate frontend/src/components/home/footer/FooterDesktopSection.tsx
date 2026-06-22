import React from 'react';
import { EnvelopeSimple, MapPin, Phone, WhatsappLogo, InstagramLogo, TiktokLogo, FacebookLogo } from '@phosphor-icons/react';

/**
 * Footer Section (Desktop)
 * 
 * Exact implementation from Framer template
 */
interface FooterDesktopSectionProps {
  className?: string;
  lang?: string;
}

// Font family helper
const getFontFamily = (lang: string) => {
  return lang === 'ar' ? "'Noto Sans Arabic', sans-serif" : "'Plus Jakarta Sans', sans-serif";
};

// Footer content
const getFooterContent = (lang: string) => {
  const content = {
    en: {
      logoText: 'Aeline',
      description: 'Delivering premium residential and commercial developments across Algiers and Boumerdès since 2013. We build your trust before we build your project.',
      navLinks: {
        col1: [
          { label: 'Home', href: '/' },
          { label: 'About us', href: '/about' },
          { label: 'Services', href: '/services' },
          { label: 'FAQ', href: '/faq' },
          { label: 'Properties', href: '/properties' },
          { label: 'Projects', href: '/projects' }
        ],
        col2: []
      },
      contact: {
        email: 'contact@tasdiria.dz',
        address: 'Algiers & Boumerdès, Algeria',
        phone: '0770862831'
      },
      copyright: '© 2025 Tasdiria. All rights reserved.'
    },
    fr: {
      logoText: 'Aeline',
      description: 'Développeur de projets résidentiels et commerciaux d\'exception à Alger et Boumerdès depuis 2013. Nous bâtissons votre confiance avant de bâtir votre projet.',
      navLinks: {
        col1: [
          { label: 'Accueil', href: '/' },
          { label: 'À Propos', href: '/about' },
          { label: 'Services', href: '/services' },
          { label: 'FAQ', href: '/faq' },
          { label: 'Propriétés', href: '/properties' },
          { label: 'Projets', href: '/projects' }
        ],
        col2: []
      },
      contact: {
        email: 'contact@tasdiria.dz',
        address: 'Alger & Boumerdès, Algérie',
        phone: '0770862831'
      },
      copyright: '© 2025 Tasdiria. Tous droits réservés.'
    },
    ar: {
      logoText: 'Aeline',
      description: 'نقدم مشاريع سكنية وتجارية متميزة في ولايتي الجزائر وبومرداس منذ عام 2013، حيث نضع دائماً بناء ثقتكم قبل بناء أي مشروع.',
      navLinks: {
        col1: [
          { label: 'الرئيسية', href: '/' },
          { label: 'من نحن', href: '/about' },
          { label: 'الخدمات', href: '/services' },
          { label: 'الأسئلة الشائعة', href: '/faq' },
          { label: 'العقارات', href: '/properties' },
          { label: 'المشاريع', href: '/projects' }
        ],
        col2: []
      },
      contact: {
        email: 'contact@tasdiria.dz',
        address: 'الجزائر وبومرداس',
        phone: '0770862831'
      },
      copyright: '© 2025 تسديريا. جميع الحقوق محفوظة.'
    }
  };
  return content[lang as keyof typeof content] || content.en;
};

// Main component
export const FooterDesktopSection: React.FC<FooterDesktopSectionProps> = ({ 
  className = '', 
  lang = 'en' 
}) => {
  const isRTL = lang === 'ar';
  const content = getFooterContent(lang);
  const fontStyle = { fontFamily: getFontFamily(lang) };

  return (
    <footer 
      id="footer"
      className={`w-full bg-white overflow-hidden p-3 ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Dark Container */}
      <div className="w-full max-w-screen-2xl mx-auto h-[350px] flex flex-col justify-between p-10 bg-neutral-900 rounded-3xl">
        
        {/* Top Section */}
        <div className="flex items-start justify-between gap-10">
          
          {/* Left - Logo & Description & Contact */}
          <div className="flex flex-col gap-4 w-[600px] justify-between">
            <a href="/" className="flex items-center gap-3 no-underline w-min">
              <div className="w-10 h-8 relative">
                <svg viewBox="0 0 40 30" className="w-full h-full">
                  <path 
                    d="M 36.968 20.426 L 33.716 26.059 L 24.189 26.048 L 27.223 20.794 L 18.262 5.293 L 28.346 5.337 Z" 
                    fill="white"
                  />
                  <path 
                    d="M 9.807 5.266 L 16.312 5.266 L 21.066 13.522 L 14.999 13.521 L 6.055 29.033 L 1.051 20.277 Z" 
                    fill="white"
                  />
                </svg>
              </div>
              <p 
                className="text-white tracking-[-1.6px] text-2xl leading-7"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {content.logoText}
              </p>
            </a>
            <p 
              className="text-white tracking-[-0.02em] text-wrap:balance text-base leading-6"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              {content.description}
            </p>
            
            {/* Contact Info */}
            <div className="flex flex-col gap-2 mt-auto py-[15px]">
              <a 
                href={`mailto:${content.contact.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
                style={fontStyle}
              >
                <span className="text-white"><EnvelopeSimple size={16} weight="fill" /></span>
                <span className="text-sm" style={{ color: '#e2dada' }}>{content.contact.email}</span>
              </a>
              <div 
                className="flex items-center gap-2"
                style={fontStyle}
              >
                <span className="text-white"><MapPin size={16} weight="fill" /></span>
                <span className="text-sm" style={{ color: '#e2dada' }}>{content.contact.address}</span>
              </div>
              <a 
                href={`tel:${content.contact.phone}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
                style={fontStyle}
              >
                <span className="text-white"><Phone size={16} weight="fill" /></span>
                <span className="text-sm" style={{ color: '#e2dada' }}>{content.contact.phone}</span>
              </a>
            </div>
          </div>

          {/* Center - Navigation Links (2 per row, 3 rows) */}
          <div className="grid grid-cols-2 gap-x-10 gap-y-2">
            {[...content.navLinks.col1, ...content.navLinks.col2].map((link, index) => (
              <a 
                key={index}
                href={link.href}
                className="text-white tracking-[-0.02em] text-base leading-6 no-underline hover:text-zinc-300 transition-colors px-3 py-2"
                style={fontStyle}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom - Copyright and Social Media */}
        <div className="flex items-center justify-between">
          <p 
            className="text-neutral-500 tracking-[-0.02em] text-sm leading-5"
            style={fontStyle}
          >
            {content.copyright}
          </p>
          
          {/* Social Media Icons */}
          <div className="flex items-center gap-3">
            <a href="https://wa.me/33770862831" target="_blank" rel="noopener noreferrer" className="text-white hover:text-zinc-300 transition-colors">
              <WhatsappLogo size={24} weight="fill" />
            </a>
            <a href="https://instagram.com/tasdiria" target="_blank" rel="noopener noreferrer" className="text-white hover:text-zinc-300 transition-colors">
              <InstagramLogo size={24} weight="fill" />
            </a>
            <a href="https://tiktok.com/@tasdiria" target="_blank" rel="noopener noreferrer" className="text-white hover:text-zinc-300 transition-colors">
              <TiktokLogo size={24} weight="fill" />
            </a>
            <a href="https://facebook.com/tasdiria" target="_blank" rel="noopener noreferrer" className="text-white hover:text-zinc-300 transition-colors">
              <FacebookLogo size={24} weight="fill" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};