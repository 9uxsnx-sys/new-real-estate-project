# Home Page Desktop Layout Audit & Improvements

## Current Desktop Layout Issues

---

### 1. HERO SECTION

#### Current Structure (Updated 2026-06-13)
```
┌─────────────────────────────────────────────────────────────────┐
│ NAVBAR                                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│ ┌─────────────────────────────────────────────────────────────┐   │
│ │                     HERO IMAGE                               │   │
│ │  ┌──────────────────────┐                                   │   │
│ │  │ Building Your       │                                   │   │
│ │  │ Dreams Into Reality │                                   │   │
│ │  └──────────────────────┘                                   │   │
│ │  ┌──────────────────────┐                                   │   │
│ │  │ Discover exceptional│                                   │   │
│ │  │ living spaces...    │                                   │   │
│ │  └──────────────────────┘                                   │   │
│ └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

#### Changes Implemented (2026-06-13)
✓ **Layout changed:** From side-by-side to stacked (title above paragraph)
✓ **Paragraph width increased:** `w-[25%]` → `w-[40%]`
✓ **Arabic spacing added:** `mt-6` margin-top for Arabic version
✓ **SEO optimized:** Single h1 for Google, mobile h1 has `aria-hidden="true"`

#### Status: ✅ RESOLVED (Partially)
- Layout now stacked vertically
- Paragraph width increased (addressed issue #4)
- Arabic version has proper spacing

---

### 2. ABOUT US SECTION

#### Current Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                         ABOUT US                                  │
│                        Who We Are                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│   At our core, we redefine       ┌─────────────────────────┐     │
│   real estate by anchoring      │                         │     │
│   trust before building...      │      ABOUT IMAGE        │     │
│                                 │                         │     │
│                                 └─────────────────────────┘     │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

#### Issues
1. **Image is too small** - Fixed 400px × 250px on desktop feels cramped
2. **Gap between text and image** - `gap-12` (48px) not enough breathing room
3. **Text line-height** - `1.65` could be more generous for readability
4. **No visual separation** - Section blends into next section
5. **Vertical padding** - `py-16 md:py-20 lg:py-24` varies too much between breakpoints
6. **Header margin** - `mb-10 md:mb-12 lg:mb-16` creates uneven spacing

#### Recommendations
```jsx
// Increase image size for desktop
style={{
  width: '480px',  // was 400px
  height: '320px',  // was 250px
}}

// Increase gap
className="grid grid-cols-[60%_40%] gap-16 lg:gap-20"

// Increase line-height for better readability
lineHeight: '1.8'

// Make padding consistent
className="py-20 lg:py-24"

// Increase header bottom margin
className="mb-12 lg:mb-16"
```

---

### 3. COMPANY MANIFESTO SECTION

#### Current Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                         CORPORATE PHILOSOPHY                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│       With a firm commitment to architectural excellence,           │
│       we develop modern residential and commercial landmarks       │
│       that bring long-term structural value...                    │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

#### Issues
1. **Words fade from 15% to 100% opacity** - Too subtle at bottom
2. **Animation timing** - Words fade too quickly
3. **Text alignment** - Centered text looks good but could use more padding

#### Recommendations
```jsx
// Make animation more visible
gsap.fromTo(words,
  { opacity: 0.2 },  // was 0.15
  { opacity: 1 }
);

// Increase stagger for more dramatic effect
stagger: 0.15,  // was 0.1

// Increase section padding
className="py-24 lg:py-32"
```

---

### 4. PROJECT & PROPERTY SECTION

#### Current Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│  ┌────────────────┐    ┌────────────────┐                       │
│  │                │    │                │                       │
│  │  PROJECT CARD  │    │  PROPERTIES    │                       │
│  │  (image)      │    │  FIND YOUR HOME│                       │
│  │                │    │  Browse our... │                       │
│  │  DISCOVER OUR  │    │                │                       │
│  │  PROJECTS  →  │    │                │                       │
│  └────────────────┘    └────────────────┘                       │
│                                                                   │
│  ┌────────────────┐    ┌────────────────┐                       │
│  │  PROPERTIES    │    │                │                       │
│  │  TROUVEZ VOTRE │    │  PROPERTY CARD │                       │
│  │  Browse our... │    │  (image)      │                       │
│  │                │    │                │                       │
│  └────────────────┘    │  DISCOVER OUR  │                       │
│                       └────────────────┘                       │
└─────────────────────────────────────────────────────────────────┘
```

#### Issues
1. **NO SECTION HEADER** - Missing overarching "OUR SERVICES" or "WHAT WE OFFER" title
2. **Fixed width text cards** - `w-[448px]` breaks on medium-large screens
3. **Cards not aligned properly** - GatewayCard has auto-scale, text cards don't match
4. **Gap between rows** - `mt-8 md:mt-16` feels uneven
5. **Text card content cramped** - Description text too tight
6. **No visual balance** - Image cards and text cards feel disconnected

#### Recommendations
```jsx
// Add section header
<section className="w-full py-16 lg:py-20 px-[clamp(24px,4vw,80px)]">
  <div className="text-center mb-12 lg:mb-16">
    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 block mb-4">
      OUR SERVICES
    </span>
    <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-[#111111] uppercase">
      Explore What We Offer
    </h2>
  </div>
  
  {/* Rest of section */}
</section>

// Make text cards responsive
className="w-full md:w-[400px] lg:w-[448px]"

// Increase gap between rows
className="mt-12 lg:mt-20"

// Increase text card padding
className="p-10 lg:p-12"

// Add subtle border or shadow to text cards
className="bg-gray-100 rounded-3xl flex flex-col justify-center p-10 lg:p-12 border border-gray-200"
```

---

### 5. FAQ SECTION

#### Current Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                            FAQ                                    │
│                 FREQUENTLY ASKED QUESTIONS                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │ Who are we?                                          ▼ │     │
│  └─────────────────────────────────────────────────────────┘     │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │ What services do you offer?                          ▼ │     │
│  └─────────────────────────────────────────────────────────┘     │
│  ...                                                        │
└─────────────────────────────────────────────────────────────────┘
```

#### Issues
1. **Opening/closing animation** - Could be smoother
2. **First item should be closed** - Currently first FAQ opens by default
3. **Card padding** - Could be more generous

#### Recommendations
```jsx
// Close first FAQ by default
const [openIndex, setOpenIndex] = useState<number | null>(null);

// Increase card padding
className="bg-[#F5F5F5] rounded-2xl p-6 lg:p-8"

// Add subtle hover effect
className="bg-[#F5F5F5] rounded-2xl p-6 lg:p-8 hover:bg-gray-100 transition-colors"
```

---

### 6. FOOTER

#### Current Structure
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│  THE ONE                          Home  Projects  Properties      │
│  Building Your Dreams...              About Us  Contact            │
│                                       📷 📘 🔗 ❌                  │
│  ─────────────────────────────────────────────────────────────   │
│                                                                   │
│  Contact Us                                                    │
│  📍 123 Business Center...        © 2024 The One.              │
│  📞 +213 555 123 456                                        │
│  ✉️ info@theone.dz                  EN | FR | AR                │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

#### Issues
1. **Footer nav links** - All `href="#"` placeholders
2. **Logo area cramped** - Needs more vertical space
3. **Social icons** - Could be larger or styled differently
4. **Copyright year** - Hardcoded "2024" should be dynamic

#### Recommendations
```jsx
// Make footer more spacious
className="py-16 lg:py-20"

// Add proper navigation links
<nav className="flex gap-8">
  <a href={`/${currentLang}`} className="...">Home</a>
  <a href={`/${currentLang}/projects`} className="...">Projects</a>
  ...
</nav>

// Dynamic copyright year
const currentYear = new Date().getFullYear();
<p className="text-xs text-gray-400">© {currentYear} The One...</p>

// Larger social icons
className="w-12 h-12 lg:w-14 lg:h-14"
```

---

### 7. GENERAL DESKTOP SPACING ISSUES

#### Section Flow
```
Current:
Hero → About → Manifesto → Projects → FAQ → Footer

Issues:
- Hero to About: Natural flow ✓
- About to Manifesto: Needs more vertical space
- Manifesto to Projects: Feels abrupt, no visual break
- Projects to FAQ: Too much white space
- FAQ to Footer: Feels cramped
```

#### Recommendations
```jsx
// Add visual divider between Manifesto and Projects
<div className="w-full h-px bg-gray-200 my-12 lg:my-16" />

// Increase FAQ bottom margin
<FAQSection className="mb-8" />

// Increase footer top padding
<Footer className="pt-20 lg:pt-24" />
```

---

## SUMMARY OF CHANGES TO MAKE

### Priority 1: Layout Fixes
1. Add section header to ProjectAndPropertySection
2. Make text cards responsive (remove fixed 448px)
3. Add visual dividers between sections
4. Fix footer navigation links

### Priority 2: Spacing Improvements
1. About Us: Increase gap to 20, larger image
2. Projects/Properties: Increase row gap, card padding
3. FAQ: Consistent padding
4. Footer: More vertical space

---

## SEO IMPLEMENTATION STATUS

### ✅ Completed SEO Work

#### 1. SEO Component (`SEO.tsx`)
- **File:** `src/components/seo/SEO.tsx`
- Dynamic meta tags per page
- Open Graph tags for social sharing
- Twitter Card support
- Hreflang for i18n (EN/FR/AR)

#### 2. Hero Section SEO
- Single master h1 for Google (desktop)
- Mobile h1 hidden with `aria-hidden="true"`
- Trilingual content (EN/FR/AR)

#### 3. Image Accessibility
- 69.6% of images have proper alt attributes
- Property cards, project cards have descriptive alt text
- Gallery images have index-based alt text

### ⚠️ Pending SEO Improvements

| Issue | Priority | Status |
|-------|----------|--------|
| PropertyDetail.tsx multiple h1 | High | Pending |
| ProjectDetail.tsx multiple h1 | High | Pending |
| Preloader.tsx missing alt | Low | Pending |
| Add `<main>` semantic element | Medium | Pending |
| Footer nav links (href="#") | Medium | Pending |
| Dynamic copyright year | Low | Pending |

### SEO Files
- `src/components/seo/SEO.tsx` - Main SEO component
- `src/components/seo/index.ts` - Exports
- `SEO_AUDIT_REPORT.md` - Full audit documentation
- `HERO_SECTION_SEO_VALIDATION.md` - Hero section specific audit

### Priority 3: Polish
1. Hero: Adjust text sizing and gaps
2. Manifesto: Increase animation visibility
3. Footer: Dynamic copyright, proper links

---

## PROPOSED DESKTOP LAYOUT

```
┌─────────────────────────────────────────────────────────────────┐
│ NAVBAR                                                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│ ┌─────────────────────────────────────────────────────────────┐   │
│ │                       HERO IMAGE                             │   │
│ │                                                               │   │
│ │    Building Your                    Discover exceptional      │   │
│ │    Dreams Into                       living spaces...         │   │
│ │    Reality                                                   │   │
│ │                                                               │   │
│ └─────────────────────────────────────────────────────────────┘   │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                         ABOUT US                                  │
│                        Who We Are                                │
│                                                                   │
│   At our core, we redefine         ┌─────────────────────────┐     │
│   real estate by anchoring trust    │                         │     │
│   before building structures...      │       ABOUT IMAGE       │     │
│                                     │                         │     │
│                                     └─────────────────────────┘     │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                     CORPORATE PHILOSOPHY                          │
│                                                                   │
│        With a firm commitment to architectural excellence,          │
│        we develop modern residential and commercial...             │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│                       OUR SERVICES                               │
│                    Explore What We Offer                          │
│                                                                   │
│  ┌─────────────────────┐    ┌─────────────────────┐              │
│  │                     │    │    PROPERTIES        │              │
│  │   PROJECT IMAGE     │    │    FIND YOUR HOME   │              │
│  │                     │    │    Browse our...    │              │
│  │   DISCOVER OUR      │    │                     │              │
│  │   PROJECTS      →   │    │                 →   │              │
│  └─────────────────────┘    └─────────────────────┘              │
│                                                                   │
│  ┌─────────────────────┐    ┌─────────────────────┐              │
│  │    PROPERTIES      │    │                     │              │
│  │    TROUVEZ VOTRE   │    │   PROPERTY IMAGE    │              │
│  │    Browse our...   │    │                     │              │
│  │                    │    │   DISCOVER OUR      │              │
│  │                →   │    │   PROPERTIES    →   │              │
│  └─────────────────────┘    └─────────────────────┘              │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                            FAQ                                    │
│                 FREQUENTLY ASKED QUESTIONS                       │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │ Who are we?                                              │     │
│  └─────────────────────────────────────────────────────────┘     │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │ What services do you offer?                              │     │
│  └─────────────────────────────────────────────────────────┘     │
│  ...                                                          │
│                                                                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  THE ONE                    Home  Projects  Properties            │
│  Building Your Dreams...        About Us  Contact                 │
│                                   📷 📘 🔗 ❌                     │
│                                                                   │
│  ─────────────────────────────────────────────────────────────   │
│                                                                   │
│  Contact Us                          © 2024 The One.             │
│  📍 123 Business Center...                  EN | FR | AR        │
│  📞 +213 555 123 456                                        │
│  ✉️ info@theone.dz                                            │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```
