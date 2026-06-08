import React from 'react';
import { useTranslation } from 'react-i18next';
import { GatewayCard } from './DiscoverProjectsCard';
import { DiscoverPropertiesCard } from './DiscoverPropertiesCard';

export const DiscoverSection: React.FC = () => {
  const { i18n } = useTranslation();

  const content = {
    en: {
      tag: 'OUR WORK',
      title: 'EXPLORE WHAT WE BUILD',
      description: 'Discover our exceptional properties and projects designed for modern living.',
    },
    fr: {
      tag: 'NOTRE TRAVAIL',
      title: 'EXPLOREZ CE QUE NOUS BÂTISSONS',
      description: 'Découvrez nos propriétés et projets exceptionnels conçus pour la vie moderne.',
    },
    ar: {
      tag: 'عملنا',
      title: 'اكتشف ما نبنيه',
      description: 'اكتشف عقاراتنا ومشاريعنا الاستثنائية المصممة للحياة العصرية.',
    }
  };

  const activeContent = content[i18n.language as keyof typeof content] || content.en;

  return (
    <section className="w-full py-12 md:py-20">
      <div className="w-full flex items-start justify-center px-16 gap-8">
        {/* Left Side: Title and Description */}
        <div className="w-[320px] flex-shrink-0">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 block mb-3">
            {activeContent.tag}
          </span>
          <h2 className="text-4xl font-semibold tracking-tight text-[#111111] uppercase mb-4">
            {activeContent.title}
          </h2>
          <p className="text-base text-gray-500 leading-relaxed">
            {activeContent.description}
          </p>
        </div>

        {/* Right Side: Stacked Cards */}
        <div className="flex flex-col gap-6">
          <GatewayCard
            imageSrc="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
            imageAlt="Our Projects"
            buttonHref="/projects"
          />
          <DiscoverPropertiesCard
            imageSrc="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
            imageAlt="Our Properties"
            buttonHref="/properties"
          />
        </div>
      </div>
    </section>
  );
};
