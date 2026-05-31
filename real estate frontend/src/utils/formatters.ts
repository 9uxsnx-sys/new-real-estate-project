import type { Property } from '../types';

export const formatPrice = (price: number): string => {
  return price.toLocaleString('en-US') + ' DA';
};

export const getPropertyTypeLabel = (type: Property['property_type']): string => {
  const labels: Record<string, string> = {
    studio: 'Studio',
    f1: 'F1',
    f2: 'F2',
    f3: 'F3',
    f4: 'F4',
    'f5+': 'F5+',
    garage: 'Garage',
  };
  return labels[type] || type;
};