# Booking Requests API Contract V1

This contract captures the backend target for marketplace slice 2. The current customer app uses local storage behind the same service shape until the backend exists.

## Create Booking Request

`POST /api/v1/bookings`

Creates a customer booking request and returns the created booking.

### Auth

- Required role: `customer`
- The server derives `customerId` from the authenticated session.

### Request Body

```json
{
  "ritualId": "grah-pravesh",
  "ritualName": "Grah Pravesh Puja",
  "preferredSlot": "2026-06-02T09:30:00.000+05:30",
  "mode": "home_visit",
  "contactName": "Kushendra",
  "contactPhone": "9876543210",
  "addressLine": "Indiranagar, Bengaluru",
  "language": "Hindi",
  "notes": "Please bring a samagri checklist."
}
```

### Validation

- `ritualId` or `ritualName` is required.
- `preferredSlot` is required.
- `mode` must be `live_video` or `home_visit`.
- `contactPhone` is required.
- `addressLine` is required when `mode` is `home_visit`.

### Response `201`

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

## List My Bookings

`GET /api/v1/bookings`

Lists bookings owned by the authenticated customer, newest first.

### Auth

- Required role: `customer`

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

## Get My Booking

`GET /api/v1/bookings/:bookingId`

Returns one booking owned by the authenticated customer.

### Auth

- Required role: `customer`
- Customers cannot fetch another customer's booking.

### Response `200`

Returns the same booking object shape as `POST /api/v1/bookings`.

### Response `404`

Returned when the booking does not exist or does not belong to the authenticated customer.

## Notes For Backend Slice

- New customer bookings start as `pending_assignment`.
- Payment is not collected in this slice.
- Booking status history should record the creation transition.
- Admin assignment and partner acceptance are separate slices.
