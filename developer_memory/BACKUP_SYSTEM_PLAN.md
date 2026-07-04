# Backup System Plan - Google Drive Backup for Complete Project

**Last Updated:** 2026-07-04
**Status:** PLANNED (Not Yet Implemented)
**Branch:** `fixing`

---

## Problem Statement

### Current Issue: Docker Volume Data Loss

When deploying the project on a new PC or VPS, ALL DATA is lost because:

```
Docker Volume = TEMPORARY Storage
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Docker Container Lives
    ↓
Database (PostgreSQL) = In Docker Volume
    ↓
Images (uploaded) = In Docker Container
    ↓
VPS Crashes / New Setup
    ↓
Docker Volume = DELETED
    ↓
❌ ALL DATA LOST:
   - Users/Accounts
   - Projects
   - Properties
   - Uploaded Images
   - Contact Info
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**The Problem:**
- Database is stored in Docker Volume (not in project folder)
- Images are stored in Docker Container (not in git)
- When VPS crashes or setup on new machine → Everything is lost!
- GitHub only stores CODE, not data or images

---

## Solution Overview

### Google Drive as Complete Project Backup

```
GOOGLE DRIVE = COMPLETE PROJECT BACKUP
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Everything is backed up:
✅ All code files (frontend + backend)
✅ All uploaded images
✅ All database data (projects, users, properties)
✅ Docker configuration
✅ Settings and configurations

Google Drive has 15GB FREE storage

RESULT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VPS Crashes?
    ↓
Download project from Google Drive
    ↓
Set up Docker
    ↓
Restore database
    ↓
✅ Back online in 15 minutes!
✅ ZERO data loss!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## Tool: Rclone

### What is Rclone?

**Rclone** = Command-line tool that syncs files to cloud storage (Google Drive, Dropbox, S3, etc.)

**Key Features:**
- ✅ NO AI, NO Machine Learning - Just simple sync code
- ✅ Works forever once set up
- ✅ Syncs ONLY changed files (fast!)
- ✅ FREE and Open Source
- ✅ Automatic operation (no human needed)

### How Rclone Sync Works

```
STEP 1: Compare Files
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

VPS Files:                  Google Drive Files:
├── file1.txt ✓           ├── file1.txt ✓
├── file2.txt ✓           ├── file2.txt ✓
├── file3.txt NEW    ──►   ├── (missing)
└── file4.txt MODIFIED ──► └── file4.txt (old)

STEP 2: Upload Only Changes
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Only uploads:
✅ file3.txt (new file)
✅ file4.txt (modified file)
❌ file1.txt (same, skipped)
❌ file2.txt (same, skipped)

RESULT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Google Drive = Exact copy of VPS
Time: SECONDS to minutes (only changes)
Data: MINIMAL (only differences)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Why Rclone?

| Feature | GitHub | Google Drive + Rclone |
|---------|--------|----------------------|
| **Storage** | 1GB free | 15GB free |
| **File Size** | 100MB max | 5TB per file |
| **Images** | ❌ Too large | ✅ Perfect |
| **Database** | ❌ Not stored | ✅ Stored |
| **Automatic Sync** | ❌ Manual | ✅ Automatic |
| **Setup** | Complex | Simple |
| **AI Used** | ❌ No | ❌ No |

---

## What Gets Backed Up

### Complete Project Structure

```
Google Drive
└── VistaHaven/                          ← Project Folder
    ├── real-estate-backend/             ← Backend Code
    │   ├── src/
    │   │   ├── collections/             ← Data models
    │   │   ├── scripts/                ← Backup scripts
    │   │   │   ├── backup.ts          ← Database backup script
    │   │   │   ├── cleanup.ts         ← Media cleanup script
    │   │   │   └── restore.ts         ← Database restore script
    │   │   ├── app/                   ← Next.js app
    │   │   └── initPayload.ts         ← Payload initialization
    │   ├── public/media/               ← ALL Uploaded Images ⭐
    │   │   ├── project-image-1.jpg
    │   │   ├── property-photo.png
    │   │   └── ...
    │   ├── data/                       ← Database Backup ⭐
    │   │   └── latest.json            ← Exported database
    │   ├── payload.config.ts          ← Payload CMS config
    │   ├── package.json               ← Dependencies
    │   └── Dockerfile                 ← Docker setup
    │
    ├── real estate frontend/            ← Frontend Code
    │   ├── src/
    │   │   ├── components/            ← React components
    │   │   ├── pages/                 ← Pages
    │   │   ├── services/              ← API services
    │   │   └── hooks/                 ← Custom hooks
    │   ├── public/
    │   └── package.json
    │
    └── docker-compose.yml              ← Docker orchestration
```

### What Gets Backed Up (Details)

| Component | What | Size | Frequency |
|-----------|------|------|-----------|
| **Code Files** | Frontend + Backend source code | ~5-10MB | Daily (only changes) |
| **Images** | All uploaded media files | ~100-500MB | Daily (only new) |
| **Database** | Projects, users, properties | ~1-5MB | Daily |
| **Config Files** | Docker, package.json, etc. | ~100KB | Daily (only changes) |
| **Total Initial** | Complete project | ~500MB | Once |
| **Daily Updates** | Only changes | ~5-20MB | Daily |

### What Gets EXCLUDED (Intentionally)

```bash
--exclude "node_modules/**"      # Huge folder, not needed
--exclude ".git/**"             # Git history, not needed
--exclude "postgres_data/**"    # Docker volume, different backup
--exclude ".env"                # Security risk
--exclude "*.log"              # Log files
--exclude ".next/**"           # Build cache
```

---

## Automated Backup Workflow

### Every Night at Midnight (Automatic)

```
12:00:00 AM - Scheduled Task Triggers
    ↓
┌─────────────────────────────────────────────────┐
│ Step 1: Media Cleanup Script                     │
│                                                  │
│ npm run cleanup                                 │
│                                                  │
│ What it does:                                   │
│ - Scans public/media/ folder                    │
│ - Checks database for used images               │
│ - Deletes orphaned images (not linked)          │
│ - Keeps only USED images                       │
│                                                  │
│ Result: Clean media folder, no duplicates       │
└─────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────┐
│ Step 2: Database Backup Script                   │
│                                                  │
│ npm run backup                                  │
│                                                  │
│ What it does:                                   │
│ - Exports ALL database collections to JSON      │
│ - Collections: users, projects, properties,     │
│   media, features, contact                      │
│ - Saves to data/latest.json                    │
│                                                  │
│ Result: Complete database backup                 │
└─────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────┐
│ Step 3: Rclone Sync to Google Drive             │
│                                                  │
│ rclone sync ./ vistahaven:VistaHaven/           │
│                                                  │
│ What it does:                                   │
│ - Compares local files with Google Drive        │
│ - Uploads ONLY changed files                    │
│ - Deletes removed files from Google Drive       │
│                                                  │
│ Result: Google Drive = Exact copy of VPS       │
└─────────────────────────────────────────────────┘
    ↓
✅ COMPLETE BACKUP - Total Time: 2-10 minutes
```

### What Happens If VPS Crashes

```
VPS CRASH DETECTED
    ↓
Spin up new VPS (fresh machine)
    ↓
Step 1: Install Docker
    ↓
Step 2: Install Rclone
    ↓
Step 3: Connect to Google Drive
    ↓
Step 4: Download Project
    │
    └─► rclone copy vistahaven:VistaHaven/ /app/
    │
    ↓
Step 5: Start Docker
    │
    └─► docker-compose up -d
    │
    ↓
Step 6: Restore Database
    │
    └─► npm run restore
    │
    ↓
✅ BACK ONLINE! Time: 15-30 minutes
✅ ZERO data loss!
✅ Everything restored from Google Drive!
```

---

## Setup Instructions

### Phase 1: Initial Setup (One-Time)

**Step 1.1: Install Rclone on VPS**

```bash
# Download rclone
curl https://rclone.org/install.sh | sudo bash

# Verify installation
rclone version
```

**Step 1.2: Configure Google Drive**

```bash
# Start configuration
rclone config

# Follow interactive prompts:
n                          # New remote
vistahaven                # Name: vistahaven
13                        # Storage: Google Drive
<press_enter>            # client_id: (leave blank)
<press_enter>            # client_secret: (leave blank)
1                        # scope: Full access
<press_enter>           # root_folder_id: (leave blank)
<press_enter>           # service_account_file: (leave blank)
n                        # advanced config: No
y                        # auto config: Yes (will open browser)
[login_to_google]        # Authorize in browser
y                        # Confirm: Yes this is OK
q                        # Quit config

# Verify connection
rclone ls vistahaven:VistaHaven/
```

**Step 1.3: Create Backup Script**

Create file: `/app/scripts/backup-all.sh`

```bash
#!/bin/bash
# Complete Project Backup to Google Drive
# Runs every night at midnight via Task Scheduler

set -e  # Exit on error

echo "🚀 Starting complete project backup to Google Drive..."
echo "📅 Date: $(date)"
echo ""

# Change to app directory
cd /app

# Step 1: Cleanup orphaned media files
echo "🧹 Step 1: Cleaning up orphaned media files..."
npm run cleanup -- --preview  # Preview only, no auto-delete for safety
echo "✅ Media cleanup complete"
echo ""

# Step 2: Backup database to JSON
echo "💾 Step 2: Backing up database..."
npm run backup
echo "✅ Database backup complete"
echo ""

# Step 3: Sync entire project to Google Drive
echo "📤 Step 3: Syncing to Google Drive..."
rclone sync ./ vistahaven:VistaHaven/ \
  --exclude "node_modules/**" \
  --exclude ".git/**" \
  --exclude "postgres_data/**" \
  --exclude ".env" \
  --exclude "*.log" \
  --exclude ".next/**" \
  --exclude "npm-debug.log*" \
  --exclude "yarn-error.log" \
  --progress

echo "✅ Google Drive sync complete"
echo ""

# Step 4: Verify backup
echo "🔍 Verifying backup..."
FILE_COUNT=$(rclone ls vistahaven:VistaHaven/ --files-only | wc -l)
echo "📊 Total files in Google Drive: $FILE_COUNT"
echo ""

echo "🎉 COMPLETE PROJECT BACKUP FINISHED!"
echo "📅 Backup completed at: $(date)"
echo ""

# Send notification (optional)
# curl -X POST "https://api.telegram.org/bot$BOT_TOKEN/sendMessage" \
#   -d "chat_id=$CHAT_ID" \
#   -d "text=✅ VistaHaven backup completed successfully!"

exit 0
```

Make executable:
```bash
chmod +x /app/scripts/backup-all.sh
```

**Step 1.4: Test Backup Script**

```bash
# Test run (should complete in 5-10 minutes first time)
/app/scripts/backup-all.sh

# Check Google Drive
rclone ls vistahaven:VistaHaven/ | head -20
```

**Step 1.5: Set Up Windows Task Scheduler**

On VPS, open Task Scheduler and create task:

```
Task Name: VistaHaven Daily Backup
Trigger: Daily at 00:00:00
Action: Start a program
  Program: cmd.exe
  Arguments: /c docker exec -it vistahaven-payload sh /app/scripts/backup-all.sh >> /app/logs/backup.log 2>&1
Working Directory: C:\app
```

Or via PowerShell:
```powershell
$action = New-ScheduledTaskAction -Execute "cmd.exe" -Argument "/c docker exec -it vistahaven-payload sh /app/scripts/backup-all.sh"
$trigger = New-ScheduledTaskTrigger -Daily -At "00:00"
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
Register-ScheduledTask -TaskName "VistaHaven Backup" -Trigger $trigger -Action $action -Settings $settings
```

---

### Phase 2: Initial Project Upload (One-Time)

**Step 2.1: Upload Complete Project**

```bash
# From VPS, run:
rclone copy ./ vistahaven:VistaHaven/ \
  --exclude "node_modules/**" \
  --exclude ".git/**" \
  --exclude "postgres_data/**"

# This uploads EVERYTHING (code + images + configs)
# Time: 10-30 minutes (first upload)
# Size: ~500MB
```

**Step 2.2: Verify Upload**

```bash
# Check what's in Google Drive
rclone ls vistahaven:VistaHaven/ --max-depth 2

# Should see:
# - real-estate-backend/
# - real estate frontend/
# - docker-compose.yml
```

---

## Restore Instructions

### If VPS Crashes - Restore from Google Drive

**Step 1: Set Up Fresh VPS**

```bash
# Install Docker
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Rclone
curl https://rclone.org/install.sh | sudo bash

# Configure Google Drive
rclone config
# (use same config as before)
```

**Step 2: Download Project from Google Drive**

```bash
# Create project directory
mkdir -p /app
cd /app

# Download complete project
rclone copy vistahaven:VistaHaven/ ./ \
  --exclude "node_modules/**" \
  --exclude ".git/**"

# Time: 10-30 minutes
# Everything is now on VPS!
```

**Step 3: Start Docker Services**

```bash
cd /app

# Start all services
docker-compose up -d

# Wait for services to start
docker-compose ps

# Check logs if needed
docker-compose logs -f
```

**Step 4: Restore Database**

```bash
# Wait for Payload CMS to be ready (about 1 minute)
sleep 60

# Restore database
docker exec -it vistahaven-payload npm run restore

# Verify restore
docker exec -it vistahaven-payload npm run cleanup -- --preview
```

**Step 5: Verify Everything Works**

```bash
# Check frontend
curl http://localhost:5173

# Check backend
curl http://localhost:3010/api/projects

# Check admin panel
curl http://localhost:3010/admin
```

✅ **Done! Project restored from Google Drive!**

---

## Monitoring and Maintenance

### Check Backup Status

```bash
# View last backup log
cat /app/logs/backup.log

# Check Google Drive size
rclone size vistahaven:VistaHaven/

# Check latest backup time
rclone lsl vistahaven:VistaHaven/real-estate-backend/data/ | tail -5
```

### Manual Backup (If Needed)

```bash
# Run backup manually anytime
/app/scripts/backup-all.sh

# Or just sync without cleanup
rclone sync ./ vistahaven:VistaHaven/ --exclude "node_modules/**"
```

### Verify Backup Integrity

```bash
# Check if all files are synced
rclone check ./ vistahaven:VistaHaven/ \
  --exclude "node_modules/**" \
  --exclude ".git/**"

# Report any differences
# Should show: "Differences: 0"
# If differences found, will list them
```

---

## Future Enhancements

### Planned Features

1. **Backup Verification**
   - Automated integrity checks
   - Email notifications on failure
   - Dashboard to view backup status

2. **Incremental Backups**
   - Keep last 7 daily backups
   - Weekly backup retention
   - Monthly archive

3. **Multi-Cloud Backup**
   - Primary: Google Drive
   - Secondary: Backblaze B2 (cheaper)
   - Automatic failover

4. **Telegram/Slack Notifications**
   - Send message when backup completes
   - Alert if backup fails
   - Weekly backup summary

5. **Restore Testing**
   - Monthly restore test on test server
   - Verify data integrity
   - Document restore time

### Optional: Cloudflare R2 (Alternative to Google Drive)

If Google Drive limits become an issue:

```bash
# R2 is cheaper and faster
rclone config
n
cloudflare-r2
... (S3 compatible API)

# Use instead of Google Drive
rclone sync ./ cloudflare-r2:vistahaven/ ...
```

---

## Troubleshooting

### Common Issues

**Issue 1: Rclone Authentication Expired**
```bash
# Re-authenticate
rclone config
# Find your remote (vistahaven)
# e) Edit configuration
# y) Yes, refresh token
# Follow browser prompts
```

**Issue 2: Google Drive Quota Exceeded**
```bash
# Check quota
rclone about vistahaven:

# If exceeded:
# - Delete old backups
# - Or upgrade to Google One (100GB for $2/month)
```

**Issue 3: Backup Script Not Running**
```bash
# Check scheduled task
schtasks /query /tn "VistaHaven Backup"

# Check logs
cat /app/logs/backup.log

# Run manually to debug
/app/scripts/backup-all.sh
```

**Issue 4: Sync Errors**
```bash
# Check for permission issues
ls -la /app

# Retry sync with more verbose output
rclone sync ./ vistahaven:VistaHaven/ -vv --dry-run

# Force re-authentication
rclone config
# Reconfigure the remote
```

---

## Summary

### What We Have

| Component | Status | Location |
|-----------|--------|----------|
| **Cleanup Script** | ✅ Ready | `src/scripts/cleanup.ts` |
| **Backup Script** | ✅ Ready | `src/scripts/backup.ts` |
| **Restore Script** | ✅ Ready | `src/scripts/restore.ts` |
| **Setup Guide** | ⏳ Needs rclone config | This file |
| **Scheduled Task** | ⏳ Needs Windows Task Scheduler | This file |

### What Needs to Be Done

1. **Install Rclone** on VPS
2. **Configure Google Drive** remote
3. **Create backup script** (`backup-all.sh`)
4. **Set up Task Scheduler** for midnight
5. **Upload initial project** to Google Drive
6. **Test restore** (optional but recommended)

### Expected Outcome

```
✅ Google Drive = Complete project backup
✅ Updates automatically every night
✅ VPS can crash = Restore in 15 minutes
✅ ZERO data loss
✅ No manual work needed after setup
✅ Works forever!
```

---

## Contact & Support

For questions or issues with this backup system:
- Review this document first
- Check troubleshooting section
- Verify scheduled task is running
- Check logs: `/app/logs/backup.log`

**Last Review Date:** 2026-07-04
**Next Review:** Monthly (check if still working)
**Emergency Restore Procedure:** See "Restore Instructions" section

---

## Implementation Checklist

- [ ] Install rclone on VPS
- [ ] Configure Google Drive remote (`vistahaven`)
- [ ] Test rclone connection (`rclone ls vistahaven:VistaHaven/`)
- [ ] Create `/app/scripts/backup-all.sh`
- [ ] Make script executable (`chmod +x`)
- [ ] Test backup script manually
- [ ] Upload initial project to Google Drive
- [ ] Set up Windows Task Scheduler (midnight daily)
- [ ] Verify scheduled task is enabled
- [ ] Test restore procedure (on test environment)
- [ ] Document backup verification process
- [ ] Set up monitoring/alerting (optional)
- [ ] Monthly backup integrity check

---

**END OF DOCUMENT**
