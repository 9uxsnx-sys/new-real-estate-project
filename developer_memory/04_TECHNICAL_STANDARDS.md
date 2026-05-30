# Technical Standards

**Last Updated:** 2026-05-29
**Purpose:** Coding conventions, environment specs, and development rules.

---

## Environment Specifications

### Ports Configuration (Docker)
| Service | Port | Container |
|---------|------|-----------|
| Frontend | 5173 | vistahaven-frontend |
| Payload CMS | 3010 | vistahaven-payload |
| PostgreSQL | 5433 | vistahaven-postgres |

### Database Credentials (Docker)
```
Name: payload_db
User: payload_user
Password: payload_pass123
Connection (Host): postgresql://payload_user:payload_pass123@localhost:5433/payload_db
Connection (Docker): postgresql://payload_user:payload_pass123@postgres:5432/payload_db
```

---

## Payload CMS Standards

### Collection Structure
```typescript
export const CollectionName: CollectionConfig = {
  slug: 'collection-slug',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'status', 'updatedAt'],
  },
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
};
```

### Localization Config
```typescript
localization: {
  locales: ['en', 'fr', 'ar'],
  defaultLocale: 'en',
  fallback: true,
},
```

### Localization Workflow
1. Fill all fields in ENGLISH (default)
2. **SAVE** the document
3. Switch to FRENCH tab - fill only localized fields
4. **SAVE**
5. Switch to ARABIC tab - fill only localized fields
6. **SAVE**

Non-localized fields persist across locales after first save.

### Field Types

#### Array Field (Inline)
```typescript
{
  name: 'features',
  type: 'array',
  label: 'Features/Amenities',
  fields: [
    { name: 'name', type: 'text', required: true }
  ]
}
```
Use when: Features are unique per item, no need to reuse across items.

#### Relationship Field
```typescript
{
  name: 'features',
  type: 'relationship',
  relationTo: 'features',
  hasMany: true
}
```
Use when: Features should be centrally managed and reused.

---

## Public Frontend (Vite + React) Standards

### File Naming
- **Components:** PascalCase (`PropertyCard.tsx`)
- **Hooks:** camelCase with `use` prefix (`useProjects.ts`)
- **Services:** camelCase (`api.ts`)
- **Types:** PascalCase (`project.ts`)

### API Service Pattern
```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3010';

export const api = {
  async getProjects() {
    const response = await fetch(`${API_BASE_URL}/api/projects`);
    return response.json();
  },
};
```

---

## CSS Styling Standards

### GSAP Animation Standards
```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.from('.hero-text', {
  y: 50,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out',
});
```

---

## Multi-Language (i18next) Standards

### Translation File Structure
```json
{
  "common": { "loading": "Loading..." },
  "home": { "title": "Find Your Dream Property" }
}
```

### Usage
```typescript
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
<h1>{t('home.title')}</h1>
```

### RTL Support
- Use Tailwind RTL utilities (`rtl:mr-4`)
- Check `dir="rtl"` in layout for Arabic

---

## Docker Development

### Container Management
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild specific service
docker-compose up --build -d payload
```

### Rebuild After Config Changes
Rebuild Payload container when changing:
- `package.json` dependencies
- Payload config (`payload.config.ts`)
- Collection schemas
- Any file in `src/collections/`

---

## Testing Standards

### Frontend Testing
```typescript
import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page.locator('h1')).toBeVisible();
});
```

---

## Deployment

### Environment Variables
```
# Backend (.env)
DATABASE_URL=postgresql://user:pass@host:5432/db
PAYLOAD_SECRET=your-secret-key
SERVER_URL=https://api.example.com

# Frontend (.env)
VITE_API_URL=https://api.example.com
```

### Production Checklist
- [ ] All secrets in environment variables
- [ ] Database migrations run
- [ ] HTTPS enabled
- [ ] CORS configured for production domains
- [ ] Static assets optimized
- [ ] Multi-language tested (EN/FR/AR)