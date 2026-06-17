import React from 'react';
import { ArrowRight } from 'lucide-react';

interface DiscoverMoreButtonProps {
  href?: string;
  onClick?: () => void;
  isRTL?: boolean;
  customText?: string;
  width?: string;
  height?: string;
  arrowSize?: 'sm' | 'md' | 'lg';
}

export const DiscoverMoreButton: React.FC<DiscoverMoreButtonProps> = ({
  href,
  onClick,
  isRTL = false,
  customText = 'Discover more',
  width = '130px',
  height = '40px',
  arrowSize = 'sm',
}) => {
  const arrowSizes = {
    sm: { container: 'w-5 h-5', icon: 'w-2.5 h-2.5' },
    md: { container: 'w-6 h-6', icon: 'w-3 h-3' },
    lg: { container: 'w-8 h-8', icon: 'w-4 h-4' },
  };

  const arrow = arrowSizes[arrowSize];

  const content = (
    <>
      {/* Text content */}
      <p className="text-white leading-5 p-0 ml-[8px] whitespace-nowrap" style={{ fontSize: '12px' }}>
        {customText}
      </p>
      
      {/* Arrow button */}
      <div className={`${arrow.container} bg-white rounded-full flex items-center justify-center flex-shrink-0`}>
        <ArrowRight className={`${arrow.icon} text-black ${isRTL ? 'rotate-180' : ''}`} />
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="bg-black rounded-[999px] flex items-center justify-between no-underline cursor-pointer hover:bg-gray-800 transition-colors"
        style={{ 
          width, 
          height, 
          padding: isRTL ? '6px 10px 6px 10px' : '6px 10px 6px 10px' 
        }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className="bg-black rounded-[999px] flex items-center justify-between cursor-pointer hover:bg-gray-800 transition-colors"
      style={{ 
        width, 
        height, 
        padding: isRTL ? '6px 10px 6px 10px' : '6px 10px 6px 10px' 
      }}
    >
      {content}
    </button>
  );
};
