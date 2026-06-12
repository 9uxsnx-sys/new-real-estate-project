import React from 'react';
import { NavigationNew } from '@/components/layout';
import { HeroSection, AboutUsSection, CompanyManifesto, CompanyManifestoMobileVersion, ProjectAndPropertySection, FAQSection, Footer } from '@/components/sections';

export const Home: React.FC = () => {

  return (
    <div className="min-h-screen bg-white">
      <NavigationNew />
      <HeroSection />
      <AboutUsSection />
      {/* Desktop: 4-line version */}
      <div className="hidden xl:block">
        <CompanyManifesto />
      </div>
      {/* Tablet/Mobile: Paragraph version */}
      <div className="xl:hidden">
        <CompanyManifestoMobileVersion />
      </div>
      <ProjectAndPropertySection />
      <FAQSection />
      <Footer />
    </div>
  );
};
