import React from 'react';
import { House, Briefcase, MapPin } from '@phosphor-icons/react';

/**
 * Services Section (Desktop)
 * 
 * Extracted from: https://aeline.framer.website/
 * Section selector: section.framer-b0eol5
 */
interface ServicesDesktopSectionProps {
  className?: string;
  lang?: string;
}

// Font family helper
const getFontFamily = (lang: string) => {
  return lang === 'ar' ? "'Noto Sans Arabic', sans-serif" : "'Plus Jakarta Sans', sans-serif";
};

// Service content
const getServiceContent = (lang: string) => {
  const content = {
    en: {
      tag: 'Services',
      title: 'Comprehensive property solutions and architectural excellence',
      description: 'Delivering modern living and premium commercial environments across Algiers and Boumerdès.',
      buttonText: 'Get Started',
      buttonHref: '/our-services',
      card1: {
        title: 'Residential Properties',
        description: 'Developing premium apartments designed with structural integrity, prime locations, and flexible payment plans.'
      },
      card2: {
        title: 'Commercial & Office Spaces',
        description: 'Engineering strategic retail shops and professional offices optimized for business growth and corporate distinction.'
      },
      card3: {
        title: 'Premium Apartment Rentals',
        description: 'Offering turnkey apartment leasing solutions in highly accessible, premium districts.'
      }
    },
    fr: {
      tag: 'Services',
      title: 'Solutions immobilières complètes et excellence architecturale',
      description: 'Créer des espaces de vie modernes et des environnements commerciaux d\'élite à Alger et Boumerdès.',
      buttonText: 'Commencer',
      buttonHref: '/nos-services',
      card1: {
        title: 'Immobilier Résidentiel',
        description: "Conception d'appartements haut de gamme alliant qualité de finition, emplacements de choix et facilités de paiement."
      },
      card2: {
        title: 'Locaux & Bureaux Professionnels',
        description: 'Réalisation de locaux commerciaux et de bureaux d\'affaires idéalement situés pour maximiser votre activité.'
      },
      card3: {
        title: "Location d'Appartements",
        description: 'Des solutions de location clés en main dans des quartiers résidentiels calmes et hautement accessibles.'
      }
    },
    ar: {
      tag: 'الخدمات',
      title: 'حلول عقارية متكاملة وتميُّز هندسي مستدام',
      description: 'نقدم مساحات سكنية وعملية حديثة تلبي تطلعاتكم في ولايتي الجزائر وبومرداس.',
      buttonText: 'ابدأ الآن',
      buttonHref: '/خدماتنا',
      card1: {
        title: 'الشقق السكنية',
        description: 'إنجاز شقق عصرية بمواصفات عالية الجودة، مواقع استراتيجية، وتسهيلات مرنة في الدفع بالتقسيط.'
      },
      card2: {
        title: 'المحلات التجارية والمكاتب',
        description: 'إنجاز محلات تجارية ومكاتب مهنية بمساحات استراتيجية مجهزة بالكامل لتطوير أعمالكم.'
      },
      card3: {
        title: 'كراء الشقق السكنية',
        description: 'توفير حلول كراء مرنة لشقق جاهزة للسكن في أرقى الأحياء السكنية وأكثرها حيوية.'
      }
    }
  };
  return content[lang as keyof typeof content] || content.en;
};

// Home/Building icon (Card 1 - Residential Properties)
const HomeIcon: React.FC = () => (
  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#85e7ff' }}>
    <House size={22} weight="fill" color="white" />
  </div>
);

// Briefcase icon (Card 2 - Commercial & Office Spaces)
const BriefcaseIcon: React.FC = () => (
  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#85e7ff' }}>
    <Briefcase size={22} weight="fill" color="white" />
  </div>
);

// Location pin icon (Card 3 - Premium Apartment Rentals)
const LocationPinIcon: React.FC = () => (
  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#85e7ff' }}>
    <MapPin size={22} weight="fill" color="white" />
  </div>
);

// Arrow icon for button
const ArrowIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M8.336 2.84L1.176 10L0 8.824L7.16 1.664L0.849 1.664L0.849 0L10 0L10 9.151L8.336 9.151L8.336 2.84Z" fill="currentColor"/>
  </svg>
);

// Card with Image (left text, right image)
interface AIStrategyCardProps {
  title: string;
  description: string;
}

const AIStrategyCard: React.FC<AIStrategyCardProps> = ({ title, description }) => (
  <div className="w-full bg-white shadow-md rounded-xl p-5 flex gap-5">
    {/* Left side: icon top, text bottom */}
    <div className="flex flex-col min-w-72 flex-1">
      {/* Icon pinned to top */}
      <div className="mb-4">
        <HomeIcon />
      </div>
      {/* Text pinned to bottom */}
      <div className="mt-auto">
        <h3 className="text-neutral-900 tracking-[-0.8px] text-2xl font-medium leading-8 mb-2">
          {title}
        </h3>
        <p className="text-neutral-500 tracking-[-0.02em] text-base leading-6">
          {description}
        </p>
      </div>
    </div>
    {/* Right side: image */}
    <div className="min-w-72 h-64 rounded-xl overflow-hidden flex-1">
      <img 
        src="https://proxy.extractcss.dev/https://framerusercontent.com/images/XWVgE6Ab2HA2NJq5oJGrl9ao0Fk.png?width=1218&height=812"
        alt=""
        className="w-full h-full object-cover object-[50.5%_26.2%]"
      />
    </div>
  </div>
);

// Service Card without image
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
  <div className="flex-1 bg-white shadow-md rounded-xl p-5 h-72 flex flex-col">
    {/* Icon pinned to top */}
    <div className="mb-4">
      {icon}
    </div>
    {/* Text pinned to bottom - limited to 75% width */}
    <div className="mt-auto w-3/4">
      <h3 className="text-neutral-900 tracking-[-0.8px] text-2xl font-medium leading-8 mb-2">
        {title}
      </h3>
      <p className="text-neutral-500 tracking-[-0.02em] text-base leading-6 whitespace-pre-wrap break-words">
        {description}
      </p>
    </div>
  </div>
);

// Main component
export const ServicesDesktopSection: React.FC<ServicesDesktopSectionProps> = ({ 
  className = '', 
  lang = 'en' 
}) => {
  const isRTL = lang === 'ar';
  const content = getServiceContent(lang);
  const fontStyle = { fontFamily: getFontFamily(lang) };

  return (
    <section 
      id="services"
      className={`w-full bg-white overflow-x-hidden overflow-y-hidden px-14 py-20 max-md:px-4 max-md:py-12 ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Inner Container */}
      <div className="w-full max-w-screen-2xl mx-auto h-min flex flex-col items-center gap-y-16">
        
        {/* Header Section */}
        <div className="flex flex-col items-center gap-y-5 w-full max-w-screen-md">
          
          {/* Services Tag */}
          <div className="flex items-center gap-x-3">
            <div className="w-1 h-1 bg-neutral-900 rounded-full" />
            <p 
              className="text-neutral-900 tracking-[1.6px] uppercase text-sm font-medium leading-5"
              style={{ fontFamily: "'Geist_Mono', monospace" }}
            >
              {content.tag}
            </p>
          </div>

          {/* Title with individual word spans */}
          <h2 
            className="text-neutral-900 tracking-[-0.06em] text-center text-wrap:balance text-5xl font-medium leading-[117%] max-md:text-4xl"
            style={fontStyle}
          >
            {content.title}
          </h2>

          {/* Description */}
          <p 
            className="text-zinc-800 tracking-[-0.02em] text-center text-wrap:balance text-base leading-6 max-w-lg"
            style={fontStyle}
          >
            {content.description}
          </p>
        </div>

        {/* Cards Section */}
        <div className="w-full z-[1]">
          <div className="bg-zinc-100 rounded-3xl p-3 flex gap-3">
            
            {/* Card 1 - Residential Properties */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="flex items-center gap-2.5">
                <AIStrategyCard 
                  title={content.card1.title}
                  description={content.card1.description}
                />
              </div>
            </div>

            {/* Card 2 - Commercial & Office Spaces */}
            <div className="flex-[2] flex flex-col justify-center">
              <ServiceCard 
                icon={<BriefcaseIcon />}
                title={content.card2.title}
                description={content.card2.description}
              />
            </div>

            {/* Card 3 - Premium Apartment Rentals */}
            <div className="flex-[2] flex flex-col justify-center">
              <ServiceCard 
                icon={<LocationPinIcon />}
                title={content.card3.title}
                description={content.card3.description}
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
