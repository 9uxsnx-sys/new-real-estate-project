import React from 'react';
import { NavigationNew } from '@/components/layout';
import { GatewayCard, DiscoverPropertiesCard } from '@/components/ui';

export const Test4: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavigationNew />
      
      <div className="flex flex-col items-center justify-center p-8 gap-8">
        <GatewayCard
          imageSrc="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
          imageAlt="Our Projects"
          onCardClick={() => console.log('Projects card clicked')}
          buttonHref="/projects"
        />
        <DiscoverPropertiesCard
          imageSrc="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
          imageAlt="Our Properties"
          onCardClick={() => console.log('Properties card clicked')}
          buttonHref="/properties"
        />
      </div>
    </div>
  );
};
