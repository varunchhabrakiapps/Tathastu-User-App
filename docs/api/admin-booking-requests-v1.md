# Admin Booking Requests API Contract V1

This contract captures marketplace slice 3: admins can view pending booking requests and inspect booking details for manual assignment.

## List Pending Booking Requests

`GET /api/v1/admin/bookings?status=pending_assignment`

Lists customer booking requests awaiting admin assignment, newest first.

### Auth

- Required role: `admin`
- `customer`, `partner`, and `support` must receive `403`.

### Query Parameters

- `status`: optional for the first version, but when provided must be `pending_assignment`.

### Response `200`

```json
{
  "data": [
    {
      "id": "booking_001",
      "customerId": "customer_123",
      "status": "pending_assignment",
      "ritualId": "grah-pravesh",
      "ritualName": "Grah Pravesh Puja",
      "preferredSlot": "2026-06-02T09:30:00.000+05:30",
      "mode": "home_visit",
      "contactName": "Kushendra",
      "contactPhone": "9876543210",
      "addressLine": "Indiranagar, Bengaluru",
      "language": "Hindi",
      "notes": "Please bring a samagri checklist.",
      "createdAt": "2026-05-28T10:00:00.000Z",
      "updatedAt": "2026-05-28T10:00:00.000Z"
    }
  ]
}
```

## View Booking Request Detail

`GET /api/v1/admin/bookings/:bookingId`

Returns one booking request for admin review.

### Auth

- Required role: `admin`
- `customer`, `partner`, and `support` must receive `403`.

### Response `200`

```json
{
  "id": "booking_001",
  "customerId": "customer_123",
  "status": "pending_assignment",
  "ritualId": "grah-pravesh",
  "ritualName": "Grah Pravesh Puja",
  "preferredSlot": "2026-06-02T09:30:00.000+05:30",
  "mode": "home_visit",
  "contactName": "Kushendra",
  "contactPhone": "9876543210",
  "addressLine": "Indiranagar, Bengaluru",
  "language": "Hindi",
  "notes": "Please bring a samagri checklist.",
  "createdAt": "2026-05-28T10:00:00.000Z",
  "updatedAt": "2026-05-28T10:00:00.000Z"
}
```

### Response `404`

Returned when the booking does not exist.

## Notes For Backend Slice

- Admin pending list should only include bookings with `pending_assignment`.
- This slice does not assign partners yet. Assignment is slice 5.
- Support is intentionally not allowed to access admin assignment views in V1.
- Future versions should include status history and assignment events once those records exist.
