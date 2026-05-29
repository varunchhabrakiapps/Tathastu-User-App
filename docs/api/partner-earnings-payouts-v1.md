# Partner Earnings and Payouts API Contract V1

This contract captures marketplace slice 14: after a booking is both paid and completed, the system accrues partner earnings and lets admins track manual payout progress.

## Earnings Rule

Partner earnings are created only when all conditions are true:

- Booking exists.
- Booking status is `completed`.
- Booking has an assigned partner.
- Customer payment request for the booking is `paid`.
- No earning already exists for the booking.

Payment state stays separate from booking status. Payout state stays separate from both.

## Earning Shape

```json
{
  "id": "earning_001",
  "bookingId": "booking_001",
  "paymentIntentId": "payment_request_001",
  "partnerId": "partner_001",
  "grossAmountMinor": 420000,
  "partnerAmountMinor": 315000,
  "platformFeeMinor": 105000,
  "currency": "INR",
  "status": "earned",
  "createdAt": "2026-05-29T12:00:00.000Z",
  "updatedAt": "2026-05-29T12:00:00.000Z"
}
```

V1 earning statuses:

- `earned`
- `payout_pending`
- `payout_marked_paid`

## Accrue Earning

`POST /api/v1/admin/bookings/:bookingId/earnings`

Creates one earning row for a completed paid booking.

### Auth

- Required role: `admin`
- `customer`, `partner`, and `support` must receive `403`.

### Validation

- Booking must be `completed`.
- Booking must have an assigned partner.
- Booking must have a `paid` payment request.
- Earning creation is idempotent by `bookingId`.

## Partner Earnings

`GET /api/v1/partners/me/earnings`

Returns the authenticated partner's earnings. Partners can see their earning amount and payout status, but not customer payment URLs, invoice numbers, provider IDs, platform fee policy internals, or admin notes.

## Admin Payout Tracking

`POST /api/v1/admin/partner-earnings/:earningId/payout-pending`

Marks an earning as queued for manual payout.

`POST /api/v1/admin/partner-earnings/:earningId/payout-paid`

Marks an earning as manually paid.

### Request Body

```json
{
  "notes": "Paid via bank transfer UTR 123."
}
```

### Notes

- Payout automation is out of scope for V1.
- Refund clawbacks, partner tax documents, and payout provider reconciliation are later slices.
- Admin payout notes are internal-only.
