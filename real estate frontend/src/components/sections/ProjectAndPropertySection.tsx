import React from 'react';
import { useTranslation } from 'react-i18next';
import { GatewayCard } from '../ui/DiscoverProjectsCard';
import { DiscoverPropertiesCard } from '../ui/DiscoverPropertiesCard';

export const ProjectAndPropertySection: React.FC = () => {
  const { i18n } = useTranslation();

  const projectsContent = {
    en: {
      tag: 'PROJECTS',
      title: 'EXPLORE OUR PROJECTS',
      description: 'Discover our exceptional development projects designed for modern living. From luxury villas to contemporary apartments, each project reflects our commitment to quality, innovation, and sustainable design that transforms the way you experience home.',
    },
    fr: {
      tag: 'PROJETS',
      title: 'EXPLOREZ NOS PROJETS',
      description: 'Découvrez nos projets de développement exceptionnels conçus pour la vie moderne. Des villas de luxe aux appartements contemporains, chaque projet reflète notre engagement envers la qualité, l\'innovation et le design durable qui transforme votre expérience de la maison.',
    },
    ar: {
      tag: 'مشاريع',
      title: 'اكتشف مشاريعنا',
      description: 'اكتشف مشاريع التطوير الاستثنائية المصممة للحياة العصرية. من الفيلات الفاخرة إلى الشقق المعاصرة، يعكس كل مشروع التزامنا بالجودة والابتكار والتصميم المستدام الذي يحول طريقة تجربتك للمنزل.',
    }
  };

  const propertiesContent = {
    en: {
      tag: 'PROPERTIES',
      title: 'FIND YOUR HOME',
      description: 'Browse our curated selection of premium properties tailored to your lifestyle. Whether you\'re seeking a cozy apartment in the heart of the city or a spacious family home with modern amenities, we have the perfect property waiting for you.',
    },
    fr: {
      tag: 'PROPRIÉTÉS',
      title: 'TROUVEZ VOTRE MAISON',
      description: 'Parcourez notre sélection de propriétés premium adaptées à votre style de vie. Que vous cherchiez un appartement confortable au cœur de la ville ou une maison familiale spacieuse avec des équipements modernes, nous avons la propriété parfaite qui vous attend.',
    },
    ar: {
      tag: 'عقارات',
      title: 'اعثر على منزلك',
      description: 'تصفح مجموعتنا المختارة من العقارات الفاخرة المصممة لنمط حياتك. سواء كنت تبحث عن شقة مريحة في قلب المدينة أو منزل عائلي فسيح مع وسائل الراحة الحديثة، لدينا العقار المثالي في انتظارك.',
    }
  };

  const activeProjects = projectsContent[i18n.language as keyof typeof projectsContent] || projectsContent.en;
  const activeProperties = propertiesContent[i18n.language as keyof typeof propertiesContent] || propertiesContent.en;

  return (
    <section className="w-full py-12 md:py-16 px-4 md:px-8 lg:px-16">
      {/* Row 1: Card Left, Text Right */}
      <div className="w-full flex flex-col-reverse md:flex-row items-center justify-center gap-8 md:gap-16">
        <GatewayCard
          imageSrc="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80"
          imageAlt="Our Projects"
          buttonHref="/projects"
        />
        <div className="max-w-md">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 block mb-3">
            {activeProjects.tag}
          </span>
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-[#111111] uppercase mb-4">
            {activeProjects.title}
          </h2>
          <p className="text-sm md:text-base text-gray-500 leading-relaxed">
            {activeProjects.description}
          </p>
        </div>
      </div>

      {/* Row 2: Text Left, Card Right */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mt-8 md:mt-16">
        <div className="max-w-md">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 block mb-3">
            {activeProperties.tag}
          </span>
          <h2 className="text-2xl md:text-4xl font-semibold tracking-tight text-[#111111] uppercase mb-4">
            {activeProperties.title}
          </h2>
          <p className="text-sm md:text-base text-gray-500 leading-relaxed">
            {activeProperties.description}
          </p>
        </div>
        <DiscoverPropertiesCard
          imageSrc="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
          imageAlt="Our Properties"
          buttonHref="/properties"
        />
      </div>
    </section>
  );
};
