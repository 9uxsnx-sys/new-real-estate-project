import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DiscoverMoreButton } from './DiscoverMoreButton';

interface GatewayCardLTRProps {
  imageSrc: string;
  imageAlt: string;
  onCardClick?: () => void;
  isRTL?: boolean;
  buttonHref?: string;
  titleLine1?: string;
  titleLine2?: string;
  buttonText?: string;
}

export const GatewayCardLTR: React.FC<GatewayCardLTRProps> = ({
  imageSrc,
  imageAlt,
  onCardClick,
  isRTL = false,
  buttonHref,
  titleLine1,
  titleLine2,
  buttonText,
}) => {
  const { i18n } = useTranslation();
  const [scale, setScale] = useState(1);
  const baseWidth = 650;

  const defaultContent = {
    en: {
      titleLine1: 'DISCOVER OUR',
      titleLine2: 'PROJECTS',
      buttonText: 'Discover more',
    },
    fr: {
      titleLine1: 'DÉCOUVREZ NOS',
      titleLine2: 'PROJETS',
      buttonText: 'Découvrir plus',
    }
  };

  const activeContent = defaultContent[i18n.language as keyof typeof defaultContent] || defaultContent.en;
  
  // Use custom props if provided, otherwise use language-based defaults
  const displayTitle1 = titleLine1 || activeContent.titleLine1;
  const displayTitle2 = titleLine2 || activeContent.titleLine2;
  const displayButtonText = buttonText || activeContent.buttonText;

  useEffect(() => {
    const calculateScale = () => {
      const containerWidth = window.innerWidth;
      const availableWidth = containerWidth - 96;
      const newScale = availableWidth / baseWidth;
      setScale(Math.min(newScale, 1));
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top center' }}>
        <div 
          onClick={onCardClick}
          className="w-[650px] h-[420px] bg-[#F5F5F5] rounded-[32px] overflow-hidden flex flex-row cursor-pointer select-none"
          dir={isRTL ? 'rtl' : 'ltr'}
        >
          {/* Left Half: Image */}
          <div className="w-1/2 h-full rounded-[32px] overflow-hidden bg-gray-200 flex-shrink-0">
            <img 
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Half: Content */}
          <div className="w-1/2 flex flex-col justify-between h-full py-[30px] pl-[55px] pr-2 pb-[65px]">
            
            {/* Title Section */}
            <div className="flex flex-col gap-0">
              <h2 className="text-[32px] font-semibold tracking-[-0.01em] leading-tight text-[#111111] uppercase whitespace-nowrap">
                {displayTitle1}
              </h2>
              <h2 className="text-[32px] font-semibold tracking-[-0.01em] leading-tight text-[#111111] uppercase whitespace-nowrap">
                {displayTitle2}
              </h2>
            </div>

            {/* DiscoverMoreButton Section */}
            <div className="w-full flex justify-start mt-6">
              <div className="origin-left">
                <DiscoverMoreButton
                  href={buttonHref}
                  onClick={onCardClick}
                  isRTL={isRTL}
                  customText={displayButtonText}
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};