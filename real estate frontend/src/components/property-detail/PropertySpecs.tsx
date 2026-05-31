import React from 'react';
import { useTranslation } from 'react-i18next';
import { Home, Bed, Bath, Square } from 'lucide-react';
import { Property } from '../../types';
import { getPropertyTypeLabel } from '../../utils';

interface PropertySpecsProps {
  property: Property;
}

export const PropertySpecs: React.FC<PropertySpecsProps> = ({ property }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="flex flex-wrap items-center gap-6 md:gap-8 py-6 border-b border-[rgb(230,230,230)]">
      <div className="flex items-center gap-2">
        <Home size={20} strokeWidth={1.5} className="text-[rgb(136,136,136)]" />
        <span className="text-[16px] md:text-[18px] text-[rgb(44,44,44)] font-light" style={{ fontFamily: 'Geist, sans-serif' }}>
          {getPropertyTypeLabel(property.property_type)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Bed size={20} strokeWidth={1.5} className="text-[rgb(136,136,136)]" />
        <span className="text-[16px] md:text-[18px] text-[rgb(44,44,44)] font-light" style={{ fontFamily: 'Geist, sans-serif' }}>
          {property.beds} {t('property.beds')}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Bath size={20} strokeWidth={1.5} className="text-[rgb(136,136,136)]" />
        <span className="text-[16px] md:text-[18px] text-[rgb(44,44,44)] font-light" style={{ fontFamily: 'Geist, sans-serif' }}>
          {property.baths} {t('property.baths')}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Square size={20} strokeWidth={1.5} className="text-[rgb(136,136,136)]" />
        <span className="text-[16px] md:text-[18px] text-[rgb(44,44,44)] font-light" style={{ fontFamily: 'Geist, sans-serif' }}>
          {isRTL ? <><span dir="ltr" style={{ display: 'inline' }}>{property.space_sqm} m²</span></> : `${property.space_sqm} m²`}
        </span>
      </div>
    </div>
  );
};