import type { Property } from './property';
import type { Media } from './common';

/**
 * Project entity from Payload CMS
 * Note: All localized fields return strings based on the ?locale= parameter
 */
export interface Project {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  city: string;
  place: string;
  description?: any; // Rich text (Lexical format)
  first_image?: Media; // Populated when using depth=1
  second_image?: Media;
  gallery?: Media[]; // Populated gallery images
  google_map?: string;
  status: 'active' | 'coming_soon' | 'inactive';
  features?: ProjectFeature[];
  custom_sections?: CustomSection[];
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectFeature {
  id: string;
  name: string;
}

export interface CustomSection {
  id: string;
  title?: string;
  description?: any; // Rich text (Lexical format)
  gallery?: Array<{
    image: Media;
    caption?: string;
  }>;
  features?: ProjectFeature[];
}

// Deprecated: Strapi format (kept for reference during migration)
/** @deprecated Use Payload native format with docs array */
export interface StrapiProjectResponse {
  data: {
    id: number;
    documentId: string;
    attributes: Omit<Project, 'id'>;
  };
  meta: any;
}
