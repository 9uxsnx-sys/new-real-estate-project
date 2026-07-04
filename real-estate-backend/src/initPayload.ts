/**
 * Payload Initialization for Standalone Scripts
 * 
 * This file initializes Payload CMS for use in scripts (backup, restore, etc.)
 */

import { getPayload } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { buildConfig } from 'payload'
import path from 'path'
import { fileURLToPath } from 'url'
import { Media } from './collections/Media.ts'
import { Projects } from './collections/Projects.ts'
import { Properties } from './collections/Properties.ts'
import { Users } from './collections/Users.ts'
import { Contact } from './collections/Contact.ts'
import { Features } from './collections/Features.ts'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables manually
import * as fs from 'fs'
import * as dotenv from 'dotenv'

// Try to load .env file
const envPath = path.resolve(__dirname, '../../.env')
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath })
}

// Create Payload configuration
const payloadConfig = buildConfig({
  serverURL: process.env.SERVER_URL || 'http://localhost:3000',
  secret: process.env.PAYLOAD_SECRET || 'default-secret-change-in-production',

  admin: {
    meta: {
      titleSuffix: '- VistaHaven Admin',
    },
  },

  collections: [
    Users,
    Media,
    Features,
    Projects,
    Properties,
    Contact,
  ],

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
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },

  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
})

let payloadInstance: any = null

export async function initPayload(options?: { isMaintenanceMode?: boolean }) {
  if (!payloadInstance) {
    payloadInstance = await getPayload({
      config: payloadConfig,
      ...options,
    })
  }
  return payloadInstance
}

export { payloadConfig }
