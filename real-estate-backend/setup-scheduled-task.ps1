# Media Cleanup - Scheduled Task Setup

## Overview

This script automatically cleans up orphaned media files daily at midnight.

## What It Does

1. **Scans** all files in `public/media/`
2. **Checks** database to see which images are actually used
3. **Deletes** orphaned files (unused images)
4. **Reports** space freed

## Setup Instructions

### Option 1: Manual Setup (Recommended)

1. Open **Task Scheduler** on Windows
   - Press `Win + R`
   - Type `taskschd.msc`
   - Press Enter

2. Create Basic Task
   - Click **"Create Basic Task..."**
   - Name: `VistaHaven Media Cleanup`
   - Description: `Cleans orphaned media files daily at midnight`
   - Click **Next**

3. Trigger
   - Select: **Daily**
   - Time: `00:00:00`
   - Click **Next**

4. Action
   - Select: **Start a program**
   - Program: `powershell.exe`
   - Arguments:
     ```
     -ExecutionPolicy Bypass -WindowStyle Hidden -Command "docker exec -it vistahaven-payload npm run cleanup:full"
     ```
   - Start in: `C:\Projects\new-branch-temp\real-estate-backend`
   - Click **Next**

5. Finish
   - Check: **"Open the Properties dialog..."**
   - Click **Finish**

6. Properties Settings
   - Check: **"Run whether user is logged on or not"**
   - Click **OK**

### Option 2: PowerShell Script

Run this command as Administrator:

```powershell
$action = New-ScheduledTaskAction -Execute "powershell.exe" -Argument "-ExecutionPolicy Bypass -WindowStyle Hidden -Command 'docker exec -it vistahaven-payload npm run cleanup:full'" -WorkingDirectory "C:\Projects\new-branch-temp\real-estate-backend"

$trigger = New-ScheduledTaskTrigger -Daily -At "00:00"

$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries

Register-ScheduledTask -TaskName "VistaHaven Media Cleanup" -Trigger $trigger -Action $action -Settings $settings -Description "Cleans orphaned media files daily at midnight" -RunLevel Highest
```

## Manual Commands

### Test Cleanup (Preview Only - No Deletion)
```bash
npm run cleanup
```

### Run Cleanup with Deletion
```bash
npm run cleanup:full
```

### In Docker
```bash
docker exec -it vistahaven-payload npm run cleanup
docker exec -it vistahaven-payload npm run cleanup:full
```

## Expected Output

```
================================================================
🧹 MEDIA CLEANUP SCRIPT
================================================================
📅 Date: 2026-07-04T00:00:00.000Z
📁 Media folder: C:\Projects\new-branch-temp\real-estate-backend\public\media

🔄 Connecting to database...
✅ Connected to database

🔍 Scanning database for used media...

   ✅ projects: checked
   ✅ properties: checked

   📊 Used media IDs: 45
   📊 Used filenames: 45

🗂️  Scanning media folder...

📁 Total files in media folder: 62

   🗑️  Orphaned: old-image-2026-04-15.jpg (2.5 MB)
   🗑️  Orphaned: duplicate-photo.jpg (1.2 MB)
   🗑️  Orphaned: test-upload.png (500 KB)

================================================================
📊 SUMMARY
================================================================
📁 Total files: 62
🗑️  Orphaned files: 3
💾 Space to free: 4.2 MB

🗑️  Deleting orphaned files...

   ✅ Deleted: old-image-2026-04-15.jpg
   ✅ Deleted: duplicate-photo.jpg
   ✅ Deleted: test-upload.png

================================================================
✅ CLEANUP COMPLETE
================================================================
🗑️  Deleted: 3 files
💾 Space freed: 4.2 MB
```

## Troubleshooting

### Docker Container Not Running
```powershell
docker ps
# If not running:
docker-compose up -d
```

### Permission Denied
Make sure to run Task Scheduler as Administrator.

### Path Not Found
Verify the Working Directory path is correct in the scheduled task.

## Log Files

To save logs, modify the scheduled task action:

```
powershell.exe -ExecutionPolicy Bypass -WindowStyle Hidden -Command "docker exec -it vistahaven-payload npm run cleanup:full >> C:\Logs\vistahaven-cleanup.log 2>&1"
```

## Disable/Remove Task

```powershell
Unregister-ScheduledTask -TaskName "VistaHaven Media Cleanup" -Confirm:$false
```
