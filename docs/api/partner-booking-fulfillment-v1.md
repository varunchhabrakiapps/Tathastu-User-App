# Partner Booking Fulfillment API Contract V1

This contract captures marketplace slice 9: partners can progress confirmed bookings through fulfillment.

## Mark Booking In Progress

`POST /api/v1/partner/bookings/:bookingId/in-progress`

Moves a confirmed booking to `in_progress` and records a fulfillment event.

### Auth

- Required role: `partner`
- Partner must be the assigned partner.
- `customer`, `admin`, and `support` must receive `403`.

### Validation

- Booking must exist.
- Booking must be `confirmed`.
- Booking must be assigned to the authenticated partner.

### Response `200`

```json
{
  "booking": {
    "id": "booking_001",
    "status": "in_progress",
    "assignedPartnerId": "partner_001",
    "updatedAt": "2026-05-28T10:00:00.000Z"
  },
  "event": {
    "id": "fulfillment_001",
    "bookingId": "booking_001",
    "partnerId": "partner_001",
    "previousStatus": "confirmed",
    "newStatus": "in_progress",
    "createdAt": "2026-05-28T10:00:00.000Z"
  }
}
```

## Mark Booking Completed

`POST /api/v1/partner/bookings/:bookingId/complete`

Moves an in-progress booking to `completed` and records a fulfillment event.

### Auth

- Required role: `partner`
- Partner must be the assigned partner.
- `customer`, `admin`, and `support` must receive `403`.

### Validation

- Booking must exist.
- Booking must be `in_progress`.
- Booking must be assigned to the authenticated partner.

### Response `200`

```json
{
  "booking": {
    "id": "booking_001",
    "status": "completed",
    "assignedPartnerId": "partner_001",
    "updatedAt": "2026-05-28T10:00:00.000Z"
  },
  "event": {
    "id": "fulfillment_002",
    "bookingId": "booking_001",
    "partnerId": "partner_001",
    "previousStatus": "in_progress",
    "newStatus": "completed",
    "createdAt": "2026-05-28T10:00:00.000Z"
  }
}
```

## Partner Completed Booking History

`GET /api/v1/partner/bookings?status=completed`

Lists completed bookings assigned to the authenticated partner.

## Notes For Backend Slice

- Fulfillment updates should be transactional: booking update and event creation must succeed or fail together.
- Customer and admin booking reads should reflect `in_progress` and `completed` immediately.
- Fulfillment status changes should emit notification events as defined in `docs/api/booking-status-notification-hooks-v1.md`.
- Payout creation is not part of this slice. Partner earnings and manual payout tracking after paid completion are covered in `docs/api/partner-earnings-payouts-v1.md`.
