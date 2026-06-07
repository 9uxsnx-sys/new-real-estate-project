import React from 'react';
import { DiscoverMoreButton } from './DiscoverMoreButton';

interface GatewayCardProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  onCardClick?: () => void;
  isRTL?: boolean;
  buttonHref?: string;
}

export const GatewayCard: React.FC<GatewayCardProps> = ({
  title,
  imageSrc,
  imageAlt,
  onCardClick,
  isRTL = false,
  buttonHref,
}) => {
  return (
    <div 
      onClick={onCardClick}
      className="w-full h-auto md:h-[420px] lg:h-[480px] bg-[#F5F5F5] rounded-[32px] overflow-hidden flex flex-col md:flex-row transition-all duration-300 cursor-pointer select-none"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* 1. Left Half: Tall, Premium Architectural Image Wrapper */}
      <div className="w-full md:w-1/2 h-[240px] md:h-full rounded-[32px] overflow-hidden bg-gray-200 flex-shrink-0">
        <img 
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. Right Half: Balanced, Spacious Content Canvas */}
      <div className="w-full md:w-1/2 flex flex-col justify-between h-full py-[30px] pl-10 pr-2 pb-[50px]">
        
        {/* Title Section - Split into two lines */}
        <div className="flex flex-col gap-0">
          <h2 className="text-2xl sm:text-3xl lg:text-[50px] font-semibold tracking-[-0.01em] leading-tight text-[#111111] uppercase whitespace-nowrap">
            DISCOVER OUR
          </h2>
          <h2 className="text-2xl sm:text-3xl lg:text-[50px] font-semibold tracking-[-0.01em] leading-tight text-[#111111] uppercase whitespace-nowrap">
            PROJECTS
          </h2>
        </div>

        {/* DiscoverMoreButton Section pinned to the bottom left */}
        <div className="w-full flex justify-start mt-8 md:mt-0">
          <div className="origin-left scale-[1.2]">
            <DiscoverMoreButton
              href={buttonHref}
              onClick={onCardClick}
              isRTL={isRTL}
            />
          </div>
        </div>

      </div>
    </div>
  );
};