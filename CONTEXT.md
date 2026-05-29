# Tathastu Context

## Product

Tathastu is a two-sided managed marketplace for Hindu rituals, pujas, and spiritual guidance. The marketplace connects customers who want to book rituals with verified pandits and gurujis who can perform them remotely or in person.

The current codebase contains the customer React Native app shell. The partner app, admin dashboard, and backend are not implemented yet.

## Current Stage

- Customer app V0 frontend exists with onboarding, login/OTP, home feed, profile hub, ritual detail, and placeholder booking/search/explore surfaces.
- Authentication is local/mock only.
- Ritual catalog, testimonials, upcoming booking, and ritual detail content are static or i18n-backed.
- A customer-focused backend plan exists in `docs/backend-architecture-plan.md`.
- The next stage is marketplace domain design before backend and partner app implementation.

## Volume Assumption

For the first 6 months, expected demand is fewer than 10 orders per day. This makes manual operations acceptable and preferable for V1. We should optimize for learning, reliability, and low infrastructure spend rather than automation at scale.

## Actors

- Customer: A person booking a ritual, puja, consultation, or guidance session.
- Partner: A verified pandit or guruji who can accept and perform assigned bookings.
- Admin: Internal operator who manages rituals, partners, booking assignment, customer support, and manual payout checks.
- Support: Internal operator handling booking questions, cancellations, refunds, and disputes. Support may be the same person as Admin in V1.

## Core Domain Terms

- Ritual: A catalog service that can be booked, such as Nazar Utaro, Grah Shanti, Satyanarayan Puja, Grah Pravesh, or a custom ritual.
- Moment: A customer need-state used for discovery, such as protection, home, prosperity, wellness, or remembrance.
- Booking: A customer request to schedule a ritual. Booking is the marketplace spine.
- Booking Request: A booking before a partner is confirmed.
- Assignment: The act of linking a booking to a partner.
- Partner Acceptance: A partner confirming that they can perform an assigned booking.
- Slot: A requested or confirmed date/time window for a booking.
- Mode: The fulfillment mode for a ritual, initially `live_video` or `home_visit`.
- Deliverable: What the customer receives as part of the ritual, such as live ceremony, preparation checklist, sankalp guidance, or recording.
- Availability: Partner-declared working windows. For V1 this can be simple and admin-assisted.
- Payout: Money owed to a partner after a completed booking.
- Video KYC: Admin-reviewed partner verification step required before a partner can receive assignments.

## Booking Lifecycle

V1 should use a simple lifecycle:

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

Accepted meaning:

- `draft`: Customer has started a booking flow but has not submitted it.
- `pending_assignment`: Customer submitted the request; admin needs to assign a partner.
- `assigned`: Admin assigned a partner; partner has not accepted yet.
- `accepted`: Partner accepted; customer confirmation may still be pending if payment or final confirmation is needed.
- `confirmed`: Booking is ready to happen.
- `in_progress`: Ritual is happening or has started.
- `completed`: Ritual is complete.
- `cancelled`: Booking was cancelled by customer, partner, or admin.

Payment-specific states should not be mixed into booking status. Use separate payment state when payments are implemented.

## Marketplace V1 Decisions

- Customers submit booking requests before payment. Payment is collected only after partner acceptance and final customer/admin confirmation.
- V1 supports both `live_video` and `home_visit`.
- Partners may decline assigned bookings with a required reason. The booking returns to admin attention as `pending_assignment`, and the decline is recorded in assignment history.
- Partners must complete video KYC and be admin-verified before receiving assignments.
- Before partner acceptance, partners see ritual, mode, preferred slot, city/locality for home visits, language, and customer notes. Full customer name, phone, exact address, payment details, and private support/admin notes stay hidden until acceptance/final confirmation.
- Cancellations are manual in V1: customers can request cancellation before `in_progress`; partner cancellation after confirmation is admin-mediated; admins can cancel pre-completion bookings with a required reason; completed bookings cannot be cancelled.
- V1 auth roles are `customer`, `partner`, `admin`, and `support`.
- Bookings must preserve status history and assignment history from day one.

## Architecture Direction

- Use one shared backend for customer app, partner app, and admin dashboard.
- Keep customer and partner mobile apps separate at the product level, even if they share libraries later.
- Use manual admin assignment for V1.
- Avoid ML matching, auto-dispatch, Kafka, Kubernetes, and Elasticsearch in V1.
- Prefer simple modules with clear interfaces: Auth, Catalog, Bookings, Partners, Admin, Notifications, Payments.
- Prefer behavior-first tests around public interfaces and booking lifecycle transitions.

## Frontend Direction

- Customer app: calm, warm, devotional, polished, trust-building.
- Partner app: operational, fast, readable, focused on jobs, schedule, customer details, checklist, and earnings.
- Admin dashboard: dense, utilitarian, reliable, optimized for repeated assignment/support tasks.

## Remaining Open Questions

- What exact payment provider and payment state machine should V1 use after confirmation?
- What partner payout workflow is needed once completed bookings become paid bookings?
