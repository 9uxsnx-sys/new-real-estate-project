# Floating Card Design System

## Overview

This design uses a "floating card" layout where the hero section appears as a balanced, centered card inside the viewport with equal margins on all sides, creating a premium and clean look.

---

## Core Design Principles

### 1. Full Viewport Layout
- The navbar and hero section together fill 100% of the screen height
- No scrolling on initial view
- Components adapt automatically to any screen size (small, medium, or large)

### 2. Floating Card Hero Section
- Hero image/container has **rounded corners** (using Tailwind's `rounded-3xl` or similar)
- Has **equal padding** on all four sides (left, right, top, bottom)
- The padding is the space between the card edges and the surrounding elements
- Creates a "floating" effect - the card doesn't touch any screen edges

### 3. Responsive Padding Formula
The padding uses a responsive calculation that adapts to screen size:

```
padding: clamp(16px, 2.54vw, 64px)
```

**How it works:**
| Component | Formula | Min | Max |
|-----------|---------|-----|-----|
| Hero Card Left/Right | `clamp(16px, 2.54vw, 64px)` | 16px | 64px |
| Logo | `clamp(16px, 3.2vw, 64px)` | 16px | 64px |
| Contact Us Button | `clamp(16px, 3.2vw, 64px)` | 16px | 64px |

**Why this matters:**
- Small screens: padding respects minimum (16px) - won't be cramped
- Medium screens: padding scales with viewport (percentage of screen width)
- Large screens: padding caps at maximum (64px) - won't look too big

**Current Percentages:**
- Hero Card: 2.54%
- Logo: 3.2%
- Contact Us Button: 3.2%

---

## Navbar Layout Structure

```
┌──────────────────────────────────────────────────────────────┐
│  NAVBAR                                                     │
│─────────────────────────────────────────────────────────────│
│                                                              │
│  [LOGO]              [SHORTCUTS]                     [📞]    │
│    ↑                    ↑                                   │
│    │                    │                                   │
│ same left           centered                            same right
│ padding               gap                               padding
│    ↓                    ↓                                   ↓
```

### Layout Rules

| Element | Position | Behavior |
|---------|----------|----------|
| **Logo** | Left side | Fixed distance from left edge (same as hero card's left padding) |
| **Shortcuts** | Center | Always perfectly centered, never moves |
| **Contact Us Button** | Right side | Fixed distance from right edge (same as hero card's right padding) |

### What Changes Vs What Stays Fixed

**Variables (change with screen size):**
- Gap between Logo and Shortcuts block
- Gap between Shortcuts block and Contact Us button

**Fixed (never change position):**
- Logo: always same left padding as hero card
- Shortcuts: always perfectly centered
- Contact Us: always same right padding as hero card

---

## Responsive Behavior

### Small PC Screens (~1024px)
```
┌──────────────────────────────────────────┐
│  [LOGO]    [Shortcuts]    [📞]            │
│              ↑                           │
│         small gap                        │
└──────────────────────────────────────────┘

Hero card: padding = ~41px
```

### Medium PC Screens (~1440px)
```
┌──────────────────────────────────────────────────────────────┐
│  [LOGO]           [Shortcuts]                        [📞]    │
│                      ↑                                   │
│                  medium gap                               │
└──────────────────────────────────────────────────────────────┘

Hero card: padding = ~57px
```

### Large PC Screens (~1920px+)
```
┌────────────────────────────────────────────────────────────────────────────┐
│  [LOGO]                   [Shortcuts]                              [📞]    │
│                            ↑                                           │
│                         larger gap                                      │
└────────────────────────────────────────────────────────────────────────────┘

Hero card: padding = 64px (capped)
```

---

## Technical Implementation

### 1. Padding CSS Formula
```
clamp(16px, 4vw, 64px)
```
- Minimum: 16px (on small screens)
- Scaling: 4% of viewport width
- Maximum: 64px (on large screens)

### 2. Navbar Structure
- Container: `relative` position
- Left side: Logo with `left-[clamp(16px,3.2vw,64px)]`
- Center: Shortcuts block with `justify-center`
- Right side: Contact Us with `right-[clamp(16px,3.2vw,64px)]`

### 3. Hero Card Structure
```jsx
<div className="h-[calc(100vh-80px)] pl-[clamp(16px,2.54vw,64px)] pr-[clamp(16px,2.54vw,64px)]">
  <div className="h-full rounded-3xl overflow-hidden">
    {/* Hero image/content */}
  </div>
</div>
```

### 4. Key CSS Classes
- Responsive padding: `p-[clamp(16px,2.54vw,64px)]`
- Rounded corners: `rounded-3xl`
- Full height: `h-[calc(100vh-clamp(60px,8vh,80px))]`
- Left margin (logo): `left-[clamp(16px,3.2vw,64px)]`
- Right margin (button): `right-[clamp(16px,3.2vw,64px)]`

---

## Responsive Navbar System

### Navbar Height
```
h-[clamp(60px,8vh,80px)]
```
- Minimum: 60px (on small screens)
- Scaling: 8% of viewport height
- Maximum: 80px (on large screens)

### Logo
```
text-[clamp(14px,1.5vw,20px)]
```
- Minimum: 14px font size
- Scaling: 1.5% of viewport width
- Maximum: 20px font size

### Shortcuts (Navigation Links)
```
text-[clamp(12px,1vw,14px)]
```
- Minimum: 12px font size
- Scaling: 1% of viewport width
- Maximum: 14px font size

### Contact Us Button
```jsx
className={cn(
  "bg-black text-white rounded-full pl-[clamp(12px,1.5vw,18px)] pr-[clamp(18px,2vw,28px)] py-[clamp(8px,1vw,12px)] h-[clamp(32px,4vh,40px)]",
  "hover:bg-black/90 transition-colors",
  "flex items-center gap-[clamp(4px,0.5vw,8px)] font-medium text-[clamp(11px,1vw,14px)]"
)}
```
| Element | Formula | Min | Max |
|---------|---------|-----|-----|
| Height | `clamp(32px,4vh,40px)` | 32px | 40px |
| Padding X | Left: `clamp(12px,1.5vw,18px)` / Right: `clamp(18px,2vw,28px)` | 12px/18px | 18px/28px |
| Padding Y | `clamp(8px,1vw,12px)` | 8px | 12px |
| Text | `clamp(11px,1vw,14px)` | 11px | 14px |
| Icon | `clamp(14px,1.5vw,18px)` | 14px | 18px |
| Gap | `clamp(4px,0.5vw,8px)` | 4px | 8px |

---

## Screen Size To Padding Reference

### Hero Card (2.54%)

| Screen Width | 2.54% Calculation | Clamped Value |
|--------------|-------------------|---------------|
| 320px | 8.1px | 16px (min) |
| 768px | 19.5px | 19.5px |
| 1024px | 26px | 26px |
| 1440px | 36.6px | 36.6px |
| 1920px | 48.8px | 48.8px |
| 2560px | 65px | 64px (max) |

### Logo & Button (3.2%)

| Screen Width | 3.2% Calculation | Clamped Value |
|--------------|-------------------|---------------|
| 320px | 10.2px | 16px (min) |
| 768px | 24.6px | 24.6px |
| 1024px | 32.8px | 32.8px |
| 1440px | 46.1px | 46.1px |
| 1920px | 61.4px | 61.4px |
| 2560px | 81.9px | 64px (max) |

---

## Design Benefits

1. **Consistency**: Logo and button always have balanced spacing
2. **Premium Feel**: Floating card creates depth and sophistication
3. **Responsive**: Automatically adapts without breaking layout
4. **Centered Content**: Shortcuts always perfectly centered
5. **Scalable**: Works on any screen size without design compromise
6. **Balanced**: Left and right sides mirror each other perfectly

---

## Future Adjustments

### To Move Logo/Button Closer to Center
- Adjust the `clamp()` values (lower the max)
- Or add negative margin to specific elements

### To Change Padding Feel
- Increase percentage (5vw) = more padding = more floating effect
- Decrease percentage (2vw) = less padding = more hero image visible

### To Adjust Rounded Corners
- `rounded-xl` = subtle rounding
- `rounded-2xl` = medium rounding
- `rounded-3xl` = prominent rounding
- `rounded-full` = fully rounded

---

## Files Involved

- `NavigationNew.tsx` - Navbar with logo, shortcuts, and Contact Us button
- `contact-us-button.tsx` - Reusable contact button component
- Hero Section component - Where the floating card is implemented

---

## Notes

- The `clamp()` function is CSS-native and doesn't require JavaScript
- All measurements are in pixels (px) for precision
- The navbar height is responsive: `clamp(60px,8vh,80px)`
- Hero section takes remaining viewport height
- Logo and Contact Us button share the same padding percentage (3.2%)
- Hero card uses a different padding percentage (2.54%)
- Shortcuts block is completely independent from logo/button positioning
- Button internal padding: Left uses 1.5% vw, Right uses 2% vw for balanced look