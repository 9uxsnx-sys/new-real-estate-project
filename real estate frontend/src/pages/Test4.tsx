import React from 'react';
import { NavigationNew } from '@/components/layout';
import { DualGatewaySection, ActionPill, DiscoverMoreButton } from '@/components/ui';

export const Test4: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <NavigationNew />
      
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

      {/* Divider */}
      <div className="w-full border-t border-gray-200 my-8" />

      {/* DualGateway Section */}
      <DualGatewaySection />

      {/* Divider */}
      <div className="w-full border-t border-gray-200 my-8" />
    </div>
  );
};