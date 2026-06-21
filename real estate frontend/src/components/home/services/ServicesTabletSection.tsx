import React from 'react';
import { House, Briefcase, MapPin } from '@phosphor-icons/react';

/**
 * Services Section (Tablet)
 * 
 * Updated to match Framer template design
 * Section selector: section.framer-b0eol5
 * Cards are vertically stacked (1 per row)
 */
interface ServicesTabletSectionProps {
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

// Home icon (Card 1 - Residential Properties)
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

// Service Card (Tablet - vertically stacked, matching Framer template)
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
  <div className="grow shrink-0 basis-0 w-full bg-white shadow-md rounded-xl p-5 flex flex-col">
    {/* Icon at top */}
    <div className="mb-4">
      {icon}
    </div>
    {/* Spacer */}
    <div className="w-full h-8" />
    {/* Text at bottom - full width */}
    <div className="flex flex-col gap-2">
      <h3 className="text-neutral-900 tracking-[-0.8px] text-2xl font-medium leading-8">
        {title}
      </h3>
      <p className="text-neutral-500 tracking-[-0.02em] text-base leading-6">
        {description}
      </p>
    </div>
  </div>
);

// Main component
export const ServicesTabletSection: React.FC<ServicesTabletSectionProps> = ({ 
  className = '', 
  lang = 'en' 
}) => {
  const isRTL = lang === 'ar';
  const content = getServiceContent(lang);
  const fontStyle = { fontFamily: getFontFamily(lang) };

  return (
    <section 
      id="services"
      className={`w-full bg-white overflow-hidden px-14 py-20 ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Inner Container */}
      <div className="w-full max-w-screen-2xl mx-auto flex flex-col items-center gap-y-16">
        
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

          {/* Title */}
          <h2 
            className="text-neutral-900 tracking-[-0.06em] text-center text-wrap:balance text-5xl font-medium leading-[117%]"
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

        {/* Cards Section - Vertically stacked (1 per row) */}
        <div className="w-full z-[1]">
          <div className="bg-zinc-100 rounded-3xl p-3 flex flex-col gap-3">
            
            {/* Card 1 - Residential Properties */}
            <ServiceCard 
              icon={<HomeIcon />}
              title={content.card1.title}
              description={content.card1.description}
            />

            {/* Card 2 - Commercial & Office Spaces */}
            <ServiceCard 
              icon={<BriefcaseIcon />}
              title={content.card2.title}
              description={content.card2.description}
            />

            {/* Card 3 - Premium Apartment Rentals */}
            <ServiceCard 
              icon={<LocationPinIcon />}
              title={content.card3.title}
              description={content.card3.description}
            />

          </div>
        </div>

      </div>
    </section>
  );
};