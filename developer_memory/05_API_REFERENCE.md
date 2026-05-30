# API Reference

**Last Updated:** 2026-05-29
**Purpose:** API endpoints, schemas, and usage examples for Payload CMS backend and public frontend.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Public Frontend (Vite)                    │
│                 localhost:5173                              │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐  │
│  │ Services → REST API calls                            │  │
│  └───────────────────────┬─────────────────────────────┘  │
└───────────────────────────│───────────────────────────────┘
                          │ API calls
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                    Payload CMS REST API                       │
│                 localhost:3010/api                           │
│                                                             │
│  Collections: Users, Projects, Properties, Media           │
└─────────────────────────────────────────────────────────────┘
```

---

## Base URLs

### Development
| Service | URL |
|---------|-----|
| **Payload Admin** | http://localhost:3010/admin |
| **Payload API** | http://localhost:3010/api |
| **Frontend (Vite)** | http://localhost:5173 |

---

## Authentication

### Login (Payload Admin)
```typescript
POST /api/users/login
Content-Type: application/json

Request:
{ "email": "admin@example.com", "password": "password" }

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": 1, "email": "...", "collection": "users" },
  "exp": 1234567890
}
```

### Authenticated Requests
```typescript
Headers: {
  'Content-Type': 'application/json',
  'Authorization': 'JWT {token}'
}
```

---

## Projects API

### Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/projects` | No | List all projects |
| GET | `/api/projects/:id` | No | Get single project |
| POST | `/api/projects` | Yes | Create project |
| PATCH | `/api/projects/:id` | Yes | Update project |
| DELETE | `/api/projects/:id` | Yes | Delete project |

---

## Properties API

### Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/properties` | No | List all properties |
| GET | `/api/properties/:id` | No | Get single property |
| POST | `/api/properties` | Yes | Create property |
| PATCH | `/api/properties/:id` | Yes | Update property |
| DELETE | `/api/properties/:id` | Yes | Delete property |

---

## Media API

### Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/media` | No | List media files |
| GET | `/api/media/:id` | No | Get single media |
| POST | `/api/media` | Yes | Upload media |
| DELETE | `/api/media/:id` | Yes | Delete media |

---

## Query Parameters

### Filtering
```
?where[name][contains]=Marina
?where[status][equals]=published
```

### Sorting
```
?sort=name
?sort=-price  // Descending
```

### Pagination
```
?page=1&limit=20
```

### Localization
```
?locale=en
?locale=fr
?locale=ar
```

### Relations (Depth)
```
?depth=0  // No relations
?depth=1  // Include relations
```

---

## Response Format

### List Response
```typescript
{
  "docs": [...],
  "totalDocs": 100,
  "totalPages": 5,
  "page": 1,
  "limit": 20
}
```

### Localized Fields
```typescript
{
  "name": { "en": "Marina Bay", "fr": "Marina Bay", "ar": "مارينا باي" },
  "price": 1500000  // Not localized
}
```

### Description Fields (textarea - plain text)
```typescript
{
  "description": "This is the full description text..."
}
// All description fields are now textarea type (plain text, not richText)
```

### Google Maps Embed URL
```typescript
{
  "google_map": "https://www.google.com/maps/embed?pb=!1m18!..."
}
// Accepts full Google Maps embed URLs only
// Short URLs (maps.app.goo.gl) are NOT supported
```

---

## Features Loading

### From Payload (Properties & Projects)
```typescript
// Features are loaded as inline arrays from Payload
const features = property.features && property.features.length > 0
  ? property.features.map((f) => ({ id: f.id, name: f.name }))
  : fallbackFeatures;
```

### Features Object Structure
```typescript
{
  "id": "abc123",
  "name": "Swimming Pool"
}
```

---

## Image Usage Rules

### Projects Collection

| Payload Field | Project Listing Page | Project Detail Gallery |
|-------------|---------------------|----------------------|
| `first_image` | ✅ Card thumbnail (60%) | ✅ Hero/first image |
| `second_image` | ✅ Card cover (40%) | ❌ NOT used |
| `gallery` | ❌ NOT used | ✅ All gallery images |

### Properties Collection

| Payload Field | Property Card | Property Detail |
|-------------|--------------|----------------|
| `image` | ✅ Card thumbnail | ✅ Hero image |
| `gallery` | ❌ NOT used | ✅ Full gallery |

### Gallery Logic (Code Reference)
```typescript
// ProjectDetail.tsx - Gallery
const galleryImages = project.gallery && project.gallery.length > 0
  ? project.gallery.map((img) => getImageUrl(img, 'full'))
  : project.first_image 
    ? [getImageUrl(project.first_image, 'full')]
    : [];
```

### Image Sizes Available
| Size | Dimensions | Use Case |
|------|-----------|----------|
| `thumbnail` | 400x300 | Small previews |
| `card` | 768x576 | List cards |
| `full` | 1920x1080 | Hero/gallery |

### Media Object Structure
```typescript
{
  "id": "123",
  "url": "/api/media/file/image.jpg",
  "filename": "image.jpg",
  "mimeType": "image/jpeg",
  "filesize": 102400,
  "width": 1920,
  "height": 1080,
  "alt": "Property image",
  "thumbnailURL": "/api/media/file/image.jpg?w=400",
  "cardURL": "/api/media/file/image.jpg?w=768",
  "fullURL": "/api/media/file/image.jpg?w=1920"
}
```

---

## Error Handling

| Code | Meaning |
|------|---------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |