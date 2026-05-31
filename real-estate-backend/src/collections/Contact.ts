import type { CollectionConfig } from 'payload'

export const Contact: CollectionConfig = {
  slug: 'contact',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'whatsappURL'],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Contact Name',
      admin: {
        description: 'Label for this contact (e.g., Main Office, Sales WhatsApp)',
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Phone Number',
      admin: {
        description: 'Phone number with country code (e.g., +971 4 123 4567)',
      },
    },
    {
      name: 'whatsappURL',
      type: 'text',
      required: true,
      label: 'WhatsApp Link',
      admin: {
        description: 'WhatsApp link (e.g., https://wa.me/971501234567)',
      },
    },
  ],
}