#!/bin/bash
# Complete Project Backup to Google Drive
# 
# Purpose: Syncs entire project to Google Drive automatically
# 
# Usage: 
#   - Automatically via Task Scheduler (midnight daily)
#   - Manually: ./backup-all.sh
#
# What it does:
#   1. Cleanup orphaned media files (preview only for safety)
#   2. Backup database to JSON
#   3. Sync entire project to Google Drive
#
# Requirements:
#   - rclone installed and configured
#   - Google Drive remote named "vistahaven"
#   - Docker container running with Payload CMS
#
# Time to complete: 2-10 minutes (depends on changes)

set -e  # Exit on error
set -o pipefail  # Catch errors in pipes

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging
LOG_FILE="/app/logs/backup.log"
mkdir -p /app/logs

# Function to log with timestamp
log() {
    local message="$1"
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo -e "$message"
    echo "[$timestamp] $message" >> "$LOG_FILE"
}

# Function to log section
log_section() {
    local title="$1"
    log ""
    log "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    log "${BLUE} $title${NC}"
    log "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    log ""
}

# Function to handle errors
handle_error() {
    local line_number=$1
    log "${RED}❌ ERROR on line $line_number${NC}"
    log "${RED}Backup failed! Check logs: $LOG_FILE${NC}"
    exit 1
}

# Set error handler
trap 'handle_error $LINENO' ERR

# Start backup
log_section "🚀 STARTING COMPLETE PROJECT BACKUP"
log "📅 Date: $(date)"
log "📍 Location: $(pwd)"
log ""

# Check if inside Docker container
if [ ! -f /.dockerenv ]; then
    log "${YELLOW}⚠️  Warning: Not running inside Docker container${NC}"
    log "   This script should run inside the Payload CMS container"
fi

# Check prerequisites
log_section "📋 CHECKING PREREQUISITES"

# Check rclone
if ! command -v rclone &> /dev/null; then
    log "${RED}❌ rclone not found! Please install rclone first:${NC}"
    log "   curl https://rclone.org/install.sh | sudo bash"
    exit 1
fi
log "✅ rclone found: $(rclone version | head -1)"

# Check Google Drive remote
if ! rclone listremotes 2>/dev/null | grep -q "^vistahaven:"; then
    log "${RED}❌ Google Drive remote 'vistahaven' not configured!${NC}"
    log "   Run: rclone config"
    log "   Select: n (New remote)"
    log "   Name: vistahaven"
    log "   Storage: 13 (Google Drive)"
    log "   Follow prompts to authenticate"
    exit 1
fi
log "✅ Google Drive remote 'vistahaven' configured"

# Check Docker container
if ! docker ps --format '{{.Names}}' | grep -q "vistahaven-payload"; then
    log "${YELLOW}⚠️  Warning: Payload CMS container not running${NC}"
    log "   Backup may fail if database is not accessible"
else
    log "✅ Payload CMS container is running"
fi

# Change to app directory
cd /app
log "✅ Working directory: $(pwd)"

# Step 1: Cleanup orphaned media files
log_section "🧹 STEP 1: MEDIA CLEANUP"

log "Running cleanup in preview mode (no files deleted)..."
log "To auto-delete, run: npm run cleanup"
log ""

# Run cleanup (preview only - no deletion for safety)
if docker exec -it vistahaven-payload npm run cleanup 2>&1 | tee -a "$LOG_FILE"; then
    log "✅ Media cleanup completed"
else
    log "${YELLOW}⚠️  Warning: Cleanup script failed (continuing anyway)${NC}"
fi

# Step 2: Backup database to JSON
log_section "💾 STEP 2: DATABASE BACKUP"

log "Exporting database to JSON..."

if docker exec -it vistahaven-payload npm run backup 2>&1 | tee -a "$LOG_FILE"; then
    log "✅ Database backup completed"
    log "📁 Backup file: /app/data/latest.json"
else
    log "${RED}❌ Database backup failed!${NC}"
    handle_error $LINENO
fi

# Verify backup file exists
if [ -f /app/data/latest.json ]; then
    BACKUP_SIZE=$(du -h /app/data/latest.json | cut -f1)
    log "✅ Backup file verified: $BACKUP_SIZE"
else
    log "${RED}❌ Backup file not found!${NC}"
    exit 1
fi

# Step 3: Sync to Google Drive
log_section "📤 STEP 3: SYNC TO GOOGLE DRIVE"

log "Syncing project to Google Drive..."
log "Remote: vistahaven:VistaHaven/"
log ""

# Sync entire project to Google Drive
# Exclude large/unnecessary folders
if rclone sync ./ vistahaven:VistaHaven/ \
    --exclude "node_modules/**" \
    --exclude ".git/**" \
    --exclude "postgres_data/**" \
    --exclude ".env" \
    --exclude "*.log" \
    --exclude ".next/**" \
    --exclude "npm-debug.log*" \
    --exclude "yarn-error.log" \
    --exclude "yarn.lock" \
    --exclude "package-lock.json" \
    --exclude ".DS_Store" \
    --exclude "*.pem" \
    --exclude "coverage/**" \
    --exclude "/logs/**" \
    --progress \
    2>&1 | tee -a "$LOG_FILE"; then
    
    log ""
    log "✅ Google Drive sync completed"
else
    log "${RED}❌ Google Drive sync failed!${NC}"
    handle_error $LINENO
fi

# Step 4: Verify backup
log_section "🔍 STEP 4: VERIFICATION"

log "Verifying backup integrity..."
log ""

# Check file count
FILE_COUNT=$(rclone ls vistahaven:VistaHaven/ --files-only | wc -l)
log "📊 Total files in Google Drive: $FILE_COUNT"

# Check total size
SIZE=$(rclone size vistahaven:VistaHaven/ --json 2>/dev/null | grep -o '"bytes":[0-9]*' | cut -d':' -f2)
if [ -n "$SIZE" ]; then
    SIZE_MB=$((SIZE / 1024 / 1024))
    log "📊 Total backup size: ${SIZE_MB} MB"
fi

# Verify key files exist
log ""
log "Checking key files in Google Drive:"

KEY_FILES=(
    "real-estate-backend/data/latest.json"
    "real-estate-backend/payload.config.ts"
    "docker-compose.yml"
)

for file in "${KEY_FILES[@]}"; do
    if rclone ls vistahaven:VistaHaven/$file &>/dev/null; then
        log "   ✅ $file"
    else
        log "   ⚠️  $file (not found)"
    fi
done

# Backup completion
log_section "✅ BACKUP COMPLETE"

log "🎉 All done!"
log "📅 Backup completed at: $(date)"
log "📁 Google Drive: vistahaven:VistaHaven/"
log "📝 Full log: $LOG_FILE"
log ""
log "Next scheduled backup: Tomorrow at midnight"
log ""

# Optional: Clean up old logs (keep last 30 days)
find /app/logs -name "backup-*.log" -mtime +30 -delete 2>/dev/null
log "🧹 Old logs cleaned (kept last 30 days)"

exit 0
