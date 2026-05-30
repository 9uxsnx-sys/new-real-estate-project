import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { convertToGoogleMapsEmbedUrl } from '../../lib/utils';

interface PropertyLocationProps {
  address?: string;
  googleMapUrl?: string;
  lat?: number;
  lng?: number;
}

export const PropertyLocation: React.FC<PropertyLocationProps> = ({ 
  address = "Dubai, UAE",
  googleMapUrl,
  lat = 25.2048,
  lng = 55.2708 
}) => {
  const { t } = useTranslation();

  const mapUrl = useMemo(() => {
    // Use the provided Google Maps embed URL directly if it's an embed URL
    if (googleMapUrl && googleMapUrl.includes('google.com/maps/embed')) {
      return googleMapUrl;
    }
    
    // If it's a regular Google Maps URL, try to convert
    if (googleMapUrl) {
      const embedUrl = convertToGoogleMapsEmbedUrl(googleMapUrl);
      if (embedUrl) return embedUrl;
    }
    
    // Fallback to coordinates-based embed URL
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.715220363292!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDA2JzAwLjgiTiAxMTjCsDI3JzAyLjYiVw!5e0!3m2!1sen!2sus!4v1`;
  }, [googleMapUrl, lat, lng]);

  return (
    <div className="py-6">
      <h3 
        className="text-[20px] md:text-[24px] font-semibold text-[rgb(44,44,44)] mb-4"
        style={{ fontFamily: 'Geist, sans-serif' }}
      >
        {t('property.location')}
      </h3>
      <div className="relative w-full h-[300px] md:h-[400px] rounded-3xl overflow-hidden">
        <iframe
          src={mapUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-3xl"
        />
      </div>
      <p 
        className="mt-3 text-[14px] md:text-[16px] text-[rgb(136,136,136)] font-light"
        style={{ fontFamily: 'Geist, sans-serif' }}
      >
        {address}
      </p>
    </div>
  );
};
