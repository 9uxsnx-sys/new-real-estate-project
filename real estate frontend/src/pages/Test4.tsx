import React from 'react';
import { NavigationNew } from '@/components/layout';
import { GatewayCard, GatewayCardFixed, ActionPill, DiscoverMoreButton } from '@/components/ui';

export const Test4: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavigationNew />
      
      {/* Gateway Card Section - ORIGINAL */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-4xl">
          <GatewayCard
            title="Discover our projects"
            imageSrc="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
            imageAlt="Projects showcase"
            onCardClick={() => console.log('Card clicked')}
            isRTL={false}
          />
        </div>
      </div>

      {/* Divider - Original Card End */}
      <div className="w-full border-t border-gray-200 my-8" />

      {/* Gateway Card Section - FIXED */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-4xl">
          <GatewayCardFixed
            title="Discover our projects"
            imageSrc="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
            imageAlt="Projects showcase"
            onCardClick={() => console.log('Card clicked')}
            isRTL={false}
          />
        </div>
      </div>

      {/* Divider - Fixed Card End */}
      <div className="w-full border-t border-gray-200 my-8" />

      {/* Section Working Area - Coming next */}

      {/* Divider - Button Section */}
      <div className="w-full border-t border-gray-200 my-8" />

      {/* Button Section */}
      <div className="flex flex-col items-center justify-center p-8 gap-4">
        <ActionPill
          text="WhatsApp"
          href="./#contact"
          onClick={() => console.log('Button clicked')}
          isRTL={false}
        />
        <DiscoverMoreButton
          href="./#discover"
          onClick={() => console.log('Button clicked')}
          isRTL={false}
        />
      </div>

      {/* Divider - Page Bottom */}
      <div className="w-full border-t border-gray-200 my-8" />
    </div>
  );
};