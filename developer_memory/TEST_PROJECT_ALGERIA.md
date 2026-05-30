# Villa Hydra Residence - Test Project for Algeria Real Estate

**Pour:** Constructeur immobilier algérien
**Structure:** Projet → Propriétés (appartements) liés

---

## 📁 Data Files

All data is now separated into dedicated files for easy copy-paste:

### Projects
| File | Description |
|------|-------------|
| [PROJECTS/PROJECT_VILLA_HYDRA.md](PROJECTS/PROJECT_VILLA_HYDRA.md) | Villa Hydra Luxury Residences - Full project data |

### Properties (3 apartments linked to project)
| File | Description | Code | Price |
|------|-------------|------|-------|
| [PROPERTIES/PROPERTY_VILLA_T1_101.md](PROPERTIES/PROPERTY_VILLA_T1_101.md) | Type 1 - 95m², 2 beds | VILLA-T1-101 | 48,500,000 DZD |
| [PROPERTIES/PROPERTY_VILLA_T2_201.md](PROPERTIES/PROPERTY_VILLA_T2_201.md) | Type 2 - 140m², 3 beds | VILLA-T2-201 | 78,000,000 DZD |
| [PROPERTIES/PROPERTY_VILLA_DPX_301.md](PROPERTIES/PROPERTY_VILLA_DPX_301.md) | Duplex Penthouse - 215m², 4 beds | VILLA-DPX-301 | 155,000,000 DZD |

---

## 📋 Property Types Summary

| Type | Code | Area | Beds | Baths | Price |
|------|------|------|------|-------|-------|
| Type 1 | VILLA-T1-101 | 95m² | 2 | 1 | 48,500,000 DZD |
| Type 2 | VILLA-T2-201 | 140m² | 3 | 2 | 78,000,000 DZD |
| Duplex | VILLA-DPX-301 | 215m² | 4 | 3 | 155,000,000 DZD |

---

## How to Add to Payload Admin

### Step 1: Create Project First
1. Go to http://localhost:3010/admin
2. Click **Projects** → **Create New**
3. Open [PROJECTS/PROJECT_VILLA_HYDRA.md](PROJECTS/PROJECT_VILLA_HYDRA.md)
4. Copy all localized fields (EN, FR, AR)
5. Paste into Payload form
6. **SAVE**

### Step 2: Create Properties (after project exists)
1. Click **Properties** → **Create New**
2. Open [PROPERTIES/PROPERTY_VILLA_T1_101.md](PROPERTIES/PROPERTY_VILLA_T1_101.md)
3. Copy all data
4. Paste into Payload form
5. **Important:** Select "Villa Hydra Residences" from Project dropdown
6. **SAVE**

### Step 3: Repeat for Other Properties
- [PROPERTY_VILLA_T2_201.md](PROPERTIES/PROPERTY_VILLA_T2_201.md)
- [PROPERTY_VILLA_DPX_301.md](PROPERTIES/PROPERTY_VILLA_DPX_301.md)

---

## Property Collection Fields

All properties use these fields from Payload:

| Field | Type | Required | Localized | Notes |
|--------|------|----------|-----------|-------|
| name | text | Yes | Yes | Property name |
| property_code | text | Yes | No | Unique identifier |
| project | relationship | Yes | No | Link to Villa Hydra |
| area | text | Yes | Yes | Tower & floor |
| city | text | Yes | Yes | Algiers |
| price | number | Yes | No | DZD |
| property_type | select | Yes | No | f1-f5+, studio, garage |
| space_sqm | number | Yes | No | Square meters |
| beds | number | Yes | No | Bedrooms |
| baths | number | Yes | No | Bathrooms |
| description | textarea | No | Yes | Full description |
| status | select | Yes | No | draft, published, sold |
| image | upload | No | No | Main image |
| gallery | upload | No | No | Multiple images |
| features | array | No | Yes | Inline features |

---

## Property Status Options

| Status | Description |
|--------|-------------|
| draft | Not visible to public |
| published | Available for sale |
| sold | Already sold |

---

**Follow the files above for complete field-by-field data in EN, FR, and AR.**