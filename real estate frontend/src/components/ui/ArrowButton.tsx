import React from 'react';
import { ArrowRight } from 'lucide-react';

interface ArrowButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  arrowSize?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  isRTL?: boolean;
  className?: string;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
  text,
  href,
  onClick,
  width = 'auto',
  height = '50px',
  arrowSize = 'md',
  variant = 'primary',
  isRTL = false,
  className = '',
}) => {
  const arrowSizes = {
    sm: { container: 'w-5 h-5', icon: 'w-2.5 h-2.5' },
    md: { container: 'w-6 h-6', icon: 'w-3 h-3' },
    lg: { container: 'w-8 h-8', icon: 'w-4 h-4' },
  };

  const variants = {
    primary: 'bg-black hover:bg-gray-800 text-white',
    secondary: 'bg-white hover:bg-gray-100 text-black',
  };

  const arrow = arrowSizes[arrowSize];

  const buttonContent = (
    <>
      <span className="text-sm font-medium whitespace-nowrap">
        {text}
      </span>
      <div className={`${arrow.container} rounded-full flex items-center justify-center flex-shrink-0 ${variant === 'primary' ? 'bg-white' : 'bg-black'}`}>
        <ArrowRight className={`${arrow.icon} ${variant === 'primary' ? 'text-black' : 'text-white'} ${isRTL ? 'rotate-180' : ''}`} />
      </div>
    </>
  );

  const buttonClasses = `inline-flex items-center justify-between gap-3 rounded-full cursor-pointer transition-colors ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={buttonClasses}
        style={{ width, height, padding: '0 24px' }}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={buttonClasses}
      style={{ width, height, padding: '0 24px' }}
    >
      {buttonContent}
    </button>
  );
};
