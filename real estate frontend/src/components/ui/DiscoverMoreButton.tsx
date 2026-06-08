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
      <p className="text-white leading-5 p-0 ml-[8px] whitespace-nowrap" style={{ fontSize: '12px' }}>
        {customText}
      </p>
      
      {/* Arrow button */}
      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center flex-shrink-0">
        <ArrowRight className={`w-2.5 h-2.5 text-black ${isRTL ? 'rotate-180' : ''}`} />
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className="w-[130px] h-[40px] bg-black rounded-[999px] flex items-center justify-between no-underline cursor-pointer"
        style={{ padding: isRTL ? '6px 10px 6px 6px' : '6px 6px 6px 10px' }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-[130px] h-[40px] bg-black rounded-[999px] flex items-center justify-between cursor-pointer"
      style={{ padding: isRTL ? '6px 10px 6px 6px' : '6px 6px 6px 10px' }}
    >
      {content}
    </button>
  );
};