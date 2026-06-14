import type { Media } from '../types';

export const MEDIA_FALLBACK =
  'https://proxy.extractcss.dev/https://framerusercontent.com/images/rfYNgbnQgBOihPRT6UaLPi82u0.jpg?scale-down-to=1024';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Payload v3 media object format
 * The sizes are stored in a nested 'sizes' object
 */
interface PayloadMedia {
  id: string;
  url: string;
  sizes?: {
    thumbnail?: { url?: string };
    card?: { url?: string };
    full?: { url?: string };
    [key: string]: any;
  };
  // Legacy flat format (if used)
  thumbnailURL?: string;
  cardURL?: string;
  fullURL?: string;
  alt?: string;
  filename?: string;
  [key: string]: any;
}

/**
 * Resolve image URL for Payload Media objects or legacy path strings.
 */
export function getMediaUrl(
  media: Media | PayloadMedia | string | null | undefined,
  size: 'thumbnail' | 'card' | 'full' = 'card'
): string {
  if (!media) return MEDIA_FALLBACK;

  if (typeof media === 'string') {
    if (media.startsWith('http://') || media.startsWith('https://')) return media;
    if (media.startsWith('/uploads/')) return `${API_URL}${media}`;
    if (media.startsWith('/assets/')) return media;
    return `${API_URL}/uploads/${media}`;
  }

  // DEBUG: Log media object structure
  console.log('[getMediaUrl] media:', media);
  console.log('[getMediaUrl] size:', size);

  // Check for Payload v3 nested sizes format first
  if (media.sizes) {
    const sizeData = media.sizes[size];
    if (sizeData?.url) {
      console.log('[getMediaUrl] Using sizes format, URL:', sizeData.url);
      return sizeData.url;
    }
    // Also check for payload's auto-generated sizes (they use 'filename' as key)
    const sizeKey = size === 'thumbnail' ? 'thumbnail' : size === 'card' ? 'card' : 'full';
    if (media.sizes[sizeKey]?.url) {
      return media.sizes[sizeKey].url;
    }
  }

  // Check for legacy flat format
  if (size === 'thumbnail' && media.thumbnailURL) return media.thumbnailURL;
  if (size === 'card' && media.cardURL) return media.cardURL;
  if (size === 'full' && media.fullURL) return media.fullURL;

  // Fallback to original URL
  if (media.url) {
    console.log('[getMediaUrl] Using fallback url:', media.url);
    return media.url;
  }

  console.log('[getMediaUrl] Using MEDIA_FALLBACK');
  return MEDIA_FALLBACK;
}

/** Alias used across pages — optional size for heroes vs cards */
export function getImageUrl(
  media: Media | string | null | undefined,
  size: 'thumbnail' | 'card' | 'full' = 'card'
): string {
  return getMediaUrl(media, size);
}
