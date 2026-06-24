import React from 'react';
import { HeroNavbar, OutlineButton, PropertiesButton } from '../components/ui';
import '../i18n';

/**
 * DEV PAGE 2 - Isolated Hero testing page
 * This page is completely isolated from the main website
 * Route: /dev2
 * Changes here won't affect other parts of the website
 */

export const Dev2: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Navbar */}
      <HeroNavbar isRTL={false} />

      {/* Full-height section under navbar */}
      <div 
        className="w-full bg-neutral-200 flex flex-col"
        style={{ height: 'calc(100vh - 64px)', borderBottomLeftRadius: '60px', borderBottomRightRadius: '60px' }}
      >
        {/* Top Side - 40% */}
        <div className="h-2/5 flex items-end px-20 pb-8">
          {/* Title - Left aligned, two lines */}
          <div className="flex flex-col text-left text-wrap:balance">
            <h2 className="text-neutral-900/50 tracking-[-0.06em] text-8xl font-bold leading-[117%]">
              Building trust
            </h2>
            <h2 className="text-neutral-900 tracking-[-0.06em] text-8xl font-bold leading-[117%]">
              before building your project
            </h2>
          </div>
        </div>

        {/* Bottom Side - 60% */}
        <div className="h-3/5 px-8 pb-8 flex items-end">
          {/* Image Card - equal spacing on all sides */}
          <div className="w-full rounded-3xl overflow-hidden" style={{ height: 'calc(100% - 16px)' }}>
            <img
              src="/home-page-images/desktop-hero-card.png"
              alt=""
              className="w-full h-full object-cover"
              style={{ borderRadius: '40px' }}
            />
          </div>
        </div>
      </div>

      {/* Extra space to scroll and see rounded corners */}
      <div style={{ height: '200px' }} />
    </div>
  );
};
