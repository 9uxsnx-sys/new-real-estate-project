import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GatewayCard } from './GatewayCard';

export const DualGatewaySection: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [hoveredCard, setHoveredCard] = useState<'projects' | 'properties' | null>(null);

  // Centralized high-end architectural content configurations
  const contentData = {
    en: {
      projectsTitle: "Discover Our\nMaster Projects",
      propertiesTitle: "Explore Our\nPremium Units",
    },
    fr: {
      projectsTitle: "Découvrez Nos\nProjets Majeurs",
      propertiesTitle: "Explorez Nos\nBiens Uniques",
    },
    ar: {
      projectsTitle: "اكتشف مشاريعنا\nالعقارية الكبرى",
      propertiesTitle: "تصفح وحداتنا\nالعقارية المتميزة",
    }
  };

  const activeContent = contentData[i18n.language as 'en' | 'fr' | 'ar'] || contentData.en;

  return (
    <section className="w-full bg-white py-16 md:py-24 lg:py-32 px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden select-none">
      <div 
        className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-6 lg:gap-8 items-stretch justify-center"
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        
        {/* Gateway Gate 1: Projects Macro View */}
        <div 
          onMouseEnter={() => setHoveredCard('projects')}
          onMouseLeave={() => setHoveredCard(null)}
          className={`w-full transition-all duration-500 ease-out transform ${
            hoveredCard === 'projects'
              ? 'md:w-[54%]'
              : hoveredCard === 'properties'
              ? 'md:w-[46%]'
              : 'md:w-1/2'
          }`}
        >
          <GatewayCard
            title={activeContent.projectsTitle}
            imageSrc="/images/projects-gateway.jpg"
            imageAlt="Macro structural developments architecture layout view"
            isRTL={isRTL}
            onCardClick={() => window.location.href = '/projects'}
          />
        </div>

        {/* Gateway Gate 2: Properties Micro View */}
        <div
          onMouseEnter={() => setHoveredCard('properties')}
          onMouseLeave={() => setHoveredCard(null)}
          className={`w-full transition-all duration-500 ease-out transform ${
            hoveredCard === 'properties'
              ? 'md:w-[54%]'
              : hoveredCard === 'projects'
              ? 'md:w-[46%]'
              : 'md:w-1/2'
          }`}
        >
          <GatewayCard
            title={activeContent.propertiesTitle}
            imageSrc="/images/properties-gateway.jpg"
            imageAlt="Micro property luxury interiors finishing layout view"
            isRTL={isRTL}
            onCardClick={() => window.location.href = '/properties'}
          />
        </div>

      </div>
    </section>
  );
};