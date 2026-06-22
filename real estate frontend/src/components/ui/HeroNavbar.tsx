import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

interface HeroNavbarProps {
  logoText?: string;
  isRTL?: boolean;
  className?: string;
}

export const HeroNavbar: React.FC<HeroNavbarProps> = ({
  logoText = 'The One',
  isRTL = false,
  className = '',
}) => {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Properties', href: '/properties' },
    { label: 'Projects', href: '/projects' },
    { label: 'Language', href: '/language' },
  ];

  return (
    <nav className={`flex items-center justify-between w-full max-w-screen-2xl mx-auto px-4 md:px-6 lg:px-9 py-3 lg:py-4 bg-white ${className}`}>
      {/* Logo */}
      <Link to="/" className="flex items-center gap-x-2 lg:gap-x-3 no-underline">
        {/* Logo SVG - Building icon */}
        <div className="w-8 lg:w-10 h-6 lg:h-8 flex-shrink-0">
          <svg viewBox="0 0 40 30" className="w-full h-full">
            <path
              d="M 36.968 20.426 L 33.716 26.059 L 24.189 26.048 L 27.223 20.794 L 18.262 5.293 L 28.346 5.337 Z"
              fill="black"
            />
            <path
              d="M 9.807 5.266 L 16.312 5.266 L 21.066 13.522 L 14.999 13.521 L 6.055 29.033 L 1.051 20.277 Z"
              fill="black"
            />
          </svg>
        </div>
        <span 
          className="text-black tracking-[-1.6px] text-xl lg:text-2xl font-semibold"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {logoText}
        </span>
      </Link>

      {/* Nav Links - Center (hidden on mobile) */}
      <div className="hidden md:flex items-center gap-x-1 lg:gap-x-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className="px-3 lg:px-5 py-2 lg:py-3 text-black tracking-[1.6px] uppercase text-xs lg:text-sm font-medium no-underline hover:opacity-70 transition-opacity"
            style={{ fontFamily: "'Geist Mono', monospace" }}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* WhatsApp Button - Right */}
      <Link
        to="/contact"
        className="flex items-center justify-center gap-1 lg:gap-2 bg-black text-white rounded-full py-2 lg:py-3 px-3 lg:px-4 hover:bg-[rgb(44,44,44)] transition-colors no-underline"
        style={{ fontFamily: "'Geist Mono', monospace" }}
      >
        <MessageCircle size={16} strokeWidth={2} className="lg:[&amp;]:w-[18px] lg:[&;]:h-[18px]" />
        <span className="text-xs lg:text-sm font-medium">
          WhatsApp
        </span>
      </Link>
    </nav>
  );
};
