# Admin Catalog API Contract V1

This contract captures marketplace slice 10: admins can manage catalog moments and rituals, and the customer app can read active catalog records.

## Create Moment

`POST /api/v1/admin/moments`

### Auth

- Required role: `admin`
- `customer`, `partner`, and `support` must receive `403`.

### Request Body

```json
{
  "title": "Home and new beginnings",
  "slug": "home-new-beginnings",
  "description": "Rituals for moving, settling, and protecting a home.",
  "sortOrder": 1,
  "status": "active"
}
```

## Update Moment

`PATCH /api/v1/admin/moments/:momentId`

Accepts partial moment fields: `title`, `slug`, `description`, `sortOrder`, and `status`.

## Create Ritual

`POST /api/v1/admin/rituals`

### Auth

- Required role: `admin`
- `customer`, `partner`, and `support` must receive `403`.

### Request Body

```json
{
  "momentId": "moment_001",
  "title": "Grah Pravesh Puja",
  "slug": "grah-pravesh-puja",
  "description": "A guided home-entry ceremony.",
  "durationMinutes": 90,
  "priceNote": "Final amount confirmed before payment.",
  "supportedModes": ["home_visit"],
  "deliverables": ["Preparation checklist", "Sankalp guidance"],
  "status": "active"
}
```

## Update Ritual

`PATCH /api/v1/admin/rituals/:ritualId`

Accepts partial ritual fields. Admins can use `status=inactive` to hide a ritual from customer catalog reads without deleting it.

## Customer Active Moments

`GET /api/v1/moments`

Returns active moments ordered by `sortOrder`.

### Response `200`

```json
{
  "data": [
    {
      "id": "moment_001",
      "title": "Home and new beginnings",
      "slug": "home-new-beginnings",
      "description": "Rituals for moving, settling, and protecting a home.",
      "sortOrder": 1,
      "status": "active",
      "createdAt": "2026-05-28T10:00:00.000Z",
      "updatedAt": "2026-05-28T10:00:00.000Z"
    }
  ]
}
```

## Customer Rituals By Moment

`GET /api/v1/moments/:momentId/rituals`

Returns active rituals for an active moment.

Inactive rituals and rituals under inactive moments must be hidden.

## Static Catalog Migration

Current customer-app catalog content comes from:

- `src/context/productCatalog.ts`
- `src/domain/momentCategory.ts`
- `src/domain/trendingRitual.ts`
- `src/i18n/locales/en/translation.json`

Migration path:

1. Seed moments from `MOMENT_CATEGORY_IDS`.
2. Seed rituals from `productCatalog.featuredServices` and `TRENDING_RITUAL_IDS`.
3. Move user-visible title/description/deliverable copy from i18n keys into catalog records.
4. Keep i18n keys for static UI chrome, but read catalog entities from API.
5. Switch customer hooks from static services to `GET /api/v1/moments` and ritual endpoints.

## Notes For Backend Slice

- Customer reads expose only `active` catalog records.
- Admin reads should include both active and inactive records.
- Delete/archive policy is intentionally deferred; use `inactive` for V1.
