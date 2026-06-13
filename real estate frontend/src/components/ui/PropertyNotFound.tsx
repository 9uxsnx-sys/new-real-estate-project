import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, ArrowRight } from 'lucide-react';

interface PropertyNotFoundProps {
  title?: string;
  message?: string;
}

export const PropertyNotFound: React.FC<PropertyNotFoundProps> = ({
  title,
  message,
}) => {
  const navigate = useNavigate();
  const { lang } = useParams<{ lang: string }>();
  const { t } = useTranslation();
  const currentLang = lang || 'en';

  return (
    <div className="min-h-screen bg-white pt-[clamp(60px,7vh,80px)]">
      <div className="max-w-[1360px] mx-auto px-4 md:px-8 lg:px-20 py-16 md:py-24">
        <div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-[rgb(248,248,248)] flex items-center justify-center mb-6">
            <svg
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgb(136,136,136)"
              strokeWidth="1.5"
              className="w-10 h-10"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>

          {/* Title */}
          <h1
            className="text-[18px] font-light text-[rgb(44,44,44)] mb-2"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            {title || t('common.notFound')}
          </h1>

          {/* Message */}
          <p
            className="text-[14px] text-[rgb(136,136,136)] font-light"
            style={{ fontFamily: 'Geist, sans-serif' }}
          >
            {message || t('common.tryAgain')}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button
              onClick={() => navigate(`/${currentLang}`)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-full font-medium text-[14px]"
              style={{ fontFamily: 'Geist, sans-serif' }}
            >
              <Home className="w-4 h-4" />
              {t('nav.home')}
            </button>
            <button
              onClick={() => navigate(`/${currentLang}/properties`)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white text-[rgb(44,44,44)] border-2 border-[rgb(230,230,230)] rounded-full font-medium text-[14px]"
              style={{ fontFamily: 'Geist, sans-serif' }}
            >
              {t('property.backToProperties')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyNotFound;
