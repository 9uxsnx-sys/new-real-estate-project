import React from 'react';
import { useParams } from 'react-router-dom';
import { NavigationNew } from '@/components/layout';
import { HeroSection, AboutUsSection, CompanyManifesto, CompanyManifestoMobileVersion, ProjectAndPropertySection, FAQSection, Footer } from '@/components/sections';
import { SEO } from '@/components/seo';

export const Home: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const currentLang = lang || 'en';

  return (
    <main className="min-h-screen bg-white">
      <SEO 
        title="Premium Real Estate in Algeria"
        description="Discover exceptional living spaces designed for those who appreciate refined elegance and timeless quality. Premium apartments, commercial spaces, and offices in Algeria."
        lang={currentLang}
        url=""
      />
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
    </main>
  );
};
