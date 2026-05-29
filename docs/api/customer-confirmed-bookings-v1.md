# Customer Confirmed Bookings API Contract V1

This contract captures marketplace slice 8: customers can see confirmed booking status and preparation instructions after partner acceptance and final admin/customer confirmation.

## Confirm Accepted Booking

`POST /api/v1/admin/bookings/:bookingId/confirm`

Moves an accepted booking to `confirmed`, stores customer-facing preparation instructions, and records a confirmation event.

### Auth

- Required role: `admin`
- `customer`, `partner`, and `support` must receive `403` in V1.

### Request Body

```json
{
  "preparationInstructions": [
    "Keep kalash, diya, and rice ready before the call.",
    "Join 10 minutes early for sankalp guidance."
  ],
  "internalNotes": "Customer asked for extra reassurance; do not expose."
}
```

### Validation

- Booking must exist.
- Booking must be `accepted`.
- `internalNotes` must never appear in customer responses.

### Response `200`

```json
{
  "booking": {
    "id": "booking_001",
    "status": "confirmed",
    "assignedPartnerId": "partner_001",
    "preparationInstructions": [
      "Keep kalash, diya, and rice ready before the call.",
      "Join 10 minutes early for sankalp guidance."
    ],
    "updatedAt": "2026-05-28T10:00:00.000Z"
  },
  "event": {
    "id": "confirmation_001",
    "bookingId": "booking_001",
    "confirmedBy": "admin_001",
    "previousStatus": "accepted",
    "newStatus": "confirmed",
    "preparationInstructions": [
      "Keep kalash, diya, and rice ready before the call.",
      "Join 10 minutes early for sankalp guidance."
    ],
    "internalNotes": "Customer asked for extra reassurance; do not expose.",
    "createdAt": "2026-05-28T10:00:00.000Z"
  }
}
```

## Get My Booking After Confirmation

`GET /api/v1/bookings/:bookingId`

Returns a customer-safe booking view.

### Auth

- Required role: `customer`
- Customer can only view their own booking.

### Response `200`

```json
{
  "id": "booking_001",
  "status": "confirmed",
  "ritualId": "grah-pravesh",
  "ritualName": "Grah Pravesh Puja",
  "preferredSlot": "2026-06-02T09:30:00.000+05:30",
  "mode": "home_visit",
  "contactName": "Kushendra",
  "contactPhone": "9876543210",
  "addressLine": "Indiranagar, Bengaluru",
  "language": "Hindi",
  "notes": "Please bring a samagri checklist.",
  "preparationInstructions": [
    "Keep kalash, diya, and rice ready before the call.",
    "Join 10 minutes early for sankalp guidance."
  ],
  "assignedPartnerId": "partner_001",
  "updatedAt": "2026-05-28T10:00:00.000Z"
}
```

## Privacy Rules

Customer booking responses must not include:

- Internal confirmation notes.
- Internal assignment notes.
- Partner reliability/admin notes.
- Any private support-only annotations.

## Notes For Backend Slice

- Confirmation is intentionally separate from partner acceptance.
- Payment state remains separate from booking status.
- Payment request/invoice creation after confirmation is handled in slice 13: `docs/api/customer-payment-intent-invoice-v1.md`.
- Notification hooks for confirmed bookings are handled in slice 12: `docs/api/booking-status-notification-hooks-v1.md`.
