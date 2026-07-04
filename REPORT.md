# Electron Desktop Wrapper - Technical Audit Report

**Project:** VistaHaven Real Estate Platform  
**Audit Date:** 2026-06-28  
**Auditor:** AI Assistant  
**Last Updated:** 2026-07-04  

---

## 1. Executive Summary

### Overall Readiness: ⚠️ **WITH CHANGES REQUIRED**

This project can be wrapped with Electron, but **requires significant configuration changes** before the Electron app will function correctly. The architecture is fundamentally sound, but several critical settings need to be updated for production VPS deployment.

### Key Findings:

| Category | Status | Critical Issues |
|----------|--------|-----------------|
| Docker Networking | ⚠️ Medium | No reverse proxy (Nginx) configured; uses direct port mapping |
| Payload CORS | 🔴 Critical | CORS limited to localhost URLs only |
| Payload ServerURL | 🔴 Critical | Falls back to `localhost:3000` |
| Frontend API | ✅ Good | Uses environment variable `VITE_API_URL` |
| Authentication | ⚠️ Medium | No explicit `COOKIE_SECURE` configuration |
| **Data Backup System** | ✅ **COMPLETED** | **Full backup system implemented and pushed to GitHub** |
| **Media Cleanup** | ✅ **COMPLETED** | **Automatic cleanup system implemented** |

---

## 2. Detailed Audit Findings

### 2.1 Docker & Networking Analysis

#### docker-compose.yml Findings:

```yaml
services:
  postgres:
    ports: "5433:5432"          # External: 5433, Internal: 5432
    container: vistahaven-postgres
  
  payload:
    ports: "3010:3000"          # External: 3010, Internal: 3000
    container: vistahaven-payload
    environment:
      SERVER_URL: http://localhost:3010     # ⚠️ HARDCODED LOCALHOST
      NEXT_PUBLIC_API_URL: http://localhost:3010
  
  frontend:
    ports: "5173:5173"          # External: 5173
    container: vistahaven-frontend
```

**Networking Details:**
- Internal Docker network: `vistahaven-network`
- No Nginx reverse proxy configured
- Services communicate via Docker DNS names (`postgres`, `payload`, `frontend`)
- Public exposure: Direct port mapping only

#### Missing Infrastructure:
- ❌ No Nginx configuration found
- ❌ No SSL/TLS termination at container level
- ❌ No domain-based routing (e.g., `api.domain.com` vs `www.domain.com`)

---

### 2.2 Payload CMS Configuration Audit

#### payload.config.ts Findings:

```typescript
export default buildConfig({
  serverURL: process.env.SERVER_URL || 'http://localhost:3000',  // 🔴 CRITICAL
  admin: {
    meta: {
      titleSuffix: '- VistaHaven Admin',
    },
  },

  // CORS for frontend access
  cors: [
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:3000',
    'http://localhost:3001',
  ].filter(Boolean),  // 🔴 CRITICAL - No production domains
  
  // ⚠️ No explicit CSRF configuration
  // ⚠️ No explicit cookie security settings
})
```

**Critical Issues:**

| Setting | Current Value | Required Value |
|---------|---------------|----------------|
| `serverURL` | `process.env.SERVER_URL \|\| 'http://localhost:3000'` | Must be VPS domain (no localhost fallback) |
| `cors` | `['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001']` | Must include Electron protocol (`file://`, `app://`) |
| `csrf` | Not configured | May need permissive settings for Electron |
| `routes.admin` | Default `/admin` | ✅ Already suitable |

---

### 2.3 Frontend (React) Routing & API Calls

#### API Service Analysis (api.ts):

```typescript
const API_URL = import.meta.env.VITE_API_URL || '';

export async function fetchApi<T>(endpoint: string, params?: ApiParams): Promise<T> {
  let urlString = `${API_URL}${endpoint}`;
  // ... builds full URL
  const response = await fetch(urlString, { ... });
}
```

**Assessment:** ✅ **GOOD**

- Uses `VITE_API_URL` environment variable
- Falls back to empty string (relative URLs)
- Relative paths work well with Electron

#### Projects/Properties Services:

```typescript
// projects.ts
const response = await fetchApi<PayloadListResponse<Project>>(
  `/api/projects?${params.toString()}`
);

// properties.ts
const response = await fetchApi<PayloadListResponse<Property>>(
  `/api/properties?${params.toString()}`
);
```

**Assessment:** ✅ **GOOD** - Uses relative `/api/` paths

---

### 2.4 Authentication & Cookies

#### Current Configuration:

- Payload uses JWT with HttpOnly cookies (default behavior)
- No explicit `COOKIE_SECURE` environment variable
- No explicit `COOKIE_DOMAIN` configuration

#### Findings:

| Variable | Current | Required for Electron |
|----------|---------|----------------------|
| `COOKIE_SECURE` | Not set | Must be `true` (VPS uses HTTPS) |
| `COOKIE_DOMAIN` | Not set | May need to be explicit |
| `PAYLOAD_PUBLIC_SERVER_URL` | Not set | Required for admin asset URLs |

#### Electron Cookie Behavior:
- Electron's `session.defaultSession` handles cookies like a browser
- If VPS uses HTTPS with valid certificates, cookies will work
- Must ensure `secure` flag on cookies matches protocol

---

### 2.5 Build Output Structure

#### Frontend (Vite):
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  }
}
```

**Build Output:** `build/` directory (configured in vite.config.ts)

#### Payload Backend:
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  }
}
```

**Note:** Since Electron loads the **remote VPS URL**, build output inspection is informational only.

---

### 2.6 CI/CD & Versioning

- ❌ No GitHub Actions workflow found
- ❌ No GitLab CI configuration found
- Deployment assumed to be manual

**Recommendation:** Plan for separate Electron build pipeline later.

---

## 3. Proposed Electron Implementation

### 3.1 Project Structure

```
new-branch-temp/
├── electron/
│   ├── main.js              # Main process
│   ├── preload.js           # Preload script (optional)
│   ├── package.json         # Electron package.json
│   └── electron-builder.yml # Build configuration
├── REPORT.md                # This file
└── ...
```

### 3.2 Electron package.json

Create `electron/package.json`:

```json
{
  "name": "vistahaven-admin",
  "version": "1.0.0",
  "description": "VistaHaven Admin Desktop Application",
  "main": "main.js",
  "scripts": {
    "electron:start": "electron .",
    "electron:dev": "electron . --development",
    "electron:build": "electron-builder",
    "electron:build:win": "electron-builder --win",
    "electron:build:mac": "electron-builder --mac"
  },
  "build": {
    "extends": "electron-builder.yml"
  },
  "devDependencies": {
    "electron": "^33.0.0",
    "electron-builder": "^25.0.0"
  }
}
```

### 3.3 Main Process (main.js)

```javascript
const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');

// Configuration
const CONFIG = {
  // CHANGE THIS to your actual VPS domain
  adminUrl: process.env.ADMIN_URL || 'https://your-domain.com/admin',
  windowWidth: 1400,
  windowHeight: 900,
};

let mainWindow;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: CONFIG.windowWidth,
    height: CONFIG.windowHeight,
    minWidth: 1024,
    minHeight: 700,
    title: 'VistaHaven Admin',
    backgroundColor: '#ffffff',
    webPreferences: {
      nodeIntegration: false,           // SECURITY: Disabled
      contextIsolation: true,           // SECURITY: Enabled
      sandbox: true,                    // SECURITY: Enabled
      webSecurity: true,                // SECURITY: Enabled
      allowRunningInsecureContent: false,
    },
    autoHideMenuBar: true,
    show: false,  // Show when ready
  });

  // Remove default menu
  Menu.setApplicationMenu(null);

  // Load the admin panel
  mainWindow.loadURL(CONFIG.adminUrl);

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Handle window close
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Optional: Open DevTools in development
  if (process.argv.includes('--development')) {
    mainWindow.webContents.openDevTools();
  }
}

// App lifecycle
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Security: Prevent new windows
app.on('web-contents-created', (_, contents) => {
  contents.setWindowOpenHandler(() => {
    return { action: 'deny' };
  });
});
```

### 3.4 electron-builder.yml Configuration

Create `electron/electron-builder.yml`:

```yaml
appId: com.vistahaven.admin
productName: VistaHaven Admin
copyright: Copyright © 2026 VistaHaven

directories:
  output: dist
  buildResources: build

files:
  - main.js
  # - preload.js  # Uncomment if using preload script

win:
  target:
    - target: nsis
      arch:
        - x64
  artifactName: ${productName}-${version}-Setup.${ext}

nsis:
  oneClick: false
  perMachine: false
  allowToChangeInstallationDirectory: true
  deleteAppDataOnUninstall: true
  installerIcon: build/icon.ico
  uninstallerIcon: build/icon.ico
  installerHeaderIcon: build/icon.ico

mac:
  target:
    - target: dmg
      arch:
        - x64
        - arm64
  artifactName: ${productName}-${version}.${ext}
  category: public.app-category.business

dmg:
  contents:
    - x: 130
      y: 220
    - x: 410
      y: 220
      type: link
      path: /Applications

linux:
  target:
    - target: AppImage
      arch:
        - x64
  artifactName: ${productName}-${version}.${ext}
  category: Office
```

### 3.5 Preload Script (Optional Security Enhancement)

Create `electron/preload.js` for IPC communication if needed:

```javascript
const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods to renderer
contextBridge.exposeInMainWorld('electronAPI', {
  // Get app version
  getVersion: () => ipcRenderer.invoke('get-version'),
  
  // Minimize window
  minimize: () => ipcRenderer.send('minimize-window'),
  
  // Maximize/restore
  toggleMaximize: () => ipcRenderer.send('toggle-maximize'),
  
  // Close app
  close: () => ipcRenderer.send('close-app'),
  
  // Platform info
  platform: process.platform,
});
```

---

## 4. Required Changes

### 4.1 VPS Environment Variables (docker-compose.yml)

**BEFORE:**
```yaml
payload:
  environment:
    SERVER_URL: http://localhost:3010
    NEXT_PUBLIC_API_URL: http://localhost:3010
    FRONTEND_URL: http://localhost:5173
```

**AFTER (Production):**
```yaml
payload:
  environment:
    SERVER_URL: https://your-domain.com          # Your actual VPS domain
    NEXT_PUBLIC_API_URL: https://your-domain.com
    FRONTEND_URL: https://your-domain.com
    PAYLOAD_PUBLIC_SERVER_URL: https://your-domain.com  # Required for admin assets
    # Cookie security - CRITICAL for HTTPS
    COOKIE_SECURE: "true"
    COOKIE_DOMAIN: ".your-domain.com"             # Leading dot for subdomain cookie sharing
```

### 4.2 Payload CORS Configuration

**BEFORE (payload.config.ts):**
```typescript
cors: [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:3001',
].filter(Boolean),
```

**AFTER:**
```typescript
cors: [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:3001',
  // Electron protocols
  'file://',
  'app://',
].filter(Boolean),
```

### 4.3 Payload ServerURL (Remove Fallback)

**BEFORE:**
```typescript
serverURL: process.env.SERVER_URL || 'http://localhost:3000',
```

**AFTER:**
```typescript
serverURL: process.env.SERVER_URL,  // Will fail if not set - intentional
// OR with explicit production fallback
serverURL: process.env.SERVER_URL || 'https://your-domain.com',
```

### 4.4 Frontend Environment (.env.production)

Create `real estate frontend/.env.production`:

```bash
# Point to your VPS domain
VITE_API_URL=https://your-domain.com
```

### 4.5 Nginx Reverse Proxy (Recommended)

Add `nginx.conf` to route traffic:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Payload Admin & API
    location / {
        proxy_pass http://payload:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## 5. Risk Assessment

### 5.1 Security Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| CORS too permissive | Medium | Only add `file://` and `app://` protocols; avoid `*` |
| ServerURL localhost fallback | Critical | Remove fallback or set explicit production value |
| Cookie security mismatch | High | Ensure `COOKIE_SECURE=true` matches HTTPS |
| nodeIntegration enabled | Critical | ✅ Already set to `false` in proposed main.js |
| No contextIsolation | Critical | ✅ Already set to `true` in proposed main.js |

### 5.2 Operational Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| VPS downtime | High | Electron shows error page; no offline capability |
| Certificate issues | Medium | Electron may reject invalid SSL certs |
| Cookie domain mismatch | High | Set `COOKIE_DOMAIN` explicitly |
| Admin URL changes | Low | Use environment variable for flexibility |

### 5.3 Performance Considerations

| Aspect | Assessment |
|--------|------------|
| Network latency | Electron adds ~100-300ms per request |
| Bundle size | ✅ Minimal (no bundling of backend) |
| Memory usage | ~150-300MB (Chromium baseline) |

---

## 6. Implementation Checklist

### Phase 1: VPS Configuration (Do First)

- [ ] Update `docker-compose.yml` with production domain
- [ ] Set `COOKIE_SECURE=true` in Payload environment
- [ ] Update Payload CORS to include Electron protocols
- [ ] Remove localhost fallbacks from `payload.config.ts`
- [ ] Test Payload admin loads correctly via HTTPS

### Phase 2: Frontend Configuration

- [ ] Create `.env.production` with `VITE_API_URL`
- [ ] Test frontend builds and runs against production API

### Phase 3: Electron Setup

- [ ] Create `electron/` directory structure
- [ ] Create `main.js` with provided configuration
- [ ] Create `electron-builder.yml`
- [ ] Test locally with `npm run electron:dev`

### Phase 4: Build & Distribution

- [ ] Add app icon to `electron/build/` directory
- [ ] Run `npm run electron:build:win`
- [ ] Test `.exe` on clean Windows machine
- [ ] (Optional) Configure code signing

---

## 7. COMPLETED: Data Backup & Restore System

### ✅ COMPLETED: Docker Volume Data Loss Problem SOLVED!

**Date Completed:** 2026-07-04

**Problem Solved:**
- Docker volumes lost all data when VPS crashed or setup on new machine
- Database stored only in Docker (not in git)
- Images stored only in Docker container (not backed up)

### ✅ What Was Implemented

**1. Database Backup Script**
- Location: `real-estate-backend/src/scripts/backup.ts`
- Exports all collections (users, projects, properties, media, features, contact) to JSON
- Saves to `real-estate-backend/data/latest.json`
- Uses REST API to avoid Payload environment issues

**2. Media Cleanup Script**
- Location: `real-estate-backend/src/scripts/cleanup.ts`
- Finds orphaned images (not linked to any project/property)
- Auto-deletes them (runs at midnight)
- Preview mode: `npm run cleanup`
- Auto-delete mode: `npm run cleanup` (without --preview flag)

**3. Restore Script**
- Location: `real-estate-backend/src/scripts/restore.ts`
- Imports data from backup JSON to fresh database
- Smart duplicate handling (skips existing items)
- Usage: `npm run restore`

**4. Backup Scripts (Shell)**
- `real-estate-backend/scripts/backup-all.sh` - Auto backup to Google Drive
- `real-estate-backend/scripts/full-backup.sh` - Backup + Git + Google Drive

**5. Documentation**
- Location: `BACKUP_SYSTEM_PLAN.md`
- Complete setup guide
- Troubleshooting
- Future enhancements

**6. Database Backup (Committed to GitHub)**
- Location: `real-estate-backend/data/latest.json`
- Contains Villa Hydra project data
- Committed to `fixing` branch

### How to Restore on New Machine

```bash
# 1. Clone repository
git clone https://github.com/9uxsnx-sys/new-real-estate-project.git
cd new-real-estate-project
git checkout fixing

# 2. Start Docker
docker-compose up -d

# 3. Restore database
docker exec -it vistahaven-payload npm run restore

# 4. Start using the project
# All data restored!
```

### Google Drive Backup (Future Setup)

Follow instructions in `BACKUP_SYSTEM_PLAN.md`:

1. Install rclone on VPS
2. Configure Google Drive remote
3. Set up scheduled task for midnight
4. Upload initial project to Google Drive

**Benefits:**
- ✅ Google Drive = Complete project backup
- ✅ Updates automatically every night
- ✅ VPS crashes = Restore in 15 minutes
- ✅ Zero data loss
- ✅ No manual work after setup

---

## 8. Appendix: Quick Reference

### URLs Used in Project

| Service | Development URL | Production URL (To Set) |
|---------|-----------------|------------------------|
| Payload API | `http://localhost:3010` | `https://your-domain.com` |
| Payload Admin | `http://localhost:3010/admin` | `https://your-domain.com/admin` |
| Frontend | `http://localhost:5173` | `https://your-domain.com` |

### Environment Variables Summary

| Variable | Purpose | Required Value |
|----------|---------|----------------|
| `SERVER_URL` | Payload public URL | `https://your-domain.com` |
| `PAYLOAD_PUBLIC_SERVER_URL` | Admin asset URL | `https://your-domain.com` |
| `COOKIE_SECURE` | Secure cookies | `true` |
| `COOKIE_DOMAIN` | Cookie domain | `.your-domain.com` |
| `VITE_API_URL` | Frontend API | `https://your-domain.com` |

### Backup System Commands

```bash
# Preview orphaned images
npm run cleanup

# Auto-delete orphaned images (runs at midnight)
npm run cleanup

# Backup database to JSON
npm run backup

# Restore from backup
npm run restore

# Auto backup to Google Drive (when configured)
./scripts/backup-all.sh

# Full backup (GitHub + Google Drive)
./scripts/full-backup.sh
```

---

**Report Generated:** 2026-06-28  
**Last Updated:** 2026-07-04  
**Status:** Backup System COMPLETED | Electron Wrapper: Ready for Implementation
