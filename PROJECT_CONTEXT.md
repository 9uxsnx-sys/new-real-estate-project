# Project Context: VistaHaven Real Estate

**Last Updated:** 2026-05-28
**Status:** Full-stack application with two-tier architecture: Public Frontend (Vite) and Payload CMS backend (PostgreSQL).

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
│                    localhost:3000/3010                          │
│    ┌──────────────────────────────────────────────────────┐    │
│    │  Collections: Projects, Properties, Media, Users      │    │
│    │  Database: PostgreSQL                                 │    │
│    │  Auth: JWT tokens                                    │    │
│    │  Admin Panel: /admin                                 │    │
│    └──────────────────────────────────────────────────────┘    │
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
- **Payload CMS v3** - Headless CMS
- **Next.js 16** - App Router
- **PostgreSQL 18** - Database
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
- Status management (draft/published)

### Properties
- Individual listings linked to projects
- Multi-language content
- Price, beds, baths, area
- Rich media galleries
- Property types (Studio, F1, F2, etc.)

### Media
- Image uploads with resizing
- Alt text support
- Multiple sizes generated

### Features
- Property amenities
- Multi-language content

---

## Multi-Language Support

### Supported Languages
- **English (EN)** - Default
- **French (FR)** - Full localization
- **Arabic (AR)** - RTL support

### Localized Fields
- `name` - Project/Property names
- `description` - Rich text content
- `area`, `city` - Location fields
- Features and amenities

---

## Deployment

### Docker (Recommended)
```bash
docker-compose up -d
```

Services:
- PostgreSQL on port 5433
- Payload CMS on port 3010
- Public Frontend on port 5173

### Manual Setup
1. Start PostgreSQL
2. Configure `.env` with `DATABASE_URL`
3. Run `npm install` in `real-estate-backend`
4. Run `npm run dev` to start Payload CMS
5. Access admin at `http://localhost:3000/admin`
