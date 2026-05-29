# Admin Booking Assignment API Contract V1

This contract captures marketplace slice 5: admins can assign a pending booking request to a verified eligible partner.

## Assign Booking

`POST /api/v1/admin/bookings/:bookingId/assignments`

Assigns a pending booking to a verified partner and records an assignment event.

### Auth

- Required role: `admin`
- `customer`, `partner`, and `support` must receive `403`.

### Request Body

```json
{
  "partnerId": "partner_001"
}
```

### Validation

- Booking must exist.
- Booking must be `pending_assignment`.
- Partner must exist.
- Partner must be `verified`.
- Partner must support the booking mode.
- Partner must have the requested ritual skill/category.

### Response `200`

```json
{
  "booking": {
    "id": "booking_001",
    "customerId": "customer_123",
    "status": "assigned",
    "assignedPartnerId": "partner_001",
    "ritualId": "grah-pravesh",
    "ritualName": "Grah Pravesh Puja",
    "preferredSlot": "2026-06-02T09:30:00.000+05:30",
    "mode": "home_visit",
    "contactName": "Kushendra",
    "contactPhone": "9876543210",
    "addressLine": "Indiranagar, Bengaluru",
    "language": "Hindi",
    "notes": "Please bring a samagri checklist.",
    "createdAt": "2026-05-28T09:30:00.000Z",
    "updatedAt": "2026-05-28T10:00:00.000Z"
  },
  "event": {
    "id": "assignment_001",
    "bookingId": "booking_001",
    "partnerId": "partner_001",
    "assignedBy": "admin_001",
    "previousStatus": "pending_assignment",
    "newStatus": "assigned",
    "createdAt": "2026-05-28T10:00:00.000Z"
  }
}
```

## List Assignment Events

`GET /api/v1/admin/booking-assignments`

Lists assignment events, newest first.

### Auth

- Required role: `admin`
- `customer`, `partner`, and `support` must receive `403`.

### Response `200`

```json
{
  "data": [
    {
      "id": "assignment_001",
      "bookingId": "booking_001",
      "partnerId": "partner_001",
      "assignedBy": "admin_001",
      "previousStatus": "pending_assignment",
      "newStatus": "assigned",
      "createdAt": "2026-05-28T10:00:00.000Z"
    }
  ]
}
```

## Notes For Backend Slice

- The assignment operation should be transactional: booking update and assignment event creation must succeed or fail together.
- This slice does not notify the partner yet; notification hooks come later.
- Partner acceptance is handled in slice 7.
