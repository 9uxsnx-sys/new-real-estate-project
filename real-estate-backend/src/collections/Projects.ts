import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  auth: false, // Not an auth collection, but uses Users for auth
  access: {
    read: () => true,
    create: ({ req }) => {
      console.log('[Projects Access] create - user:', req.user ? 'exists' : 'null');
      return Boolean(req.user);
    },
    update: ({ req }) => {
      console.log('[Projects Access] update - user:', req.user ? 'exists' : 'null');
      return Boolean(req.user);
    },
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeDelete: [
      async ({ req, id }) => {
        console.log('[Projects Hook] beforeDelete - ID:', id);
        
        // Delete all properties that reference this project
        const { payload } = req;
        try {
          // Find all properties linked to this project
          const propertiesResult = await payload.find({
            collection: 'properties',
            where: {
              project: {
                equals: id,
              },
            },
            depth: 0,
          });

          console.log(`[Projects Hook] Found ${propertiesResult.totalDocs} properties to delete`);

          // Delete each property
          for (const property of propertiesResult.docs) {
            await payload.delete({
              collection: 'properties',
              id: property.id,
              req,
            });
            console.log(`[Projects Hook] Deleted property ID: ${property.id}`);
          }

          console.log('[Projects Hook] All related properties deleted successfully');
        } catch (error) {
          console.error('[Projects Hook] Error deleting related properties:', error);
          throw error;
        }
      },
    ],
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'city', 'status', 'updatedAt'],
  },
  fields: [
    // Core fields
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      label: 'Project Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        description: 'URL-friendly identifier (e.g., marina-bay)',
      },
    },
    {
      name: 'short_description',
      type: 'textarea',
      required: true,
      localized: true,
      label: 'Short Description',
      maxLength: 200,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      label: 'Full Description',
    },
    // Location fields
    {
      name: 'city',
      type: 'text',
      required: true,
      localized: true,
      label: 'City',
    },
    {
      name: 'place',
      type: 'text',
      required: true,
      localized: true,
      label: 'Place/Area',
    },
    {
      name: 'google_map',
      type: 'text',
      label: 'Google Maps URL',
      admin: {
        description: 'Paste Google Maps link or embed URL',
      },
    },
    // Status
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Coming Soon', value: 'coming_soon' },
        { label: 'Inactive', value: 'inactive' },
      ],
    },
    // Media fields
    {
      name: 'first_image',
      type: 'upload',
      relationTo: 'media',
      label: 'First Image (Large - 60% in card)',
    },
    {
      name: 'second_image',
      type: 'upload',
      relationTo: 'media',
      label: 'Second Image (Cover - 40% in card)',
    },
    {
      name: 'gallery',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      label: 'Gallery Images (Detail Page)',
    },
    // Features array
    {
      name: 'features',
      type: 'array',
      label: 'Project Features/Amenities',
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
    // Custom sections - complex nested
    {
      name: 'custom_sections',
      type: 'array',
      label: 'Custom Content Sections',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: 'Section Title',
        },
        {
          name: 'description',
          type: 'textarea',
          localized: true,
          label: 'Section Description',
        },
        // Gallery within section
        {
          name: 'gallery',
          type: 'array',
          label: 'Section Gallery',
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'caption',
              type: 'text',
              localized: true,
              label: 'Caption',
            },
          ],
        },
        // Features within section
        {
          name: 'features',
          type: 'array',
          label: 'Section Features',
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
    },
  ],
}
