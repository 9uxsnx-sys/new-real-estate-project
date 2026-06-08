import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';

interface DiscoverPropertiesCardProps {
  imageSrc?: string;
  imageAlt?: string;
  onCardClick?: () => void;
  buttonHref?: string;
  title?: string;
}

export const DiscoverPropertiesCard: React.FC<DiscoverPropertiesCardProps> = ({
  imageSrc = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  imageAlt = "Our Properties",
  onCardClick,
  buttonHref,
  title,
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [scale, setScale] = useState(1);
  const baseWidth = 380;

  const defaultContent = {
    en: {
      title: 'DISCOVER OUR PROPERTIES',
    },
    fr: {
      title: 'DÉCOUVREZ NOS PROPRIÉTÉS',
    },
    ar: {
      title: 'اكتشف عقاراتنا',
    }
  };

  const activeContent = defaultContent[i18n.language as keyof typeof defaultContent] || defaultContent.en;
  
  const displayTitle = title || activeContent.title;

  useEffect(() => {
    const calculateScale = () => {
      const container = document.querySelector('.gateway-card-container');
      if (container) {
        const containerWidth = container.clientWidth;
        const availableWidth = containerWidth - 64;
        const newScale = availableWidth / baseWidth;
        setScale(Math.min(newScale, 1));
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  return (
    <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
      <div className="w-[448px]">
        {/* Image Block with rounded corners */}
        <div 
          onClick={onCardClick}
          className="w-full aspect-[4/3] bg-gray-200 rounded-3xl overflow-hidden cursor-pointer"
        >
          <img 
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title and Button Row */}
        <div className={`mt-4 flex items-center ${isRTL ? 'flex-row' : 'flex-row'} justify-between gap-4 pl-[5px] pr-[5px]`}>
          {/* Title */}
          <h3 className="text-[25px] font-semibold tracking-tight text-[#111111] uppercase whitespace-nowrap ml-0" style={{ letterSpacing: '0px' }}>
            {displayTitle}
          </h3>

          {/* Arrow Button - Black circle with white arrow */}
          <button
            onClick={onCardClick}
            className="w-9 h-9 bg-black rounded-full flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-gray-800 transition-colors border-none"
            style={{ paddingBottom: '0', marginBottom: '3px' }}
          >
            <ArrowRight className={`w-4 h-4 text-white transition-transform duration-300 hover:-rotate-45 ${isRTL ? 'rotate-180' : ''}`} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};
