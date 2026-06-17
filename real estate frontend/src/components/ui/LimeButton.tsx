import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface LimeButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const LimeButton: React.FC<LimeButtonProps> = ({
  text,
  href,
  onClick,
  className = '',
}) => {
  const buttonContent = (
    <>
      {/* Text */}
      <span 
        className="text-neutral-900 tracking-[1.6px] uppercase text-base font-extrabold pl-5 pr-[12px]"
        style={{ fontFamily: "'Geist Mono', monospace" }}
      >
        {text}
      </span>

      {/* Arrow Circle */}
      <div className="w-10 h-10 bg-neutral-900 rounded-[40px] flex items-center justify-center flex-shrink-0 mr-1">
        <ArrowUpRight className="w-5 h-5 text-white" />
      </div>
    </>
  );

  const baseClasses = `
    inline-flex items-center justify-between
    py-1.5
    bg-gray-100 hover:bg-gray-200
    rounded-[48px]
    cursor-pointer
    transition-colors
    ${className}
  `.trim();

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {buttonContent}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {buttonContent}
    </button>
  );
};
