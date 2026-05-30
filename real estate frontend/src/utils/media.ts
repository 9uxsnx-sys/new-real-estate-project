import type { Media } from '../types';

export const MEDIA_FALLBACK =
  'https://proxy.extractcss.dev/https://framerusercontent.com/images/rfYNgbnQgBOihPRT6UaLPi82u0.jpg?scale-down-to=1024';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Resolve image URL for Payload Media objects or legacy path strings.
 */
export function getMediaUrl(
  media: Media | string | null | undefined,
  size: 'thumbnail' | 'card' | 'full' = 'card'
): string {
  if (!media) return MEDIA_FALLBACK;

  if (typeof media === 'string') {
    if (media.startsWith('http://') || media.startsWith('https://')) return media;
    if (media.startsWith('/uploads/')) return `${API_URL}${media}`;
    if (media.startsWith('/assets/')) return media;
    return `${API_URL}/uploads/${media}`;
  }

  if (size === 'thumbnail' && media.thumbnailURL) return media.thumbnailURL;
  if (size === 'card' && media.cardURL) return media.cardURL;
  if (size === 'full' && media.fullURL) return media.fullURL;

  return media.url || MEDIA_FALLBACK;
}

/** Alias used across pages — optional size for heroes vs cards */
export function getImageUrl(
  media: Media | string | null | undefined,
  size: 'thumbnail' | 'card' | 'full' = 'card'
): string {
  return getMediaUrl(media, size);
}
