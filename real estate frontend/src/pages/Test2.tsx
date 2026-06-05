import React from 'react';
import { NavigationNew } from '@/components/layout';
import ContactUsButton from '@/components/ui/contact-us-button';
import heroImage from '@/assets/images/downtown-views.jpg';

export const Test2: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavigationNew />
      
      {/* Hero Section - Mobile: square floating card on lower half, tablet/PC: half height floating card */}
      <div className="flex-1 flex items-end md:items-end">
        <div className="h-[50vh] md:h-[50vh] w-full px-[clamp(16px,5vw,40px)] md:px-[clamp(16px,2.54vw,64px)] pb-[clamp(20px,5vw,40px)] md:pb-[clamp(20px,3vw,50px)]">
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