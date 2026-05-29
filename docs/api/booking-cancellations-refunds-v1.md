# Booking Cancellations and Manual Refund Tracking API Contract V1

This contract captures marketplace slice 15: customers can request cancellation, admins can manually cancel eligible bookings, and ops can track manual refund work without automating provider refunds.

## Lifecycle Rules

Cancellation is a booking status transition to `cancelled`. Refund tracking is separate from booking status and customer payment status.

Allowed V1 cancellation paths:

- Customer can request cancellation for their own non-completed booking.
- Support can record a cancellation request on behalf of a customer.
- Partner can request cancellation for a booking assigned to them; after confirmation this remains admin-mediated.
- Admin can cancel any non-completed booking with a required reason.
- Bookings in `completed` or already `cancelled` cannot be cancelled again.

Cancellation must preserve status history and create notification events using `sourceEventType: cancellation` and the cancellation event id as `sourceEventId`. Creating a cancellation request does not change booking status and does not create booking status notifications by itself.

## Cancellation Request Shape

```json
{
  "id": "cancellation_request_001",
  "bookingId": "booking_001",
  "requestedBy": "customer_123",
  "requesterRole": "customer",
  "reason": "Family emergency; need to cancel.",
  "status": "requested",
  "createdAt": "2026-05-29T10:00:00.000Z",
  "updatedAt": "2026-05-29T10:00:00.000Z"
}
```

V1 cancellation request statuses:

- `requested`
- `approved`
- `rejected`

## Request Cancellation

`POST /api/v1/bookings/:bookingId/cancellation-requests`

Creates a cancellation request for admin review. It does not change booking status by itself.

### Auth

- Required role: `customer`, `partner`, `admin`, or `support`
- Customer can only request cancellation for their own booking.
- Partner can only request cancellation for a booking assigned to them.
- Admin and support can record requests for ops review.

### Request Body

```json
{
  "reason": "Family emergency; need to cancel."
}
```

### Validation

- `reason` is required.
- Booking must exist.
- Booking status must not be `completed` or `cancelled`.

### Response `201`

```json
{
  "cancellationRequest": {
    "id": "cancellation_request_001",
    "bookingId": "booking_001",
    "requestedBy": "customer_123",
    "requesterRole": "customer",
    "reason": "Family emergency; need to cancel.",
    "status": "requested",
    "createdAt": "2026-05-29T10:00:00.000Z"
  }
}
```

## Admin Cancellation Queue

`GET /api/v1/admin/cancellation-requests?status=requested`

Lists cancellation requests for ops review, newest first.

### Auth

- Required role: `admin` or `support`
- `customer` and `partner` must receive `403` in V1.

### Query Parameters

- `status`: optional cancellation request status filter.
- `bookingId`: optional booking filter.

## Admin Cancel Booking

`POST /api/v1/admin/bookings/:bookingId/cancel`

Cancels an eligible booking, records a cancellation event, resolves any open cancellation request, and creates manual refund tracking when needed.

### Auth

- Required role: `admin`
- `customer`, `partner`, and `support` must receive `403` in V1.

### Request Body

```json
{
  "reason": "Customer requested cancellation before fulfillment.",
  "cancellationRequestId": "cancellation_request_001"
}
```

### Validation

- `reason` is required.
- Booking must exist.
- Booking status must not be `completed` or `cancelled`.
- `cancellationRequestId`, when provided, must belong to the same booking.
- Refund tracking is created automatically. If the booking has a paid payment request, the refund starts as `refund_review_pending`; otherwise it starts as `not_required`.

### Response `200`

```json
{
  "booking": {
    "id": "booking_001",
    "status": "cancelled",
    "previousStatus": "confirmed",
    "updatedAt": "2026-05-29T10:05:00.000Z"
  },
  "event": {
    "id": "cancellation_event_001",
    "bookingId": "booking_001",
    "cancelledBy": "admin_001",
    "reason": "Customer requested cancellation before fulfillment.",
    "previousStatus": "confirmed",
    "newStatus": "cancelled",
    "createdAt": "2026-05-29T10:05:00.000Z"
  },
  "statusHistory": {
    "id": "status_history_002",
    "bookingId": "booking_001",
    "previousStatus": "confirmed",
    "newStatus": "cancelled",
    "sourceEventType": "cancellation",
    "sourceEventId": "cancellation_event_001",
    "createdAt": "2026-05-29T10:05:00.000Z"
  },
  "refund": {
    "id": "refund_001",
    "bookingId": "booking_001",
    "paymentIntentId": "payment_request_001",
    "status": "refund_review_pending",
    "amountMinor": 510000,
    "currency": "INR"
  }
}
```

## Refund Tracking Shape

```json
{
  "id": "refund_001",
  "bookingId": "booking_001",
  "paymentIntentId": "payment_request_001",
  "amountMinor": 510000,
  "currency": "INR",
  "status": "refund_review_pending",
  "notes": null,
  "createdBy": "admin_001",
  "createdAt": "2026-05-29T10:05:00.000Z",
  "updatedAt": "2026-05-29T10:05:00.000Z"
}
```

V1 refund tracking statuses:

- `not_required`
- `refund_review_pending`
- `refund_marked_paid`

## Admin Refund Queue

`GET /api/v1/admin/refunds?status=refund_review_pending`

Lists manual refund records for ops and finance review.

### Auth

- Required role: `admin`
- `customer`, `partner`, and `support` must receive `403` in V1.

## Mark Manual Refund Paid

`POST /api/v1/admin/refunds/:refundId/paid`

Marks a refund as manually paid after ops completes the provider, UPI, or bank workflow. This does not change the linked payment request status in V1.

### Request Body

```json
{
  "notes": "Refund sent manually via UPI ref 123."
}
```

### Validation

- Refund record must exist.
- `notes` are required.
- Refund must currently be `refund_review_pending`.
- Marking a refund paid must be idempotent for the same refund record.

## Privacy Rules

Customer booking responses may show that a cancellation was requested or that the booking is cancelled. They must not include admin notes, partner reliability notes, provider refund IDs, or internal refund notes.

Partner booking responses may show `cancelled` status for assigned bookings. They must not include customer refund status, invoice numbers, payment URLs, provider IDs, or internal cancellation notes.

## Notes For Backend Slice

- Cancellation, cancellation event creation, status history creation, cancellation request resolution, optional refund tracking creation, and notification event creation should be transactional.
- Refund provider automation, partial-refund policy automation, and payment reconciliation are out of scope for V1.
- Manual refund tracking coexists with the payment statuses in `docs/api/customer-payment-intent-invoice-v1.md`; it does not change booking lifecycle semantics or payment state in V1.
- Cancellation status notifications are covered by `docs/api/booking-status-notification-hooks-v1.md`; they use `sourceEventType: cancellation`, `sourceEventId` set to the cancellation event id, and `templateKey: booking_cancelled`.
