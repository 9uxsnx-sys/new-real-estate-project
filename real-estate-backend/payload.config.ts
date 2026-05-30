import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import path from 'path'
import { Media } from './src/collections/Media.ts'
import { Projects } from './src/collections/Projects.ts'
import { Properties } from './src/collections/Properties.ts'
import { Users } from './src/collections/Users.ts'
import { Features } from './src/collections/Features.ts'

export default buildConfig({
  serverURL: process.env.SERVER_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-in-production',

  admin: {
    meta: {
      titleSuffix: '- VistaHaven Admin',
    },
  },

  editor: lexicalEditor({}),

  collections: [
    Users, // Must be first for auth to work properly
    Media,
    Features,
    Projects,
    Properties,
  ],

  upload: {
    limits: {
      fileSize: 5000000, // 5MB
    },
  },

  localization: {
    locales: ['en', 'fr', 'ar'],
    defaultLocale: 'en',
    fallback: true,
  },

  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),

  typescript: {
    outputFile: path.resolve(__dirname, 'src/payload-types.ts'),
  },

  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'src/generated-schema.graphql'),
  },

  // CORS for frontend access
  cors: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:3001',
  ].filter(Boolean),

  sharp,
})
