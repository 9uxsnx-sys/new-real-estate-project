import { fetchApi, API_URL } from './api';
import type { Project, PayloadListResponse, Media } from '../types';
import { getMediaUrl } from '../utils/media';

/**
 * Fetch all projects from Payload CMS
 * Uses depth=1 to populate media relations (first_image, second_image, gallery)
 */
export async function fetchProjects(locale = 'en'): Promise<Project[]> {
  const params = new URLSearchParams();
  params.append('locale', locale);
  params.append('depth', '1'); // Populate media relations
  params.append('limit', '100'); // Get all projects

  const response = await fetchApi<PayloadListResponse<Project>>(
    `/api/projects?${params.toString()}`
  );

  return response.docs || [];
}

/**
 * Fetch a single project by its slug
 * Payload uses string IDs, we use slug for URL-friendly lookups
 */
export async function fetchProjectBySlug(
  slug: string,
  locale = 'en'
): Promise<Project | null> {
  const params = new URLSearchParams();
  params.append('locale', locale);
  params.append('depth', '1');
  params.append('where[slug][equals]', slug);

  try {
    const response = await fetchApi<PayloadListResponse<Project>>(
      `/api/projects?${params.toString()}`
    );
    return response.docs?.[0] || null;
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return null;
  }
}

/**
 * Fetch a single project by its ID
 */
export async function fetchProjectById(
  id: string,
  locale = 'en'
): Promise<Project | null> {
  try {
    const response = await fetchApi<Project>(
      `/api/projects/${id}?locale=${locale}&depth=1`
    );
    return response;
  } catch (error) {
    console.error('Error fetching project by id:', error);
    return null;
  }
}

/**
 * Get the best image URL from a Payload Media object
 * Uses auto-generated sizes: card (768x576) for cards, full (1920x1080) for hero
 */
export function getProjectImageUrl(
  imageField: Media | string | null | undefined,
  size: 'thumbnail' | 'card' | 'full' = 'card'
): string {
  return getMediaUrl(imageField, size);
}

/**
 * @deprecated Use fetchProjectBySlug instead (Payload uses slug, not documentId)
 */
export async function fetchProjectByDocumentId(
  documentId: string,
  locale?: string
): Promise<Project | null> {
  console.warn('fetchProjectByDocumentId is deprecated, use fetchProjectBySlug');
  return fetchProjectById(documentId, locale || 'en');
}