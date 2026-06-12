import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CompanyManifestoMobileVersionProps {
  className?: string;
}

export const CompanyManifestoMobileVersion: React.FC<CompanyManifestoMobileVersionProps> = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const manifestoContent = {
    en: {
      tag: 'CORPORATE PHILOSOPHY',
      text: 'With a firm commitment to architectural excellence, we develop modern residential and commercial landmarks that bring long-term structural value, trust, and quality to families and businesses across Algeria.'
    },
    fr: {
      tag: 'NOTRE MANIFESTE',
      text: "Avec un engagement ferme pour l'excellence architecturale, nous développons des projets résidentiels et commerciaux modernes qui apportent une valeur durable, de la confiance et de la qualité aux familles et aux entreprises à travers l'Algérie."
    },
    ar: {
      tag: 'فلسفتنا العقارية',
      text: 'بالتزام راسخ بالتميز المعماري والإتقان، نقوم بتطوير مشاريع سكنية وتجارية حديثة تمنح عملائنا قيمة مستدامة، ثقة، وجودة حقيقية للعائلات والشركات في جميع أنحاء الجزائر.'
    }
  };

  const content = isRTL ? manifestoContent.ar : (i18n.language === 'fr' ? manifestoContent.fr : manifestoContent.en);
  const fontFamily = isRTL ? 'Cairo, sans-serif' : 'Geist, sans-serif';

  useEffect(() => {
    if (!textContainerRef.current) return;

    const words = textContainerRef.current.querySelectorAll('.reveal-word');

    const ctx = gsap.context(() => {
      gsap.fromTo(words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'bottom 40%',
            scrub: true,
            markers: false
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [content]);

  const words = content.text.split(' ');

  return (
    <section 
      ref={sectionRef}
      className={`w-full py-16 md:py-24 bg-white select-none ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div 
        ref={textContainerRef}
        className={`w-full px-6 flex flex-col ${isRTL ? 'items-end text-right' : 'items-start text-left'}`}
      >
        {/* Tag */}
        <span 
          className={`text-xs font-semibold uppercase tracking-[0.2em] text-gray-400 mb-6 block ${isRTL ? 'text-right' : 'text-left'}`}
          style={{ fontFamily }}
        >
          {content.tag}
        </span>

        {/* Animated Paragraph */}
        <div 
          className={`max-w-3xl ${isRTL ? 'text-right' : 'text-left'}`}
          style={{ fontFamily }}
        >
          <div className="text-wrap-balance">
            {words.map((word, wordIndex) => (
              <span 
                key={wordIndex}
                className="reveal-word inline-block mx-[0.1em] text-[clamp(24px,4.5vw,48px)] font-semibold tracking-[-0.02em] leading-[1.4] text-[#111111] opacity-[0.15]"
              >
                {word}{' '}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
