# Future Development: 360° Virtual Tour Integration

**Status:** Planned (Not Implemented)
**Priority:** Medium
**Estimated Effort:** 2-4 hours
**Last Updated:** 2026-05-29

---

## Overview

Add 360° virtual tour functionality to allow users to interactively view each room of a property. This will enhance the luxury real estate experience by providing immersive property tours.

---

## Why 360° Tours?

| Feature | Regular Images | 360° Tours |
|---------|--------------|-------------|
| **Engagement** | Passive viewing | **Interactive** |
| **Space** | 2D photos | **Immersive experience** |
| **Luxury Feel** | Basic | **Premium** |
| **User Control** | None | **Full control** |
| **Conversion** | Standard | **Higher engagement** |

---

## How It Will Work

### Owner Workflow

```
1. Owner downloads free 360° camera app (Google Street View)
2. Walks through property taking 360° photos per room
3. Exports equirectangular image (.jpg)
4. Goes to Payload Admin → Property/Project
5. Adds to Gallery field:
   - "Living Room 360°" → uploads living-room.jpg
   - "Kitchen 360°" → uploads kitchen.jpg
   - "Master Bedroom 360°" → uploads bedroom.jpg
6. Saves document
7. Website automatically shows interactive 360° viewers!
```

---

## Technical Implementation

### Frontend Library: Pannellum

**Pannellum** is a free, open-source, lightweight 360° panorama viewer for the web.

- **Website:** https://pannellum.org/
- **GitHub:** https://github.com/mpetias/pannellum
- **Size:** ~50KB (lightweight)
- **License:** MIT (free)

### Changes Needed

#### 1. Install Pannellum
```bash
cd "real estate frontend"
npm install pannellum-react
# or use CDN in index.html
```

#### 2. Update Gallery Component

In `ProjectDetail.tsx`, update the gallery to detect 360° images:

```typescript
// Detect 360° images by file naming convention
const is360Image = (img) => {
  return img.filename?.includes('360') || 
         img.filename?.includes('vr') ||
         img.filename?.endsWith('_360.jpg');
};
```

#### 3. Create 360° Viewer Component

```tsx
import Pannellum from 'pannellum-react';

const PanoramaViewer = ({ imageUrl, title }) => {
  return (
    <Pannellum
      src={imageUrl}
      height="500px"
      width="100%"
      showZoomCtrl={false}
      showFullscreenCtrl={true}
      compass={true}
      title={title}
    />
  );
};
```

#### 4. Update Gallery Display

```tsx
{/* Regular images */}
{galleryImages.filter(img => !is360Image(img)).map(url => (
  <img key={url} src={url} />
))}

{/* 360° images */}
{galleryImages.filter(img => is360Image(img)).map(url => (
  <PanoramaViewer key={url} imageUrl={url} />
))}
```

---

## 3D Mesh Upload (Advanced Option)

For full 3D room scans with photogrammetry:

### Requirements
- 360° camera or smartphone with 3D scanning app
- Meshroom (open-source processing) or Matterport
- Export as `.glb` or `.glTF` format

### Implementation

#### 1. Add new field to Media collection
```typescript
{
  name: 'model_file',
  type: 'upload',
  relationTo: 'media',
  label: '3D Model (.glb)',
}
```

#### 2. Add Google Model Viewer
```html
<script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.1.1/model-viewer.min.js"></script>
<model-viewer 
  src="/path/to/room.glb"
  camera-controls
  auto-rotate
  ar
></model-viewer>
```

---

## Recommended 360° Camera Apps

### Free Options
| App | Platform | Features |
|-----|----------|----------|
| **Google Street View** | iOS/Android | Auto-stitching, cloud storage |
| **Cardboard Camera** | iOS/Android | Simple, 3D effect |
| **360 Camera** | iOS/Android | Multiple modes |

### Paid Options (Better Quality)
| App | Platform | Cost |
|-----|----------|------|
| **Insta360** | iOS/Android | $400 (camera) |
| **Ricoh Theta** | iOS/Android | $450 (camera) |
| **Matterport** | iOS/Android | $100/month subscription |

---

## File Naming Convention

To help identify 360° images in the gallery, use consistent naming:

```
# 360° images
living-room_360.jpg
kitchen_360.jpg
master-bedroom_360.jpg

# Regular images
living-room-hero.jpg
kitchen-detail.jpg
```

Or add a checkbox field to Media collection:
```typescript
{
  name: 'is_360',
  type: 'checkbox',
  defaultValue: false,
}
```

---

## Future Enhancements

1. **Floor Plan Integration** - Link 360° rooms to floor plan hotspots
2. **Measurements** - Add measurement tools in 360° view
3. **Voice Narration** - Add audio tour guide
4. **Multiple Floors** - Organize 360° by floor
5. **AR Mode** - View property in augmented reality

---

## Resources

- **Pannellum Documentation:** https://pannellum.org/documentation/
- **Pannellum React:** https://www.npmjs.com/package/pannellum-react
- **Model Viewer:** https://modelviewer.dev/
- **Matterport:** https://matterport.com/
- **Meshroom (Open Source):** https://alicevision.org/#meshroom

---

## Implementation Checklist

- [ ] Research and select 360° viewer library
- [ ] Install Pannellum in frontend
- [ ] Create PanoramaViewer component
- [ ] Update gallery to detect 360° images
- [ ] Update gallery to render 360° viewer
- [ ] Test with sample 360° images
- [ ] Add user documentation
- [ ] Test on mobile devices
- [ ] Add floor plan integration (optional)
