import React from 'react';

interface ProjectsButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export const ProjectsButton: React.FC<ProjectsButtonProps> = ({
  text,
  href,
  onClick,
  className = '',
}) => {
  const buttonContent = (
    <span 
      className="text-white tracking-[1.6px] uppercase text-base font-extrabold px-5 py-2 backdrop-blur-md"
      style={{ fontFamily: "'Geist Mono', monospace" }}
    >
      {text}
    </span>
  );

  const baseClasses = `
    inline-flex items-center justify-center
    bg-white/10
    hover:bg-white/20
    rounded-full
    cursor-pointer
    transition-colors
    backdrop-blur-md
    border border-white/20
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
