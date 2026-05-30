# Decision Log

**Purpose:** Track all architectural decisions with context, alternatives, and consequences.

**Update Protocol:** Append new decisions at TOP of file. Never delete old entries.

---

## 2026-05-30 - Media Orphan Cleanup System

**Decision:** Create API endpoint to find and delete orphaned/unused media from database

**Context:**
- When deleting images from upload fields, Payload only removes the relationship
- Media records stay in database even when not used anywhere
- Can accumulate unused images over time (especially with many apartments/projects)

**What Was Created:**

1. **API Endpoint:** `/api/cleanup-media`
   - Location: `src/app/(payload)/api/cleanup-media/route.ts`
   - Secured with API key query parameter
   - URL: `http://localhost:3010/api/cleanup-media?key=cleanup-secret-key`

2. **How It Works:**
   - Scans all media in database
   - Checks all projects and properties for media relationships
   - Identifies orphaned media (uploaded but not linked)
   - Deletes orphaned media completely from database

3. **Response Format:**
   ```json
   {
     "success": true,
     "totalMedia": 150,
     "orphanedFound": 45,
     "deleted": { "count": 45, "ids": ["abc123", ...] }
   }
   ```

**Usage:**
1. Add to `.env`: `CLEANUP_API_KEY=cleanup-secret-key`
2. Visit URL: `http://localhost:3010/api/cleanup-media?key=cleanup-secret-key`
3. Results shown in JSON response

**Benefits:**
- Keeps database clean
- Removes unused images permanently
- Can be run anytime (manual cleanup)
- Safe - only deletes truly orphaned media

**Limitations:**
- Requires manual triggering (no auto-cleanup)
- Need to remember to run it periodically

**Status:** Implemented, documented for later use

---

## 2026-05-30 - All Description Fields: richText → textarea

**Decision:** Change all `description` fields from `richText` to `textarea`

**Context:**
- `richText` fields return Lexical JSON objects, not strings
- React cannot render objects, causing blank/fallback text
- Admin users preferred simpler textarea input anyway

**What Was Changed:**

1. **Projects collection** - `description` field
   - `real-estate-backend/src/collections/Projects.ts` line 91
   - Changed from `richText` → `textarea`

2. **Projects custom_sections** - nested `description` field
   - `real-estate-backend/src/collections/Projects.ts` line 180
   - Changed from `richText` → `textarea`

3. **Properties collection** - `description` field
   - `real-estate-backend/src/collections/Properties.ts` line 108
   - Changed from `richText` → `textarea`

4. **Frontend simplification**
   - `ProjectDetail.tsx` - No longer needs type check for description
   - `PropertyDetail.tsx` - Description now displays directly

**Benefits:**
- Simpler admin experience (plain text input)
- No complex JSON parsing needed
- Reliable display on frontend
- Consistent across all collections

**Reversible:** Yes, can change back to richText if needed

---

## 2026-05-30 - Google Maps Embed URL Support

**Decision:** Allow direct Google Maps embed URLs in `google_map` field

**Context:**
- Admin wanted to paste Google Maps location
- Short URLs (maps.app.goo.gl) can't be used directly
- Full embed URLs work perfectly

**What Was Changed:**

1. **Added utility function** - `convertToGoogleMapsEmbedUrl()` in `utils.ts`
   - Detects if URL is already an embed URL → use directly
   - Detects short URLs → logs warning, falls back to coordinates
   - Regular URLs → attempt to convert

2. **Updated PropertyLocation component**
   - Added `googleMapUrl` prop
   - Prefers direct embed URLs over coordinate-based ones
   - Falls back to Dubai coordinates if no URL provided

3. **Updated ProjectDetail.tsx**
   - Passes `project.google_map` to PropertyLocation

**How to get embed URL:**
1. Go to Google Maps → Search location
2. Click Share → Copy embed HTML
3. Extract the `src` URL from the iframe
4. Paste in Payload `google_map` field

**Limitations:**
- Short URLs (maps.app.goo.gl) cannot be expanded client-side
- Admin must use full Google Maps embed URLs

**Reversible:** Yes

---

## 2026-05-30 - Location Icon Consistency (MapPin)

**Decision:** Use `MapPin` from lucide-react consistently on all detail pages

**Context:**
- ProjectDetail.tsx had custom SVG location icon
- PropertyDetail.tsx had different custom SVG
- Wanted consistency across the app

**What Was Changed:**

1. **ProjectDetail.tsx**
   - Added: `import { MapPin } from 'lucide-react'`
   - Replaced custom SVG with: `<MapPin size={20} strokeWidth={1.5} className="text-[rgb(136,136,136)]" />`
   - Wrapped in flex container: `<div className="flex items-center gap-2 mt-2">`

2. **PropertyDetail.tsx**
   - Added: `import { MapPin } from 'lucide-react'`
   - Replaced custom SVG with same MapPin component
   - Safe handling for missing data: `{project.place || ''}{project.place && project.city ? ', ' : ''}{project.city || ''}`

**Icon Style:**
- Size: 20px
- Stroke width: 1.5
- Color: `rgb(136,136,136)` (gray)
- Matches feature icons style (Sparkles, etc.)

**Note:** PropertyCard.tsx still uses custom SVG for card thumbnails (acceptable)

**Reversible:** Yes

---

## 2026-05-30 - PropertyDetail Features: From Payload

**Decision:** Load property features from Payload instead of hardcoded

**Context:**
- Features on PropertyDetail page were hardcoded
- Payload collection has `features` array field
- Needed to connect frontend to backend properly

**What Was Changed:**

```typescript
// Before (hardcoded)
const features: PropertyFeatureType[] = [
  { id: '1', name: `${property.beds} Bedrooms...` },
  // ...5 hardcoded features
];

// After (from Payload with fallback)
const features: PropertyFeatureType[] = property.features && property.features.length > 0
  ? property.features.map((f: any) => ({ id: f.id, name: f.name || f }))
  : [
      { id: '1', name: `${property.beds} Bedrooms & ${property.baths} Bathrooms` },
      // ...fallback features
    ];
```

**Benefits:**
- Features now load from Payload data
- Falls back to hardcoded if no features in Payload
- Admin can add custom features per property

**Reversible:** Yes

---

## 2026-05-29 - Frontend-Backend Connection & Payload Integration Fixes

**Decision:** Fix frontend to properly connect with Payload backend

**Context:**
- Frontend was built for Strapi API, needed to work with Payload
- Multiple schema mismatches needed fixing
- Gallery images, custom sections, and rich text needed proper handling

**What Was Changed:**

### 1. Removed `featured` References from Frontend
Files Updated:
- `src/services/properties.ts` - Removed 'featured' sort option
- `src/pages/PropertiesListing.tsx` - Changed default sort to 'newest'
- `src/components/filters/HeroSection.tsx` - Removed Featured filter option
- `src/types/property.ts` - Removed `featured: boolean` field
- `src/i18n/locales/{en,fr,ar}.json` - Removed featured translations

### 2. Fixed Rich Text (Lexical) Rendering
**Problem:** Payload's richText fields return Lexical JSON objects, not strings
```json
{
  "root": { "children": [...] }
}
```
React cannot render objects, causing blank page errors.

**Fix in ProjectDetail.tsx:**
```typescript
// Before (caused error)
description: project.description || project.short_description

// After (handles rich text)
description: typeof project.description === 'string' 
  ? project.description 
  : project.short_description || fallbackText
```

### 3. Fixed Gallery Images Logic
**Requirements:**
- `first_image` → Project card thumbnail (60%), NOT in gallery
- `second_image` → Project card cover (40%), NOT in gallery
- `gallery` → Only shown in project detail gallery

**Fix in ProjectDetail.tsx:**
```typescript
const galleryImages = project.gallery && project.gallery.length > 0
  ? project.gallery.map((img) => getImageUrl(img, 'full'))
  : project.first_image 
    ? [getImageUrl(project.first_image, 'full')]
    : [];
```

### 4. Fixed Features Loading
**Problem:** Features were hardcoded with dummy data

**Fix:**
```typescript
const features: PropertyFeatureType[] = project.features 
  ? project.features.map(f => ({ id: f.id, name: f.name || f }))
  : [];
```

### 5. Enabled Custom Sections
**Problem:** Custom sections from Payload were ignored (empty array)

**Fix:**
```typescript
const customSections: ProjectSectionData[] = (project.custom_sections || []).map((section) => ({
  id: section.id,
  title: section.title (handles localization),
  images: section.gallery images,
  description: section.description (handles localization),
  features: section.features,
}));
```

**Benefits:**
- Frontend now properly connected to Payload backend
- No more blank pages from rich text errors
- Gallery shows correct images
- Custom sections render properly

**Reversible:** Yes, can revert any individual fix

---

## 2026-05-29 - Removed Tailwind CSS from Backend

**Decision:** Remove custom `admin-ui/` directory and use Payload's default admin panel instead

**Context:** 
- Previously built a custom React admin panel that replaced Payload's admin
- Decided to simplify architecture and use Payload's built-in admin
- Payload admin provides all needed functionality without extra complexity

**What Was Removed:**
- `admin-ui/` directory (124 files)
- All custom admin UI documentation
- Docker admin-ui service

**What Was Changed:**
- Removed Tailwind CSS from backend (was causing UI conflicts)
- Cleaned up docker-compose.yml (removed admin-ui service)

**Benefits:**
- Simpler architecture (2-tier instead of 3-tier)
- Less code to maintain
- Payload admin has built-in localization support
- Payload handles authentication, permissions, media upload

**Consequences:**
- Less UI customization freedom
- Must work within Payload's admin constraints
- Localization workflow requires Save before switching locales

**Reversible:** Yes, can recreate admin-ui if needed

---

## 2026-05-29 - Properties Features: Relationship → Array

**Decision:** Change Properties `features` field from relationship to array

**Context:**
- Projects collection uses array field for features (inline text inputs)
- Properties collection was using relationship (selector to Features collection)
- Wanted consistent behavior across both collections

**Before:**
```typescript
{
  name: 'features',
  type: 'relationship',
  relationTo: 'features',
  hasMany: true
}
```

**After:**
```typescript
{
  name: 'features',
  type: 'array',
  fields: [
    { name: 'name', type: 'text', required: true }
  ]
}
```

**Benefits:**
- Consistent UX across Projects and Properties
- Simpler - type features directly, no need to create in Features collection
- Matches how features work in Projects

**Consequences:**
- Features not centrally reusable across properties
- Each property has its own unique features list

**Reversible:** Yes, can change back to relationship if needed

---

## 2026-05-29 - Removed Featured Checkbox from Properties

**Decision:** Remove `featured` checkbox from Properties collection

**Context:**
- User indicated "featured" functionality will be handled differently
- Removing now to clean up schema

**Before:**
```typescript
{
  name: 'featured',
  type: 'checkbox',
  defaultValue: false,
  label: 'Featured on Homepage'
}
```

**After:** Field removed

**Benefits:**
- Cleaner Properties schema
- No unused fields

**Consequences:**
- If featured functionality needed later, must add back

**Reversible:** Yes, can add back if needed

---

## 2026-05-29 - Removed Tailwind CSS from Backend

**Decision:** Remove Tailwind CSS from Payload backend

**Context:**
- Tailwind was configured in backend but causing UI conflicts
- Localization tabs weren't displaying correctly
- Tailwind wasn't needed for Payload admin

**What Was Removed:**
- `postcss.config.mjs`
- `@tailwindcss/postcss` from devDependencies
- `tailwindcss` from devDependencies

**Before:** Backend had Tailwind CSS
**After:** Backend has no Tailwind (Payload admin uses default styles)

**Benefits:**
- Payload localization tabs display correctly
- Cleaner backend (no unused dependencies)
- Matches Payload's expected behavior

**Consequences:**
- If custom admin styles needed later, must add back
- Frontend (Vite) still uses Tailwind

**Reversible:** Yes, can add back if needed for custom styling