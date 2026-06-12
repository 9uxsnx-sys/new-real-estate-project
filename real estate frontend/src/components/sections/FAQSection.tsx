import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  className?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ className = '' }) => {
  const { i18n } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData = {
    en: {
      tag: 'FAQ',
      title: 'FREQUENTLY ASKED QUESTIONS',
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
      tag: 'FAQ',
      title: 'QUESTIONS FRÉQUENTES',
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
      tag: 'الأسئلة الشائعة',
      title: 'الأسئلة الشائعة',
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

  const activeContent = faqData[i18n.language as keyof typeof faqData] || faqData.en;

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`w-full py-12 md:py-16 px-4 md:px-8 lg:px-16 ${className}`}>
      {/* Header - Outside the bordered container */}
      <div className="w-full max-w-3xl mx-auto text-center mb-8 md:mb-10">
        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 block mb-3 md:mb-4">
          {activeContent.tag}
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight text-[#111111] uppercase">
          {activeContent.title}
        </h2>
      </div>

      {/* FAQ Items - Each in separate bordered card */}
      <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
        {activeContent.items.map((item, index) => (
          <div 
            key={index}
            className="bg-[#F5F5F5] rounded-2xl p-5 md:p-6"
          >
            {/* Question (Clickable) */}
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex items-center justify-between text-left group"
            >
              <span className="text-base md:text-lg font-medium text-[#111111] pr-4 group-hover:text-gray-600 transition-colors">
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
              <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
