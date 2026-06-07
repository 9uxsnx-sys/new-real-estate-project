import React from 'react';
import { useTranslation } from 'react-i18next';
import { GatewayCardLTR } from './GatewayCardLTR';
import { GatewayCardRTL } from './GatewayCardRTL';

interface DualGatewaySectionProps {
  imageSrc1?: string;
  imageSrc2?: string;
  onCardClick1?: () => void;
  onCardClick2?: () => void;
  href1?: string;
  href2?: string;
}

export const DualGatewaySection: React.FC<DualGatewaySectionProps> = ({
  imageSrc1 = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  imageSrc2 = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  onCardClick1,
  onCardClick2,
  href1 = "/projects",
  href2 = "/properties",
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const content = isRTL ? {
    tag: 'عملنا',
    title: 'اكتشف مشاريعنا',
    card1Line1: 'اكتشف',
    card1Line2: 'مشاريعنا',
    card1Line1Size: '50px',
    card1Line2Size: '40px',
    card1Button: 'اكتشف المزيد',
    card2Line1: 'اكتشف',
    card2Line2: 'عقاراتنا',
    card2Line1Size: '50px',
    card2Line2Size: '48px',
    card2Button: 'اكتشف المزيد',
  } : {
    tag: 'OUR WORK',
    title: 'EXPLORE WHAT WE BUILD',
    card1Line1: 'DISCOVER OUR',
    card1Line2: 'PROJECTS',
    card1Line1Size: '32px',
    card1Line2Size: '32px',
    card1Button: 'Discover more',
    card2Line1: 'DISCOVER OUR',
    card2Line2: 'PROPERTIES',
    card2Line1Size: '32px',
    card2Line2Size: '32px',
    card2Button: 'Discover more',
  };

  return (
    <section className="w-full bg-white py-16 md:py-20 lg:py-24">
      <div className="w-full max-w-7xl mx-auto px-6 mb-12 text-center">
        <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 block mb-4">
          {content.tag}
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[#111111] uppercase">
          {content.title}
        </h2>
      </div>

      <div className="w-full px-6 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        {isRTL ? (
          <>
            <GatewayCardRTL
              imageSrc={imageSrc1}
              imageAlt="Our Projects"
              onCardClick={onCardClick1}
              href={href1}
              titleLine1={content.card1Line1}
              titleLine2={content.card1Line2}
              titleLine1Size={content.card1Line1Size}
              titleLine2Size={content.card1Line2Size}
              buttonText={content.card1Button}
            />
            <GatewayCardRTL
              imageSrc={imageSrc2}
              imageAlt="Our Properties"
              onCardClick={onCardClick2}
              href={href2}
              titleLine1={content.card2Line1}
              titleLine2={content.card2Line2}
              titleLine1Size={content.card2Line1Size}
              titleLine2Size={content.card2Line2Size}
              buttonText={content.card2Button}
            />
          </>
        ) : (
          <>
            <GatewayCardLTR
              imageSrc={imageSrc1}
              imageAlt="Our Projects"
              onCardClick={onCardClick1}
              href={href1}
              titleLine1={content.card1Line1}
              titleLine2={content.card1Line2}
              buttonText={content.card1Button}
            />
            <GatewayCardLTR
              imageSrc={imageSrc2}
              imageAlt="Our Properties"
              onCardClick={onCardClick2}
              href={href2}
              titleLine1={content.card2Line1}
              titleLine2={content.card2Line2}
              buttonText={content.card2Button}
            />
          </>
        )}
      </div>
    </section>
  );
};
