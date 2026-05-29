# ADR 0005: Lock Marketplace Lifecycle and Role Model

## Status

Accepted

## Context

The marketplace implementation needs a stable booking lifecycle, role model, payment timing, partner verification policy, customer data visibility rule, and cancellation policy before backend work begins.

Tathastu V1 will operate as a manually managed marketplace for fewer than 10 daily orders. Manual admin assignment is already accepted, but implementation slices need precise actor permissions and transition rules.

## Decision

### Booking Lifecycle

V1 will use these booking statuses:

```text
draft
pending_assignment
assigned
accepted
confirmed
in_progress
completed
cancelled
```

Status meanings:

- `draft`: Customer has started a booking flow but has not submitted it.
- `pending_assignment`: Customer submitted the request; admin needs to assign a partner.
- `assigned`: Admin assigned a verified partner; partner has not accepted yet.
- `accepted`: Partner accepted the booking; customer/payment/admin final confirmation may still be pending.
- `confirmed`: Booking is ready to happen.
- `in_progress`: Ritual is happening or has started.
- `completed`: Ritual is complete.
- `cancelled`: Booking was cancelled by customer request, partner/admin action, or admin override.

Keep `accepted` and `confirmed` separate so payment and customer final confirmation can be added without changing lifecycle semantics.

### Payment Timing

Customers submit a booking request first. Payment is collected only after partner acceptance and admin/customer final confirmation.

Payment-specific states must remain separate from booking status.

### Modes

V1 supports both fulfillment modes:

- `live_video`
- `home_visit`

Both modes are first-class domain values from the start.

### Partner Declines

Partners can decline an assigned booking with a required reason. Declines are recorded in assignment history, and the booking returns to admin attention as `pending_assignment`.

No automated partner penalties are enforced in V1.

### Partner Verification

A partner must be admin-verified before receiving assignments. Verification requires at least:

- Name and phone.
- City or service area.
- Supported modes.
- Ritual skills or categories.
- Languages.
- Internal admin notes.
- Completed video KYC.

Unverified partners cannot receive assignments.

### Customer Data Visibility

Before partner acceptance, the partner can see:

- Ritual.
- Mode.
- Preferred slot.
- City/locality for home visit.
- Language.
- Customer notes.

Before acceptance, hide full customer name, phone, exact address, payment details, and private support/admin notes.

After acceptance and final confirmation, show the partner the customer details needed to fulfill the booking, such as full name, phone, exact address or meeting details, and preparation specifics.

### Cancellation Policy

V1 cancellation is manual but explicit:

- Customer can request cancellation anytime before `in_progress`.
- Partner can decline before confirmation.
- Partner cancellation after confirmation is admin-mediated.
- Admin can cancel any pre-completion booking with a required reason.
- Refunds remain manual until payment implementation is defined.
- Completed bookings cannot be cancelled.

### Roles

V1 auth supports:

- `customer`
- `partner`
- `admin`
- `support`

Role permissions:

- Customer can manage their own profile, submit booking requests, view their own bookings, request cancellation, and contact support.
- Partner can view assigned bookings, accept or decline assigned work, see permitted booking details, and mark confirmed bookings `in_progress` or `completed`.
- Admin can manage catalog, partners, verification, assignments, booking overrides, cancellations, and internal notes.
- Support can view customer and booking information, add support notes, and assist with cancellation requests, but cannot verify partners, edit catalog, assign partners, or manage payouts.

### History

Bookings must preserve status history and assignment history from day one. This supports customer support, disputes, partner reliability review, and future automation.

## Consequences

- Slice 2 can implement booking request creation without payment.
- Partner and admin authorization can be tested against these role permissions.
- Assignment APIs must reject unverified partners and record assignment events.
- Partner-facing views need field-level filtering before acceptance.
- Cancellation and refunds stay operationally manual in V1, but the product still records reasons and history.

## Alternatives Considered

- Upfront payment: rejected for V1 because manual assignment can fail or require partner/customer coordination before confirmation.
- Single `confirmed` status after partner acceptance: rejected because payment and final confirmation need a clean intermediate state.
- Video-only launch mode: rejected because V1 should support both live video and home visit in the domain model.
- No partner decline: rejected because partners need to represent real availability and admins need reassignment history.
