# Partner Assigned Bookings API Contract V1

This contract captures marketplace slice 6: partners can see bookings assigned to them, without seeing another partner's bookings or private customer contact fields before acceptance.

## List My Assigned Bookings

`GET /api/v1/partner/bookings?status=assigned`

Lists bookings assigned to the authenticated partner.

### Auth

- Required role: `partner`
- `customer`, `admin`, and `support` must receive `403`.
- The server derives `partnerId` from the authenticated session.

### Response `200`

```json
{
  "data": [
    {
      "id": "booking_001",
      "status": "assigned",
      "ritualId": "grah-pravesh",
      "ritualName": "Grah Pravesh Puja",
      "preferredSlot": "2026-06-02T09:30:00.000+05:30",
      "mode": "home_visit",
      "cityOrLocality": "Indiranagar, Bengaluru",
      "language": "Hindi",
      "notes": "Please bring a samagri checklist."
    }
  ]
}
```

## View My Assigned Booking

`GET /api/v1/partner/bookings/:bookingId`

Returns one assigned booking if it belongs to the authenticated partner.

### Auth

- Required role: `partner`
- Partners cannot fetch bookings assigned to another partner.
- `customer`, `admin`, and `support` must receive `403`.

### Response `200`

Returns the same partner booking view shape as the list endpoint.

### Response `404`

Returned when the booking does not exist or is not assigned to the authenticated partner.

## Privacy Rules

For `assigned` bookings before partner acceptance, the response must not include:

- Customer full name.
- Customer phone.
- Exact address if a separate exact-address field exists.
- Payment details.
- Internal admin/support notes.

Allowed fields are ritual, mode, preferred slot, city/locality, language, and customer notes needed to judge acceptance.

## Notes For Backend Slice

- Partner acceptance/decline is handled in slice 7.
- After acceptance and final confirmation, a later response shape can reveal fulfillment contact details.
