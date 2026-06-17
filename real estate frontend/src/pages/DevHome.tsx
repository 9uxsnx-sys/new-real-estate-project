import React from 'react';
import { useTranslation } from 'react-i18next';
import { AIHeroSection } from '../components/sections';
import { RTLPropertiesButton } from '../components/ui';
import '../i18n';

/**
 * DEV PAGE - New Homepage Development
 * 
 * This page is completely isolated from the main website.
 * Route: /dev (no language prefix)
 * 
 * Supports EN, FR, AR languages via query param: /dev?lang=en
 */

export const DevHome: React.FC = () => {
  const { i18n, t } = useTranslation();
  
  // Get language from query param or default to English
  const searchParams = new URLSearchParams(window.location.search);
  const lang = searchParams.get('lang') || 'en';
  
  // Update i18n language
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }
  
  // Set RTL for Arabic
  const isRTL = lang === 'ar';
  if (isRTL) {
    document.documentElement.dir = 'rtl';
  } else {
    document.documentElement.dir = 'ltr';
  }
  
  // Get translations
  const content = {
    headline1: t('newHome.headline1'),
    headline2: t('newHome.headline2'),
    paragraph: t('newHome.paragraph'),
    projects: t('newHome.projects'),
    properties: t('newHome.properties'),
  };
  
  // Show RTL button for Arabic, LTR for others
  const PropertiesButtonComponent = isRTL ? RTLPropertiesButton : null;
  
  return (
    <div className="w-full">
      <AIHeroSection 
        content={content} 
        isRTL={isRTL}
        PropertiesButtonComponent={PropertiesButtonComponent}
      />
    </div>
  );
};
