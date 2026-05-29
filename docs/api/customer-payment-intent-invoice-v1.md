# Customer Payment Intent and Invoice API Contract V1

This contract captures marketplace slice 13: after a booking is confirmed, create the customer payment request without changing booking status semantics.

## Creation Trigger

When `POST /api/v1/admin/bookings/:bookingId/confirm` successfully moves a booking from `accepted` to `confirmed`, the payment hook must create one customer payment request for that confirmation event.

Payment request creation must be idempotent by:

- `bookingId`
- `sourceEventType: booking_confirmation`
- `sourceEventId`

Replaying the confirmation hook or retry endpoint must return the existing payment request instead of creating a duplicate invoice or provider payment intent.

## Payment State

Payment state is separate from booking status. Creating, failing, expiring, or paying a payment request must not move the booking out of `confirmed`.

V1 payment request statuses:

- `invoice_created`
- `payment_intent_created`
- `paid`
- `failed`
- `expired`
- `cancelled`
- `refunded`

Refund handling remains manual and is tracked by `docs/api/booking-cancellations-refunds-v1.md`.

## Confirmation Payment Fields

The confirmation command must freeze the customer amount before payment request creation. The amount can come from a booking pricing snapshot or explicit admin confirmation fields.

```json
{
  "preparationInstructions": [
    "Keep kalash, diya, and rice ready before the call."
  ],
  "payment": {
    "amountMinor": 510000,
    "currency": "INR",
    "description": "Grah Pravesh Puja - home visit",
    "expiresAt": "2026-06-01T18:30:00.000Z"
  },
  "internalNotes": "Customer asked for extra reassurance; do not expose."
}
```

### Validation

- Booking must be `accepted` before confirmation.
- `amountMinor` must be a positive integer when payment is required.
- `currency` must be a supported ISO currency code; V1 default is `INR`.
- The frozen amount must not be derived from customer-controlled fields.

## Payment Request Shape

```json
{
  "id": "payment_request_001",
  "bookingId": "booking_001",
  "customerId": "customer_123",
  "invoiceNumber": "TAT-2026-0001",
  "amountMinor": 510000,
  "currency": "INR",
  "status": "payment_intent_created",
  "provider": "provider_agnostic",
  "providerPaymentIntentId": "pi_external_001",
  "providerInvoiceId": "inv_external_001",
  "paymentUrl": "https://payments.example/checkout/payment_request_001",
  "sourceEventType": "booking_confirmation",
  "sourceEventId": "confirmation_001",
  "idempotencyKey": "booking_001:booking_confirmation:confirmation_001",
  "expiresAt": "2026-06-01T18:30:00.000Z",
  "createdAt": "2026-05-28T10:00:00.000Z",
  "updatedAt": "2026-05-28T10:00:00.000Z"
}
```

### Provider Rule

The local payment request and invoice number should be created first. External provider calls should be retryable and must use the same idempotency key.

If no provider is configured in V1, create a local invoice with `status: invoice_created`, `provider: manual`, and a nullable `paymentUrl`.

## Get My Payment Request

`GET /api/v1/bookings/:bookingId/payment-request`

Returns the current payment request for the authenticated customer's confirmed booking.

### Auth

- Required role: `customer`
- Customer can only view payment requests for their own bookings.
- `partner` must receive `403`; partners never receive customer payment details.

### Response `200`

```json
{
  "id": "payment_request_001",
  "bookingId": "booking_001",
  "invoiceNumber": "TAT-2026-0001",
  "amountMinor": 510000,
  "currency": "INR",
  "status": "payment_intent_created",
  "paymentUrl": "https://payments.example/checkout/payment_request_001",
  "expiresAt": "2026-06-01T18:30:00.000Z",
  "createdAt": "2026-05-28T10:00:00.000Z"
}
```

### Response `404`

Returned when the booking does not exist, does not belong to the customer, is not confirmed, or has no payment request yet.

## Admin Retry Payment Request

`POST /api/v1/admin/bookings/:bookingId/payment-request/retry`

Retries local invoice/provider payment intent creation for a confirmed booking when the confirmation hook failed after booking confirmation.

### Auth

- Required role: `admin`
- `customer`, `partner`, and `support` must receive `403` in V1.

### Validation

- Booking must exist.
- Booking must be `confirmed`.
- Booking must have a confirmation event.
- Retry must be idempotent against the original confirmation event.

### Response `200`

```json
{
  "paymentRequest": {
    "id": "payment_request_001",
    "bookingId": "booking_001",
    "invoiceNumber": "TAT-2026-0001",
    "amountMinor": 510000,
    "currency": "INR",
    "status": "payment_intent_created",
    "provider": "provider_agnostic",
    "paymentUrl": "https://payments.example/checkout/payment_request_001",
    "sourceEventId": "confirmation_001",
    "updatedAt": "2026-05-28T10:02:00.000Z"
  }
}
```

## Privacy Rules

Customer payment responses must not include:

- Provider secrets.
- Internal confirmation notes.
- Internal assignment notes.
- Partner payout amounts.
- Support-only annotations.

Partner booking responses and partner notifications must not include customer payment request state, invoice numbers, payment URLs, or provider identifiers.

## Notes For Backend Slice

- Confirmation remains the source of truth for when payment can be requested.
- Payment request creation should not roll back an already confirmed booking if an external provider is unavailable; admin retry handles recovery.
- Payment webhooks, capture, and reconciliation are separate later slices. Cancellation-driven manual refund tracking is covered in `docs/api/booking-cancellations-refunds-v1.md`. Partner earnings and manual payout tracking are covered in `docs/api/partner-earnings-payouts-v1.md`.
- Payment-specific notifications can be added later without changing status-change notification hooks.
