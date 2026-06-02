import React from 'react';
import NavbarContainer from '@/components/ui/navbar-container';

export const Test: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Test Page</h1>
        <p className="text-gray-600 mb-8">Content below</p>
      </div>
      
      {/* Thick Divider Line */}
      <div className="border-t-2 border-gray-300"></div>
      
      {/* Black Background Section - Below Divider */}
      <div className="bg-black min-h-[300px]">
        {/* Navbar Container - At the Top */}
        <div className="flex justify-center pt-8">
          <NavbarContainer />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t-2 border-gray-300"></div>

      {/* Button Development Section */}
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Button Development</h2>
        <p className="text-gray-600">Work in progress...</p>
      </div>
    </div>
  );
};