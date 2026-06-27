import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useParams, Navigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HelmetProvider } from 'react-helmet-async';
import gsap from 'gsap';
import { ScrollToTop } from './components/ScrollToTop';
import { Preloader, PageTransition } from './components/animations';
import { PropertiesListing, PropertyDetail, Projects, ProjectDetail, Home, TestPropertyNotFound, DevHome, Dev2, Dev3, Dev4, Dev5 } from './pages';
import { NavbarDesktopSection, NavbarTabletSection, NavbarMobileSection } from './components/home/navbar';
import './i18n';

// Navbar component with responsive switching
const ResponsiveNavbar: React.FC = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  const [isTablet, setIsTablet] = React.useState(false);

  React.useEffect(() => {
    const checkSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  if (isMobile) return <NavbarMobileSection />;
  if (isTablet) return <NavbarTabletSection />;
  return <NavbarDesktopSection />;
};

const supportedLangs = ['en', 'fr', 'ar'];

// LocalizedApp wrapper to handle language validation and RTL
const LocalizedApp: React.FC = () => {
  const { lang } = useParams<{ lang: string }>();
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    if (lang && supportedLangs.includes(lang)) {
      i18n.changeLanguage(lang);
      // Set RTL for Arabic
      document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  }, [lang, i18n]);

  // If lang is not supported, redirect to /en
  if (!lang || !supportedLangs.includes(lang)) {
    const newPath = location.pathname.replace(`/${lang}/`, '/en/').replace(`/${lang}`, '/en');
    return <Navigate to={newPath || '/en'} replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={<LocalizedHome />}
        />
        <Route 
          path="property/:id" 
          element={
            <>
              <ResponsiveNavbar />
              <LocalizedPropertyDetail />
            </>
          } 
        />
        <Route 
          path="properties" 
          element={
            <>
              <ResponsiveNavbar />
              <LocalizedPropertiesListing />
            </>
          } 
        />
        <Route 
          path="projects" 
          element={
            <>
              <ResponsiveNavbar />
              <PageTransition>
                <LocalizedProjects />
              </PageTransition>
            </>
          } 
        />
        <Route 
          path="projects/:projectId" 
          element={
            <>
              <ResponsiveNavbar />
              <PageTransition>
                <LocalizedProjectDetail />
              </PageTransition>
            </>
          } 
        />
        <Route 
          path="test-property-not-found" 
          element={
            <>
              <ResponsiveNavbar />
              <PageTransition>
                <TestPropertyNotFound />
              </PageTransition>
            </>
          } 
        />
      </Routes>
    </div>
  );
};

// Wrapper components that pass language to pages
const LocalizedPropertiesListing: React.FC = () => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();

  const handlePropertyClick = (id: string) => {
    navigate(`/${lang}/property/${id}`);
  };

  return <PropertiesListing onPropertyClick={handlePropertyClick} lang={lang || 'en'} />;
};

const LocalizedPropertyDetail: React.FC = () => {
  return <PropertyDetail />;
};

const LocalizedProjects: React.FC = () => {
  return <Projects />;
};

const LocalizedProjectDetail: React.FC = () => {
  return <ProjectDetail />;
};

const LocalizedHome: React.FC = () => {
  return <Home />;
};

// Root redirect component
const RootRedirect: React.FC = () => {
  return <Navigate to="/en" replace />;
};

// Main App with preloader
export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Small delay to ensure everything is loaded
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      {!isLoaded && <Preloader />}
      <Routes>
        {/* DEV PAGE - Completely isolated, no language prefix */}
        <Route path="/dev" element={<DevHome />} />
        <Route path="/dev/*" element={<DevHome />} />
        <Route path="/dev2" element={<Dev2 />} />
        <Route path="/dev3" element={<Dev3 />} />
        <Route path="/dev4" element={<Dev4 />} />
        <Route path="/dev5" element={<Dev5 />} />

        {/* Language-prefixed routes */}
        <Route path="/:lang/*" element={<LocalizedApp />} />

        {/* Redirect root to /en */}
        <Route path="/" element={<RootRedirect />} />

        {/* Catch all - redirect to /en */}
        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </HelmetProvider>
  );
}
