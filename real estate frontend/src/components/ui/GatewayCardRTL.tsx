import React, { useEffect, useState } from 'react';
import { DiscoverMoreButton } from './DiscoverMoreButton';

interface GatewayCardRTLProps {
  imageSrc: string;
  imageAlt: string;
  onCardClick?: () => void;
  buttonHref?: string;
  titleLine1?: string;
  titleLine2?: string;
  titleLine1Size?: string;
  titleLine2Size?: string;
  buttonText?: string;
}

export const GatewayCardRTL: React.FC<GatewayCardRTLProps> = ({
  imageSrc,
  imageAlt,
  onCardClick,
  buttonHref,
  titleLine1 = 'اكتشف مشاريعنا',
  titleLine2 = 'العقارية',
  titleLine1Size = '32px',
  titleLine2Size = '32px',
  buttonText = 'اكتشف المزيد',
}) => {
  const [scale, setScale] = useState(1);
  const baseWidth = 650;

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
          dir="rtl"
        >
          {/* First: Image (will appear on RIGHT with RTL) */}
          <div className="w-1/2 h-full rounded-[32px] overflow-hidden bg-gray-200 flex-shrink-0">
            <img 
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Second: Content (will appear on LEFT with RTL) */}
          <div className="w-1/2 flex flex-col justify-between h-full py-[30px] pr-[55px] pl-2 pb-[65px]">
            <div className="flex flex-col gap-0">
              <h2 className="font-semibold tracking-[-0.01em] leading-tight text-[#111111] uppercase whitespace-nowrap text-right" style={{ fontSize: titleLine1Size }}>
                {titleLine1}
              </h2>
              <h2 className="font-semibold tracking-[-0.01em] leading-tight text-[#111111] uppercase whitespace-nowrap text-right" style={{ fontSize: titleLine2Size }}>
                {titleLine2}
              </h2>
            </div>

            <div className="w-full flex justify-start mt-6">
              <div className="origin-right">
                <DiscoverMoreButton
                  href={buttonHref}
                  onClick={onCardClick}
                  isRTL={true}
                  customText={buttonText}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};