import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavigationNew } from '@/components/layout';
import heroImage from '@/assets/images/downtown-views.jpg';

export const Test2: React.FC = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavigationNew />
      
      {/* Hero Section - Floating card on full width, lower half */}
      <div className="h-[50vh] lg:h-[50vh] xl:h-[50vh] w-full px-[clamp(16px,5vw,40px)] lg:px-[clamp(16px,3vw,50px)] xl:px-[clamp(16px,4vw,64px)] pb-[clamp(20px,5vw,40px)] lg:pb-[clamp(20px,3vw,50px)] xl:pb-[clamp(20px,3vw,50px)] flex items-end">
        <div className="h-full w-full rounded-3xl overflow-hidden">
          <img 
            src={heroImage} 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};