# VistaHaven Real Estate Platform

A premium full-stack real estate platform built with React (frontend) and Payload CMS v3 (backend). Features multi-language support (EN/FR/AR with RTL), property listings, project showcases, and dynamic content management.

**Status:** ✅ **FULLY OPERATIONAL** - Using Payload's default admin panel at `/admin`. Clean 2-tier architecture.

**Last Updated:** May 29, 2026
**Version:** 0.9.0

---

## 🎯 Project Vision

VistaHaven is a **premium real estate platform** targeting high-end real estate markets (inspired by Dubai/Marina Bay aesthetic). It serves:

- **Property buyers** looking for luxury listings
- **Real estate agents** managing multiple projects
- **International clients** (hence EN/FR/AR support with RTL)

### Core Problems Solved
- ✅ Centralized property management with rich media (images, galleries)
- ✅ Multi-language property listings with proper RTL support
- ✅ Project-based organization (properties belong to developments)
- ✅ Beautiful presentation with smooth animations
- ✅ Payload CMS admin panel for content management

---

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React         │◄──►│   Payload CMS   │◄──►│   PostgreSQL    │
│   Frontend      │    │   v3 Backend    │    │   Database      │
│   (Vite)        │    │                 │    │                 │
│ • Public Site   │    │ • Admin Panel   │    │ • Relations     │
│ • Animations    │    │ • Admin APIs     │    │ • Multi-lang    │
│ • Multi-lang    │    │ • Media Upload  │    │ • Images        │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Key Decisions
1. **Payload v3 Native** - Using Next.js-native Payload
2. **PostgreSQL** - Production-ready database
3. **Payload Admin** - Using Payload's built-in admin panel
4. **Public Frontend** - React app with Vite

---

## 🛠️ Tech Stack

### Frontend (Vite)
- **React 19.2.4** + **TypeScript**
- **Vite** - Fast development server
- **Tailwind CSS** - Styling
- **GSAP** - Smooth animations
- **i18next** - Multi-language (EN/FR/AR)

### Backend (Payload CMS v3)
- **Payload CMS 3.84.1** - Headless CMS
- **Next.js 16.2.6** - App Router
- **PostgreSQL 16** - Database
- **Sharp** - Image processing
- **Lexical** - Rich text editor

---

## ✨ Features

### 🏢 Real Estate Management
- **Projects** - Development management
- **Properties** - Individual listings linked to projects
- **Rich Media** - Image galleries, thumbnails
- **Multi-language Content** - EN/FR/AR with localized fields

### 🎨 Frontend
- **Responsive Design** - Works on desktop, tablet, mobile
- **Smooth Animations** - GSAP-powered
- **Dark/Light Themes**

### 🌍 Multi-Language Support
- **English (EN)** - Default
- **French (FR)** - Full localization
- **Arabic (AR)** - RTL layout support

### 🔐 Authentication & Security
- **JWT-based authentication** via Payload
- **Role-Based Access** - Admin and editor roles

---

## 📁 Project Structure

```
VistaHaven/
├── real-estate-backend/         # Payload CMS Backend
│   ├── src/
│   │   ├── collections/      # Data models
│   │   └── app/             # Next.js routes
│   ├── payload.config.ts     # Payload config
│   └── package.json
│
├── real estate frontend/       # Public Frontend (Vite)
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/          # Pages
│   │   ├── hooks/          # Data hooks
│   │   └── i18n/           # Translations
│   └── package.json
│
├── developer_memory/           # Project documentation
└── docker-compose.yml        # Docker setup
```

---

## 🚀 Getting Started

### Using Docker (Recommended)

```bash
docker-compose up -d
```

**Services:**
- **Payload Admin:** http://localhost:3010/admin
- **Public Frontend:** http://localhost:5173
- **Database:** localhost:5433

### Access Payload Admin
1. Go to http://localhost:3010/admin
2. Create first admin user
3. Manage Projects, Properties, Media

---

## 🔧 Development

### Rebuild After Changes
After modifying Payload config or collections:
```bash
docker-compose up --build -d payload
```

### Localization Workflow
1. Fill all fields in **ENGLISH** (default)
2. **SAVE** the document
3. Switch to **FRENCH** tab - fill localized fields
4. **SAVE**
5. Switch to **ARABIC** tab - fill localized fields
6. **SAVE**

Non-localized fields (price, beds, baths) persist across locales.

---

## 📂 Deployment

### Docker
```bash
docker-compose -f docker-compose.yml up -d
```

### Manual
- **Frontend:** Deploy to Vercel/Netlify
- **Backend:** Deploy to VPS with Docker
- **Database:** PostgreSQL hosting

---

## 📝 License

Private project - All rights reserved