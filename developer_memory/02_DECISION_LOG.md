# Decision Log

**Purpose:** Track all architectural decisions with context, alternatives, and consequences.

**Update Protocol:** Append new decisions at TOP of file. Never delete old entries.

---

## 2026-06-20 (Afternoon) - Separate Mobile About Us Component

**Decision:** Create separate mobile-only `AboutUsSectionMobile.tsx` component instead of trying to make responsive CSS work for both

**Context:**
- About Us section was broken on mobile screens
- Complex flex classes and Tailwind breakpoints were causing layout issues
- h2 tags don't work well with flex classes for responsive behavior

**What Was Created:**

1. **AboutUsSectionMobile.tsx** - Mobile-only component
   - Clean, simple mobile-first design
   - All cards stacked vertically
   - Headline with icons inline (text + icon + text on one row)
   - Explicit font styling on every text element

2. **Auto-Switch in DevHome.tsx**
   - `useIsMobile()` hook detects screen width < 768px
   - Renders appropriate component based on screen size
   - No risk of breaking desktop/tablet

**Architecture:**
```
DevHome
├── < 768px → AboutUsSectionMobile (mobile)
└── ≥ 768px → AboutUsSection (desktop/tablet)
```

**Benefits:**
- Clean separation of concerns
- No CSS conflicts between mobile and desktop
- Easy to iterate on mobile without touching desktop
- Each component can have its own responsive logic

**Next Step:**
- Add Arabic font (Cairo) support to both components
- Use conditional font-family based on language

**Reversible:** Yes - can merge back into single component if needed

---

## 2026-06-20 - About Us Section Card Redesign

**Decision:** Redesign About Us section cards with real estate-focused content

**Context:**
- Original cards had generic "Data Points" and "Continents" content
- Client wanted content relevant to real estate development business
- Need multi-language support (EN/FR/AR)

**What Was Changed:**

1. **Financing Card (was Data Points → now FINANCING)**
   - Label: "Data Points" → "FINANCING" / "FINANCEMENT" / "تسهيلات الدفع"
   - Value: "520k+" → "100%"
   - Paragraph: Customized per language
   - Background: lime-300 → sky-400 (#85e7ff)
   - Added backdrop-blur-[20px]

2. **Projects Card (was Continents → now TOTAL PROJECTS)**
   - Label: "Continents" → "TOTAL PROJECTS" / "TOTAL PROJETS" / "إجمالي المشاريع"
   - Value: "20+" → "06"
   - Background: unchanged (neutral-900)

3. **Icon Changes**
   - GridIcon: Grid icon → Home icon (inline SVG)
   - StarIcon: Star icon → Shield checkmark (inline SVG)
   - Both icons: filled style with rounded clipPath

4. **Headline Text**
   - New multilingual headline with icons between text segments
   - English: "A premier Algerian developer" / "dedicated to building [home] modern spaces" / "and [shield] lasting trust"
   - French: "Un promoteur de premier plan" / "dédié à bâtir des [home] espaces modernes" / "et une [shield] confiance durable"
   - Arabic: "شركة ترقية عقارية رائدة" / "[home] مشاريع متميزة / تلتزم دائماً بإنجاز" / "و أيضًا [shield] بناء ثقتكم"

**Reversible:** Yes - can revert to original content

---

## 2026-06-17 - Dev Homepage Route for Isolated Development

**Decision:** Create `/dev` route separate from main site for new homepage development

**Context:**
- Need to develop new homepage without affecting existing site
- Isolated page with own components and styling
- Supports EN/FR/AR via query param (`?lang=en|fr|ar`)

**What Was Created:**
- DevHome.tsx page component
- Route in App.tsx: `/dev` and `/dev/*`
- Independent from main Home.tsx

**Reversible:** Yes - can merge components back to main site when ready

---

## 2026-06-17 - About Us Section from Framer Template

**Decision:** Build new AboutUsSection using Framer template HTML/CSS as design reference

**Context:**
- Client provided aeline.framer.website as design inspiration
- Extract HTML/CSS and convert to React/Tailwind
- Preserve Framer-specific classes that work with Tailwind

**What Was Implemented:**
- AboutUsSection with multi-line headline + 3 cards bento grid
- Plus Jakarta Sans font with custom @font-face declarations
- @layer component CSS for Framer-specific styles
- Fixed WebkitMask syntax errors with inline SVG components

**CSS Layer Handling:**
- `@layer base, component;` added at top of globals.css (above Tailwind imports)
- Component-specific styles preserved

**Reversible:** Yes - can remove and replace with alternative design

---

## 2026-06-17 - Card Container Integrity Rule

**Decision:** Never modify card container classes when editing card content

**Context:**
- Editing card content was breaking responsive layout
- Card containers have complex flex/stretch classes for bento grid alignment
- Modifying container classes affected card heights and positioning

**Rule Established:**
- Keep card container classes intact (bg-zinc-100, flex-col, rounded-3xl, p-5, etc.)
- Only modify inner content elements
- This preserves responsive behavior and layout integrity

**Reversible:** This is a development guideline, not code

---

## 2026-06-17 - Language Detection via `lang` Prop

**Decision:** Use `lang` prop instead of `isRTL` for multi-language components

**Context:**
- Components needed to show different content per language (EN/FR/AR)
- Using `isRTL` only distinguished RTL (Arabic) from LTR
- Need to detect all three languages for proper content

**What Was Changed:**
- Changed AboutUsSectionProps from `isRTL?: boolean` to `lang?: string`
- Components receive `lang` prop and determine `isRTL` internally
- Content objects with keys: `en`, `fr`, `ar`

**Example:**
```typescript
const current = content[lang as keyof typeof content] || content.en;
```

**Reversible:** Yes - can revert to `isRTL` if only 2 languages needed

---

## 2026-06-14 - Theme Toggle Removed

**Decision:** Remove dark mode/light mode theme toggle from navigation

**Context:**
- Theme toggle was implemented but was incomplete (dark mode wasn't fully applied to all components)
- Client requested to remove the theme toggle option
- Website will remain as light mode only

**What Was Changed:**
- Removed theme dropdown from NavigationNew.tsx
- Removed theme selector from MobileMenuCard.tsx
- Removed Sun/Moon icons from imports
- Removed theme state management (themeOpen, currentTheme, handleThemeChange)
- Removed theme-related props from MobileMenuCard

**Reversible:** Yes - can re-add theme toggle code if needed

---

## 2026-06-14 - Removed Animations from Public Pages

**Decision:** Remove all animations from public-facing pages except CompanyManifesto sections

**Context:**
- Client requested removal of animations for faster page loads and cleaner UX
- Company manifesto text animation (word-by-word reveal) should be preserved as key visual element
- Animation library imports (framer-motion, gsap) removed from affected components

**What Was Changed:**

1. **Projects Page**
   - `real estate frontend/src/pages/Projects.tsx` - Removed GSAP imports and useEffect animation
   - `real estate frontend/src/components/project/ProjectAlternatingSection.tsx` - Removed `motion.div`
   - `real estate frontend/src/components/project/LargeImageComponent.tsx` - Removed `motion.div`
   - `real estate frontend/src/components/project/InfoCardComponent.tsx` - Removed `motion.div` and `motion.button`

2. **Project Detail Page**
   - `real estate frontend/src/pages/ProjectDetail.tsx` - Removed GSAP imports, useEffect, and all animation code

3. **Navigation Components**
   - `real estate frontend/src/components/layout/Navigation.tsx` - Removed GSAP and framer-motion
   - `real estate frontend/src/components/layout/NavigationNew.tsx` - Removed framer-motion AnimatePresence
   - `real estate frontend/src/components/layout/LanguageSwitcher.tsx` - Removed framer-motion
   - `real estate frontend/src/components/layout/LanguageSwitcherV2.tsx` - Removed framer-motion
   - `real estate frontend/src/components/layout/MobileMenuCard.tsx` - Removed framer-motion

4. **Home Page**
   - `real estate frontend/src/App.tsx` - Removed PageTransition wrapper from home route
   - `real estate frontend/src/components/sections/HeroSection.tsx` - Removed framer-motion fade-in animation
   - `real estate frontend/src/components/ui/property-card-list.tsx` - Removed framer-motion scroll animations and carousel effects

5. **Page Transition**
   - `real estate frontend/src/components/animations/PageTransition.tsx` - Removed header from animation selector

**What Was Preserved:**
- `CompanyManifesto.tsx` - Word-by-word text animation with GSAP ScrollTrigger
- `CompanyManifestoMobileVersion.tsx` - Word-by-word text animation with GSAP ScrollTrigger

**Benefits:**
- Faster page loads
- Cleaner, more professional UX
- No animation jank on slower devices
- SEO-friendly (no CLS from animations)

**Reversible:** Yes - can re-add framer-motion imports and animation wrappers if needed

---

## 2026-05-31 - Currency Changed from USD to DA (Algerian Dinar)

**Decision:** Change price display from USD to Algerian Dinar (DA)

**Context:**
- Site is for Algerian market
- USD symbol ($) was confusing
- Standard format: `1,500,000,000 DA`

**What Was Changed:**

1. **File:** `real estate frontend/src/utils/formatters.ts`
```typescript
// Before
return new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
}).format(price);

// After
return price.toLocaleString('en-US') + ' DA';
```

**Display Format:** `1,500,000,000 DA` (Price + DA)
**Benefit:** Clear currency for Algerian audience
**Reversible:** Yes

---

## 2026-05-31 - Dynamic Contact Collection

**Decision:** Create Contact collection for dynamic phone/whatsapp configuration

**Context:**
- Phone/whatsapp were hardcoded in PropertyContactSidebar
- Owner needed ability to change contact info without code changes
- Future-proof for multiple contacts (main office, sales, support)

**What Was Created:**

1. **Collection:** `real-estate-backend/src/collections/Contact.ts`
```typescript
fields: [
  { name: 'name', type: 'text', required: true },
  { name: 'phone', type: 'text', required: true },
  { name: 'whatsappURL', type: 'text', required: true },
]
```

2. **Hook:** `real estate frontend/src/hooks/useContact.ts`
   - Fetches first contact from API
   - Returns phone and whatsappURL for sidebar

3. **Updated:** `PropertyContactSidebar.tsx`
   - Now fetches from Contact collection
   - Falls back to hardcoded values if no contact exists

**Benefits:**
- Owner can change contact info from admin panel
- No code changes needed for contact updates
- Easy to add more contact types later

**Usage:**
1. Go to http://localhost:3010/admin → Contact
2. Create contact with name, phone, whatsappURL
3. Sidebar will use these values

**Reversible:** Yes

---

## 2026-05-31 - Removed `name` Field from Properties Collection

**Decision:** Remove unused `name` field from Properties collection

**Context:**
- Properties had a `name` field that was never displayed on frontend
- Frontend already used `property_code` for titles
- Redundant data that served no purpose

**What Was Changed:**

1. **Backend:** `real-estate-backend/src/collections/Properties.ts`
   - Removed `name` field
   - Changed `useAsTitle` from 'name' to 'property_code'

2. **Frontend:** Multiple files updated to use `property_code`:
   - `PropertiesListing.tsx` - Card titles
   - `ProjectDetail.tsx` - Property cards in project
   - `PropertyDetail.tsx` - Gallery title, fallback description
   - `property.ts` - Removed name from type interface

**Database Note:**
- Adding `localized: true` required schema migration
- Payload prompted for data loss warning (auto-accepted via Dockerfile)
- Old data in `name` field was lost (acceptable - wasn't used)

**Reversible:** Yes, can add field back if needed

---

## 2026-05-31 - RTL Support for m² in Arabic

**Decision:** Keep numbers with m² in LTR order within RTL Arabic layout

**Context:**
- In Arabic (RTL) layout, numbers were being displayed right-to-left
- `205 m²` would show as `²m 205` (reversed)
- Need `dir="ltr"` to preserve number order

**What Was Changed:**

**File:** `real estate frontend/src/components/property-detail/PropertySpecs.tsx`
```tsx
const isRTL = i18n.language === 'ar';

<span>
  {isRTL 
    ? <><span dir="ltr">{property.space_sqm} m²</span></> 
    : `${property.space_sqm} m²`}
</span>
```

**Display:**
- English: `205 m²`
- Arabic: `205 m²` (numbers stay left-to-right)

**Reversible:** Yes