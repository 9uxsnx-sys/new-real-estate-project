import React from 'react';
import { ArrowRight } from 'lucide-react';

interface DiscoverMoreButtonProps {
  href?: string;
  onClick?: () => void;
  isRTL?: boolean;
  customText?: string;
}

export const DiscoverMoreButton: React.FC<DiscoverMoreButtonProps> = ({
  href,
  onClick,
  isRTL = false,
  customText = 'Discover more',
}) => {
  const content = (
    <>
      {/* Text content */}
      <p className="text-white leading-5 p-0 mx-[5px] whitespace-nowrap" style={{ fontSize: '14px' }}>
        {customText}
      </p>
      
      {/* Arrow button */}
      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
        <ArrowRight className={`w-4 h-4 text-black ${isRTL ? 'rotate-180' : ''}`} />
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="w-[160px] h-[48px] bg-black rounded-[999px] flex items-center justify-between no-underline cursor-pointer"
        style={{ padding: isRTL ? '8px 16px 8px 8px' : '8px 8px 8px 16px' }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-[160px] h-[48px] bg-black rounded-[999px] flex items-center justify-between cursor-pointer"
      style={{ padding: isRTL ? '8px 16px 8px 8px' : '8px 8px 8px 16px' }}
    >
      {content}
    </button>
  );
};