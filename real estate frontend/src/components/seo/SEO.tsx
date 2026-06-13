import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  lang?: string;
  type?: string;
}

const BASE_URL = 'https://theone.dz';
const DEFAULT_IMAGE = 'https://storage.googleapis.com/download/storage/v1/b/prd-shared-services.firebasestorage.app/o/h2m-assets%2F8f47f6f46f13b18c94590c08695180a388e97844.png%3Fwidth=300&height=209?generation=1775379090743841&alt=media';
const DEFAULT_TITLE = 'The One - Premium Real Estate in Algeria';
const DEFAULT_DESCRIPTION = 'Discover exceptional living spaces designed for those who appreciate refined elegance and timeless quality. Premium apartments, commercial spaces, and offices in Algeria.';

export const SEO: React.FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url = '',
  lang = 'en',
  type = 'website',
}) => {
  const fullTitle = title ? `${title} | The One` : DEFAULT_TITLE;
  const fullUrl = url ? `${BASE_URL}/${lang}/${url}` : `${BASE_URL}/${lang}`;
  const currentUrl = `${BASE_URL}/${lang}`;
  
  // Generate hreflang links for all supported languages
  const hreflangLinks = [
    { lang: 'en', href: `${BASE_URL}/en${url ? `/${url}` : ''}` },
    { lang: 'fr', href: `${BASE_URL}/fr${url ? `/${url}` : ''}` },
    { lang: 'ar', href: `${BASE_URL}/ar${url ? `/${url}` : ''}` },
  ];

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="The One" />
      <meta property="og:locale" content={lang === 'ar' ? 'ar_DZ' : lang === 'fr' ? 'fr_FR' : 'en_US'} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Hreflang for i18n */}
      <link rel="alternate" hreflang="x-default" href={`${BASE_URL}/en${url ? `/${url}` : ''}`} />
      {hreflangLinks.map(({ lang: l, href }) => (
        <link key={l} rel="alternate" hreflang={l} href={href} />
      ))}
    </Helmet>
  );
};

export default SEO;
