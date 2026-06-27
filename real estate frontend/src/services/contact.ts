import { fetchApi } from './api';

export interface Contact {
  id: string;
  phone: string;
  whatsappURL: string;
  address?: string;
  email?: string;
  facebookURL?: string;
  instagramURL?: string;
  tiktokURL?: string;
}

/**
 * Fetch contact info from Payload CMS
 * Returns the first contact document (there's typically only one)
 */
export async function fetchContact(): Promise<Contact | null> {
  try {
    const response = await fetchApi<{ docs: Contact[] }>('/api/contact?limit=1&depth=0');
    return response.docs?.[0] || null;
  } catch (error) {
    console.error('Error fetching contact:', error);
    return null;
  }
}