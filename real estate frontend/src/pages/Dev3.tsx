import React, { useState, useEffect } from 'react';
import { HeroMobileSection, HeroTabletSection, HeroDesktopSection } from '../components/home/hero';
import '../i18n';

/**
 * DEV PAGE 3 - Isolated Hero testing page
 * Route: /dev3
 */

export const Dev3: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1920);
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  
  // Desktop responsive sizing
  const isExtraExtraSmallScreen = windowWidth <= 900;
  const isExtraSmallScreen = windowWidth <= 1100;
  const isVerySmallScreen = windowWidth <= 1250;
  const isSmallScreen = windowWidth <= 1480;
  const textSizeDesktop = isExtraExtraSmallScreen ? 'text-5xl' : isExtraSmallScreen ? 'text-7xl' : isVerySmallScreen ? 'text-7xl' : isSmallScreen ? 'text-7xl' : 'text-8xl';
  const imageWidthDesktop = isExtraExtraSmallScreen ? 400 : isExtraSmallScreen ? 450 : isVerySmallScreen ? 550 : isSmallScreen ? 600 : 700;
  const imageHeightDesktop = isExtraExtraSmallScreen ? 300 : isExtraSmallScreen ? 350 : isVerySmallScreen ? 450 : isSmallScreen ? 500 : 600;
  
  // Tablet responsive sizing
  const isExtraSmallTablet = windowWidth <= 600;
  const textSizeTablet = isExtraSmallTablet ? 'text-7xl' : 'text-7xl';
  const imageWidthTablet = isExtraSmallTablet ? 550 : 800;
  const imageHeightTablet = isExtraSmallTablet ? 250 : 325;

  return (
    <div className="w-full min-h-screen bg-white">
      {isMobile ? (
        <HeroMobileSection />
      ) : isTablet ? (
        // Tablet Layout - Stacked (title on top, image below)
        <div 
          className="w-full bg-white flex flex-col"
          style={{ height: 'calc(100vh - 64px)', borderBottomLeftRadius: '60px', borderBottomRightRadius: '60px' }}
        >
          {/* Title Section - Top half */}
          <div className="flex-1 flex items-end justify-start px-16 pb-4">
            <div className="flex flex-col text-left text-wrap:balance">
              <h2 className={`text-neutral-900 tracking-[-0.06em] ${textSizeTablet} font-bold leading-[117%]`}>
                Building trust
              </h2>
              <h2 className={`text-neutral-900 tracking-[-0.06em] ${textSizeTablet} font-bold leading-[117%]`}>
                Before building
              </h2>
              <h2 className={`text-neutral-900/50 tracking-[-0.06em] ${textSizeTablet} font-bold leading-[117%]`}>
                your project
              </h2>
            </div>
          </div>

          {/* Image Section - Bottom half */}
          <div className="flex-1 flex items-start justify-center px-16 pt-6">
            <div 
              className="rounded-3xl overflow-hidden"
              style={{ width: `${imageWidthTablet}px`, height: `${imageHeightTablet}px` }}
            >
              <img
                src="/home-page-images/desktop-hero-card.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      ) : (
        // Desktop Layout - Side by side (title left, image right)
        <div 
          className="w-full bg-white flex"
          style={{ height: 'calc(100vh - 64px)', borderBottomLeftRadius: '60px', borderBottomRightRadius: '60px' }}
        >
          {/* Left Side - 50% */}
          <div className="w-1/2 flex items-center justify-center">
            <div className="flex flex-col text-left text-wrap:balance">
              <h2 className={`text-neutral-900 tracking-[-0.06em] ${textSizeDesktop} font-bold leading-[117%]`}>
                Building trust
              </h2>
              <h2 className={`text-neutral-900 tracking-[-0.06em] ${textSizeDesktop} font-bold leading-[117%]`}>
                Before building
              </h2>
              <h2 className={`text-neutral-900/50 tracking-[-0.06em] ${textSizeDesktop} font-bold leading-[117%]`}>
                your project
              </h2>
            </div>
          </div>

          {/* Right Side - 50% */}
          <div className="w-1/2 flex items-center justify-center">
            <div 
              className="rounded-3xl overflow-hidden"
              style={{ width: `${imageWidthDesktop}px`, height: `${imageHeightDesktop}px` }}
            >
              <img
                src="/home-page-images/desktop-hero-card.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
