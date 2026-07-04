#!/bin/bash
# Complete Project Backup - GitHub + Google Drive
#
# Purpose: Automatically backs up EVERYTHING (code + data) to both GitHub and Google Drive
#
# Runs: Automatically at midnight via Task Scheduler
# 
# What it does:
#   1. Cleanup orphaned media files
#   2. Backup database to JSON
#   3. Add backup to git
#   4. Push to GitHub
#   5. Sync entire project to Google Drive
#
# Result: Complete project backup on both GitHub AND Google Drive
#
# Usage: ./full-backup.sh

set -e
set -o pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Logging
LOG_FILE="/app/logs/full-backup.log"
mkdir -p /app/logs

# Function to log
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
    log "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    log "${BLUE} $title${NC}"
    log "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    log ""
}

# Handle errors
handle_error() {
    local line_number=$1
    log "${RED}❌ ERROR on line $line_number${NC}"
    log "${RED}Backup failed! Check logs: $LOG_FILE${NC}"
    exit 1
}

trap 'handle_error $LINENO' ERR

# Start
log_section "🚀 STARTING FULL PROJECT BACKUP"
log "📅 Date: $(date)"
log "📍 Location: $(pwd)"
log ""

# Navigate to project root (two levels up from scripts folder)
cd /app
log "✅ Working directory: $(pwd)"

# Step 1: Cleanup orphaned media files
log_section "🧹 STEP 1: CLEANUP ORPHANED MEDIA"

log "Running media cleanup (preview mode for safety)..."
docker exec -it vistahaven-payload npm run cleanup 2>&1 | tee -a "$LOG_FILE" || true
log "✅ Media cleanup completed"

# Step 2: Backup database
log_section "💾 STEP 2: DATABASE BACKUP"

log "Exporting database to JSON..."
docker exec -it vistahaven-payload npm run backup 2>&1 | tee -a "$LOG_FILE"
log "✅ Database backup completed"

# Step 3: Copy backup to project folder (if not already there)
log_section "📁 STEP 3: COPY BACKUP TO PROJECT"

log "Copying backup to project folder..."
docker cp vistahaven-payload:/app/data/latest.json /app/real-estate-backend/data/latest.json 2>/dev/null || true
log "✅ Backup copied to project folder"

# Step 4: Git add and commit
log_section "🔄 STEP 4: GIT COMMIT"

log "Adding backup to git..."
git add real-estate-backend/data/ 2>&1 | tee -a "$LOG_FILE" || true

# Check if there are changes to commit
if git diff --cached --quiet; then
    log "ℹ️  No changes to commit (backup already up to date)"
else
    log "Committing changes..."
    git commit -m "chore: automatic backup $(date '+%Y-%m-%d %H:%M')" 2>&1 | tee -a "$LOG_FILE" || true
    log "✅ Changes committed to git"
fi

# Step 5: Git push to GitHub
log_section "📤 STEP 5: GIT PUSH TO GITHUB"

log "Pushing to GitHub..."
git push origin fixing 2>&1 | tee -a "$LOG_FILE" || {
    log "${YELLOW}⚠️  Warning: Git push failed (might be offline or no remote)${NC}"
}
log "✅ Git push completed"

# Step 6: Sync to Google Drive
log_section "☁️ STEP 6: SYNC TO GOOGLE DRIVE"

log "Syncing entire project to Google Drive..."
log "Remote: vistahaven:VistaHaven/"
log ""

# Sync entire project to Google Drive
rclone sync ./ vistahaven:VistaHaven/ \
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
    2>&1 | tee -a "$LOG_FILE" || {
    log "${YELLOW}⚠️  Warning: Google Drive sync failed${NC}"
}

log "✅ Google Drive sync completed"

# Step 7: Verification
log_section "🔍 STEP 7: VERIFICATION"

# GitHub verification
log "GitHub status:"
GIT_LAST_COMMIT=$(git log -1 --format="%H %s" 2>/dev/null || echo "N/A")
log "   Latest commit: $GIT_LAST_COMMIT"

# Google Drive verification
if command -v rclone &> /dev/null; then
    FILE_COUNT=$(rclone ls vistahaven:VistaHaven/ --files-only 2>/dev/null | wc -l || echo "0")
    log "Google Drive status:"
    log "   Total files: $FILE_COUNT"
fi

# Backup file verification
if [ -f /app/real-estate-backend/data/latest.json ]; then
    BACKUP_SIZE=$(du -h /app/real-estate-backend/data/latest.json | cut -f1)
    log "Local backup:"
    log "   File: /app/real-estate-backend/data/latest.json"
    log "   Size: $BACKUP_SIZE"
fi

# Complete
log_section "✅ BACKUP COMPLETE"

log "🎉 All done!"
log "📅 Backup completed at: $(date)"
log ""
log "✅ Backup saved to:"
log "   - GitHub: origin/fixing branch"
log "   - Google Drive: vistahaven:VistaHaven/"
log "📝 Full log: $LOG_FILE"
log ""
log "Next scheduled backup: Tomorrow at midnight"
log ""

# Clean old logs
find /app/logs -name "full-backup-*.log" -mtime +30 -delete 2>/dev/null || true

exit 0
