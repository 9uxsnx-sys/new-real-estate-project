import React from 'react';

/**
 * Services Section (Desktop)
 * 
 * Extracted from: https://aeline.framer.website/
 * Section selector: section.framer-b0eol5
 */
interface ServicesDesktopSectionProps {
  className?: string;
  lang?: string;
}

// Font family helper
const getFontFamily = (lang: string) => {
  return lang === 'ar' ? "'Noto Sans Arabic', sans-serif" : "'Plus Jakarta Sans', sans-serif";
};

// Service content
const getServiceContent = (lang: string) => {
  const content = {
    en: {
      tag: 'Services',
      title: ['Comprehensive', 'consulting', 'and', 'intelligent', 'innovation'],
      description: "Whether you're optimizing today or building for tomorrow we help you move faster with confidence.",
      buttonText: 'Get Started',
      buttonHref: '/our-services',
      aiStrategy: {
        title: 'AI Strategy',
        description: 'We help you find chances for AI use and put the tools into your business.'
      },
      businessConsulting: {
        title: 'Business Consulting',
        description: 'We lead your change with smart plans, pushing growth and making work simple.'
      },
      dataInsights: {
        title: 'Data & Insights',
        description: 'We turn your raw data into clear value using solid rules and great models.'
      }
    },
    fr: {
      tag: 'Services',
      title: ['Conseil', 'complet', 'et', 'innovation', 'intelligente'],
      description: "Que vous optimisiez aujourd'hui ou construisiez pour demain, nous vous aidons à avancer plus vite en toute confiance.",
      buttonText: 'Commencer',
      buttonHref: '/nos-services',
      aiStrategy: {
        title: 'Stratégie IA',
        description: 'Nous vous aidons à identifier les opportunités d\'utilisation de l\'IA et à les intégrer dans votre entreprise.'
      },
      businessConsulting: {
        title: 'Conseil en Affaires',
        description: 'Nous guidons votre transformation avec des stratégies intelligentes, stimulant la croissance et simplifiant les processus.'
      },
      dataInsights: {
        title: 'Données & Informations',
        description: 'Nous transformons vos données brutes en valeur claire en utilisant des règles solides et d\'excellents modèles.'
      }
    },
    ar: {
      tag: 'الخدمات',
      title: ['استشارات', 'شاملة', 'و', 'ابتكار', 'ذكي'],
      description: 'سواء كنت تحسّن اليوم أو تبني للغد، نحن نساعدك على التحرك بسرعة وثقة.',
      buttonText: 'ابدأ الآن',
      buttonHref: '/خدماتنا',
      aiStrategy: {
        title: 'استراتيجية الذكاء الاصطناعي',
        description: 'نساعدك على إيجاد فرص استخدام الذكاء الاصطناعي وتطبيق الأدوات في عملك.'
      },
      businessConsulting: {
        title: 'الاستشارات التجارية',
        description: 'نقود تغييرك بخطط ذكية تدفع النمو وتبسط العمل.'
      },
      dataInsights: {
        title: 'البيانات والرؤى',
        description: 'نحوّل بياناتك الخام إلى قيمة واضحة باستخدام قواعد صلبة ونماذج ممتازة.'
      }
    }
  };
  return content[lang as keyof typeof content] || content.en;
};

// AI Strategy icon (star/bulb shape from mask)
const AIStrategyIcon: React.FC = () => (
  <div className="w-10 h-10 bg-lime-300 rounded-xl flex items-center justify-center">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#18181B">
      <path d="M7.012 3.448C7.61 1.698 10.028 1.645 10.737 3.289L10.797 3.449L11.604 5.809C11.789 6.35 12.088 6.846 12.481 7.261C12.873 7.677 13.351 8.004 13.88 8.22L14.097 8.301L16.457 9.107C18.207 9.705 18.26 12.123 16.617 12.832L16.457 12.892L14.097 13.699C13.556 13.884 13.06 14.183 12.644 14.575C12.228 14.968 11.901 15.445 11.685 15.975L11.604 16.191L10.798 18.552C10.2 20.302 7.782 20.355 7.074 18.712L7.012 18.552L6.206 16.192C6.022 15.651 5.723 15.155 5.33 14.739C4.937 14.323 4.46 13.996 3.93 13.78L3.714 13.699L1.354 12.893C-0.397 12.295 -0.45 9.877 1.194 9.169L1.354 9.107L3.714 8.301C4.256 8.116 4.751 7.817 5.167 7.425C5.583 7.032 5.91 6.555 6.125 6.025L6.206 5.809ZM16.905 0C17.092 0 17.276 0.052 17.435 0.151C17.593 0.25 17.721 0.392 17.803 0.56L17.851 0.677L18.201 1.703L19.228 2.053C19.416 2.117 19.58 2.235 19.701 2.392C19.821 2.549 19.892 2.738 19.905 2.936C19.917 3.134 19.871 3.331 19.772 3.502C19.672 3.673 19.524 3.811 19.346 3.898L19.228 3.946L18.202 4.296L17.852 5.323C17.789 5.51 17.671 5.675 17.513 5.795C17.356 5.915 17.167 5.986 16.969 5.999C16.771 6.011 16.575 5.965 16.403 5.865C16.232 5.766 16.094 5.618 16.007 5.44L15.959 5.323L15.609 4.297L14.582 3.947C14.395 3.883 14.231 3.765 14.11 3.608C13.99 3.451 13.919 3.262 13.906 3.064C13.893 2.866 13.94 2.669 14.039 2.498C14.139 2.327 14.287 2.189 14.464 2.102L14.582 2.054L15.608 1.704L15.958 0.677C16.026 0.479 16.153 0.308 16.323 0.187C16.493 0.065 16.697 0 16.905 0Z"/>
    </svg>
  </div>
);

// Business Consulting icon (chart/growth)
const BusinessConsultingIcon: React.FC = () => (
  <div className="w-10 h-10 bg-lime-300 rounded-xl flex items-center justify-center">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#18181B">
      <path d="M6.92 14.687C7.01 14.76 7.144 14.741 7.208 14.643C8.038 13.375 8.55 11.926 8.702 10.418C8.705 10.391 8.701 10.363 8.693 10.337C8.684 10.311 8.67 10.287 8.651 10.267C8.633 10.247 8.61 10.23 8.585 10.219C8.56 10.208 8.533 10.203 8.505 10.203L1.937 10.203C1.896 10.203 1.856 10.216 1.822 10.24C1.788 10.264 1.763 10.297 1.749 10.336C1.735 10.375 1.734 10.417 1.745 10.457C1.756 10.497 1.779 10.532 1.811 10.558ZM8.505 8.703C8.621 8.703 8.713 8.603 8.702 8.487C8.48 6.312 7.515 4.28 5.969 2.734C4.423 1.188 2.391 0.223 0.216 0.001C0.189 -0.002 0.161 0.001 0.135 0.01C0.109 0.019 0.085 0.033 0.064 0.051C0.044 0.07 0.028 0.093 0.017 0.118C0.006 0.143 0 0.17 0 0.198L0 8.403C0 8.483 0.032 8.559 0.088 8.615C0.144 8.671 0.22 8.703 0.3 8.703ZM8.75 0.197C8.75 0.081 8.65 -0.011 8.534 0.001C6.194 0.24 4.026 1.339 2.449 3.085C0.873 4.831 0 7.1 0 9.452C0 11.334 0.559 13.174 1.606 14.738C2.653 16.301 4.141 17.519 5.881 18.236C7.621 18.953 9.535 19.137 11.38 18.764C13.225 18.392 14.917 17.48 16.243 16.144C16.262 16.124 16.277 16.101 16.287 16.075C16.297 16.049 16.301 16.022 16.299 15.994C16.298 15.967 16.29 15.94 16.278 15.915C16.265 15.891 16.248 15.869 16.226 15.852L9.029 10.035C8.942 9.965 8.872 9.876 8.824 9.775C8.775 9.674 8.75 9.564 8.75 9.452Z"/>
    </svg>
  </div>
);

// Data & Insights icon (grid)
const DataInsightsIcon: React.FC = () => (
  <div className="w-10 h-10 bg-lime-300 rounded-xl flex items-center justify-center">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#18181B">
      <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/>
    </svg>
  </div>
);

// Arrow icon for button
const ArrowIcon: React.FC = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M8.336 2.84L1.176 10L0 8.824L7.16 1.664L0.849 1.664L0.849 0L10 0L10 9.151L8.336 9.151L8.336 2.84Z" fill="currentColor"/>
  </svg>
);

// AI Strategy Card with Image (left text, right image)
interface AIStrategyCardProps {
  title: string;
  description: string;
}

const AIStrategyCard: React.FC<AIStrategyCardProps> = ({ title, description }) => (
  <div className="w-[609px] bg-white shadow-md rounded-xl p-5 flex gap-5">
    {/* Left side: text content */}
    <div className="flex flex-col justify-between min-w-72 flex-1">
      <div>
        <div className="mb-4">
          <AIStrategyIcon />
        </div>
        <h3 className="text-neutral-900 tracking-[-0.8px] text-2xl font-medium leading-8 mb-2">
          {title}
        </h3>
        <p className="text-neutral-500 tracking-[-0.02em] text-base leading-6">
          {description}
        </p>
      </div>
    </div>
    {/* Right side: image */}
    <div className="min-w-72 h-64 rounded-xl overflow-hidden flex-1">
      <img 
        src="https://proxy.extractcss.dev/https://framerusercontent.com/images/XWVgE6Ab2HA2NJq5oJGrl9ao0Fk.png?width=1218&height=812"
        alt=""
        className="w-full h-full object-cover object-[50.5%_26.2%]"
      />
    </div>
  </div>
);

// Service Card without image
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
  <div className="flex-1 bg-white shadow-md rounded-xl p-5 h-72 flex flex-col justify-between">
    <div>
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-neutral-900 tracking-[-0.8px] text-2xl font-medium leading-8 mb-2">
        {title}
      </h3>
      <p className="text-neutral-500 tracking-[-0.02em] text-base leading-6 whitespace-pre-wrap break-words">
        {description}
      </p>
    </div>
  </div>
);

// Main component
export const ServicesDesktopSection: React.FC<ServicesDesktopSectionProps> = ({ 
  className = '', 
  lang = 'en' 
}) => {
  const isRTL = lang === 'ar';
  const content = getServiceContent(lang);
  const fontStyle = { fontFamily: getFontFamily(lang) };

  return (
    <section 
      id="services"
      className={`w-full bg-white overflow-x-hidden overflow-y-hidden px-14 py-20 max-md:px-4 max-md:py-12 ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Inner Container */}
      <div className="w-full max-w-screen-2xl mx-auto h-min flex flex-col items-center gap-y-16">
        
        {/* Header Section */}
        <div className="flex flex-col items-center gap-y-5 w-full max-w-screen-md">
          
          {/* Services Tag */}
          <div className="flex items-center gap-x-3">
            <div className="w-1 h-1 bg-neutral-900 rounded-full" />
            <p 
              className="text-neutral-900 tracking-[1.6px] uppercase text-sm font-medium leading-5"
              style={{ fontFamily: "'Geist_Mono', monospace" }}
            >
              {content.tag}
            </p>
          </div>

          {/* Title with individual word spans */}
          <h2 
            className="text-neutral-900 tracking-[-0.06em] text-center text-wrap:balance text-5xl font-medium leading-[117%] max-md:text-4xl"
            style={fontStyle}
          >
            {content.title.map((word, index) => (
              <span key={index} className="inline-block">{word}{index < content.title.length - 1 ? ' ' : ''}</span>
            ))}
          </h2>

          {/* Description */}
          <p 
            className="text-zinc-800 tracking-[-0.02em] text-center text-wrap:balance text-base leading-6 max-w-lg"
            style={fontStyle}
          >
            {content.description}
          </p>

          {/* CTA Button */}
          <a 
            href={content.buttonHref}
            className="flex items-center gap-1 pl-4 pr-1 py-1 bg-neutral-900 rounded-[48px] mt-2 hover:bg-neutral-800 transition-colors cursor-pointer no-underline"
          >
            <div className="h-5 px-1 flex items-center">
              <p 
                className="text-lime-300 tracking-[1.6px] uppercase text-sm font-medium leading-5"
                style={{ fontFamily: "'Geist_Mono', monospace" }}
              >
                {content.buttonText}
              </p>
              <p 
                className="text-lime-300 tracking-[1.6px] uppercase text-sm font-medium leading-5"
                style={{ fontFamily: "'Geist_Mono', monospace" }}
              >
                {content.buttonText}
              </p>
            </div>
            <div className="w-10 h-10 bg-lime-300 rounded-[40px] flex items-center justify-center relative">
              <div className="w-5 h-5">
                <ArrowIcon />
              </div>
              <div className="absolute right-8 top-8 w-5 h-5">
                <ArrowIcon />
              </div>
            </div>
          </a>
        </div>

        {/* Cards Section */}
        <div className="w-full z-[1]">
          <div className="bg-zinc-100 rounded-3xl p-3 flex gap-3">
            
            {/* AI Strategy Card with Image */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2.5">
                <AIStrategyCard 
                  title={content.aiStrategy.title}
                  description={content.aiStrategy.description}
                />
              </div>
            </div>

            {/* Business Consulting Card */}
            <div className="flex-1 flex flex-col justify-center">
              <ServiceCard 
                icon={<BusinessConsultingIcon />}
                title={content.businessConsulting.title}
                description={content.businessConsulting.description}
              />
            </div>

            {/* Data & Insights Card */}
            <div className="flex-1 flex flex-col justify-center">
              <ServiceCard 
                icon={<DataInsightsIcon />}
                title={content.dataInsights.title}
                description={content.dataInsights.description}
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
