import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ActionPillProps {
  text?: string;
  href?: string;
  onClick?: () => void;
  isRTL?: boolean;
  width?: string;
}

export const ActionPill: React.FC<ActionPillProps> = ({
  text = '',
  href,
  onClick,
  isRTL = false,
  width = 'w-[140px]',
}) => {
  const content = (
    <>
      {/* Text content */}
      <p className="text-white leading-5 p-0 mx-[5px] whitespace-nowrap" style={{ fontSize: '14px' }}>
        {text}
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
        className={`${width} bg-black rounded-[999px] flex items-center justify-between no-underline cursor-pointer`}
        style={{ padding: '8px 8px 8px 16px', transform: 'scale(0.8)' }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${width} bg-black rounded-[999px] flex items-center justify-between cursor-pointer`}
      style={{ padding: '8px 8px 8px 16px', transform: 'scale(0.9)' }}
    >
      {content}
    </button>
  );
};