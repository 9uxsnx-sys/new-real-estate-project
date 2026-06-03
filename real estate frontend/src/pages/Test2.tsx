import React from 'react';
import { NavigationNew } from '@/components/layout';
import ContactUsButton from '@/components/ui/contact-us-button';
import heroImage from '@/assets/images/downtown-views.jpg';

export const Test2: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavigationNew />
      
      {/* Hero Section - Mobile: square floating card on lower half, starts from bottom */}
      <div className="flex-1 flex items-end md:items-stretch">
        <div className="h-[50vh] md:h-[calc(100vh-clamp(60px,8vh,80px))] w-full px-[clamp(16px,5vw,40px)] pb-[clamp(20px,5vw,40px)]">
          <div className="h-full rounded-3xl overflow-hidden">
            <img 
              src={heroImage} 
              alt="Hero" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};