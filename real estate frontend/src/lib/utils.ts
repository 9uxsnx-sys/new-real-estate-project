import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertToGoogleMapsEmbedUrl(mapUrl: string): string | null {
  if (!mapUrl) return null;

  try {
    // Already an embed URL - return as is
    if (mapUrl.includes('google.com/maps/embed')) {
      return mapUrl;
    }

    // Short URL (maps.app.goo.gl) - can't expand client-side, return null
    if (mapUrl.includes('maps.app.goo.gl')) {
      console.warn('Short Google Maps URLs cannot be embedded directly. Please use a full Google Maps URL.');
      return null;
    }

    // Regular Google Maps URL - extract coordinates or place name
    const urlObj = new URL(mapUrl);
    
    // Extract coordinates from @lat,lng,zoom pattern
    const placeMatch = urlObj.pathname.match(/\/place\/([^\/]+)/);
    const searchMatch = urlObj.pathname.match(/\/search\/([^\/]+)/);
    const coordMatch = urlObj.pathname.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    const queryParam = urlObj.searchParams.get('q');
    
    let embedUrl = 'https://www.google.com/maps/embed?pb=';
    
    if (coordMatch) {
      // Has coordinates - build embed URL with coordinates
      const lat = coordMatch[1];
      const lng = coordMatch[2];
      embedUrl += `!1m18!1m12!1m3!1d3305!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z${lat}!3m1!1s0x0!5e0!3m2!1sen!2sus!4v1`;
      return embedUrl;
    } else if (placeMatch || searchMatch || queryParam) {
      // Has place name - use q parameter
      const place = placeMatch ? placeMatch[1] : (searchMatch ? searchMatch[1] : queryParam);
      const encodedPlace = encodeURIComponent(place?.replace(/\+/g, ' ') || '');
      return `https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d3610!2d${lng || 55.2708}!3d${lat || 25.2048}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1i1!2i1!4b1!5m2!1e1!1s${encodedPlace}!5m2!1e1!1s${encodedPlace}!5e0!3m1!1s1!5m2!1e4!1s${encodedPlace}!5m2!1e1!1s${encodedPlace}`;
    }

    return null;
  } catch (error) {
    console.error('Failed to parse Google Maps URL:', error);
    return null;
  }
}
