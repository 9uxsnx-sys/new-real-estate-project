import React from 'react';
import { AIHeroSection } from '../components/sections';

/**
 * DEV PAGE - New Homepage Development
 * 
 * This page is completely isolated from the main website.
 * Route: /dev (no language prefix)
 * 
 * All development work for the new homepage goes here.
 */

export const DevHome: React.FC = () => {
  return (
    <div className="w-full">
      <AIHeroSection />
    </div>
  );
};
