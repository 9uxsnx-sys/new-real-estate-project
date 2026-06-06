# Company Manifesto Component

## Overview

A premium, scroll-driven word-by-word reveal animation component using GSAP (GreenSock) and ScrollTrigger. Text smoothly lights up word-by-word as the user scrolls down, and cleanly dims back out word-by-word when scrolling back up.

---

## Component Structure

### File Location
```
src/components/sections/CompanyManifesto.tsx
```

### Key Features
- Scroll-driven opacity animation (word by word)
- Multi-language support (EN, FR, AR with RTL)
- Responsive fluid typography scaling
- Premium centered layout
- Clean 4-line manifesto structure

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| className | string | '' | Additional CSS classes |

---

## Language Content Structure

```typescript
const manifestoContent = {
  en: {
    tag: 'CORPORATE PHILOSOPHY',
    lines: [
      'With a firm commitment to architectural excellence,',
      'we develop modern residential and commercial landmarks',
      'that bring long-term structural value, trust, and quality',
      'to families and businesses across Algeria.'
    ]
  },
  fr: {
    tag: 'NOTRE MANIFESTE',
    lines: [
      "Avec un engagement ferme pour l'excellence architecturale,",
      'nous développons des projets résidentiels et commerciaux modernes',
      "qui apportent une valeur durable, de la confiance et de la qualité",
      "aux familles et aux entreprises à travers l'Algérie."
    ]
  },
  ar: {
    tag: 'فلسفتنا العقارية',
    lines: [
      'بالتزام راسخ بالتميز المعماري والإتقان،',
      'نقوم بتطوير مشاريع سكنية وتجارية حديثة',
      'تمنح عملائنا قيمة مستدامة، ثقة، وجودة حقيقية',
      'للعائلات والشركات في جميع أنحاء الجزائر.'
    ]
  }
};
```

---

## Layout Architecture

### Section Wrapper
```tsx
<section 
  ref={sectionRef}
  className="w-full py-32 lg:py-40 bg-white select-none"
  dir={isRTL ? 'rtl' : 'ltr'}
>
```

### Content Container
```tsx
<div className="w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center space-y-[2vw] lg:space-y-5">
```

### Tag Element
```tsx
<span className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-gray-400 mb-6">
  {content.tag}
</span>
```

### Animated Lines (Word-by-Word)
```tsx
{content.lines.map((line, lineIndex) => {
  const words = line.split(' ');
  return (
    <div 
      key={lineIndex}
      className="w-[120%] text-center"
      style={{ fontFamily, whiteSpace: 'nowrap' }}
    >
      {words.map((word, wordIndex) => (
        <span 
          key={wordIndex}
          className="reveal-word inline-block mx-[0.12em] text-[4.8vw] sm:text-[4vw] md:text-[3.5vw] lg:text-[42px] font-semibold tracking-[-0.02em] leading-[1.3] text-[#111111] opacity-[0.15]"
        >
          {word}
        </span>
      ))}
    </div>
  );
})}
```

---

## GSAP ScrollTrigger Animation

### Setup
```typescript
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
```

### Animation Logic
```typescript
useEffect(() => {
  if (!textContainerRef.current) return;

  const words = textContainerRef.current.querySelectorAll('.reveal-word');

  const ctx = gsap.context(() => {
    gsap.fromTo(words,
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          end: 'bottom 40%',
          scrub: true,
          markers: false
        }
      }
    );
  }, sectionRef);

  return () => ctx.revert();
}, [content]);
```

### Animation Parameters
| Parameter | Value | Description |
|-----------|-------|-------------|
| opacity start | 0.15 | Initial word opacity (faded state) |
| opacity end | 1 | Final word opacity (fully visible) |
| stagger | 0.1 | Delay between each word animation |
| ease | none | Linear easing for smooth scroll binding |
| start | top 75% | Animation starts when section hits 75% viewport |
| end | bottom 40% | Animation ends when section reaches 40% viewport |
| scrub | true | Binds animation directly to scrollbar |
| markers | false | Debug mode disabled |

---

## Responsive Typography

### Font Scaling
| Breakpoint | Size |
|------------|------|
| Mobile (<640px) | text-[4.8vw] |
| Tablet (sm: 640px+) | text-[4vw] |
| Desktop (md: 768px+) | text-[3.5vw] |
| Large (lg: 1024px+) | text-[42px] |

### Word Spacing
- `mx-[0.12em]` - Space between words
- `tracking-[-0.02em]` - Tight letter spacing

### Line Height
- `leading-[1.3]` - Comfortable line height

---

## RTL Support

- `dir={isRTL ? 'rtl' : 'ltr'}` - Applied to section wrapper
- Font: `Cairo, sans-serif` for Arabic
- Font: `Geist, sans-serif` for EN/FR
- Content automatically switches based on `i18n.language`

---

## Files Involved

- `src/components/sections/CompanyManifesto.tsx` - Main component
- `src/components/sections/index.ts` - Export file
- `gsap` - Animation library
- `react-i18next` - Internationalization

---

## Usage

```tsx
import { CompanyManifesto } from '@/components/sections';

<CompanyManifesto />
// or with custom className
<CompanyManifesto className="my-custom-class" />
```

---

## Key Fixes Applied

1. **Line wrapping prevention**: Using `w-[120%]` on line containers to prevent word breaking
2. **Centering**: Flexbox with `items-center justify-center` on container
3. **Word spacing**: `mx-[0.12em]` for consistent gaps
4. **Scroll binding**: `scrub: true` binds animation to scroll position
5. **Cleanup**: `ctx.revert()` on unmount/language change

---

## Notes

- Words are split using `.split(' ')` (space delimiter)
- Each word wrapped in `<span>` with class `reveal-word` for GSAP targeting
- Animation re-runs when `content` changes (language switch)
- `select-none` prevents text selection during animation
- `opacity-0.15` is initial state for scroll animation trigger
