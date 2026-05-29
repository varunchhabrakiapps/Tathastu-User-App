# Customer Auth And Catalog API Contract V1

This contract captures marketplace slice 11: the customer app consumes backend OTP/JWT auth and API-backed catalog data for home, search, and ritual detail screens.

## Decisions

- Customer auth uses mobile OTP and returns a real bearer JWT plus the customer profile.
- The app must persist the JWT, token expiry, and user profile together, then attach `Authorization: Bearer <accessToken>` to protected customer APIs.
- Catalog reads remain public for V1 so customers can browse before login. The response shapes should stay stable if catalog reads become login-gated later.
- Customer catalog APIs return only `active` moments and rituals. Inactive catalog records remain admin-visible only.
- The app must treat loading, empty, and error states as first-class states for every auth and catalog read.

## OTP Request

`POST /api/v1/auth/otp/request`

Starts a short-lived OTP challenge for a mobile number.

### Request Body

```json
{
  "mobileNumber": "9876543210",
  "countryCode": "IN"
}
```

### Response `200`

```json
{
  "requestId": "otp_request_001",
  "mobileNumberMasked": "+91 ******3210",
  "expiresInSeconds": 300,
  "resendCooldownSeconds": 30,
  "remainingResends": 3
}
```

## OTP Resend

`POST /api/v1/auth/otp/resend`

Resends an OTP for an existing challenge.

### Request Body

```json
{
  "requestId": "otp_request_001"
}
```

### Response `200`

```json
{
  "requestId": "otp_request_001",
  "expiresInSeconds": 300,
  "resendCooldownSeconds": 30,
  "remainingResends": 2
}
```

## OTP Verify

`POST /api/v1/auth/otp/verify`

Consumes a valid OTP and returns the customer session.

### Request Body

```json
{
  "requestId": "otp_request_001",
  "code": "123456"
}
```

### Response `200`

```json
{
  "accessToken": "jwt",
  "tokenType": "Bearer",
  "expiresInSeconds": 86400,
  "user": {
    "id": "customer_123",
    "role": "customer",
    "mobileNumber": "+919876543210",
    "name": null,
    "address": null,
    "profileCompleted": false
  }
}
```

### Client Contract

- Store `accessToken`, `tokenType`, `expiresAt`, and `user`.
- Clear the stored session on `401` from protected endpoints.
- Reject successful verification if `user.role` is not `customer`.
- Do not persist OTP codes or OTP request metadata after verification succeeds.

## Get Current Customer

`GET /api/v1/me`

Returns the authenticated customer profile.

### Auth

- Required role: `customer`
- `partner`, `admin`, and `support` must receive `403`.

### Response `200`

```json
{
  "id": "customer_123",
  "role": "customer",
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
  "createdAt": "2026-05-28T10:00:00.000Z",
  "updatedAt": "2026-05-28T10:00:00.000Z"
}
```

## List Active Moments

`GET /api/v1/moments`

Powers the home moment sections and browse-by-moment entry points.

### Auth

- Public in V1.

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

## List Rituals For Moment

`GET /api/v1/moments/:momentId/rituals`

Powers moment detail and filtered catalog sections.

### Auth

- Public in V1.

### Response `200`

```json
{
  "data": [
    {
      "id": "ritual_001",
      "momentId": "moment_001",
      "title": "Grah Pravesh Puja",
      "slug": "grah-pravesh-puja",
      "description": "A guided home-entry ceremony.",
      "durationMinutes": 90,
      "priceNote": "Final amount confirmed before payment.",
      "supportedModes": ["home_visit"],
      "deliverables": ["Preparation checklist", "Sankalp guidance"],
      "status": "active",
      "createdAt": "2026-05-28T10:00:00.000Z",
      "updatedAt": "2026-05-28T10:00:00.000Z"
    }
  ]
}
```

## List Rituals

`GET /api/v1/rituals?q=grah&momentId=moment_001`

Powers search and all-ritual catalog views.

### Query Params

- `q`: optional free-text search over active ritual titles and descriptions.
- `momentId`: optional moment filter.

### Auth

- Public in V1.

### Response `200`

Returns the same ritual list item shape as `GET /api/v1/moments/:momentId/rituals`.

## Get Ritual Detail

`GET /api/v1/rituals/:ritualId`

Powers ritual detail and booking-entry screens.

### Auth

- Public in V1.

### Response `200`

Returns one active ritual with the same fields as the ritual list item. Inactive or missing rituals return `404`.

## Error Shape

All endpoints use the shared error envelope.

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication is required.",
    "details": {}
  }
}
```

Expected client handling:

- `401`: clear invalid customer session and send the user through OTP again for protected endpoints.
- `403`: show a generic access error and clear the session if the stored user is not a customer.
- `404`: show an empty/detail-not-found state.
- `429`: preserve the OTP screen and show cooldown or retry-limit messaging from the response.
- `5xx` or network failure: keep cached screen state when available and show a retry affordance.

## Customer App Integration Map

- OTP screens call `POST /auth/otp/request`, `POST /auth/otp/resend`, and `POST /auth/otp/verify`.
- Auth state stores the real JWT and profile instead of only the mobile number.
- Home reads moments and featured ritual sections from active catalog endpoints.
- Search calls `GET /api/v1/rituals?q=...` and treats an empty `data` array as a valid no-results state.
- Ritual detail calls `GET /api/v1/rituals/:ritualId` and maps the response into the existing detail view model.
- Booking request creation remains covered by `docs/api/booking-requests-v1.md` and uses the stored customer JWT.

## Related Contracts

- Admin catalog management and static catalog migration: `docs/api/admin-catalog-v1.md`
- Customer booking requests: `docs/api/booking-requests-v1.md`
- Legacy backend architecture notes: `docs/backend-architecture-plan.md`
