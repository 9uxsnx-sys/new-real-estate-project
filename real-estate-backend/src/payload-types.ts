/* Auto-generated Payload types - Manual creation due to tooling issues */

export interface PayloadListResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null | number;
  nextPage: null | number;
}

export interface Media {
  id: string;
  alt?: string;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  url: string;
  thumbnailURL?: string;
  cardURL?: string;
  fullURL?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  description?: any;
  city: string;
  place: string;
  google_map?: string;
  status: 'active' | 'coming_soon' | 'inactive';
  first_image?: Media;
  second_image?: Media;
  gallery?: Media[];
  features?: Array<{ id: string; name: string }>;
  custom_sections?: Array<{
    id: string;
    title?: string;
    description?: any;
    gallery?: Array<{ image: Media; caption?: string }>;
    features?: Array<{ id: string; name: string }>;
  }>;
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  id: string;
  name: string;
  property_code: string;
  project?: Project;
  area: string;
  city: string;
  price: number;
  property_type: 'studio' | 'f1' | 'f2' | 'f3' | 'f4' | 'f5+' | 'garage';
  space_sqm: number;
  beds: number;
  baths: number;
  description?: any;
  status: 'draft' | 'published' | 'sold';
  featured: boolean;
  image?: Media;
  gallery?: Media[];
  features?: Array<{ id: string; name: string }>;
  createdAt: string;
  updatedAt: string;
}

// Local API types
export interface PaginatedDocs<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: null | number;
  nextPage: null | number;
}

export interface Where {
  [key: string]: any;
}

export interface FindArgs {
  collection: string;
  where?: Where;
  limit?: number;
  page?: number;
  sort?: string;
  depth?: number;
  locale?: string;
  fallbackLocale?: string;
}

export interface FindByIDArgs {
  collection: string;
  id: string;
  depth?: number;
  locale?: string;
  fallbackLocale?: string;
}

export interface CreateArgs<T = any> {
  collection: string;
  data: T;
  depth?: number;
  locale?: string;
  fallbackLocale?: string;
}

export interface UpdateArgs<T = any> {
  collection: string;
  id: string;
  data: T;
  depth?: number;
  locale?: string;
  fallbackLocale?: string;
}