import React from 'react';

interface OutlineButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const OutlineButton: React.FC<OutlineButtonProps> = ({
  text,
  href,
  onClick,
  className = '',
}) => {
  const buttonContent = (
    <p 
      className="text-white tracking-[1.6px] uppercase text-base font-extrabold leading-5"
      style={{ fontFamily: "'Geist Mono', monospace" }}
    >
      {text}
    </p>
  );

  const baseClasses = `
    flex items-center justify-center
    px-6 py-5
    h-[55px]
    bg-gray-800/25 hover:bg-gray-800/40
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
