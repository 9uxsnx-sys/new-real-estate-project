# Services Section Component

**Status:** Completed (Desktop version)
**Last Updated:** 2026-06-20

---

## Overview

A premium Services section component with 3 service cards for real estate services. Located at `/dev` route.

---

## File Structure

```
components/home/services/
├── index.ts                      # Exports
└── ServicesDesktopSection.tsx     # Main component
```

---

## Component Features

### Header Section
- **Tag:** "Services" with dot indicator
- **Main Title:** Multi-language headline
- **Sub-headline:** Description paragraph

### Service Cards (3 cards)
1. **Card 1 - Residential Properties**
   - Icon: House (Phosphor Icons)
   - Left side: Icon + Text
   - Right side: Image

2. **Card 2 - Commercial & Office Spaces**
   - Icon: Briefcase (Phosphor Icons)
   - Text only (75% width)

3. **Card 3 - Premium Apartment Rentals**
   - Icon: MapPin (Phosphor Icons)
   - Text only (75% width)

---

## Icon Library

**Library:** Phosphor Icons (@phosphor-icons/react)

### Icons Used
| Card | Icon | Weight |
|------|------|--------|
| Residential Properties | House | fill |
| Commercial & Office | Briefcase | fill |
| Premium Rentals | MapPin | fill |

### Icon Styling
```tsx
<div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#85e7ff' }}>
  <IconName size={22} weight="fill" color="white" />
</div>
```

---

## Card Layout

### Card 1 (with image)
- Full width: `flex-1`
- Layout: Flex row (text left, image right)
- Icon pinned to top
- Text pinned to bottom

### Card 2 & 3 (text only)
- Width: `flex-[2]` (2x wider than Card 1)
- Text container: `w-3/4` (75% width)
- Icon pinned to top
- Text pinned to bottom

---

## Content Translations

### English

| Field | Content |
|-------|--------|
| Tag | Services |
| Main Title | Comprehensive property solutions and architectural excellence |
| Sub-headline | Delivering modern living and premium commercial environments across Algiers and Boumerdès. |
| Card 1 Title | Residential Properties |
| Card 1 Desc | Developing premium apartments designed with structural integrity, prime locations, and flexible payment plans. |
| Card 2 Title | Commercial & Office Spaces |
| Card 2 Desc | Engineering strategic retail shops and professional offices optimized for business growth and corporate distinction. |
| Card 3 Title | Premium Apartment Rentals |
| Card 3 Desc | Offering turnkey apartment leasing solutions in highly accessible, premium districts. |

### French

| Field | Content |
|-------|--------|
| Main Title | Solutions immobilières complètes et excellence architecturale |
| Sub-headline | Créer des espaces de vie modernes et des environnements commerciaux d'élite à Alger et Boumerdès. |
| Card 1 Title | Immobilier Résidentiel |
| Card 1 Desc | Conception d'appartements haut de gamme alliant qualité de finition, emplacements de choix et facilités de paiement. |
| Card 2 Title | Locaux & Bureaux Professionnels |
| Card 2 Desc | Réalisation de locaux commerciaux et de bureaux d'affaires idéalement situés pour maximiser votre activité. |
| Card 3 Title | Location d'Appartements |
| Card 3 Desc | Des solutions de location clés en main dans des quartiers résidentiels calmes et hautement accessibles. |

### Arabic (RTL)

| Field | Content |
|-------|--------|
| Main Title | حلول عقارية متكاملة وتميُّز هندسي مستدام |
| Sub-headline | نقدم مساحات سكنية وعملية حديثة تلبي تطلعاتكم في ولايتي الجزائر وبومرداس. |
| Card 1 Title | الشقق السكنية |
| Card 1 Desc | إنجاز شقق عصرية بمواصفات عالية الجودة، مواقع استراتيجية، وتسهيلات مرنة في الدفع بالتقسيط. |
| Card 2 Title | المحلات التجارية والمكاتب |
| Card 2 Desc | إنجاز محلات تجارية ومكاتب مهنية بمساحات استراتيجية مجهزة بالكامل لتطوير أعمالكم. |
| Card 3 Title | كراء الشقق السكنية |
| Card 3 Desc | توفير حلول كراء مرنة لشقق جاهزة للسكن في أرقى الأحياء السكنية وأكثرها حيوية. |

---

## Design Specifications

### Colors
| Element | Color |
|---------|-------|
| Icon Background | `#85e7ff` (sky blue) |
| Icon Fill | white |
| Card Background | white with shadow |
| Cards Container | `bg-zinc-100` |
| Text | neutral-900 |
| Description | neutral-500 |

### Typography
| Element | Style |
|---------|-------|
| Tag | Geist_Mono, uppercase, tracking-[1.6px] |
| Title | Plus Jakarta Sans, text-5xl, tracking-[-0.06em] |
| Description | Plus Jakarta Sans, text-base |

### Spacing
| Element | Value |
|---------|-------|
| Section Padding | px-14 py-20 |
| Card Gap | gap-3 |
| Card Padding | p-5 |

---

## Dependencies

```json
{
  "@phosphor-icons/react": "latest"
}
```

---

## Usage

```tsx
import { ServicesDesktopSection } from '@/components/home/services';

<ServicesDesktopSection lang="en" />
<ServicesDesktopSection lang="fr" />
<ServicesDesktopSection lang="ar" />
```

---

## Integration

Added to `DevHome.tsx` at `/dev` route:

```tsx
<ServicesDesktopSection lang={lang} />
```

---

## Future Enhancements

- [ ] Mobile version of Services section
- [ ] Hover effects on cards
- [ ] Click navigation to service pages
