import { fetchApi } from './api';
import type { Property, PayloadListResponse } from '../types';

export { getImageUrl } from '../utils/media';

export interface PropertyFilters {
  search?: string;
  propertyType?: string;
  /** Payload project document id */
  projectId?: string;
  minSpace?: number;
  maxSpace?: number;
  sortBy?: 'price-low' | 'price-high' | 'newest';
}

/**
 * Build Payload CMS query parameters using native 'where' syntax
 * Example: where[name][contains]=Marina&where[price][greater_than]=1000000
 */
function buildQueryParams(filters: PropertyFilters, locale = 'en'): string {
  const params = new URLSearchParams();

  // Always include locale and depth for media population
  params.append('locale', locale);
  params.append('depth', '1');

  // Search by name (case-insensitive contains)
  if (filters.search) {
    params.append('where[name][contains]', filters.search);
  }

  // Filter by property type
  if (filters.propertyType) {
    params.append('where[property_type][equals]', filters.propertyType);
  }

  if (filters.projectId) {
    params.append('where[project][equals]', filters.projectId);
  }

  // Space range filters
  if (filters.minSpace) {
    params.append('where[space_sqm][greater_than_equal]', String(filters.minSpace));
  }
  if (filters.maxSpace) {
    params.append('where[space_sqm][less_than_equal]', String(filters.maxSpace));
  }

  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-low':
        params.append('sort', 'price');
        break;
      case 'price-high':
        params.append('sort', '-price');
        break;
      case 'newest':
        params.append('sort', '-createdAt');
        break;
    }
  }

  return params.toString();
}

/**
 * Fetch properties from Payload CMS with filters
 */
export async function fetchProperties(
  filters: PropertyFilters = {},
  locale = 'en'
): Promise<Property[]> {
  const queryString = buildQueryParams(filters, locale);
  const response = await fetchApi<PayloadListResponse<Property>>(
    `/api/properties?${queryString}`
  );

  return response.docs || [];
}

/**
 * Fetch a single property by its ID
 */
export async function fetchPropertyById(
  id: string,
  locale = 'en'
): Promise<Property | null> {
  try {
    const response = await fetchApi<Property>(
      `/api/properties/${id}?locale=${locale}&depth=1`
    );
    return response;
  } catch (error) {
    console.error('Error fetching property by id:', error);
    return null;
  }
}

/**
 * Fetch a single property by its property code (unique identifier)
 */
export async function fetchPropertyByCode(
  propertyCode: string,
  locale = 'en'
): Promise<Property | null> {
  const params = new URLSearchParams();
  params.append('locale', locale);
  params.append('depth', '1');
  params.append('where[property_code][equals]', propertyCode);

  try {
    const response = await fetchApi<PayloadListResponse<Property>>(
      `/api/properties?${params.toString()}`
    );
    return response.docs?.[0] || null;
  } catch (error) {
    console.error('Error fetching property by code:', error);
    return null;
  }
}

/**
 * @deprecated Use fetchPropertyById or fetchPropertyByCode instead
 */
export async function fetchPropertyByDocumentId(
  documentId: string,
  locale?: string
): Promise<Property | null> {
  console.warn('fetchPropertyByDocumentId is deprecated, use fetchPropertyById');
  return fetchPropertyById(documentId, locale || 'en');
}