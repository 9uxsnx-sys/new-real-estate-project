import React from 'react';

/**
 * About Us Section
 * 
 * Section from: https://aeline.framer.website/
 * Features multi-line headline with icons and 3 info cards.
 */
interface AboutUsSectionProps {
  className?: string;
  lang?: string;
}

// Icon components for the headline
const GridIcon: React.FC = () => (
  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#85e7ff' }}>
    <svg 
      width="28" 
      height="28" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="roundedHouse">
          <rect x="0" y="0" width="24" height="24" rx="4" ry="4" />
        </clipPath>
      </defs>
      <g clipPath="url(#roundedHouse)">
        <path 
          d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" 
          fill="white" 
        />
      </g>
    </svg>
  </div>
);

const StarIcon: React.FC = () => (
  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#D9D9D9' }}>
    <svg 
      width="28" 
      height="28" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="roundedShield">
          <rect x="0" y="0" width="24" height="24" rx="4" ry="4" />
        </clipPath>
      </defs>
      <g clipPath="url(#roundedShield)">
        <path 
          d="M11.3,2.26l-6,2.25C4.52,4.81,4,5.55,4,6.39v4.71c0,5.05,3.41,9.76,8,10.91c4.59-1.15,8-5.86,8-10.91V6.39 c0-0.83-0.52-1.58-1.3-1.87l-6-2.25C12.25,2.09,11.75,2.09,11.3,2.26z M10.23,14.83l-2.12-2.12c-0.39-0.39-0.39-1.02,0-1.41l0,0 c0.39-0.39,1.02-0.39,1.41,0l1.41,1.41l3.54-3.54c0.39-0.39,1.02-0.39,1.41,0l0,0c0.39,0.39,0.39,1.02,0,1.41l-4.24,4.24 C11.26,15.22,10.62,15.22,10.23,14.83z" 
          fill="white" 
        />
      </g>
    </svg>
  </div>
);

// Card 1: Image Card
const ImageCard: React.FC = () => (
  <div className="flex-col w-full grow shrink-0 basis-0 content-start justify-between self-stretch items-start flex relative p-5 rounded-3xl overflow-hidden">
    {/* Background Image */}
    <div className="absolute inset-0 rounded-[inherit]">
      <img 
        src="https://proxy.extractcss.dev/https://framerusercontent.com/images/JGdNRl6jQUnlEAMYGOue2qDYts.png?width=2464&height=1856"
        alt="Team collaboration"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
);

// Card 2: Testimonial Card
interface TestimonialCardProps {
  lang?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ lang = 'en' }) => {
  const content = {
    en: {
      label: 'Established in',
      paragraph: '"Over a decade of engineering premium residential and commercial developments across Algiers and Boumerdès."'
    },
    fr: {
      label: 'Établie en',
      paragraph: '"Plus d\'une décennie d\'excellence dans la promotion immobilière résidentielle et commerciale à Alger et Boumerdès."'
    },
    ar: {
      label: 'تأسست سنة',
      paragraph: '"أكثر من عشر سنوات في إنجاز مشاريع عقارية وتجارية متميزة في ولايتي الجزائر وبومرداس."'
    }
  };

  const current = content[lang as keyof typeof content] || content.en;

  return (
    <div className="bg-zinc-100 flex-col grow shrink-0 basis-0 content-start justify-start items-start gap-y-20 gap-x-3 w-full h-min flex relative p-5 rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="flex-col flex-none content-start justify-start items-start gap-y-3 gap-x-3 w-full h-min flex relative">
        <p className={`text-neutral-900 tracking-[-0.02em] ${lang === 'ar' ? 'text-xl' : 'text-base'} font-medium leading-5`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{current.label}</p>
        <p className="text-neutral-900 text-center tracking-[-0.06em] text-7xl font-medium leading-[120%]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>2013</p>
      </div>

      {/* Quote Section */}
      <div className="flex-col flex-none content-start justify-start items-start gap-y-3 gap-x-3 w-full h-min flex relative">
        {/* Quote */}
        <p className={`text-neutral-900 tracking-[-0.02em] text-wrap:balance text-base ${lang === 'ar' ? 'font-bold' : 'font-medium'} leading-6`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {current.paragraph}
        </p>
      </div>
    </div>
  );
};

// Card 3: Stats Card
interface StatsCardProps {
  lang?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ lang = 'en' }) => {
  const isRTL = lang === 'ar';
  
  const financingContent = {
    en: {
      label: 'FINANCING',
      value: '100%',
      paragraph: 'Flexible interest-free payment plans tailored to your timeline.'
    },
    fr: {
      label: 'FINANCEMENT',
      value: '100%',
      paragraph: 'Plans de paiement flexibles et échelonnés selon vos besoins.'
    },
    ar: {
      label: 'تسهيلات الدفع',
      value: '100%',
      paragraph: 'خطط سداد مرنة بالتقسيط المريح لتناسب إمكانياتكم.'
    }
  };

  const projectsContent = {
    en: {
      label: 'TOTAL PROJECTS',
      value: '06'
    },
    fr: {
      label: 'TOTAL PROJETS',
      value: '06'
    },
    ar: {
      label: 'إجمالي المشاريع',
      value: '06'
    }
  };

  const financing = financingContent[lang as keyof typeof financingContent] || financingContent.en;
  const projects = projectsContent[lang as keyof typeof projectsContent] || projectsContent.en;

  return (
    <div className="flex-col grow shrink-0 basis-0 content-start justify-center self-stretch items-start gap-y-6 gap-x-6 w-px flex relative">
      {/* Financing Card */}
      <div className="bg-sky-400 backdrop-blur-[20px] flex-col grow shrink-0 basis-0 content-start justify-between items-start w-full h-px flex relative p-5 rounded-3xl overflow-hidden" style={{ backgroundColor: '#85e7ff' }} dir={isRTL ? 'rtl' : 'ltr'}>
        <div className={`flex-col flex-none content-start items-start gap-y-3 gap-x-3 w-full h-min flex relative rounded-lg ${isRTL ? 'text-right' : ''}`} style={isRTL ? { marginLeft: 'auto', marginRight: 0 } : {}}>
          <p className="text-neutral-900 tracking-[-0.02em] text-sm font-medium leading-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", paddingLeft: isRTL ? '0px' : '5px', paddingRight: isRTL ? '5px' : '0px' }}>{financing.label}</p>
          <p className="text-neutral-900 text-center tracking-[-0.06em] text-4xl font-medium leading-[120%]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '46px' }}>{financing.value}</p>
        </div>
        <p className={`text-neutral-900 tracking-[-0.02em] text-wrap:balance text-base font-medium leading-6 ${isRTL ? 'text-right font-bold' : ''}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {financing.paragraph}
        </p>
      </div>

      {/* Projects Card */}
      <div className="bg-neutral-900 flex-col flex-none content-start justify-start items-center gap-y-32 gap-x-32 w-full h-min flex relative p-5 rounded-3xl overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="backdrop-blur-[20px] flex-none content-center justify-between items-center w-full h-min flex relative rounded-xl">
          <p className="text-white tracking-[-0.02em] text-sm font-medium leading-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{projects.label}</p>
          <p className="text-white text-center tracking-[-0.06em] text-4xl font-medium leading-[120%]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{projects.value}</p>
        </div>
      </div>
    </div>
  );
};

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ className = '', lang = 'en' }) => {
  const isRTL = lang === 'ar';
  
  return (
    <section 
      id="about-us"
      className={`w-full bg-white px-14 py-20 max-md:px-4 max-md:py-12 ${className}`}
    >
      {/* Inner Container */}
      <div className="flex-col flex-none content-center justify-start items-center gap-y-20 gap-x-20 w-full max-w-screen-2xl mx-auto h-min flex relative">
        {/* Header Section */}
        <div className="flex-col flex-none content-center justify-start items-center gap-y-5 gap-x-5 w-full max-w-screen-md h-min flex relative">
          {/* About Us Label */}
          <div className="flex items-center gap-x-3">
            <div className="w-1 h-1 bg-neutral-900 rounded-full" />
            <p className="text-neutral-900 tracking-[1.6px] uppercase text-sm font-medium leading-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>About Us</p>
          </div>

          {/* Multi-line Headline */}
          <div className="flex-col flex-none content-center justify-center items-center gap-y-0 gap-x-0 w-full h-min flex relative">
            {/* Line 1 */}
            <h2 className="max-md:flex-col max-md:flex-wrap max-md:content-center max-md:items-center text-neutral-900 tracking-[-0.06em] text-center text-wrap:balance text-5xl font-medium leading-[117%] max-md:text-4xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {lang === 'fr' ? 'Un promoteur de premier plan' : lang === 'ar' ? 'شركة ترقية عقارية رائدة' : 'A premier Algerian developer'}
            </h2>

            {/* Line 2: dedicated to building + Grid Icon + "modern spaces" */}
            <div className="max-md:flex-col max-md:flex-wrap max-md:content-center max-md:items-center max-md:gap-y-0 flex items-center justify-center gap-y-2 gap-x-2 w-full h-min flex relative">
              <h2 className="text-neutral-900 tracking-[-0.06em] text-center text-wrap:balance text-5xl font-medium leading-[117%] max-md:text-4xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {lang === 'fr' ? 'dédié à bâtir des' : lang === 'ar' ? 'تلتزم دائماً بإنجاز' : 'dedicated to building'}
              </h2>
              <div className="max-md:w-8 max-md:h-8 w-12 h-12 flex-shrink-0">
                <GridIcon />
              </div>
              <h2 className="text-neutral-900 tracking-[-0.06em] text-center text-wrap:balance text-5xl font-medium leading-[117%] max-md:text-4xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", paddingRight: '5px' }}>
                {lang === 'fr' ? 'espaces modernes' : lang === 'ar' ? 'مشاريع متميزة' : 'modern spaces'}
              </h2>
            </div>

            {/* Line 3: and + Star Icon + "lasting trust" */}
            <div className="flex items-center justify-center gap-y-2 gap-x-2 w-full h-min flex relative">
              <h2 className="text-neutral-900/50 tracking-[-0.06em] text-center text-wrap:balance text-5xl font-medium leading-[117%] max-md:text-4xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {lang === 'fr' ? 'et une' : lang === 'ar' ? 'و أيضًا' : 'and'}
              </h2>
              <div className="max-md:w-8 max-md:h-8 w-12 h-12 flex-shrink-0">
                <StarIcon />
              </div>
              <h2 className="text-neutral-900/50 tracking-[-0.06em] text-center text-wrap:balance text-5xl font-medium leading-[117%] max-md:text-4xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", paddingRight: '3px' }}>
                {lang === 'fr' ? 'confiance durable' : lang === 'ar' ? 'بناء ثقتكم' : 'lasting trust'}
              </h2>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="max-md:flex-col flex-none content-center justify-start items-stretch gap-y-6 gap-x-6 w-full h-min flex relative">
          <ImageCard />
          <TestimonialCard lang={lang} />
          <StatsCard lang={lang} />
        </div>
      </div>
    </section>
  );
};
