/**
 * Cleanup Script - Finds and removes orphaned media files
 * 
 * Usage: npm run cleanup
 * 
 * This script:
 * 1. Scans all media files in public/media/
 * 2. Queries database via REST API to find which media files are actually used
 * 3. Deletes orphaned files (not linked to any project or property)
 * 
 * Uses REST API instead of Payload SDK to avoid environment loading issues
 */

import * as fs from 'fs'
import * as path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Media directory (relative to backend root)
const MEDIA_DIR = path.resolve(__dirname, '../../public/media')

// API Configuration - Use internal port 3000 for Docker container
const API_URL = 'http://localhost:3000'

interface MediaFile {
  filename: string
  id: string
  usedIn: string[]
}

interface CleanupResult {
  totalFiles: number
  usedFiles: MediaFile[]
  orphanedFiles: MediaFile[]
  totalOrphanedSize: number
}

async function fetchAPI(endpoint: string): Promise<any> {
  const response = await fetch(`${API_URL}${endpoint}`)
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`)
  }
  return response.json()
}

async function getUsedMediaFilenames(): Promise<Set<string>> {
  console.log('🔍 Scanning database for used media...\n')
  
  const usedFilenames = new Set<string>()
  
  // Collections to check for media usage
  const collections = ['projects', 'properties']
  
  for (const collection of collections) {
    try {
      let page = 1
      let totalPages = 1
      
      while (page <= totalPages) {
        const result = await fetchAPI(`/api/${collection}?locale=en&depth=3&limit=100&page=${page}`)
        
        if (result.docs) {
          for (const doc of result.docs) {
            // Helper function to extract filenames from media objects
            const extractFilename = (media: any) => {
              if (!media) return
              if (typeof media === 'string') return
              if (media.filename) {
                usedFilenames.add(media.filename)
                // Also add size variations
                const baseName = media.filename.replace(/\.[^.]+$/, '')
                const ext = media.filename.match(/\.[^.]+$/)?.[0]
                if (ext) {
                  usedFilenames.add(`${baseName}-400x300${ext}`)
                  usedFilenames.add(`${baseName}-768x576${ext}`)
                  usedFilenames.add(`${baseName}-1920x1080${ext}`)
                }
              }
            }
            
            // Check various image fields
            extractFilename(doc.first_image)
            extractFilename(doc.second_image)
            extractFilename(doc.image)
            
            // Check gallery
            if (doc.gallery && Array.isArray(doc.gallery)) {
              doc.gallery.forEach((media: any) => extractFilename(media))
            }
            
            // Check custom_sections
            if (doc.custom_sections && Array.isArray(doc.custom_sections)) {
              for (const section of doc.custom_sections) {
                if (section.gallery && Array.isArray(section.gallery)) {
                  section.gallery.forEach((item: any) => {
                    if (item && item.image) extractFilename(item.image)
                  })
                }
              }
            }
          }
        }
        
        totalPages = result.totalPages || 1
        page++
      }
      
      console.log(`   ✅ ${collection}: checked (page ${page - 1}/${totalPages})`)
    } catch (error) {
      console.error(`   ❌ Error checking ${collection}:`, error)
    }
  }
  
  return usedFilenames
}

function scanMediaFolder(usedFilenames: Set<string>): { orphaned: MediaFile[], total: number } {
  console.log('🗂️  Scanning media folder...\n')
  
  const orphaned: MediaFile[] = []
  let total = 0
  
  // Check if media directory exists
  if (!fs.existsSync(MEDIA_DIR)) {
    console.log('⚠️  Media directory does not exist')
    return { orphaned, total }
  }
  
  // Get all files in media directory
  const files = fs.readdirSync(MEDIA_DIR)
  
  console.log(`📁 Total files in media folder: ${files.length}\n`)
  
  for (const file of files) {
    const filePath = path.join(MEDIA_DIR, file)
    const stats = fs.statSync(filePath)
    
    // Skip directories
    if (stats.isDirectory()) {
      continue
    }
    
    total++
    
    // Check if this file is used
    if (!usedFilenames.has(file)) {
      // Extract base filename for size variations check
      const baseMatch = file.match(/^(.+?)-\d+x\d+(\.[^.]+)$/i)
      if (baseMatch) {
        const baseFile = `${baseMatch[1]}${baseMatch[2]}`
        if (usedFilenames.has(baseFile)) {
          // This is a size variation of an used file, skip
          continue
        }
      }
      
      orphaned.push({
        filename: file,
        id: 'unknown',
        usedIn: []
      })
      console.log(`   🗑️  Orphaned: ${file} (${formatBytes(stats.size)})`)
    }
  }
  
  return { orphaned, total }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function deleteOrphanedFiles(orphanedFiles: MediaFile[]): { deleted: number; failed: string[] } {
  console.log('\n🗑️  Deleting orphaned files...\n')
  
  let deleted = 0
  const failed: string[] = []
  
  for (const file of orphanedFiles) {
    const filePath = path.join(MEDIA_DIR, file.filename)
    
    try {
      fs.unlinkSync(filePath)
      deleted++
      console.log(`   ✅ Deleted: ${file.filename}`)
    } catch (error) {
      failed.push(file.filename)
      console.log(`   ❌ Failed to delete: ${file.filename}`)
    }
  }
  
  return { deleted, failed }
}

async function cleanup(options: { preview?: boolean } = {}) {
  console.log('='.repeat(60))
  console.log('🧹 MEDIA CLEANUP SCRIPT')
  console.log('='.repeat(60))
  console.log(`📅 Date: ${new Date().toISOString()}`)
  console.log(`📁 Media folder: ${MEDIA_DIR}`)
  console.log(`🔗 API URL: ${API_URL}\n`)
  
  try {
    // Step 1: Get used media from database
    const usedFilenames = await getUsedMediaFilenames()
    console.log(`\n   📊 Used media filenames: ${usedFilenames.size}`)
    
    // Step 2: Find orphaned files
    const { orphaned, total } = scanMediaFolder(usedFilenames)
    
    // Calculate total orphaned size
    let orphanedSize = 0
    for (const file of orphaned) {
      const filePath = path.join(MEDIA_DIR, file.filename)
      if (fs.existsSync(filePath)) {
        const stats = fs.statSync(filePath)
        orphanedSize += stats.size
      }
    }
    
    console.log('='.repeat(60))
    console.log('📊 SUMMARY')
    console.log('='.repeat(60))
    console.log(`📁 Total files: ${total}`)
    console.log(`✅ Used files: ${total - orphaned.length}`)
    console.log(`🗑️  Orphaned files: ${orphaned.length}`)
    console.log(`💾 Space to free: ${formatBytes(orphanedSize)}\n`)
    
    if (orphaned.length === 0) {
      console.log('✅ No orphaned files found! Media folder is clean.\n')
      return
    }
    
    // Step 3: Auto-delete (unless --preview flag is passed)
    if (options.preview) {
      console.log('📝 Preview mode - no files deleted')
      console.log('   To auto-delete, run: npm run cleanup')
      console.log('   Or scheduled task will auto-delete every night at 00:00\n')
    } else {
      console.log('='.repeat(60))
      console.log('🗑️  AUTO-DELETING ORPHANED FILES...\n')
      const result = deleteOrphanedFiles(orphaned)
      
      console.log('\n' + '='.repeat(60))
      console.log('✅ CLEANUP COMPLETE')
      console.log('='.repeat(60))
      console.log(`🗑️  Deleted: ${result.deleted} files`)
      if (result.failed.length > 0) {
        console.log(`❌ Failed: ${result.failed.length} files`)
        console.log('   Files:', result.failed.join(', '))
      }
      console.log(`💾 Space freed: ${formatBytes(orphanedSize)}\n`)
    }
  } catch (error) {
    console.error('❌ Cleanup failed:', error)
    process.exit(1)
  }
}

// Parse command line arguments
const args = process.argv.slice(2)
const isPreview = args.includes('--preview')

cleanup({ preview: isPreview })
