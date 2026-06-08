# Gateway Card Components Documentation

## Overview

The Gateway Card system has been redesigned with a clean vertical stack layout. There are two main card components for Projects and Properties, plus a section component that combines them.

---

## Components

### 1. GatewayCard (DiscoverProjectsCard)

**File:** `src/components/ui/DiscoverProjectsCard.tsx`

**Purpose:** Gateway card for Projects with vertical stack layout

**Layout:**
```
┌─────────────────────────────┐
│                             │
│      IMAGE (rounded)        │
│                             │
├─────────────────────────────┤
│  DISCOVER OUR PROJECTS     │  ← Single line
│                        [→]  │  ← Black circle button
└─────────────────────────────┘
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| imageSrc | string | Unsplash image | Image URL |
| imageAlt | string | "Our Projects" | Image alt text |
| onCardClick | function | - | Click handler |
| buttonHref | string | - | Link destination |
| title | string | Auto (EN/FR/AR) | Title text |

**Design Specs:**
- Base width: 380px (scales down on smaller screens)
- Image: `aspect-[4/3]`, `rounded-3xl`
- Title: 25px font-semibold, uppercase, single line
- Button: 36x36px black circle with white arrow
- Arrow hover: rotates -45deg
- RTL: arrow flips with `rotate-180`

**Languages:**
| Lang | Title | Button |
|------|-------|--------|
| EN | DISCOVER OUR PROJECTS | Discover more |
| FR | DÉCOUVREZ NOS PROJETS | Découvrir plus |
| AR | اكتشف مشاريعنا | اكتشف المزيد |

---

### 2. DiscoverPropertiesCard

**File:** `src/components/ui/DiscoverPropertiesCard.tsx`

**Purpose:** Gateway card for Properties with same design

**Props:** Same as GatewayCard

**Languages:**
| Lang | Title | Button |
|------|-------|--------|
| EN | DISCOVER OUR PROPERTIES | Discover more |
| FR | DÉCOUVREZ NOS PROPRIÉTÉS | Découvrir plus |
| AR | اكتشف عقاراتنا | اكتشف المزيد |

---

### 3. ProjectAndPropertySection

**File:** `src/components/sections/ProjectAndPropertySection.tsx`

**Purpose:** Section combining both cards with alternating layout

**Layout:**

**Desktop:**
```
┌─────────────────┬─────────────────────────────┐
│                 │                             │
│  CARD (Projects)│  Title + Description       │
│                 │                             │
├─────────────────┼─────────────────────────────┤
│  Title + Description        │  CARD (Properties)│
│                             │                  │
└─────────────────┴─────────────────────────────┘
```

**Mobile:**
```
┌─────────────────────────────┐
│  Title + Description         │
│  CARD (Projects)            │
├─────────────────────────────┤
│  Title + Description         │
│  CARD (Properties)           │
└─────────────────────────────┘
```

**Responsive Behavior:**
- Desktop (≥1020px): Cards and text side-by-side
- Mobile (<1020px): Stacked vertically, text above card
- Uses `flex-col-reverse md:flex-row` for mobile-first approach

**Padding:**
- `px-4 md:px-8 lg:px-16` (scales with screen size)
- `py-12 md:py-16` (vertical padding)

---

## Responsive Scaling

The cards use JavaScript-based scale transform for uniform scaling:

```typescript
const [scale, setScale] = useState(1);
const baseWidth = 380;

useEffect(() => {
  const calculateScale = () => {
    const container = document.querySelector('.gateway-card-container');
    if (container) {
      const containerWidth = container.clientWidth;
      const availableWidth = containerWidth - 64;
      const newScale = availableWidth / baseWidth;
      setScale(Math.min(newScale, 1));
    }
  };
  // ...
}, []);
```

---

## DiscoverMoreButton (Legacy)

**File:** `src/components/ui/DiscoverMoreButton.tsx`

**Purpose:** Standalone button component (used in old designs)

**Current Size:** 130x40px
**Text:** 12px
**Arrow Circle:** 6x6px

**Note:** The new GatewayCard components have the button built-in and don't use DiscoverMoreButton.

---

## Exports

**File:** `src/components/ui/index.ts`

```typescript
export { GatewayCard } from './DiscoverProjectsCard';
export { DiscoverPropertiesCard } from './DiscoverPropertiesCard';
export { DiscoverSection } from './DiscoverSection';
export { DiscoverMoreButton } from './DiscoverMoreButton';
```

**File:** `src/components/sections/index.ts`

```typescript
export { ProjectAndPropertySection } from './ProjectAndPropertySection';
export { AboutUsSection } from './AboutUsSection';
export { CompanyManifesto } from './CompanyManifesto';
```

---

## Design Rules

1. **Vertical Stack Layout** - Image on top, title below, button below title
2. **Single Line Title** - Use `whitespace-nowrap` to prevent wrapping
3. **JavaScript Scaling** - Use scale transform for uniform card sizing
4. **RTL Support** - Arrow icon flips with `rotate-180` for Arabic
5. **Responsive Section** - Use `flex-col md:flex-row` for mobile-first approach
6. **No Unnecessary Wrappers** - Remove extra divs that create empty space
