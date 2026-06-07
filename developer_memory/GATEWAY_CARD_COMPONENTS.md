# Gateway Card Components Documentation

## Overview

The Gateway Card system consists of two separate components for Left-to-Right (LTR) and Right-to-Left (RTL) layouts. They are kept separate for cleaner code and easier maintenance.

---

## Components

### 1. GatewayCardLTR

**File:** `src/components/ui/GatewayCardLTR.tsx`

**Purpose:** Gateway card for English and French (LTR languages)

**Languages:** English (en), French (fr)

**Structure:**
- Image on LEFT side
- Content on RIGHT side
- Button aligned LEFT

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| imageSrc | string | Unsplash image | Image URL |
| imageAlt | string | - | Image alt text |
| onCardClick | function | - | Click handler |
| href | string | - | Link destination |
| titleLine1 | string | - | First title line |
| titleLine2 | string | - | Second title line |
| buttonText | string | - | Button label |

**Fixed Dimensions:**
- Width: 650px
- Height: 420px
- Font size: configurable via props
- Gap between title lines: 0

---

### 2. GatewayCardRTL

**File:** `src/components/ui/GatewayCardRTL.tsx`

**Purpose:** Gateway card for Arabic (RTL language)

**Languages:** Arabic (ar)

**Structure:**
- Image on RIGHT side (visually)
- Content on LEFT side (visually)
- Button aligned RIGHT

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| imageSrc | string | Unsplash image | Image URL |
| imageAlt | string | - | Image alt text |
| onCardClick | function | - | Click handler |
| href | string | - | Link destination |
| titleLine1 | string | - | First title line |
| titleLine2 | string | - | Second title line |
| titleLine1Size | string | '32px' | First line font size |
| titleLine2Size | string | '32px' | Second line font size |
| buttonText | string | - | Button label |

**Fixed Dimensions:**
- Width: 650px
- Height: 420px
- Font sizes: configurable

---

## DualGatewaySection

**File:** `src/components/ui/DualGatewaySection.tsx`

**Purpose:** Container for two GatewayCards side-by-side

**Layout:**
- Mobile (<768px): Cards stacked vertically
- Tablet/Desktop (>=768px): Cards side by side with gap

**Responsive Breakpoints:**
- Mobile: `flex-col gap-4`
- Tablet/Desktop: `flex-row gap-8`

**Props:**
| Prop | Type | Default |
|------|------|---------|
| imageSrc1 | string | Unsplash image |
| imageSrc2 | string | Unsplash image |
| onCardClick1 | function | - |
| onCardClick2 | function | - |
| href1 | string | '/projects' |
| href2 | string | '/properties' |

**No JavaScript Scaling:** Uses Tailwind only for responsive behavior

---

## Content by Language

### English/French (LTR)
| Card | titleLine1 | titleLine2 | Button |
|------|------------|-------------|--------|
| Projects | DISCOVER OUR | PROJECTS | Discover more |
| Properties | DISCOVER OUR | PROPERTIES | Discover more |

### Arabic (RTL)
| Card | titleLine1 | titleLine2 | Font Sizes | Button |
|------|------------|-------------|-----------|--------|
| Projects | اكتشف | مشاريعنا | 50px / 40px | اكتشف المزيد |
| Properties | اكتشف | عقاراتنا | 50px / 48px | اكتشف المزيد |

---

## Responsive Behavior

**IMPORTANT:** No JavaScript useState/useEffect for scaling.

**Desktop/Tablet:**
- `flex-row gap-8` - cards side by side
- Cards fixed at 650×420px

**Mobile:**
- `flex-col gap-4` - cards stacked
- Cards full width

---

## DiscoverMoreButton

**File:** `src/components/ui/DiscoverMoreButton.tsx`

**Purpose:** Dark pill-shaped button with arrow icon

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| href | string | - | Link destination |
| onClick | function | - | Click handler |
| isRTL | boolean | false | RTL support |
| customText | string | 'Discover more' | Button label |

**Fixed Dimensions:**
- Width: 160px
- Height: 48px
- Border radius: 999px (pill)

**RTL Padding:** Automatically adjusts for RTL

---

## Exports

**File:** `src/components/ui/index.ts`

```typescript
export { GatewayCardLTR } from './GatewayCardLTR';
export { GatewayCardRTL } from './GatewayCardRTL';
export { DualGatewaySection } from './DualGatewaySection';
export { ActionPill } from './ActionPill';
export { DiscoverMoreButton } from './DiscoverMoreButton';
```

---

## Design Rules

1. **NO JavaScript scaling** - Use Tailwind only
2. **Fixed card dimensions** - 650×420px
3. **Separate LTR/RTL components** - No conditional logic inside
4. **Parent handles responsive** - DualGatewaySection manages layout
