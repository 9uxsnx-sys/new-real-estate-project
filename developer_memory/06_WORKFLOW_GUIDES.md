# Workflow Guides

**Last Updated:** 2026-05-29
**Purpose:** Step-by-step processes for common tasks.

---

## Docker Setup

### Start All Services
```bash
docker-compose up -d
```

### Verify Containers
```bash
docker-compose ps
```

### View Logs
```bash
docker-compose logs -f payload
docker-compose logs -f postgres
```

### Stop Services
```bash
docker-compose down
```

### Rebuild Container (After Config Changes)
```bash
docker-compose up --build -d payload
```

---

## Payload Admin Usage

### Access Payload Admin
Open: http://localhost:3010/admin

### Create First Admin User
1. Go to http://localhost:3010/admin
2. Create admin account (first time only)

### Localization Workflow
**Important:** Save after filling English before switching locales.

1. Fill all fields in **ENGLISH** (default)
2. **SAVE** the document
3. Switch to **FRENCH** tab (top-right)
4. Fill only localized fields (name, city, description, etc.)
5. **SAVE**
6. Switch to **ARABIC** tab
7. Fill localized fields
8. **SAVE**

Non-localized fields (price, beds, baths) persist across locales.

---

## Content Management

### Adding Projects
1. Go to http://localhost:3010/admin
2. Navigate to **Projects** collection
3. Click **Create New**
4. Fill localized fields (EN/FR/AR) - see workflow above
5. Add images to media library
6. Save and publish

### Adding Properties
1. Navigate to **Properties** collection
2. Click **Create New**
3. Select parent **Project** (required)
4. Fill all fields:
   - **Localized fields** (name, area, city, description): Fill for each locale
   - **NOT localized** (price, beds, baths, space_sqm): Fill once
5. Use inline array for features (click + to add)
6. Save and publish

### Adding Images to Projects

**Image Fields:**
| Field | Purpose | Shows In |
|-------|---------|----------|
| First Image | Large thumbnail (60% width) | Project listing card, Detail gallery hero |
| Second Image | Cover image (40% width) | Project listing card only |
| Gallery | Additional photos | Detail gallery only |

**Best Practice:**
1. Add first image (main hero image)
2. Add different image as second image (optional)
3. Add multiple images to gallery (for detail page)

### Adding Images to Properties
| Field | Purpose | Shows In |
|-------|---------|----------|
| Image | Main thumbnail | Property listing card, Detail hero |
| Gallery | Additional photos | Detail gallery |

### Media Library
- Drag-and-drop uploads
- Auto-resizes images (thumbnail, card, full)
- 5MB file size limit
- Alt text support (localized)

### Custom Content Sections
1. In project editor, scroll to "Custom Content Sections"
2. Click **Add Custom Content Section**
3. Fill:
   - **Title** (localized)
   - **Description** (localized, textarea)
   - **Gallery** (optional)
   - **Features** (optional)
4. Add multiple sections if needed
5. Save

---

## Troubleshooting

### Container Won't Start
```bash
# Check Docker is running
docker ps

# Rebuild
docker-compose down
docker-compose up --build -d
```

### Database Connection Failed
```bash
# Check PostgreSQL logs
docker-compose logs postgres

# Verify port 5433 available
netstat -an | findstr 5433
```

### Frontend API Errors
- Verify Payload running on port 3010
- Check CORS in payload.config.ts
- Verify VITE_API_URL in frontend .env

---

## Multi-Language Testing

### Testing RTL (Arabic)
1. Go to Payload Admin
2. Select locale "ar" for editing
3. Enter Arabic text
4. View in frontend
5. Test navigation and layout

### Adding Translations
Edit files in:
- `real estate frontend/src/i18n/locales/en.json`
- `real estate frontend/src/i18n/locales/fr.json`
- `real estate frontend/src/i18n/locales/ar.json`