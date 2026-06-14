# Decision Log

**Purpose:** Track all architectural decisions with context, alternatives, and consequences.

**Update Protocol:** Append new decisions at TOP of file. Never delete old entries.

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