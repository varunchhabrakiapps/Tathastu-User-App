# Tathastu Backend Architecture Plan

## Goal

Build a versioned backend API for the Tathastu React Native app that supports mobile OTP authentication, JWT sessions, user profile management, moments, rituals, testimonials, trending rituals, and ritual search.

This plan is intentionally scoped to the API list shared by frontend. Booking creation, payments, pandit operations, admin moderation, and notifications are left as future modules unless product needs them now.

## Recommended Stack

- Runtime: Node.js with TypeScript.
- API framework: NestJS or Fastify. NestJS is preferred if the backend will grow into bookings, payments, admin dashboards, and background jobs.
- Database: PostgreSQL.
- ORM: Prisma.
- Cache/rate limit store: Redis.
- Auth: JWT access token plus optional refresh token later.
- OTP provider: pluggable SMS provider adapter. Start with one provider behind an interface.
- Deployment shape: single API service, PostgreSQL, Redis, and object storage/CDN for ritual media/images.

## Core Principles

- Version every route under `/api/v1`.
- Keep API DTOs explicit and stable for the app.
- Use UUID primary keys internally.
- Use slugs only for human-friendly URLs/admin surfaces, not as the only identifier.
- Treat OTP as short-lived authentication state, not user identity.
- Never store OTP codes in plain text.
- Keep catalog read APIs public if product allows browsing before login; keep profile APIs protected.

## Authentication Flow

### 1. Check mobile number and send OTP

`POST /api/v1/auth/otp/request`

Request:

```json
{
  "mobileNumber": "9876543210",
  "countryCode": "IN"
}
```

Response:

```json
{
  "requestId": "uuid",
  "mobileNumberMasked": "+91 ******3210",
  "expiresInSeconds": 300,
  "resendCooldownSeconds": 30,
  "remainingResends": 3
}
```

Behavior:

- Normalize and validate the phone number.
- Create or update an OTP challenge.
- Send SMS OTP.
- Do not reveal whether the user already exists.
- Rate limit by mobile number, IP, and device fingerprint if available.

### 2. Resend OTP with max 3 retries

`POST /api/v1/auth/otp/resend`

Request:

```json
{
  "requestId": "uuid"
}
```

Response:

```json
{
  "requestId": "uuid",
  "expiresInSeconds": 300,
  "resendCooldownSeconds": 30,
  "remainingResends": 2
}
```

Behavior:

- Allow only 3 resends per OTP challenge.
- Enforce cooldown, currently matching frontend expectation of 30 seconds.
- Return `429` for rate limit/cooldown/retry exhaustion with machine-readable error codes.

### 3. Validate OTP and return JWT

`POST /api/v1/auth/otp/verify`

Request:

```json
{
  "requestId": "uuid",
  "code": "123456"
}
```

Response:

```json
{
  "accessToken": "jwt",
  "tokenType": "Bearer",
  "expiresInSeconds": 86400,
  "user": {
    "id": "uuid",
    "mobileNumber": "+919876543210",
    "name": null,
    "address": null,
    "profileCompleted": false
  }
}
```

Behavior:

- Hash-compare OTP code.
- Mark challenge consumed after successful verification.
- Create user if mobile number is new.
- Update `lastLoginAt`.
- Return JWT with `sub`, `mobileNumber`, and token version/session id.

## User APIs

All user APIs require `Authorization: Bearer <accessToken>`.

### 4. Get user details

`GET /api/v1/me`

Response:

```json
{
  "id": "uuid",
  "mobileNumber": "+919876543210",
  "name": "Aarav Sharma",
  "address": {
    "line1": "A-120",
    "line2": "Sector 45",
    "city": "Gurugram",
    "state": "Haryana",
    "postalCode": "122003",
    "country": "IN"
  },
  "profileCompleted": true,
  "createdAt": "2026-05-16T10:00:00.000Z",
  "updatedAt": "2026-05-16T10:00:00.000Z"
}
```

### 5. Update user details

`PATCH /api/v1/me`

Request:

```json
{
  "name": "Aarav Sharma",
  "address": {
    "line1": "A-120",
    "line2": "Sector 45",
    "city": "Gurugram",
    "state": "Haryana",
    "postalCode": "122003",
    "country": "IN"
  }
}
```

Response: same shape as `GET /api/v1/me`.

Validation:

- `name`: optional, trimmed, 2 to 80 chars.
- Address fields: optional as a group, trimmed, max lengths enforced.
- `country`: ISO country code.

## Catalog APIs

Catalog APIs can be public for the current app. If product wants login-gated catalog access, protect them later without changing response shapes.

### Pagination Contract

Use the same pagination envelope for moments, rituals, trending, and search.

Query params:

- `page`: default `1`, min `1`.
- `limit`: default `20`, max `50`.

Response envelope:

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalItems": 125,
    "totalPages": 7,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

### 6. Get all moments

`GET /api/v1/moments?page=1&limit=20`

Moment response item:

```json
{
  "id": "uuid",
  "slug": "protection",
  "title": "Protection",
  "subtitle": "Clarity rituals",
  "description": "Rituals for protection and emotional steadiness.",
  "displayOrder": 1,
  "imageUrl": "https://cdn.example.com/moments/protection.png"
}
```

Important: this endpoint should not include ritual details. It may include aggregate counts later, but avoid that for V1 unless frontend asks.

### 7. Get rituals by moment id

`GET /api/v1/moments/:momentId/rituals?page=1&limit=20`

Ritual list item:

```json
{
  "id": "uuid",
  "slug": "nazar-utaro",
  "title": "Nazar Utaro",
  "subtitle": "Protective clearing",
  "shortDescription": "A protective clearing for your household.",
  "mode": "live_video",
  "startingPrice": {
    "amount": 1100,
    "currency": "INR",
    "formatted": "₹1,100"
  },
  "durationMinutes": 45,
  "coverImageUrl": "https://cdn.example.com/rituals/nazar-utaro.png",
  "isTrending": true
}
```

### 8. Testimonials API, always top 10

`GET /api/v1/testimonials/top`

Response:

```json
{
  "data": [
    {
      "id": "uuid",
      "customerName": "Meera",
      "location": "Mumbai",
      "rating": 5,
      "quote": "The ritual felt calm and respectful.",
      "ritualTitle": "Grah Shanti",
      "displayOrder": 1
    }
  ]
}
```

Behavior:

- Return exactly top 10 active testimonials when available.
- Sort by `displayOrder`, then `createdAt`.

### 9. Get ritual by ritual id

`GET /api/v1/rituals/:ritualId`

Response:

```json
{
  "id": "uuid",
  "slug": "nazar-utaro",
  "title": "Nazar Utaro",
  "subtitle": "Protective clearing",
  "description": "A protective clearing ritual from home.",
  "explanation": "Pandit ji keeps language grounded so protective intent lands clearly.",
  "mode": "live_video",
  "durationMinutes": 45,
  "startingPrice": {
    "amount": 1100,
    "currency": "INR",
    "formatted": "₹1,100"
  },
  "coverImageUrl": "https://cdn.example.com/rituals/nazar-utaro.png",
  "sampleVideoUrl": null,
  "steps": [
    {
      "stepNumber": 1,
      "title": "Share your sankalp",
      "body": "Tell us who the ritual is for and what you are holding."
    }
  ],
  "deliverables": [
    "Live video ritual with verified pandit",
    "Preparation checklist"
  ],
  "moments": [
    {
      "id": "uuid",
      "slug": "protection",
      "title": "Protection"
    }
  ],
  "isTrending": true
}
```

### 10. Get trending rituals

`GET /api/v1/rituals/trending?page=1&limit=20`

Response uses the common pagination envelope and ritual list item shape.

Behavior:

- Filter active rituals where `isTrending = true`.
- Sort by `trendingRank`, then recent booking/popularity signals when available.

### 11. Search

`GET /api/v1/search?q=grah&page=1&limit=20`

Response:

```json
{
  "data": [
    {
      "type": "ritual",
      "id": "uuid",
      "title": "Grah Shanti",
      "subtitle": "Peaceful home energy",
      "description": "A calming ritual for home harmony.",
      "coverImageUrl": "https://cdn.example.com/rituals/grah-shanti.png"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "totalItems": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

V1 can search rituals only. Keep the `type` field so moments, testimonials, articles, or pandits can be added later.

### 12. Get all rituals with search

`GET /api/v1/rituals?page=1&limit=20&q=grah&momentId=uuid`

Response uses the common pagination envelope and ritual list item shape.

Behavior:

- Supports optional `q`.
- Supports optional `momentId`.
- Supports optional `mode` later.
- This endpoint powers Explore/catalog screens.

## Database Model

### users

- `id uuid primary key`
- `mobile_number varchar unique not null`
- `country_code varchar not null`
- `name varchar null`
- `address_line1 varchar null`
- `address_line2 varchar null`
- `city varchar null`
- `state varchar null`
- `postal_code varchar null`
- `country varchar null`
- `token_version int default 0`
- `last_login_at timestamptz null`
- `created_at timestamptz`
- `updated_at timestamptz`

### otp_challenges

- `id uuid primary key`
- `mobile_number varchar not null`
- `country_code varchar not null`
- `otp_hash varchar not null`
- `expires_at timestamptz not null`
- `consumed_at timestamptz null`
- `resend_count int default 0`
- `verify_attempt_count int default 0`
- `last_sent_at timestamptz not null`
- `created_at timestamptz`

Indexes:

- `(mobile_number, created_at desc)`
- `(expires_at)`

### moments

- `id uuid primary key`
- `slug varchar unique not null`
- `title varchar not null`
- `subtitle varchar null`
- `description text null`
- `image_url text null`
- `display_order int default 0`
- `is_active boolean default true`
- `created_at timestamptz`
- `updated_at timestamptz`

### rituals

- `id uuid primary key`
- `slug varchar unique not null`
- `title varchar not null`
- `subtitle varchar null`
- `short_description text null`
- `description text null`
- `explanation text null`
- `mode varchar not null`
- `duration_minutes int null`
- `price_amount int not null`
- `price_currency varchar default 'INR'`
- `cover_image_url text null`
- `sample_video_url text null`
- `is_trending boolean default false`
- `trending_rank int null`
- `is_active boolean default true`
- `created_at timestamptz`
- `updated_at timestamptz`

### ritual_moments

- `ritual_id uuid references rituals(id)`
- `moment_id uuid references moments(id)`
- primary key `(ritual_id, moment_id)`

### ritual_steps

- `id uuid primary key`
- `ritual_id uuid references rituals(id)`
- `step_number int not null`
- `title varchar not null`
- `body text not null`

### ritual_deliverables

- `id uuid primary key`
- `ritual_id uuid references rituals(id)`
- `display_order int not null`
- `text text not null`

### testimonials

- `id uuid primary key`
- `customer_name varchar not null`
- `location varchar null`
- `rating int null`
- `quote text not null`
- `ritual_id uuid null references rituals(id)`
- `display_order int default 0`
- `is_active boolean default true`
- `created_at timestamptz`
- `updated_at timestamptz`

## Error Shape

Use a single error shape everywhere.

```json
{
  "error": {
    "code": "OTP_INVALID",
    "message": "The OTP code is invalid.",
    "details": {}
  }
}
```

Suggested codes:

- `VALIDATION_ERROR`
- `UNAUTHORIZED`
- `FORBIDDEN`
- `NOT_FOUND`
- `OTP_INVALID`
- `OTP_EXPIRED`
- `OTP_RATE_LIMITED`
- `OTP_RESEND_LIMIT_EXCEEDED`
- `OTP_VERIFY_LIMIT_EXCEEDED`
- `SERVER_ERROR`

## Security and Abuse Protection

- Hash OTP codes using HMAC or bcrypt/argon2. HMAC with server secret is enough for short-lived numeric OTPs.
- Expire OTP challenges after 5 minutes.
- Limit verify attempts per challenge, for example 5 attempts.
- Limit OTP request frequency by mobile number and IP.
- Store JWT secret in environment variables only.
- Use short access token expiry for production. Start with 24 hours for development if refresh token flow is not ready.
- Add structured audit logs for OTP request, resend, verify success/failure, and profile updates.

## Backend Modules

Recommended module boundaries:

- `AuthModule`: OTP request/resend/verify, JWT issuing, guards.
- `UsersModule`: `/me` read/update.
- `MomentsModule`: list active moments.
- `RitualsModule`: list, detail, trending, by moment.
- `TestimonialsModule`: top 10 testimonials.
- `SearchModule`: unified search endpoint.
- `CommonModule`: pagination, errors, validation pipes, response helpers.
- `SmsModule`: provider-agnostic OTP SMS sending.

## Frontend Integration Notes

The current app has these replacement points:

- Replace `mockOtpService` in `src/services/otp.service.ts` with HTTP calls to `/auth/otp/request`, `/auth/otp/resend`, and `/auth/otp/verify`.
- Expand `AuthContext` to persist JWT and user details instead of only `{ mobileNumber }`.
- Use `createApiClient` from `src/api/client.ts` with an environment-backed `baseUrl` and token getter.
- Replace `resolveUpcomingBookingPreview`, `TRENDING_RITUALS_PREVIEW`, and `TESTIMONIALS_PREVIEW` with API-backed hooks.
- Ritual detail currently reads from i18n copy. It should later map `GET /rituals/:id` into the existing `RitualDetailNarrativeVM` and `RitualDetailBookingVM`.

## Build Sequence

1. Scaffold backend service with health check and `/api/v1`.
2. Add PostgreSQL, Prisma schema, migrations, and seed data for moments/rituals/testimonials.
3. Implement common validation, error shape, and pagination.
4. Implement auth OTP request/resend/verify with mock SMS adapter for local dev.
5. Implement JWT guard and `/me`.
6. Implement moments and rituals read APIs.
7. Implement testimonials top 10.
8. Implement trending and search.
9. Add integration tests for every endpoint.
10. Wire the React Native app to the dev backend.

## Open Product Questions

- Should catalog APIs be public before login, or available only after OTP login?
- Is the mobile app India-only for V1, or should phone auth support all country codes?
- Should address be a single default address or multiple saved addresses?
- Do rituals need language, city availability, home-visit availability, or pandit assignment in V1?
- Should search include moments and testimonials, or rituals only for the first release?
- Do we need admin APIs now for managing moments, rituals, and testimonials, or will seed scripts be enough for V1?
