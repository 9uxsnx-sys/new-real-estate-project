import React from 'react';
import { Check } from 'lucide-react';
import { Buildings, MapPin } from '@phosphor-icons/react';

/**
 * Gateway Section (Desktop)
 * 
 * Two cards with icon, title, description, features list, and CTA
 */
interface GatewayDesktopSectionProps {
  className?: string;
  lang?: string;
}

// Font family helper
const getFontFamily = (lang: string) => {
  return lang === 'ar' ? "'Noto Sans Arabic', sans-serif" : "'Plus Jakarta Sans', sans-serif";
};

// Gateway content
const getGatewayContent = (lang: string) => {
  const content = {
    en: {
      tag: 'ENTERPRISE DIRECTORY',
      title: 'A direct gateway to exceptional properties and investments',
      description: 'Navigate through our master-planned flagship developments or explore immediate premium availability across Algiers and Boumerdès.',
      card1: {
        tag: 'FLAGSHIP PROJECTS',
        title: 'Our Flagship Projects',
        description: 'Discover our exceptional development projects designed for modern living.',
        features: [
          'Luxury villas and apartments',
          'Prime locations in Algiers & Boumerdès',
          'Premium finishes and sustainable design',
          'Flexible payment plans available'
        ],
        buttonText: 'Explore Projects'
      },
      card2: {
        tag: 'AVAILABLE UNITS',
        title: 'Our Available Units',
        description: 'Browse our curated selection of premium properties ready for immediate occupancy.',
        features: [
          'Ready-to-move-in apartments',
          'Commercial spaces and offices',
          'Premium district locations',
          'Competitive pricing options'
        ],
        buttonText: 'View Availability'
      }
    },
    fr: {
      tag: 'RÉPERTOIRE PORTFOLIO',
      title: 'Un accès direct à des propriétés d\'exception et d\'investissement',
      description: 'Naviguez à travers nos développements phare ou explorez nos unités haut de gamme disponibles immédiatement à Alger et Boumerdès.',
      card1: {
        tag: 'PROJETS PHARES',
        title: 'Nos Projets Phares',
        description: 'Découvrez nos projets de développement exceptionnels conçus pour la vie moderne.',
        features: [
          'Villas et appartements de luxe',
          'Emplacements privilégiés à Alger et Boumerdès',
          'Finitions premium et design durable',
          'Plans de paiement flexibles'
        ],
        buttonText: 'Explorer'
      },
      card2: {
        tag: 'UNITÉS DISPONIBLES',
        title: 'Nos Unités Disponibles',
        description: 'Parcourez notre sélection de propriétés premium prêtes à être occupées.',
        features: [
          'Appartements prêts à habiter',
          'Espaces commerciaux et bureaux',
          'Emplacements dans des quartiers premium',
          'Options de tarification compétitives'
        ],
        buttonText: 'Voir les Dispos'
      }
    },
    ar: {
      tag: 'دليل المحفظة العقارية',
      title: 'بوابتكم المباشرة نحو الاستثمار والمشاريع العقارية الاستثنائية',
      description: 'تصفحوا مشاريعنا الكبرى قيد التطوير، أو اكتشفوا الوحدات العقارية المتميزة والجاهزة للتسليم الفوري في ولايتي الجزائر وبومرداس.',
      card1: {
        tag: 'المشاريع الكبرى',
        title: 'مشاريعنا الكبرى',
        description: 'اكتشف مشاريع التطوير الاستثنائية المصممة للحياة العصرية.',
        features: [
          'فيلات وشقق فاخرة',
          'مواقع استراتيجية في الجزائر وبومرداس',
          'لمسات نهائية فاخرة وتصميم مستدام',
          'خطط دفع مرنة'
        ],
        buttonText: 'استكشف المشاريع'
      },
      card2: {
        tag: 'الوحدات المتاحة',
        title: 'الوحدات المتاحة',
        description: 'تصفح مجموعتنا المختارة من العقارات الجاهزة للسكن الفوري.',
        features: [
          'شقق جاهزة للسكن',
          'مساحات تجارية ومكاتب',
          'مواقع في أحياء راقية',
          'خيارات تسعير تنافسية'
        ],
        buttonText: 'عرض التوفر'
      }
    }
  };
  return content[lang as keyof typeof content] || content.en;
};

// Gateway Card Component
interface GatewayCardProps {
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  fontStyle: React.CSSProperties;
  isRTL: boolean;
}

const GatewayCard: React.FC<GatewayCardProps> = ({
  icon,
  tag,
  title,
  description,
  features,
  buttonText,
  fontStyle,
  isRTL
}) => (
  <div className="bg-white shadow-md rounded-xl p-5 flex flex-col gap-y-5 w-[520px]">
    {/* Header with Icon and Tag */}
    <div className="flex items-center gap-3">
      <div style={{ color: '#85e7ff' }}>
        {icon}
      </div>
      <p 
        className="text-neutral-900 tracking-[1.6px] uppercase text-sm font-medium"
        style={{ fontFamily: "'Geist_Mono', monospace" }}
      >
        {tag}
      </p>
    </div>

    {/* Title */}
    <div>
      <h3 
        className="text-neutral-900 tracking-[-0.06em] text-3xl font-medium leading-[117%]"
        style={fontStyle}
      >
        {title}
      </h3>
    </div>

    {/* Description */}
    <div>
      <p 
        className="text-zinc-800 tracking-[-0.02em] text-base leading-6"
        style={fontStyle}
      >
        {description}
      </p>
    </div>

    {/* Features List */}
    <div className="flex flex-col gap-4 p-2 rounded-xl bg-zinc-50">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="w-6 h-6 bg-neutral-900 rounded-full flex items-center justify-center flex-shrink-0">
            <Check size={14} color="white" strokeWidth={3} />
          </div>
          <p 
            className="text-zinc-800 tracking-[-0.02em] text-sm leading-5"
            style={fontStyle}
          >
            {feature}
          </p>
        </div>
      ))}
    </div>

    {/* CTA Button */}
    <div className="mt-auto">
      <a 
        href="#" 
        className={`flex items-center justify-center w-full h-10 bg-neutral-900 rounded-[48px] no-underline ${isRTL ? 'flex-row-reverse' : ''}`}
      >
        <span 
          className="text-lime-300 tracking-[1.6px] uppercase text-sm font-medium"
          style={{ fontFamily: "'Geist_Mono', monospace" }}
        >
          {buttonText}
        </span>
      </a>
    </div>
  </div>
);

// Main component
export const GatewayDesktopSection: React.FC<GatewayDesktopSectionProps> = ({ 
  className = '', 
  lang = 'en' 
}) => {
  const isRTL = lang === 'ar';
  const content = getGatewayContent(lang);
  const fontStyle = { fontFamily: getFontFamily(lang) };

  return (
    <section 
      id="gateway"
      className={`w-full bg-white overflow-x-hidden px-14 py-20 max-md:px-4 max-md:py-12 ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Inner Container */}
      <div className="w-full max-w-screen-2xl mx-auto h-min flex flex-col items-center gap-y-16">
        
        {/* Header Section */}
        <div className="flex flex-col items-center gap-y-5 w-full max-w-screen-md">
          
          {/* Tag */}
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

        {/* Cards Section - Gray container with 2 Cards */}
        <div className="w-full z-[1] flex justify-center">
          <div className="bg-zinc-100 rounded-3xl p-3">
            <div className="flex gap-3 max-w-[1100px]">
              
              {/* Card 1 - Flagship Projects */}
              <GatewayCard
                icon={<Buildings size={24} weight="fill" />}
                tag={content.card1.tag}
                title={content.card1.title}
                description={content.card1.description}
                features={content.card1.features}
                buttonText={content.card1.buttonText}
                fontStyle={fontStyle}
                isRTL={isRTL}
              />

              {/* Card 2 - Available Units */}
              <GatewayCard
                icon={<MapPin size={24} weight="fill" />}
                tag={content.card2.tag}
                title={content.card2.title}
                description={content.card2.description}
                features={content.card2.features}
                buttonText={content.card2.buttonText}
                fontStyle={fontStyle}
                isRTL={isRTL}
              />

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};