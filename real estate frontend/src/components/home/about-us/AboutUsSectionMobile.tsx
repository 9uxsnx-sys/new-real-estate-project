import React from 'react';

interface AboutUsSectionMobileProps {
  className?: string;
  lang?: string;
}

/**
 * About Us Section - Mobile Version
 * 
 * Clean mobile-first design based on Framer template.
 * Features headline with icons and 3 info cards.
 */

// Helper to get font family based on language
const getFontFamily = (lang: string) => {
  return lang === 'ar' ? "'Noto Sans Arabic', sans-serif" : "'Plus Jakarta Sans', sans-serif";
};

// Helper to get font style object
const getFontStyle = (lang: string) => {
  return { fontFamily: getFontFamily(lang) };
};

// Icon components for the headline
const HomeIcon: React.FC = () => (
  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#85e7ff' }}>
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"/>
    </svg>
  </div>
);

const ShieldIcon: React.FC = () => (
  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-neutral-200 flex-shrink-0">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
    </svg>
  </div>
);

export const AboutUsSectionMobile: React.FC<AboutUsSectionMobileProps> = ({ className = '', lang = 'en' }) => {
  // Headline content based on language
  const headlineContent = {
    en: {
      line1: 'A premier Algerian developer',
      line2a: 'dedicated to building',
      line2b: 'modern spaces',
      line3a: 'and',
      line3b: 'lasting trust',
    },
    fr: {
      line1: 'Un promoteur de premier plan',
      line2a: 'dédié à bâti r des',
      line2b: 'espaces modernes',
      line3a: 'et une',
      line3b: 'confiance durable',
    },
    ar: {
      line1: 'شركة ترقية عقارية رائدة',
      line2a: 'تلتزم دائماً بإنجاز',
      line2b: 'مشاريع متميزة',
      line3a: 'و أيضًا',
      line3b: 'بناء ثقتكم',
    }
  };

  // Card content
  const establishedContent = {
    en: { label: 'Established in', paragraph: '"Over a decade of engineering premium residential and commercial developments across Algiers and Boumerdès."' },
    fr: { label: 'Établie en', paragraph: '"Plus d\'une décennie d\'excellence dans la promotion immobilière résidentielle et commerciale à Alger et Boumerdès."' },
    ar: { label: 'تأسست سنة', paragraph: '"أكثر من عشر سنوات في إنجاز مشاريع عقارية وتجارية متميزة في ولايتي الجزائر وبومرداس."' }
  };

  const financingContent = {
    en: { label: 'FINANCING', value: '100%', paragraph: 'Flexible interest-free payment plans tailored to your timeline.' },
    fr: { label: 'FINANCEMENT', value: '100%', paragraph: 'Plans de paiement flexibles et échelonnés selon vos besoins.' },
    ar: { label: 'تسهيلات الدفع', value: '100%', paragraph: 'خطط سداد مرنة بالتقسيط المريح لتناسب إمكانياتكم.' }
  };

  const projectsContent = {
    en: { label: 'TOTAL PROJECTS', value: '06' },
    fr: { label: 'TOTAL PROJETS', value: '06' },
    ar: { label: 'إجمالي المشاريع', value: '06' }
  };

  const content = headlineContent[lang as keyof typeof headlineContent] || headlineContent.en;
  const established = establishedContent[lang as keyof typeof establishedContent] || establishedContent.en;
  const financing = financingContent[lang as keyof typeof financingContent] || financingContent.en;
  const projects = projectsContent[lang as keyof typeof projectsContent] || projectsContent.en;

  const fontStyle = getFontStyle(lang);

  return (
    <section 
      id="about-us"
      className={`w-full bg-white px-4 py-12 ${className}`}
      style={fontStyle}
    >
      {/* About Us Label */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="w-1 h-1 bg-neutral-900 rounded-full" />
        <p className="text-neutral-900 tracking-[1.6px] uppercase text-sm font-medium" style={lang !== 'ar' ? { fontFamily: "'Plus Jakarta Sans', sans-serif" } : fontStyle}>
          About Us
        </p>
      </div>

      {/* Headline - Stack vertically, centered */}
      <div className="flex flex-col items-center gap-4 mb-10">
        {/* Line 1 */}
        <h2 className="text-neutral-900 tracking-[-0.06em] text-3xl font-medium leading-[117%] text-center text-wrap:balance px-2" style={fontStyle}>
          {content.line1}
        </h2>

        {/* Line 2: text + icon + text - all on ONE row */}
        <div className="flex items-center justify-center gap-2 w-full px-2 flex-wrap">
          <span className="text-neutral-900 tracking-[-0.06em] text-3xl font-medium leading-[117%] text-center text-wrap:balance" style={fontStyle}>
            {content.line2a}
          </span>
          <HomeIcon />
          <span className="text-neutral-900 tracking-[-0.06em] text-3xl font-medium leading-[117%] text-center text-wrap:balance" style={fontStyle}>
            {content.line2b}
          </span>
        </div>

        {/* Line 3: text + icon + text - all on ONE row */}
        <div className="flex items-center justify-center gap-2 w-full px-2 flex-wrap">
          <span className="text-neutral-900/50 tracking-[-0.06em] text-3xl font-medium leading-[117%] text-center text-wrap:balance" style={fontStyle}>
            {content.line3a}
          </span>
          <ShieldIcon />
          <span className="text-neutral-900/50 tracking-[-0.06em] text-3xl font-medium leading-[117%] text-center text-wrap:balance" style={fontStyle}>
            {content.line3b}
          </span>
        </div>
      </div>

      {/* Cards Grid - Stack vertically */}
      <div className="flex flex-col gap-6">
        {/* Image Card - matches Established card height */}
        <div className="rounded-3xl overflow-hidden relative h-[208px]">
          <img 
            src="https://proxy.extractcss.dev/https://framerusercontent.com/images/JGdNRl6jQUnlEAMYGOue2qDYts.png?width=2464&height=1856"
            alt="Team collaboration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Established Card */}
        <div className="bg-zinc-100 rounded-3xl p-5">
          <div className="flex flex-col gap-3">
            <p className={`text-neutral-900 text-base font-medium ${lang === 'ar' ? 'text-xl' : ''}`} style={fontStyle}>
              {established.label}
            </p>
            <p className={`text-neutral-900 text-6xl font-medium ${lang === 'ar' ? 'text-right' : 'text-left'}`} style={fontStyle}>
              2013
            </p>
          </div>
          <p className={`text-neutral-900 text-base font-medium leading-6 mt-6 ${lang === 'ar' ? 'font-bold' : ''}`} style={fontStyle}>
            {established.paragraph}
          </p>
        </div>

        {/* Financing card */}
        <div 
          className="rounded-3xl p-5"
          style={{ backgroundColor: '#85e7ff', ...fontStyle }}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        >
          <div className="flex flex-col gap-3">
            <p className="text-neutral-900 text-sm font-medium" style={fontStyle}>
              {financing.label}
            </p>
            <p className={`text-neutral-900 text-5xl font-medium ${lang === 'ar' ? 'text-right' : 'text-left'}`} style={fontStyle}>
              {financing.value}
            </p>
          </div>
          <p className={`text-neutral-900 text-base font-medium leading-6 mt-4 ${lang === 'ar' ? 'text-right font-bold' : ''}`} style={fontStyle}>
            {financing.paragraph}
          </p>
        </div>

        {/* Projects Card */}
        <div className="bg-neutral-900 rounded-3xl p-5">
          <div className="flex items-center justify-between w-full">
            <p className="text-white text-sm font-medium" style={fontStyle}>
              {projects.label}
            </p>
            <p className="text-white text-5xl font-medium" style={fontStyle}>
              {projects.value}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
