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
  <div className="w-12 h-12 bg-sky-400 rounded-full flex items-center justify-center">
    <div 
      className="w-6 h-6"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M18.541 10.442L10.16 10.442L10.16 2.061C10.16 1.958 10.076 1.873 9.973 1.873L9.363 1.873C8.134 1.872 6.916 2.114 5.779 2.584C4.643 3.055 3.611 3.745 2.742 4.616C1.887 5.468 1.205 6.479 0.736 7.592C0.248 8.748 0 9.973 0 11.239C0 12.505 0.248 13.728 0.736 14.884C1.207 15.997 1.882 17 2.742 17.86C3.602 18.72 4.603 19.395 5.719 19.866C6.872 20.356 8.113 20.607 9.366 20.605C10.595 20.606 11.813 20.364 12.95 19.894C14.086 19.423 15.118 18.733 15.987 17.863C16.847 17.002 17.522 16.002 17.993 14.886C18.482 13.733 18.733 12.492 18.731 11.239L18.731 10.63C18.729 10.527 18.645 10.442 18.541 10.442ZM20.602 9.141L20.541 8.48C20.341 6.324 19.385 4.29 17.843 2.755C16.302 1.215 14.272 0.263 12.103 0.062L11.44 0.001C11.33 -0.009 11.236 0.076 11.236 0.186L11.236 9.179C11.236 9.282 11.32 9.366 11.423 9.366L20.414 9.343C20.524 9.341 20.611 9.249 20.602 9.141Z' fill='white'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    />
  </div>
);

const StarIcon: React.FC = () => (
  <div className="w-12 h-12 bg-lime-300 rounded-full flex items-center justify-center">
    <div 
      className="w-6 h-6"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 0C5.144 0 3.363 0.737 2.05 2.05C0.737 3.363 0 5.143 0 7C0 9.38 1.19 11.47 3 12.74L3 15C3 15.265 3.105 15.52 3.293 15.707C3.48 15.895 3.735 16 4 16L10 16C10.265 16 10.52 15.895 10.707 15.707C10.895 15.52 11 15.265 11 15L11 12.74C12.81 11.47 14 9.38 14 7C14 5.143 13.263 3.363 11.95 2.05C10.637 0.737 8.856 0 7 0ZM4 19C4 19.265 4.105 19.52 4.293 19.707C4.48 19.895 4.735 20 5 20L9 20C9.265 20 9.52 19.895 9.707 19.707C9.895 19.52 10 19.265 10 19L10 18L4 18Z' fill='white'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    />
  </div>
);

// Card 1: Image Card
const ImageCard: React.FC = () => (
  <div className="flex-col grow shrink-0 basis-0 content-start justify-between self-stretch items-start flex relative p-5 rounded-3xl overflow-hidden">
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
    <div className="bg-zinc-100 flex-col grow shrink-0 basis-0 content-start justify-start items-start gap-y-20 w-px h-min flex relative p-5 rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="flex-col flex-none content-start justify-start items-start gap-y-3 gap-x-3 w-full h-min flex relative">
        <p className={`text-neutral-900 tracking-[-0.02em] ${lang === 'ar' ? 'text-lg' : 'text-base'} ${lang === 'ar' ? 'font-bold' : 'font-medium'} leading-5`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{current.label}</p>
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
const StatsCard: React.FC = () => (
  <div className="flex-col grow shrink-0 basis-0 content-start justify-center self-stretch items-start gap-y-6 gap-x-6 w-px flex relative">
    {/* Data Points Card */}
    <div className="bg-lime-300 flex-col grow shrink-0 basis-0 content-start justify-between items-start w-full h-px flex relative p-5 rounded-3xl overflow-hidden">
      <div className="flex-col flex-none content-start justify-start items-start gap-y-3 gap-x-3 w-72 h-min flex relative rounded-lg">
        <p className="text-neutral-900 tracking-[-0.02em] text-sm font-medium leading-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Data Points</p>
        <p className="text-neutral-900 text-center tracking-[-0.06em] text-4xl font-medium leading-[120%]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>520k+</p>
      </div>
      <p className="text-neutral-900 tracking-[-0.02em] text-wrap:balance text-base font-medium leading-6" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        Analyzed monthly to power smarter business strategies.
      </p>
    </div>

    {/* Continents Card */}
    <div className="bg-neutral-900 flex-col flex-none content-start justify-start items-center gap-y-32 gap-x-32 w-full h-min flex relative p-5 rounded-3xl overflow-hidden">
      <div className="backdrop-blur-[20px] flex-none content-center justify-between items-center w-full h-min flex relative rounded-xl">
        <p className="text-white tracking-[-0.02em] text-sm font-medium leading-5" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Continents</p>
        <p className="text-white text-center tracking-[-0.06em] text-4xl font-medium leading-[120%]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>20+</p>
      </div>
    </div>
  </div>
);

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
            <h2 className="text-neutral-900 tracking-[-0.06em] text-center text-wrap:balance text-5xl font-medium leading-[117%] max-md:text-4xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              A global consulting partner
            </h2>

            {/* Line 2: dedicated to building + Grid Icon + "smarter" */}
            <div className="max-md:flex-col max-md:flex-wrap max-md:content-center max-md:items-center max-md:gap-y-0 flex items-center justify-center gap-y-2 gap-x-2 w-full h-min flex relative">
              <h2 className="text-neutral-900 tracking-[-0.06em] text-center text-wrap:balance text-5xl font-medium leading-[117%] max-md:text-4xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                dedicated to building
              </h2>
              <div className="max-md:w-8 max-md:h-8 w-12 h-12 flex-shrink-0">
                <GridIcon />
              </div>
              <h2 className="text-neutral-900 tracking-[-0.06em] text-center text-wrap:balance text-5xl font-medium leading-[117%] max-md:text-4xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                smarter
              </h2>
            </div>

            {/* Line 3: and + Star Icon + "more adaptive" */}
            <div className="flex items-center justify-center gap-y-2 gap-x-2 w-full h-min flex relative">
              <h2 className="text-neutral-900/50 tracking-[-0.06em] text-center text-wrap:balance text-5xl font-medium leading-[117%] max-md:text-4xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                and
              </h2>
              <div className="max-md:w-8 max-md:h-8 w-12 h-12 flex-shrink-0">
                <StarIcon />
              </div>
              <h2 className="text-neutral-900/50 tracking-[-0.06em] text-center text-wrap:balance text-5xl font-medium leading-[117%] max-md:text-4xl" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                more adaptive
              </h2>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="max-md:flex-col flex-none content-center justify-start items-center gap-y-6 gap-x-6 w-full h-min flex relative">
          <ImageCard />
          <TestimonialCard lang={lang} />
          <StatsCard />
        </div>
      </div>
    </section>
  );
};
