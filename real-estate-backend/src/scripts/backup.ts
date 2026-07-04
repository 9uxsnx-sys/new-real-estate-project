/**
 * Backup Script - Exports all database data to JSON files
 * 
 * Usage: npm run backup
 * 
 * This script exports:
 * - All collections (users, media, features, projects, properties, contact)
 * - Media records from database
 * 
 * Uses REST API instead of Payload SDK to avoid environment loading issues
 * Images are NOT exported (they're stored in public/media/ and already in git)
 */

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Backup directory (relative to backend root)
const BACKUP_DIR = path.resolve(__dirname, '../../data')

// API Configuration - Use internal port 3000 for Docker container
const API_URL = 'http://localhost:3000'

const COLLECTIONS = [
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

async function fetchAPI(endpoint: string): Promise<any> {
  const response = await fetch(`${API_URL}${endpoint}`)
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

async function backupCollection(collection: string): Promise<any[]> {
  console.log(`📦 Backing up ${collection}...`)
  
  const results: any[] = []
  let page = 1
  let totalPages = 1
  
  while (page <= totalPages) {
    try {
      const result = await fetchAPI(
        `/api/${collection}?locale=en&depth=2&limit=100&page=${page}`
      )
      
      if (result.docs) {
        results.push(...result.docs)
      }
      
      totalPages = result.totalPages || 1
      page++
      
      // Small delay to avoid overwhelming the database
      if (page <= totalPages) {
        await new Promise(resolve => setTimeout(resolve, 50))
      }
    } catch (error) {
      console.error(`   ❌ Error fetching ${collection} page ${page}:`, error)
      break
    }
  }
  
  return results
}

async function backup() {
  console.log('🚀 Starting data backup...\n')
  console.log(`📁 Backup directory: ${BACKUP_DIR}\n`)
  console.log(`🔗 API URL: ${API_URL}\n`)
  
  // Create backup directory if it doesn't exist
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true })
    console.log('✅ Created backup directory\n')
  }
  
  const backup: Record<string, any[]> = {}
  
  // Backup each collection
  for (const collection of COLLECTIONS) {
    try {
      backup[collection] = await backupCollection(collection)
      console.log(`✅ ${collection}: ${backup[collection].length} items backed up\n`)
    } catch (error) {
      console.error(`❌ Error backing up ${collection}:`, error)
      backup[collection] = []
    }
  }
  
  // Create backup metadata
  const timestamp = new Date().toISOString()
  const backupData: BackupData = {
    timestamp,
    version: '1.0',
    payloadVersion: '3.84.1',
    collections: backup,
    stats: {
      totalItems: Object.values(backup).reduce((sum, items) => sum + items.length, 0),
      byCollection: Object.fromEntries(
        Object.entries(backup).map(([key, items]) => [key, items.length])
      )
    }
  }
  
  // Save latest backup
  const latestFile = path.join(BACKUP_DIR, 'latest.json')
  fs.writeFileSync(latestFile, JSON.stringify(backupData, null, 2))
  
  // Save timestamped backup
  const dateStr = new Date().toISOString().split('T')[0]
  const timestampedFile = path.join(BACKUP_DIR, `backup-${dateStr}.json`)
  fs.writeFileSync(timestampedFile, JSON.stringify(backupData, null, 2))
  
  console.log('='.repeat(50))
  console.log('✨ Backup Complete!\n')
  console.log(`📁 Files saved:`)
  console.log(`   - ${latestFile} (current backup)`)
  console.log(`   - ${timestampedFile} (dated backup)\n`)
  console.log(`📊 Statistics:`)
  console.log(`   Total items: ${backupData.stats.totalItems}`)
  for (const [collection, count] of Object.entries(backupData.stats.byCollection)) {
    console.log(`   - ${collection}: ${count}`)
  }
  console.log('')
  console.log('📋 Next steps:')
  console.log('1. Review the backup: data/latest.json')
  console.log('2. Add to git: git add data/ && git commit -m "chore: backup data"')
  console.log('3. Push to repo: git push')
  console.log('')
}

backup().catch(error => {
  console.error('❌ Backup failed:', error)
  process.exit(1)
})
