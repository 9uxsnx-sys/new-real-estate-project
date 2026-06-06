import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface CompanyManifestoProps {
  className?: string;
}

export const CompanyManifesto: React.FC<CompanyManifestoProps> = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const sectionRef = useRef<HTMLElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const manifestoContent = {
    en: {
      tag: 'CORPORATE PHILOSOPHY',
      lines: [
        'With a firm commitment to architectural excellence,',
        'we develop modern residential and commercial landmarks',
        'that bring long-term structural value, trust, and quality',
        'to families and businesses across Algeria.'
      ]
    },
    fr: {
      tag: 'NOTRE MANIFESTE',
      lines: [
        "Avec un engagement ferme pour l'excellence architecturale,",
        'nous développons des projets résidentiels et commerciaux modernes',
        "qui apportent une valeur durable, de la confiance et de la qualité",
        "aux familles et aux entreprises à travers l'Algérie."
      ]
    },
    ar: {
      tag: 'فلسفتنا العقارية',
      lines: [
        'بالتزام راسخ بالتميز المعماري والإتقان،',
        'نقوم بتطوير مشاريع سكنية وتجارية حديثة',
        'تمنح عملائنا قيمة مستدامة، ثقة، وجودة حقيقية',
        'للعائلات والشركات في جميع أنحاء الجزائر.'
      ]
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
          stagger: 0.1,
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

  return (
    <section 
      ref={sectionRef}
      className={`w-full py-32 lg:py-40 bg-white select-none ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div 
        ref={textContainerRef}
        className="w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center space-y-[2vw] lg:space-y-5"
      >
        {/* Tag */}
        <span 
          className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 mb-6 block text-center"
          style={{ fontFamily }}
        >
          {content.tag}
        </span>

        {/* Animated Lines */}
        {content.lines.map((line, lineIndex) => {
          const words = line.split(' ');
          return (
            <div 
              key={lineIndex}
              className="w-[120%] text-center"
              style={{ 
                fontFamily, 
                whiteSpace: 'nowrap'
              }}
            >
              {words.map((word, wordIndex) => (
                <span 
                  key={wordIndex}
                  className="reveal-word inline-block mx-[0.12em] text-[4.8vw] sm:text-[4vw] md:text-[3.5vw] lg:text-[42px] font-semibold tracking-[-0.02em] leading-[1.3] text-[#111111] opacity-[0.15]"
                >
                  {word}
                </span>
              ))}
            </div>
          );
        })}
      </div>
    </section>
  );
};