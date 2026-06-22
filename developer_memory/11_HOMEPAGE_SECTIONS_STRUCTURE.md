# Homepage Sections Structure & Development Approach

**Status:** Active Development
**Last Updated:** 2026-06-22
**Location:** `real estate frontend/src/components/home/`

---

## Overview

The new homepage is being built with a **modular section-based architecture**. Each section has its own dedicated folder with components optimized for different screen sizes (desktop, tablet, mobile).

This approach ensures:
- **Clean code organization** - Each section is self-contained
- **Consistent design** - Same structure across all breakpoints
- **Easy maintenance** - Changes to one section don't affect others
- **Scalability** - Easy to add new sections or modify existing ones

---

## Folder Structure

```
components/home/
├── index.ts                    # Exports all section components
│
├── about-us/                   # About Us Section
│   ├── index.ts               # Exports
│   ├── AboutUsSection.tsx     # Desktop version
│   ├── AboutUsTabletSection.tsx # Tablet version
│   └── AboutUsSectionMobile.tsx # Mobile version
│
├── services/                   # Services Section
│   ├── index.ts               # Exports
│   ├── ServicesDesktopSection.tsx   # Desktop version (1024px+)
│   ├── ServicesTabletSection.tsx    # Tablet version (768-1024px)
│   └── ServicesMobileSection.tsx    # Mobile version (<768px)
│
├── gateway/                    # Gateway Section (Projects & Properties)
│   ├── index.ts               # Exports
│   ├── GatewayDesktopSection.tsx   # Desktop version (1024px+)
│   ├── GatewayTabletSection.tsx    # Tablet version (768-1024px)
│   └── GatewayMobileSection.tsx    # Mobile version (<768px)
│
├── faq/                        # FAQ Section (Client Concierge)
│   ├── index.ts               # Exports
│   ├── FaqDesktopSection.tsx       # Desktop version (1024px+)
│   ├── FaqTabletSection.tsx        # Tablet version (768-1024px)
│   └── FaqMobileSection.tsx        # Mobile version (<768px)
│
├── footer/                       # Footer Section
│   ├── index.ts               # Exports
│   ├── FooterDesktopSection.tsx     # Desktop version (1024px+)
│   ├── FooterTabletSection.tsx      # Tablet version (768-1024px)
│   └── FooterMobileSection.tsx      # Mobile version (<768px)
│
└── hero/                       # Future: Hero section
    ├── index.ts
    └── HeroSection.tsx
```

---

## Development Approach

### 1. Section Creation Workflow

When creating a new section:

```
1. Create folder: components/home/{section-name}/
2. Create main component: {SectionName}Section.tsx (desktop version)
3. Create variants: {SectionName}TabletSection.tsx, {SectionName}MobileSection.tsx
4. Create index.ts with exports
5. Update components/home/index.ts with new section exports
6. Update DevHome.tsx to use auto-switching logic
```

### 2. Component Naming Convention

| Screen Size | File Name | Breakpoint | Props |
|-------------|-----------|------------|-------|
| Desktop | `{Name}Section.tsx` | 1024px+ | `lang`, `className` |
| Tablet | `{Name}TabletSection.tsx` | 768-1024px | `lang`, `className` |
| Mobile | `{Name}MobileSection.tsx` | <768px | `lang`, `className` |

### 3. Component Structure Pattern

Each section component follows this pattern:

```tsx
import React from 'react';
import { IconName } from '@phosphor-icons/react';

// Props interface
interface SectionProps {
  className?: string;
  lang?: string;
}

// Font family helper
const getFontFamily = (lang: string) => {
  return lang === 'ar' ? "'Noto Sans Arabic', sans-serif" : "'Inter', sans-serif";
};

// Service content (multi-language)
const getContent = (lang: string) => {
  const content = {
    en: { /* English content */ },
    fr: { /* French content */ },
    ar: { /* Arabic content */ }
  };
  return content[lang as keyof typeof content] || content.en;
};

// Icon components (using Phosphor Icons)
const IconComponent: React.FC = () => (
  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#85e7ff' }}>
    <IconName size={22} weight="fill" color="white" />
  </div>
);

// Card component (reusable)
interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Card: React.FC<CardProps> = ({ icon, title, description }) => (
  <div className="bg-white shadow-md rounded-xl p-5">
    {/* Icon at top */}
    <div className="mb-4">{icon}</div>
    {/* Text content */}
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

// Main component
export const SectionNameSection: React.FC<SectionProps> = ({ 
  className = '', 
  lang = 'en' 
}) => {
  const isRTL = lang === 'ar';
  const content = getContent(lang);
  const fontStyle = { fontFamily: getFontFamily(lang) };

  return (
    <section id="section-id" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header with tag, title, description */}
      {/* Cards section with responsive layout */}
    </section>
  );
};
```

### 4. Auto-Switching in DevHome.tsx

Each section uses screen size detection hooks:

```tsx
// Hook to detect mobile screen size (below md = 768px)
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

// Hook to detect tablet screen size (768px to 1024px)
const useIsTablet = () => {
  const [isTablet, setIsTablet] = useState(false);
  
  useEffect(() => {
    const checkTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width >= 768 && width < 1024);
    };
    
    checkTablet();
    window.addEventListener('resize', checkTablet);
    
    return () => window.removeEventListener('resize', checkTablet);
  }, []);
  
  return isTablet;
};
```

**Usage in DevHome.tsx:**
```tsx
{isMobile ? (
  <SectionMobileSection lang={lang} />
) : isTablet ? (
  <SectionTabletSection lang={lang} />
) : (
  <SectionSection lang={lang} />
)}
```

---

## Current Sections

### 1. About Us (`about-us/`)

| Version | File | Features |
|---------|------|----------|
| Desktop | `AboutUsSection.tsx` | Bento grid with 3 cards |
| Tablet | `AboutUsTabletSection.tsx` | Stacked vertical cards, larger headline text |
| Mobile | `AboutUsSectionMobile.tsx` | Stacked vertical cards |

**Features:**
- Headline with icons (Home, Shield)
- Image card (team collaboration photo)
- Established card (2013)
- Financing card (100%)
- Projects card (06 total)

**Tablet Styling:**
- Section padding: `px-14 py-20`
- Headline: `text-5xl`
- Cards: `p-6` padding, centered with `max-w-screen-md`
- Card values: `text-7xl` for year, `text-6xl` for percentages

---

### 2. Services (`services/`)

| Version | File | Features |
|---------|------|----------|
| Desktop | `ServicesDesktopSection.tsx` | 3 horizontal cards |
| Tablet | `ServicesTabletSection.tsx` | 3 vertical stacked cards |
| Mobile | `ServicesMobileSection.tsx` | 3 vertical stacked cards |

**Cards:**
- Residential Properties (House icon)
- Commercial & Office Spaces (Briefcase icon)
- Premium Apartment Rentals (MapPin icon)

**Icon style:** Sky blue background (`#85e7ff`) with white icon

---

### 3. Gateway (`gateway/`)

| Version | File | Features |
|---------|------|----------|
| Desktop | `GatewayDesktopSection.tsx` | 2 horizontal cards with icon, title, description, features, CTA |
| Tablet | `GatewayTabletSection.tsx` | 2 vertical stacked cards (same content) |
| Mobile | `GatewayMobileSection.tsx` | 2 vertical stacked cards with smaller typography |

**Cards:**
- **Card 1 - Explore Our Projects:** Buildings icon (sky blue `#85e7ff`), features list, "Explore Projects" CTA
- **Card 2 - View Available Properties:** MapPin icon (sky blue `#85e7ff`), features list, "View Properties" CTA

**Card Content (Updated):**
- Card 1 features: 4 successful projects completed, 2 projects under development, Prime locations in Algiers & Boumerdès, Premium quality construction
- Card 2 features: Ready-to-move-in apartments, Commercial spaces & offices, Apartment rentals available, Flexible payment options

**Card Structure:**
```
┌─────────────────────────────────────┐
│ [Icon]  FLAGSHIP PROJECTS           │  ← Tag (uppercase, mono font)
│                                     │
│ Explore Our Projects                 │  ← Title (h3, tracking-[-0.06em])
│                                     │
│ Discover our portfolio of...         │  ← Description
│                                     │
│ ┌───────────────────────────────┐   │
│ │ ✓ 4 successful projects...   │   │  ← Features list (bg-zinc-50)
│ │ ✓ 2 projects under...        │   │
│ │ ✓ Prime locations...         │   │
│ │ ✓ Premium quality...         │   │
│ └───────────────────────────────┘   │
│                                     │
│ ┌─────────────────────────────┐     │
│ │    EXPLORE PROJECTS        │     │  ← CTA Button (white text, black bg)
│ └─────────────────────────────┘     │
└─────────────────────────────────────┘
```

**Card Styling:**
- Card width: `w-[480px]` (Desktop), `w-full` (Tablet/Mobile)
- Border radius: `rounded-xl`
- Shadow: `shadow-md`
- Padding: `p-5` (Desktop), `p-4` (Mobile)
- Icon: `#85e7ff` color only (no background container)
- Features list: `bg-zinc-50` background, checkmark icons
- CTA: Black pill button with white text (`text-white`)

**Responsive Layout:**
- Desktop: Cards side by side (horizontal), `gap-3`
- Tablet: Cards stacked (vertical), `gap-3`
- Mobile: Cards stacked (vertical), `gap-3`, `px-6` section padding

**Dependencies:**
- `Buildings` from `@phosphor-icons/react` (Flagship Projects)
- `MapPin` from `@phosphor-icons/react` (Available Units)
- `Check` from `lucide-react` (features checkmarks)

---

### 4. FAQ (`faq/`)

| Version | File | Features |
|---------|------|----------|
| Desktop | `FaqDesktopSection.tsx` | Gray cards with accordion, 7 Q&A items |
| Tablet | `FaqTabletSection.tsx` | Same structure, smaller typography |
| Mobile | `FaqMobileSection.tsx` | Full width cards, mobile-optimized |

**Header:**
- Tag: "CLIENT CONCIERGE" (EN) / "CONCIERGERIE CLIENT" (FR) / "خدمة العملاء المتميزة" (AR)
- Title: "Clear answers for your property journey"
- Description: "Everything you need to know about our architectural standards..."

**Questions (7 total):**
1. Who are we?
2. What services do you offer?
3. What are your achievements?
4. What are your values?
5. Where do you operate?
6. How can I contact you?
7. Do you offer payment plans?

**Card Styling:**
- Background: `bg-zinc-100`
- Border radius: `rounded-[20px]` (Desktop/Tablet), `rounded-2xl` (Mobile)
- Card width: `max-w-[700px]` (Desktop), `max-w-[600px]` (Tablet), full width (Mobile)
- Padding: `p-5 md:p-6` (Desktop), `p-5` (Tablet), `p-4` (Mobile)

**FAQ Features:**
- Accordion with ChevronDown icon
- First item expanded by default
- RTL support for Arabic (text right-aligned, icon on left)

**Dependencies:**
- `ChevronDown` from `lucide-react`

---

### 5. Footer (`footer/`)

| Version | File | Features |
|---------|------|----------|
| Desktop | `FooterDesktopSection.tsx` | Horizontal layout with logo/contact left, shortcuts right |
| Tablet | `FooterTabletSection.tsx` | Stacked layout with logo, description (70% width), shortcuts grid, contact, social, copyright |
| Mobile | `FooterMobileSection.tsx` | Same stacked layout, description takes full width |

**Structure (Tablet/Mobile):**
```
┌─────────────────────────────────────────────────────────┐
│ [Logo]  Aeline                                       │
│ Description... (70% on tablet, full on mobile)       │
│ ┌──────────────────┐  ┌──────────────────┐            │
│ │ Home │ About us  │  │ Services │ FAQ  │            │
│ │ Properties │ Projects │                                  │
│ └──────────────────┘                                  │
│ Contact info block                                    │
│ Social media icons                                    │
│ © 2025 Tasdiria. All rights reserved.               │
└─────────────────────────────────────────────────────────┘
```

**Footer Features:**
- Logo with SVG icon + text (Inter font)
- Company description (Inter font)
- Contact info: Email, Address, Phone (filled icons, off-white text)
- Navigation shortcuts: 6 links in 2-column grid
- Social media icons: WhatsApp, Instagram, TikTok, Facebook (filled, white)
- Copyright text

**Desktop Styling:**
- Outer: White bg, `p-3`
- Inner: `bg-neutral-900 rounded-3xl`, `h-[350px]`, `p-10`
- Container: `flex flex-col justify-between`

**Dependencies:**
- `EnvelopeSimple`, `MapPin`, `Phone` from `@phosphor-icons/react` (contact icons)
- `WhatsappLogo`, `InstagramLogo`, `TiktokLogo`, `FacebookLogo` from `@phosphor-icons/react` (social icons)

---

## Design Specifications

### Typography

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Tag | `text-sm` + `tracking-[1.6px]` | Same | `text-xs` |
| Title | `text-5xl` + `tracking-[-0.06em]` | `text-5xl` | `text-3xl` |
| Description | `text-base` | `text-base` | `text-sm` |
| Card Title | `text-3xl` | `text-2xl` | `text-xl` |
| Card Description | `text-base` | `text-base` | `text-sm` |
| Features text | `text-sm` | `text-sm` | `text-xs` |

### Spacing

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Section padding | `px-14 py-20` | `px-14 py-20` | `px-6 py-10` |
| Container gap | `gap-y-16` | `gap-y-16` | `gap-y-10` |
| Cards container gap | `gap-3` | `gap-3` | `gap-3` |
| Card padding | `p-5` | `p-5` | `p-4` |

### Cards

| Property | Desktop | Tablet | Mobile |
|----------|---------|--------|--------|
| Background | white | white | white |
| Shadow | `shadow-md` | `shadow-md` | `shadow-md` |
| Border radius | `rounded-xl` | `rounded-xl` | `rounded-xl` |
| Padding | `p-5` | `p-5` | `p-4` |
| Width | `w-[480px]` | `w-full` | `w-full` |
| Icon size | `24` | `22` | `20` |
| Icon color | `#85e7ff` | `#85e7ff` | `#85e7ff` |
| Button text color | `text-white` | `text-white` | `text-white` |

---

## Responsive Breakpoints

| Breakpoint | Width | Sections Rendered |
|------------|-------|-------------------|
| Mobile | <768px | `{Name}MobileSection.tsx` |
| Tablet | 768-1024px | `{Name}TabletSection.tsx` |
| Desktop | 1024px+ | `{Name}Section.tsx` |

---

## Future Sections

Planned sections to add:

```
components/home/
├── manifesto/          # Company manifesto (already exists in sections/)
├── projects/           # Projects showcase
├── properties/         # Properties listing
├── testimonials/       # Client testimonials
└── contact/            # Contact section
```

---

## Best Practices

1. **Keep content localized** - Use `getContent()` pattern with EN/FR/AR keys
2. **Use RTL support** - Always add `dir={isRTL ? 'rtl' : 'ltr'}` to section wrapper
3. **Consistent icons** - Use Phosphor Icons library
4. **Same icon style** - Sky blue background, white icon across all sections
5. **Self-contained components** - Each section folder is independent
6. **Document changes** - Update this file when adding new sections

---

## Files to Update

When adding a new section:

1. `components/home/{section}/index.ts` - Export components
2. `components/home/index.ts` - Re-export from subfolders
3. `src/pages/DevHome.tsx` - Add auto-switching logic
4. `developer_memory/11_HOMEPAGE_SECTIONS_STRUCTURE.md` - Document the new section

---

**Next:** Add Hero section following this structure