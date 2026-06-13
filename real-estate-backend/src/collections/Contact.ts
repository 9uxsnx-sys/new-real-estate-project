import type { CollectionConfig } from 'payload'

export const Contact: CollectionConfig = {
  slug: 'contact',
  admin: {
    useAsTitle: 'phone',
    defaultColumns: ['phone', 'whatsappURL'],
  },
  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Phone Number',
      admin: {
        description: 'Enter mobile number starting with 0 (e.g., 0551 12 34 56)',
      },
    },
    {
      name: 'whatsappURL',
      type: 'text',
      required: true,
      label: 'WhatsApp Link',
      admin: {
        description: 'WhatsApp link (e.g., https://wa.me/213551234567)',
      },
    },
    {
      name: 'address',
      type: 'text',
      label: 'Address',
      admin: {
        description: 'Office or company address (e.g., 123 Business Center, Algiers, Algeria)',
      },
    },
    {
      name: 'email',
      type: 'text',
      label: 'Email',
      admin: {
        description: 'Contact email address (e.g., info@theone.dz)',
      },
    },
    {
      name: 'facebookURL',
      type: 'text',
      label: 'Facebook URL',
      admin: {
        description: 'Facebook page link (e.g., https://facebook.com/yourpage)',
      },
    },
    {
      name: 'instagramURL',
      type: 'text',
      label: 'Instagram URL',
      admin: {
        description: 'Instagram profile link (e.g., https://instagram.com/yourprofile)',
      },
    },
    {
      name: 'tiktokURL',
      type: 'text',
      label: 'TikTok URL',
      admin: {
        description: 'TikTok profile link (e.g., https://tiktok.com/@yourprofile)',
      },
    },
  ],
}