# Admin Partner Profiles API Contract V1

This contract captures marketplace slice 4: admins can create partner profiles, record eligibility details, and verify partners only after video KYC is complete.

## Create Partner Profile

`POST /api/v1/admin/partners`

Creates an unverified partner profile.

### Auth

- Required role: `admin`
- `customer`, `partner`, and `support` must receive `403`.

### Request Body

```json
{
  "name": "Pandit Ramesh Sharma",
  "phone": "9876543210",
  "city": "Bengaluru",
  "serviceArea": "Indiranagar and nearby",
  "supportedModes": ["live_video", "home_visit"],
  "skills": ["grah-pravesh", "satyanarayan-puja"],
  "languages": ["Hindi", "Kannada"],
  "internalNotes": "Strong home-visit availability on weekends.",
  "videoKycStatus": "completed"
}
```

### Response `201`

```json
{
  "id": "partner_001",
  "name": "Pandit Ramesh Sharma",
  "phone": "9876543210",
  "city": "Bengaluru",
  "serviceArea": "Indiranagar and nearby",
  "supportedModes": ["live_video", "home_visit"],
  "skills": ["grah-pravesh", "satyanarayan-puja"],
  "languages": ["Hindi", "Kannada"],
  "internalNotes": "Strong home-visit availability on weekends.",
  "videoKycStatus": "completed",
  "verificationStatus": "unverified",
  "createdBy": "admin_001",
  "createdAt": "2026-05-28T10:00:00.000Z",
  "updatedAt": "2026-05-28T10:00:00.000Z",
  "verifiedAt": null,
  "verifiedBy": null
}
```

## Set Partner Verification

`PATCH /api/v1/admin/partners/:partnerId/verification`

Marks a partner verified or unverified.

### Auth

- Required role: `admin`
- `customer`, `partner`, and `support` must receive `403`.

### Request Body

```json
{
  "verified": true
}
```

### Validation

- A partner cannot be marked verified unless `videoKycStatus` is `completed`.
- When a partner is marked unverified, clear `verifiedAt` and `verifiedBy`.

### Response `200`

Returns the updated partner profile.

## List Assignable Partners

`GET /api/v1/admin/partners?assignable=true`

Lists partners eligible for assignment.

### Auth

- Required role: `admin`
- `customer`, `partner`, and `support` must receive `403`.

### Response `200`

```json
{
  "data": [
    {
      "id": "partner_001",
      "name": "Pandit Ramesh Sharma",
      "phone": "9876543210",
      "city": "Bengaluru",
      "serviceArea": "Indiranagar and nearby",
      "supportedModes": ["live_video", "home_visit"],
      "skills": ["grah-pravesh", "satyanarayan-puja"],
      "languages": ["Hindi", "Kannada"],
      "internalNotes": "Strong home-visit availability on weekends.",
      "videoKycStatus": "completed",
      "verificationStatus": "verified",
      "createdBy": "admin_001",
      "createdAt": "2026-05-28T10:00:00.000Z",
      "updatedAt": "2026-05-28T10:00:00.000Z",
      "verifiedAt": "2026-05-28T10:00:00.000Z",
      "verifiedBy": "admin_001"
    }
  ]
}
```

## Notes For Backend Slice

- New partner profiles start as `unverified`.
- `videoKycStatus=completed` is mandatory before `verificationStatus=verified`.
- Only verified partners should appear in assignment candidate lists.
- Actual booking assignment is handled in slice 5.
