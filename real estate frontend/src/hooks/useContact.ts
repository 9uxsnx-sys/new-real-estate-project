import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchApi } from '../services/api';

interface Contact {
  id: string | number;
  name: string;
  phone: string;
  whatsappURL: string;
}

interface UseContactReturn {
  contact: Contact | null;
  loading: boolean;
  error: string | null;
}

export const useContact = (locale = 'en'): UseContactReturn => {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const lang = locale || i18n.language || 'en';
        const response = await fetchApi<{ docs: Contact[] }>(`/contact?locale=${lang}&limit=1`);
        
        if (response.docs && response.docs.length > 0) {
          setContact(response.docs[0]);
        } else {
          setContact(null);
        }
      } catch (err) {
        console.error('Error fetching contact:', err);
        setError('Failed to load contact information');
        setContact(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContact();
  }, [locale, i18n.language]);

  return { contact, loading, error };
};