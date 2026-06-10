import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ActionPillRTLProps {
  text?: string;
  href?: string;
  onClick?: () => void;
  width?: string;
}

export const ActionPillRTL: React.FC<ActionPillRTLProps> = ({
  text = 'واتساب',
  href,
  onClick,
  width = 'w-[120px]',
}) => {
  const content = (
    <>
      {/* Text content */}
      <p className="text-white leading-5 p-0 mx-[5px] whitespace-nowrap" style={{ fontSize: '14px', marginRight: '11px' }}>
        {text}
      </p>

      {/* Arrow button - opens to the left in RTL */}
      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0" style={{ marginRight: '10px' }}>
        <ArrowLeft className="w-4 h-4 text-black" />
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={`${width} bg-black rounded-[999px] flex items-center justify-between no-underline cursor-pointer`}
        style={{ padding: '8px 12px 8px 12px', transform: 'scale(0.8)' }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`${width} bg-black rounded-[999px] flex items-center justify-between cursor-pointer`}
      style={{ padding: '8px 12px 8px 12px', transform: 'scale(0.9)' }}
    >
      {content}
    </button>
  );
};