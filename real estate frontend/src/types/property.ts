import type { Media } from './common';

/**
 * Property entity from Payload CMS
 * Note: All localized fields return strings based on the ?locale= parameter
 */
export interface Property {
  id: string;
<<<<<<< HEAD
  name: string;
=======
>>>>>>> 6bfa6aa (feat: VistaHaven real estate platform updates)
  property_code: string;
  project: string | ProjectRelation; // Populated with depth=1
  area: string;
  city: string;
  price: number;
  property_type: 'studio' | 'f1' | 'f2' | 'f3' | 'f4' | 'f5+' | 'garage';
  space_sqm: number;
  beds: number;
  baths: number;
  image?: Media; // Populated when using depth=1
  gallery?: Media[];
  description?: any; // Rich text (Lexical format)
  status: 'draft' | 'published' | 'sold';
  features?: PropertyFeature[];
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Populated project relation (when using depth=1)
 */
export interface ProjectRelation {
  id: string;
  name: string;
  slug: string;
  city: string;
}

export interface PropertyFeature {
  id: string;
  name: string;
}

// Deprecated: Strapi format (kept for reference during migration)
/** @deprecated Use Payload native format with docs array */
export interface StrapiResponse<T> {
  data: T | T[] | null;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

/** @deprecated Use Payload native format */
export interface StrapiPropertyResponse {
  data: {
    id: number;
    documentId: string;
    attributes: Property;
  };
  meta: any;
}
