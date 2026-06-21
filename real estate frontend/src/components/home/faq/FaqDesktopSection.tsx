import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/**
 * FAQ Section (Desktop)
 * 
 * Original style: gray cards with accordion
 */
interface FaqDesktopSectionProps {
  className?: string;
  lang?: string;
}

// Font family helper
const getFontFamily = (lang: string) => {
  return lang === 'ar' ? "'Noto Sans Arabic', sans-serif" : "'Plus Jakarta Sans', sans-serif";
};

// FAQ content
const getFaqContent = (lang: string) => {
  const content = {
    en: {
      tag: 'CLIENT CONCIERGE',
      title: 'Clear answers for your property journey',
      description: 'Everything you need to know about our architectural standards, acquisition process, and active project timelines in Algiers and Boumerdès.',
      items: [
        {
          question: 'Who are we?',
          answer: 'Founded in 2013, we are a specialized real estate development company operating primarily in Algiers and Boumerdes. We are committed to delivering projects that meet our clients\' needs in terms of quality, pricing, and location.'
        },
        {
          question: 'What services do you offer?',
          answer: 'We provide a complete range of real estate services including residential apartments, commercial shops, professional offices, and apartment rentals.'
        },
        {
          question: 'What are your achievements?',
          answer: 'We have successfully completed 4 real estate projects and are currently developing 2 additional projects.'
        },
        {
          question: 'What are your values?',
          answer: 'Our core values include trust and credibility, quality in delivery, competitive and fair pricing, and flexible payment plans with installment options.'
        },
        {
          question: 'Where do you operate?',
          answer: 'We operate in Algiers and Boumerdes provinces.'
        },
        {
          question: 'How can I contact you?',
          answer: 'You can reach us by phone or WhatsApp at: 0770862831'
        },
        {
          question: 'Do you offer payment plans?',
          answer: 'Yes, we offer flexible payment facilities with installment options to make property ownership more accessible.'
        }
      ]
    },
    fr: {
      tag: 'CONCIERGERIE CLIENT',
      title: 'Des réponses claires pour votre projet immobilier',
      description: 'Tout ce que vous devez savoir sur nos normes architecturales, notre processus d\'acquisition et les délais de nos chantiers en cours.',
      items: [
        {
          question: 'Qui sommes-nous?',
          answer: 'Fondée en 2013, nous sommes une entreprise spécialisée dans le développement immobilier opérant principalement à Alger et Boumerdès.'
        },
        {
          question: 'Quels services offrez-vous?',
          answer: 'Nous proposons une gamme complète de services immobiliers incluant des appartements résidentiels, des commerces, des bureaux professionnels et la location d\'appartements.'
        },
        {
          question: 'Quelles sont vos réalisations?',
          answer: 'Nous avons顺利完成4 projets immobiliers et développons actuellement 2 projets supplémentaires.'
        },
        {
          question: 'Quelles sont vos valeurs?',
          answer: 'Nos valeurs fondamentales incluent la confiance, la qualité de livraison, des prix compétitifs et des facilités de paiement par versements.'
        },
        {
          question: 'Où opérez-vous?',
          answer: 'Nous opérons dans les wilayas d\'Alger et de Boumerdès.'
        },
        {
          question: 'Comment vous contacter?',
          answer: 'Appelez-nous au: 0770862831'
        },
        {
          question: 'Proposez-vous des plans de paiement?',
          answer: 'Oui, nous offrons des facilités de paiement avec des options de versements.'
        }
      ]
    },
    ar: {
      tag: 'خدمة العملاء المتميزة',
      title: 'إجابات واضحة توجه مسار استثماركم العقاري',
      description: 'كل ما تحتاجه من معلومات حول معاييرنا المعمارية، آليات الشراء، والجداول الزمنية لمشاريعنا في الجزائر وبومرداس.',
      items: [
        {
          question: 'من نحن؟',
          answer: 'تأسست الشركة سنة 2013، وهي شركة متخصصة في مجال الترقية العقارية، تنشط في ولايتي الجزائر وبومرداس.'
        },
        {
          question: 'ما هي خدماتكم؟',
          answer: 'نقدم مجموعة متكاملة من الخدمات العقارية تشمل: إنجاز الشقق السكنية، المحلات التجارية، المكاتب المهنية، وكراء الشقق.'
        },
        {
          question: 'ما هي إنجازاتنا؟',
          answer: 'أنجزنا 4 مشاريع عقارية ناجحة ونعمل حالياً على مشروعين قيد التطوير.'
        },
        {
          question: 'ما هي قيمنا؟',
          answer: 'نؤمن بالثقة والمصداقية، الجودة في الإنجاز، أسعار مدروسة ومناسبة، وتسهيلات في الدفع (التقسيط).'
        },
        {
          question: 'أين تنشطون؟',
          answer: 'ننشط في ولاية الجزائر وبومرداس.'
        },
        {
          question: 'كيف يمكنني التواصل معكم؟',
          answer: 'تواصل معنا عبر الهاتف أو واتساب: 0770862831'
        },
        {
          question: 'هل تقدمون تسهيلات في الدفع؟',
          answer: 'نعم، نقدم تسهيلات في الدفع مع خيارات التقسيط.'
        }
      ]
    }
  };
  return content[lang as keyof typeof content] || content.en;
};

// Main component
export const FaqDesktopSection: React.FC<FaqDesktopSectionProps> = ({ 
  className = '', 
  lang = 'en' 
}) => {
  const isRTL = lang === 'ar';
  const content = getFaqContent(lang);
  const fontStyle = { fontFamily: getFontFamily(lang) };
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq"
      className={`w-full bg-white overflow-x-hidden px-14 py-20 max-md:px-4 max-md:py-12 ${className}`}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Inner Container */}
      <div className="w-full max-w-screen-2xl mx-auto h-min flex flex-col items-center gap-y-16">
        
        {/* Header Section */}
        <div className="flex flex-col items-center gap-y-5 w-full max-w-screen-md">
          
          {/* Tag */}
          <div className="flex items-center gap-x-3">
            <div className="w-1 h-1 bg-neutral-900 rounded-full" />
            <p 
              className="text-neutral-900 tracking-[1.6px] uppercase text-sm font-medium leading-5"
              style={{ fontFamily: "'Geist_Mono', monospace" }}
            >
              {content.tag}
            </p>
          </div>

          {/* Title */}
          <h2 
            className="text-neutral-900 tracking-[-0.06em] text-center text-wrap:balance text-5xl font-medium leading-[117%] max-md:text-4xl"
            style={fontStyle}
          >
            {content.title}
          </h2>

          {/* Description */}
          <p 
            className="text-zinc-800 tracking-[-0.02em] text-center text-wrap:balance text-base leading-6 max-w-lg"
            style={fontStyle}
          >
            {content.description}
          </p>
        </div>

        {/* FAQ Items - Gray cards (original style) */}
        <div className="w-full z-[1] flex justify-center">
          <div className="w-full max-w-[700px] flex flex-col gap-4">
            {content.items.map((item, index) => (
              <div 
                key={index}
                className="bg-zinc-100 rounded-[20px] p-5 md:p-6"
              >
                {/* Question (Clickable) */}
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <span 
                    className="text-neutral-900 text-base md:text-lg font-medium group-hover:text-gray-600 transition-colors"
                    style={fontStyle}
                  >
                    {item.question}
                  </span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Answer (Expandable) */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    openIndex === index ? 'max-h-96 pt-4' : 'max-h-0'
                  }`}
                >
                  <p 
                    className="text-zinc-500 text-sm md:text-base leading-relaxed"
                    style={fontStyle}
                  >
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};