# Project Context: VistaHaven Real Estate

**Last Updated:** 2026-05-31
**Status:** Full-stack application with two-tier architecture: Public Frontend (Vite) and Payload CMS backend (PostgreSQL). Using Payload's default admin panel (no custom admin UI).

---

## Overview

VistaHaven is a **premium real estate platform** for property listings and project showcases. It targets high-end real estate markets (Algeria/Dubai aesthetic).

### Target Audience
- Property buyers looking for luxury listings
- Real estate agents managing multiple projects
- International clients (EN/FR/AR support)
- Admin/Management users (Admin, Editor roles)

### Core Problem Solved
- Centralized property management with rich media (images, galleries)
- Multi-language property listings
- Project-based organization (properties belong to developments)
- Beautiful presentation with smooth animations
- Payload CMS admin panel for content management

---

## Two-Tier Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                      Public Frontend (Vite)                     │
│                    localhost:5173                                │
│                  Public property browsing                        │
└─────────────────────────────┬────────────────────────────────┘
                              │ API calls
                              ▼
┌────────────────────────────────────────────────────────────────┐
│                    Payload CMS Backend                          │
│                    localhost:3010 (Docker)                      │
│    ┌──────────────────────────────────────────────────────┐    │
│    │  /admin         → Payload Admin Panel                │    │
│    │  /api/*        → REST APIs                          │    │
│    │  Collections: Projects, Properties, Media, Users, Contact │
    │  └──────────────────────────────────────────────────────┘    │
└─────────────────────────────┬────────────────────────────────┘
                              │ SQL
                              ▼
┌────────────────────────────────────────────────────────────────┐
│                    PostgreSQL Database                          │
│                    localhost:5433 (Docker)                     │
└────────────────────────────────────────────────────────────────┘
```

---

## Tech Stack

### Public Frontend
- **Vite** - Fast development server
- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **GSAP** - Animations
- **i18next** - Multi-language (EN/FR/AR)

### Backend
- **Payload CMS v3.84.1** - Headless CMS (using default admin)
- **Next.js 16.2.6** - App Router
- **PostgreSQL 16** - Database
- **Sharp** - Image processing
- **Lexical** - Rich text editor

---

## Collections

### Users
- Authentication & authorization
- Role-based access (Admin, Editor)
- JWT token-based auth

### Projects
- Development management
- Multi-language content (EN/FR/AR)
- Rich media galleries
- Features as **inline array** (type directly)
- Status management (active/coming_soon/inactive)

### Properties
- Individual listings linked to projects
- **NO name field** - uses `property_code` as title
- Multi-language content (EN/FR/AR)
- **Currency: DA (Algerian Dinar)**
- Price, beds, baths, area
- Rich media galleries
- Features as **inline array** (localized)
- Property types (Studio, F1, F2, F3, F4, F5+, Garage)

### Media
- Image uploads with resizing
- Alt text support
- Multiple sizes generated
- 5MB file size limit

### Features
- **NOTE:** Features collection still exists but is NOT used by Properties/Projects
- Both Projects and Properties now use inline array fields for features

### Contact (NEW - 2026-05-31)
- Dynamic contact information for property sidebar
- Fields: name, phone, whatsappURL
- Replaces hardcoded phone/whatsapp in PropertyContactSidebar
- Owner can update contact info anytime from admin

---

## Gallery Section Behavior

### Primary Gallery (PropertyGallery Component)
**Used on:** ProjectDetail.tsx and PropertyDetail.tsx

| Images | Layout |
|--------|--------|
| **0** | Hide section |
| **1** | Full-width single image |
| **2** | 50/50 split |
| **3+** | Asymmetric (1 main + 2 side) with +N overlay |

### Custom Section Gallery (ProjectSection Component)
**Used on:** ProjectDetail.tsx (custom_sections)

| Images | Layout |
|--------|--------|
| **0** | Hide section |
| **1** | Full-width single image |
| **2** | 50/50 split |
| **3** | Asymmetric (1 main + 2 side) |
| **4+** | 2x2 grid with +N overlay |

### Key Features
- Both galleries share the same `ImageGalleryModal` component
- Swipe navigation and pinch-to-zoom support
- GSAP animations on open/close
- All images are clickable to open modal

---

## Multi-Language Support

### Supported Languages
- **English (EN)** - Default
- **French (FR)** - Full localization
- **Arabic (AR)** - RTL support

### Localized Fields
**Projects:**
- `name`
- `short_description`
- `description` (textarea - plain text)
- `city`
- `place`
- Features within array

**Properties:**
- `area`
- `city`
- `description` (textarea - plain text)
- Features within array

### RTL Handling
- Numbers with `m²` use `dir="ltr"` in Arabic mode to prevent reversed display
- Example: `205 m²` stays as `205 m²` (not `²m 205`)

### Localization Workflow
1. Fill all fields in **ENGLISH** (default)
2. **SAVE** the document
3. Switch to **FRENCH** tab - fill only localized fields
4. **SAVE**
5. Switch to **ARABIC** tab - fill only localized fields
6. **SAVE**

Non-localized fields (price, beds, baths, etc.) persist across all locales.

---

## Currency Format

**Display:** `1,500,000,000 DA` (Price + DA)
**Format:** `price.toLocaleString('en-US') + ' DA'`
**Location:** `real estate frontend/src/utils/formatters.ts`

---

## Payload Admin Notes

### Appearance
- Using Payload's **default admin UI** (no custom admin-ui)
- No Tailwind CSS in backend (removed to avoid UI conflicts)
- Localized fields show language tabs at top-right

### Auto-accept Schema Changes
- Dockerfile includes `PAYLOAD_ACCEPT_DATA_LOSS=true`
- Start command uses `yes | npm run dev` to auto-accept schema migrations