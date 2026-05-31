import type { CollectionConfig } from 'payload'

export const Properties: CollectionConfig = {
  slug: 'properties',
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  admin: {
    useAsTitle: 'property_code',
    defaultColumns: ['property_code', 'project', 'price', 'property_type', 'status'],
  },
  fields: [
    // Core fields
    {
      name: 'property_code',
      type: 'text',
      required: true,
      unique: true,
      label: 'Property Code',
      admin: {
        description: 'Unique identifier for URL (e.g., marina-bay-apt-101)',
      },
    },
    // CRITICAL: Required relation to Project
    {
      name: 'project',
      type: 'relationship',
      relationTo: 'projects',
      required: true,
      hasMany: false,
      label: 'Project',
      admin: {
        description: 'Select the project this property belongs to (required)',
      },
    },
    // Location fields
    {
      name: 'area',
      type: 'text',
      required: true,
      localized: true,
      label: 'Area/Location',
    },
    {
      name: 'city',
      type: 'text',
      required: true,
      localized: true,
      label: 'City',
    },
    // Property details
    {
      name: 'price',
      type: 'number',
      required: true,
      min: 0,
      label: 'Price (AED)',
    },
    {
      name: 'property_type',
      type: 'select',
      required: true,
      label: 'Property Type',
      options: [
        { label: 'Studio', value: 'studio' },
        { label: '1 Bedroom (F1)', value: 'f1' },
        { label: '2 Bedrooms (F2)', value: 'f2' },
        { label: '3 Bedrooms (F3)', value: 'f3' },
        { label: '4 Bedrooms (F4)', value: 'f4' },
        { label: '5+ Bedrooms (F5+)', value: 'f5+' },
        { label: 'Garage', value: 'garage' },
      ],
    },
    {
      name: 'space_sqm',
      type: 'number',
      required: true,
      min: 0,
      label: 'Space (sqm)',
    },
    {
      name: 'beds',
      type: 'number',
      required: true,
      min: 0,
      label: 'Bedrooms',
    },
    {
      name: 'baths',
      type: 'number',
      required: true,
      min: 0,
      label: 'Bathrooms',
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Description',
    },
    // Status and featured
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'published',
      label: 'Status',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Sold', value: 'sold' },
      ],
    },
    // Media
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Main Image (Card + Detail Hero)',
    },
    {
      name: 'gallery',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Gallery Images (Detail Page)',
    },
    // Features - inline array
    {
      name: 'features',
      type: 'array',
      label: 'Features/Amenities',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          localized: true,
          label: 'Feature Name',
        },
      ],
    },
  ],
}