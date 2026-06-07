import React, { useEffect, useState } from 'react';
import { DiscoverMoreButton } from './DiscoverMoreButton';

interface GatewayCardFixedProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  onCardClick?: () => void;
  isRTL?: boolean;
  buttonHref?: string;
}

export const GatewayCardFixed: React.FC<GatewayCardFixedProps> = ({
  title,
  imageSrc,
  imageAlt,
  onCardClick,
  isRTL = false,
  buttonHref,
}) => {
  const [scale, setScale] = useState(1);
  const baseWidth = 1000; // Base card width for desktop

  useEffect(() => {
    const calculateScale = () => {
      const containerWidth = window.innerWidth;
      // Leave 48px padding on each side
      const availableWidth = containerWidth - 96;
      const newScale = availableWidth / baseWidth;
      setScale(Math.min(newScale, 1)); // Don't scale up, only scale down
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
          className="w-[1000px] h-[480px] bg-[#F5F5F5] rounded-[32px] overflow-hidden flex flex-row cursor-pointer select-none"
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
          <div className="w-1/2 flex flex-col justify-between h-full py-[30px] pl-10 pr-2 pb-[50px]">
            
            {/* Title Section - Split into two lines */}
            <div className="flex flex-col gap-0">
              <h2 className="text-[50px] font-semibold tracking-[-0.01em] leading-tight text-[#111111] uppercase whitespace-nowrap">
                DISCOVER OUR
              </h2>
              <h2 className="text-[50px] font-semibold tracking-[-0.01em] leading-tight text-[#111111] uppercase whitespace-nowrap">
                PROJECTS
              </h2>
            </div>

            {/* DiscoverMoreButton Section pinned to the bottom left */}
            <div className="w-full flex justify-start mt-8">
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
      </div>
    </div>
  );
};