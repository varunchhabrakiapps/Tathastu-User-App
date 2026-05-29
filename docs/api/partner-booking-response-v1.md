# Partner Booking Response API Contract V1

This contract captures marketplace slice 7: a partner can accept or decline a booking assigned to them.

## Accept Assigned Booking

`POST /api/v1/partner/bookings/:bookingId/accept`

Moves an assigned booking to `accepted` and records a partner response event.

### Auth

- Required role: `partner`
- The server derives `partnerId` from the authenticated session.
- Partner must be the current assigned partner.
- `customer`, `admin`, and `support` must receive `403`.

### Response `200`

```json
{
  "booking": {
    "id": "booking_001",
    "status": "accepted",
    "assignedPartnerId": "partner_001",
    "updatedAt": "2026-05-28T10:00:00.000Z"
  },
  "event": {
    "id": "response_001",
    "bookingId": "booking_001",
    "partnerId": "partner_001",
    "response": "accepted",
    "reason": null,
    "previousStatus": "assigned",
    "newStatus": "accepted",
    "createdAt": "2026-05-28T10:00:00.000Z"
  }
}
```

## Decline Assigned Booking

`POST /api/v1/partner/bookings/:bookingId/decline`

Returns an assigned booking to admin attention and records a partner response event.

### Auth

- Required role: `partner`
- Partner must be the current assigned partner.
- `customer`, `admin`, and `support` must receive `403`.

### Request Body

```json
{
  "reason": "Family ceremony overlaps that morning."
}
```

### Validation

- `reason` is required.
- Booking must exist.
- Booking must be `assigned`.
- Booking must be assigned to the authenticated partner.

### Response `200`

```json
{
  "booking": {
    "id": "booking_001",
    "status": "pending_assignment",
    "assignedPartnerId": null,
    "updatedAt": "2026-05-28T10:00:00.000Z"
  },
  "event": {
    "id": "response_001",
    "bookingId": "booking_001",
    "partnerId": "partner_001",
    "response": "declined",
    "reason": "Family ceremony overlaps that morning.",
    "previousStatus": "assigned",
    "newStatus": "pending_assignment",
    "createdAt": "2026-05-28T10:00:00.000Z"
  }
}
```

## Admin Response Event History

`GET /api/v1/admin/partner-booking-responses`

Lists partner response events for support, reassignment, and reliability review.

### Auth

- Required role: `admin`
- `customer`, `partner`, and `support` must receive `403` in V1.

## Notes For Backend Slice

- Accept/decline operations should be transactional: booking update and response event creation must succeed or fail together.
- Declines return the booking to `pending_assignment` and clear `assignedPartnerId`.
- No automated partner penalties are enforced in V1.
- Customer-visible confirmation is handled in slice 8.
