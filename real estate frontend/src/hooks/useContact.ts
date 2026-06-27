import { useState, useEffect } from 'react';
import { fetchContact, Contact } from '@/services/contact';

interface UseContactResult {
  contact: Contact | null;
  loading: boolean;
  error: boolean;
}

export const useContact = (): UseContactResult => {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadContact = async () => {
      try {
        setLoading(true);
        const data = await fetchContact();
        setContact(data);
        setError(false);
      } catch (err) {
        console.error('Error fetching contact:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadContact();
  }, []);

  return { contact, loading, error };
};