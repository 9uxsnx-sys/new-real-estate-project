/**
 * Restore Script - Imports data from backup JSON files
 * 
 * Usage: npm run restore
 * 
 * This script imports:
 * - All collections (users, media, features, projects, properties, contact)
 * 
 * NOTE: This will add data to existing data. 
 * For a clean restore, drop and recreate the database first.
 */

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'
import { initPayload } from '../initPayload'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Backup directory (relative to backend root)
const BACKUP_DIR = path.resolve(__dirname, '../../data')

const COLLECTION_ORDER = [
  'users',
  'media', 
  'features', 
  'projects', 
  'properties', 
  'contact'
]

interface BackupData {
  timestamp: string
  version: string
  payloadVersion: string
  collections: Record<string, any[]>
  stats: {
    totalItems: number
    byCollection: Record<string, number>
  }
}

async function restoreCollection(
  payload: any, 
  collection: string, 
  items: any[],
  options: { skipExisting?: boolean } = {}
) {
  console.log(`📥 Restoring ${collection} (${items.length} items)...`)
  
  let restored = 0
  let skipped = 0
  let errors = 0
  
  for (const item of items) {
    try {
      // Extract only the data fields, not metadata
      const { id, createdAt, updatedAt, ...data } = item
      
      // Skip if empty data
      if (Object.keys(data).length === 0) {
        skipped++
        continue
      }
      
      // Try to create the item
      await payload.create({
        collection,
        data,
        locale: 'en',
      })
      
      restored++
    } catch (error: any) {
      // Check if it's a duplicate key error
      if (error?.code === '23505' || error?.message?.includes('duplicate')) {
        if (options.skipExisting) {
          skipped++
        } else {
          // Try to update instead
          try {
            await payload.update({
              collection,
              id,
              data,
              locale: 'en',
            })
            restored++
          } catch {
            skipped++
          }
        }
      } else {
        errors++
        if (errors <= 3) {
          console.log(`   ⚠️  Error importing item from ${collection}:`, error.message || error)
        }
      }
    }
  }
  
  console.log(`   ✅ Restored: ${restored}, Skipped: ${skipped}, Errors: ${errors}`)
  return { restored, skipped, errors }
}

async function restore(options: { skipExisting?: boolean } = {}) {
  console.log('🔄 Starting data restore...\n')
  console.log(`📁 Backup directory: ${BACKUP_DIR}\n`)
  
  // Check if backup file exists
  const latestFile = path.join(BACKUP_DIR, 'latest.json')
  
  if (!fs.existsSync(latestFile)) {
    console.error('❌ No backup found!')
    console.error(`   Expected file: ${latestFile}`)
    console.error('')
    console.error('📋 To create a backup:')
    console.error('   1. On your current machine: npm run backup')
    console.error('   2. Commit the data/ folder to git')
    console.error('   3. Push to repo')
    console.error('')
    console.error('   Or restore from a specific backup file:')
    console.error(`   Copy backup file to: ${BACKUP_DIR}/latest.json`)
    console.error('')
    process.exit(1)
  }
  
  // Load backup data
  console.log('📖 Reading backup file...')
  const backupData: BackupData = JSON.parse(fs.readFileSync(latestFile, 'utf-8'))
  
  console.log(`✅ Backup loaded!`)
  console.log(`   Date: ${backupData.timestamp}`)
  console.log(`   Version: ${backupData.version}`)
  console.log(`   Total items: ${backupData.stats.totalItems}\n`)
  
  // Initialize Payload
  console.log('🔄 Connecting to database...')
  const payload = await initPayload({ isMaintenanceMode: true })
  console.log('✅ Connected to database\n')
  
  // Restore each collection in order
  const results: Record<string, { restored: number; skipped: number; errors: number }> = {}
  
  for (const collection of COLLECTION_ORDER) {
    const items = backupData.collections?.[collection] || []
    
    if (items.length === 0) {
      console.log(`⏭️  ${collection}: No items to restore`)
      continue
    }
    
    try {
      results[collection] = await restoreCollection(payload, collection, items, options)
    } catch (error) {
      console.error(`❌ Error restoring ${collection}:`, error)
      results[collection] = { restored: 0, skipped: 0, errors: items.length }
    }
  }
  
  // Summary
  const totalRestored = Object.values(results).reduce((sum, r) => sum + r.restored, 0)
  const totalSkipped = Object.values(results).reduce((sum, r) => sum + r.skipped, 0)
  const totalErrors = Object.values(results).reduce((sum, r) => sum + r.errors, 0)
  
  console.log('')
  console.log('=' .repeat(50))
  console.log('✨ Restore Complete!\n')
  console.log('📊 Summary:')
  console.log(`   Total restored: ${totalRestored}`)
  console.log(`   Total skipped: ${totalSkipped}`)
  console.log(`   Total errors: ${totalErrors}`)
  console.log('')
  console.log('📝 Notes:')
  console.log('   - Media files are automatically served from ./public/media/')
  console.log('   - If you get errors, it might be due to existing data')
  console.log('   - For clean restore, drop database tables first')
  console.log('')
}

restore({ skipExisting: true }).catch(error => {
  console.error('❌ Restore failed:', error)
  process.exit(1)
})
