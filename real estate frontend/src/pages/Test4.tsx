import React from 'react';
import { NavigationNew } from '@/components/layout';
import { CompanyManifesto } from '@/components/sections';

export const Test4: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <NavigationNew />
      {/* Scroll space to make section visible */}
      <div className="h-screen" />
      <CompanyManifesto />
    </div>
  );
};