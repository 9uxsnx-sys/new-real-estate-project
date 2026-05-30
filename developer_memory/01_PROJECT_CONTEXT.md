# Project Context: VistaHaven Real Estate

**Last Updated:** 2026-05-29
**Status:** Full-stack application with two-tier architecture: Public Frontend (Vite) and Payload CMS backend (PostgreSQL). Using Payload's default admin panel (no custom admin UI).

---

## Overview

VistaHaven is a **premium real estate platform** for property listings and project showcases. It targets high-end real estate markets (inspired by Dubai/Marina Bay aesthetic).

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
│    │  Collections: Projects, Properties, Media, Users     │    │
│    └──────────────────────────────────────────────────────┘    │
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
- **React 19** - UI library
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
- Multi-language content (EN/FR/AR)
- Price (AED), beds, baths, area
- Rich media galleries
- Features as **inline array** (type directly)
- Property types (Studio, F1, F2, F3, F4, F5+, Garage)

### Media
- Image uploads with resizing
- Alt text support
- Multiple sizes generated
- 5MB file size limit

### Features
- **NOTE:** Features collection still exists but is NOT used by Properties/Projects
- Both Projects and Properties now use inline array fields for features

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
- `name`
- `area`
- `city`
- `description` (textarea - plain text)
- Features within array

### Localization Workflow
1. Fill all fields in **ENGLISH** (default)
2. **SAVE** the document
3. Switch to **FRENCH** tab - fill only localized fields
4. **SAVE**
5. Switch to **ARABIC** tab - fill only localized fields
6. **SAVE**

Non-localized fields (price, beds, baths, etc.) persist across all locales.

---

## Payload Admin Notes

### Appearance
- Using Payload's **default admin UI** (no custom admin-ui)
- No Tailwind CSS in backend (removed to avoid UI conflicts)
- Localized fields show language tabs at top-right

### Known Behaviors
- Locale tabs only visible after first Save
- Fields default to contained layout (not full-width)
- Non-localized fields persist when switching locales (after saving)

---

## Docker Services

```bash
docker-compose up -d
```

| Service | Port | Container | Status |
|---------|------|-----------|---------|
| PostgreSQL | 5433 | vistahaven-postgres | ✅ Healthy |
| Payload CMS | 3010 | vistahaven-payload | ✅ Healthy |
| Frontend | 5173 | vistahaven-frontend | ✅ Running |

---

## Key Changes (2026-05-29)

### Admin UI Architecture
- **Removed:** Custom `admin-ui/` directory (124 files)
- **Removed:** All admin UI documentation and memory files
- **Using:** Payload's default admin panel at `/admin`

### Payload Customization
- Used Payload's built-in admin, no custom React dashboard
- Removed Tailwind CSS from backend to avoid UI conflicts
- This ensures Payload's localization tabs display correctly

### Collections Updates
1. **Properties features field:** Changed from `relationship` to `array`
   - Now matches Projects (inline text input, not selector)
   - Removed `featured` checkbox field

### Project Structure
- Clean 2-tier architecture (Frontend + Payload Backend)
- No custom admin UI
- Single admin panel through Payload

---

## Manual Setup

### Prerequisites
- Docker Desktop running
- Ports 5433, 3010, 5173 available

### Start All Services
```bash
docker-compose up -d

# Verify
docker-compose ps
```

### Restart Payload Only
```bash
docker-compose up --build -d payload
```

### Access Points
- **Payload Admin:** http://localhost:3010/admin
- **Public Frontend:** http://localhost:5173
- **Database:** localhost:5433
