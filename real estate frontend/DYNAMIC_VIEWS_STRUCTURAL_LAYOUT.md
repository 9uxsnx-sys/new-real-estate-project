# Dynamic Views Structural Layout

## Architectural & Component Structure Report

**Project:** Real Estate Frontend  
**Date:** 2026-06-13  
**Branch:** `seo`

---

## 1. Home.tsx

### Component Tree Architecture

```
Home
├── SEO (metadata)
├── NavigationNew (layout)
├── HeroSection (hero)
├── AboutUsSection (section)
├── CompanyManifesto (desktop conditional)
├── CompanyManifestoMobileVersion (tablet/mobile conditional)
├── ProjectAndPropertySection (section)
├── FAQSection (section)
└── Footer (layout)
```

### Data Fetching Hook/State Mapping

| State/Hook | Type | Purpose |
|------------|------|---------|
| `useParams` | React Router | Extract `lang` from URL route |
| `currentLang` | Derived | Default to 'en' if no lang param |

**Note:** Home page is a static content page with no API data fetching. Content is hardcoded with i18n translations.

### Dynamic Loops

| Loop | Component | Purpose |
|------|----------|---------|
| None | - | Static page, no dynamic lists |

### Localization/i18n Handling

```tsx
const { lang } = useParams<{ lang: string }>();
const currentLang = lang || 'en';
```

- Language extracted from URL: `/:lang/*`
- Used for SEO component metadata
- Components use `useTranslation` hook internally for content

---

## 2. PropertiesListing.tsx

### Component Tree Architecture

```
PropertiesListing
├── SEO (metadata)
├── HeroSection (filters - search/filter controls)
├── section (grid container)
│   └── div.grid (property cards)
│       └── PropertyCard (repeated)
├── Footer (layout)
```

### Data Fetching Hook/State Mapping

| State/Hook | Type | Source | Purpose |
|------------|------|--------|---------|
| `useProperties` | Custom Hook | `src/hooks/useProperties.ts` | Fetch properties array from API |
| `useSearchParams` | React Router | URL query params | Get `project` filter from URL |
| `sortBy` | useState | Local | Sort order (newest, price, etc.) |
| `searchQuery` | useState | Local | Text search input |
| `selectedProjectId` | useState | Local | Filter by project |
| `propertyTypeFilter` | useState | Local | Filter by type |
| `minSpace` / `maxSpace` | useState | Local | Space range filter |
| `visibleCount` | useState | Local | Pagination (load more) |

### Dynamic Loops

```tsx
{visibleProperties.map((property) => (
  <div key={property.id} className="property-card">
    <PropertyCard
      imageUrl={getImageUrl(property.image)}
      price={formatPrice(property.price)}
      title={property.name || property.property_code}
      location={...}
      beds={property.beds}
      baths={property.baths}
      space={property.space_sqm}
      propertyType={property.property_type}
      onClick={() => handlePropertyClick(property.id)}
    />
  </div>
))}
```

| Loop | Data Source | Limit | Wrapper |
|------|-------------|-------|---------|
| `properties.map()` | `useProperties` hook | `visibleCount` (default 8, +8 on load more) | `div.grid` |

### Localization/i18n Handling

```tsx
const { t } = useTranslation();
const { lang } = useParams<{ lang: string }>();
```

- `t()` used for loading/error states and empty state messages
- `lang` used for passing to `useProperties` hook for localized API calls

---

## 3. PropertyDetail.tsx

### Component Tree Architecture

```
PropertyDetail
├── SEO (metadata)
├── div (page container)
│   ├── button (back navigation)
│   ├── PropertyGallery (image carousel)
│   ├── div (price/location info)
│   │   ├── h2 (price)
│   │   └── div (location with MapPin icon)
│   ├── PropertySpecs (specifications table)
│   ├── div.grid (main content + sidebar)
│   │   ├── div.order-1 (content column)
│   │   │   ├── div (overview section)
│   │   │   ├── PropertyFeatures
│   │   │   └── PropertyLocation
│   │   └── div.order-2 (sidebar)
│   │       └── PropertyContactSidebar
│   └── Footer
```

### Data Fetching Hook/State Mapping

| State/Hook | Type | Source | Purpose |
|------------|------|--------|---------|
| `useProperty(id, lang)` | Custom Hook | `src/hooks/useProperty.ts` | Fetch single property by ID |
| `pageRef` | useRef | Local | GSAP animation context |
| `backBtnRef` | useRef | Local | Back button animation |
| `titleRef` | useRef | Local | Title animation |
| `priceRef` | useRef | Local | Price animation |

### Dynamic Loops

| Loop | Data | Purpose |
|------|------|---------|
| None | - | Single property detail, no list rendering |

**Features Data Processing:**
```tsx
const features: PropertyFeatureType[] = property.features && property.features.length > 0
  ? property.features.map((f: any, idx: number) => {...})
  : [/* default features */];
```

### Localization/i18n Handling

```tsx
const { id, lang } = useParams<{ id: string; lang: string }>();
const { t, i18n } = useTranslation();
const currentLang = lang || 'en';
```

- `id` extracted for `useProperty` hook
- `lang` passed to hook for localized API call
- `i18n.language` used for RTL direction logic

---

## 4. Projects.tsx

### Component Tree Architecture

```
Projects
├── SEO (metadata)
├── section (header with h1)
├── ProjectAlternatingSection (repeated per project)
├── section (CTA call-to-action)
│   ├── h3 (title)
│   ├── p (description)
│   └── button (navigate to properties)
└── Footer
```

### Data Fetching Hook/State Mapping

| State/Hook | Type | Source | Purpose |
|------------|------|--------|---------|
| `useProjects(currentLang)` | Custom Hook | `src/hooks/useProjects.ts` | Fetch projects array |
| `headerRef` | useRef | Local | Header animation |
| `ctaRef` | useRef | Local | CTA section animation |

### Dynamic Loops

```tsx
{projects.slice(0, 4).map((project, index) => (
  <ProjectAlternatingSection
    key={project.id}
    project={project as ProjectWithMeta}
    index={index}
    onExplore={() => handleProjectClick(project.id)}
  />
))}
```

| Loop | Data Source | Limit | Wrapper |
|------|-------------|-------|---------|
| `projects.slice(0, 4).map()` | `useProjects` hook | 4 projects | Alternating layout |

### Localization/i18n Handling

```tsx
const { lang } = useParams<{ lang: string }>();
const { t } = useTranslation();
const currentLang = lang || 'en';
```

- `currentLang` passed to `useProjects` for localized API call
- `t()` used for header title and CTA text

---

## 5. ProjectDetail.tsx

### Component Tree Architecture

```
ProjectDetail
├── SEO (metadata)
├── div (page container)
│   ├── button (back navigation)
│   ├── PropertyGallery (project images)
│   ├── div (title/location info)
│   │   ├── h2 (project name)
│   │   └── div (location with MapPin)
│   ├── div.grid (main content + sidebar)
│   │   ├── div.order-1 (content column)
│   │   │   ├── div (overview section)
│   │   │   ├── PropertyFeatures
│   │   │   ├── customSections.map() → ProjectSection
│   │   │   ├── PropertyLocation
│   │   │   └── div (properties in project)
│   │   │       └── PropertyCard (repeated)
│   │   └── div.order-2 (sidebar)
│   │       └── ProjectContactSidebar
│   └── Footer
```

### Data Fetching Hook/State Mapping

| State/Hook | Type | Source | Purpose |
|------------|------|--------|---------|
| `useProject(projectId, lang)` | Custom Hook | `src/hooks/useProject.ts` | Fetch single project |
| `useProperties({ projectId }, lang)` | Custom Hook | `src/hooks/useProperties.ts` | Fetch properties in project |
| `pageRef` | useRef | Local | GSAP animation context |
| `backBtnRef` | useRef | Local | Back button animation |
| `titleRef` | useRef | Local | Title animation |

### Dynamic Loops

**1. Custom Sections Loop:**
```tsx
{customSections.map((section, index) => (
  <div key={section.id} className="project-section">
    <ProjectSection {...section} index={index} />
  </div>
))}
```

**2. Properties in Project Loop:**
```tsx
{projectProperties.slice(0, 3).map((property) => (
  <div key={property.id} className="property-card">
    <PropertyCard
      imageUrl={getImageUrl(property.image)}
      price={formatPrice(property.price)}
      title={property.name || property.property_code}
      location={`${property.area}, ${property.city}`}
      beds={property.beds}
      baths={property.baths}
      space={property.space_sqm}
      propertyType={property.property_type}
      onClick={() => navigate(`/${currentLang}/property/${property.id}`)}
    />
  </div>
))}
```

| Loop | Data Source | Limit | Wrapper |
|------|-------------|-------|---------|
| `customSections.map()` | `project.custom_sections` | All sections | `div.project-section` |
| `projectProperties.slice(0, 3).map()` | `useProperties` hook | 3 properties | `div.grid` |

### Localization/i18n Handling

```tsx
const { projectId, lang } = useParams<{ projectId: string; lang: string }>();
const { t, i18n } = useTranslation();
const currentLang = lang || 'en';
```

- `projectId` for `useProject` hook
- `lang` for both hooks for localized API calls
- `i18n.language` for RTL direction

---

## Custom Hooks Summary

| Hook | Location | Returns | Usage |
|------|----------|---------|-------|
| `useProperties` | `src/hooks/useProperties.ts` | `{ properties, loading, error }` | PropertiesListing, ProjectDetail |
| `useProperty` | `src/hooks/useProperty.ts` | `{ property, loading, error }` | PropertyDetail |
| `useProjects` | `src/hooks/useProjects.ts` | `{ projects, loading, error }` | Projects |
| `useProject` | `src/hooks/useProject.ts` | `{ project, loading, error }` | ProjectDetail |

---

## URL Route Structure

| Route | Page | Lang Param |
|-------|------|------------|
| `/:lang` | Home | Yes |
| `/:lang/property/:id` | PropertyDetail | Yes |
| `/:lang/projects` | Projects | Yes |
| `/:lang/projects/:projectId` | ProjectDetail | Yes |

---

## i18n Language Codes

| Code | Language | Direction |
|------|----------|-----------|
| `en` | English | LTR |
| `fr` | French | LTR |
| `ar` | Arabic | RTL |

---

*Report generated on 2026-06-13*
