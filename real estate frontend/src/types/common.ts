// Common types for Payload CMS API responses

/**
 * Payload CMS list response format
 * Used for all collection list endpoints (/api/projects, /api/properties, etc.)
 */
export interface PayloadListResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}

/**
 * Payload CMS media object (populated with depth=1)
 * Auto-generated sizes: thumbnail (400x300), card (768x576), full (1920x1080)
 */
export interface Media {
  id: string;
  url: string;
  thumbnailURL?: string;
  cardURL?: string;
  fullURL?: string;
  alt?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Query operators for Payload CMS where clauses
 */
export type PayloadWhereOperator =
  | 'equals'
  | 'not_equals'
  | 'greater_than'
  | 'greater_than_equal'
  | 'less_than'
  | 'less_than_equal'
  | 'contains'
  | 'in'
  | 'not_in'
  | 'exists';

/**
 * Build a Payload where query parameter
 * Example: buildWhereParam('name', 'contains', 'Marina') → 'where[name][contains]=Marina'
 */
export function buildWhereParam(
  field: string,
  operator: PayloadWhereOperator,
  value: string | number
): string {
  return `where[${field}][${operator}]=${encodeURIComponent(String(value))}`;
}
