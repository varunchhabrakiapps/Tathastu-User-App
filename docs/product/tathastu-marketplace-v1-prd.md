# Tathastu Two-Sided Marketplace V1 PRD

## Problem Statement

Tathastu needs to move from a customer-facing ritual discovery shell into a working two-sided marketplace. Customers should be able to request ritual bookings, partners should be able to accept and fulfill assigned work, and admins should be able to manually operate the marketplace while demand is low.

The current app has a strong customer frontend foundation, but the backend plan is customer-focused and does not yet define partner, booking assignment, admin operations, or the full booking lifecycle.

## Solution

Build a lean V1 marketplace around the Booking lifecycle:

- Customers browse rituals and submit booking requests.
- Admins review pending bookings and assign verified partners manually.
- Partners see assigned bookings, accept or decline, view details, and update status.
- Customers see booking status as it moves from requested to confirmed to completed.
- Admins manage rituals, partners, assignment, and support manually.

The system should be intentionally simple for the first 6 months and fewer than 10 daily orders. It should avoid heavy automation while preserving a clean path to future matching, payments, payouts, and notification automation.

## User Stories

1. As a customer, I want to browse rituals, so that I can understand what Tathastu offers.
2. As a customer, I want to browse rituals by life moment, so that I can find a relevant ceremony without knowing the exact ritual name.
3. As a customer, I want to view ritual details, pricing, duration, and deliverables, so that I can decide whether to request it.
4. As a customer, I want to request a ritual with preferred date, time, mode, address, and language, so that Tathastu can arrange the right partner.
5. As a customer, I want to submit a custom ritual request, so that I can ask for help when the catalog does not cover my need.
6. As a customer, I want to see whether my booking is pending, assigned, confirmed, completed, or cancelled, so that I know what will happen next.
7. As a customer, I want to receive updates when my booking status changes, so that I do not need to contact support repeatedly.
8. As a customer, I want to see preparation instructions after confirmation, so that I can be ready for the ritual.
9. As a customer, I want to contact support about a booking, so that exceptions can be handled.
10. As a partner, I want to log in securely, so that only verified pandits and gurujis can access partner work.
11. As a partner, I want to see bookings assigned to me, so that I can respond quickly.
12. As a partner, I want to accept or decline an assigned booking, so that I can manage my real availability.
13. As a partner, I want to see ritual details, date/time, mode, address, customer notes, and preparation requirements, so that I can perform the booking properly.
14. As a partner, I want to update booking status, so that the customer and admin know what is happening.
15. As a partner, I want to see completed bookings and expected earnings, so that I can track my work.
16. As an admin, I want to see pending bookings, so that I can assign partners manually.
17. As an admin, I want to filter partners by ritual skill, city, language, mode, and availability notes, so that I can assign a suitable partner.
18. As an admin, I want to reassign a booking if a partner declines, so that customer fulfillment stays reliable.
19. As an admin, I want to manage partner profiles and verification status, so that only trusted partners can receive work.
20. As an admin, I want to manage ritual catalog content, so that the customer app can move away from static copy.
21. As an admin, I want to update booking status manually, so that support cases can be resolved without engineering help.
22. As an admin, I want to see booking history and assignment events, so that disputes and operational questions can be understood.
23. As an operator, I want the system to work without high-scale infrastructure, so that the first 6 months remain affordable.
24. As an engineer, I want booking lifecycle rules centralized, so that customer, partner, and admin clients do not drift.
25. As an engineer, I want behavior-first tests around booking transitions, so that marketplace rules stay reliable as the product changes.

## Implementation Decisions

- Treat Booking as the core marketplace module.
- Use one shared backend for customer app, partner app, and admin dashboard.
- Keep customer and partner experiences separate at the product level.
- Use manual admin assignment for V1.
- Keep payment state separate from booking state.
- Customers submit booking requests before payment. Payment happens only after partner acceptance and final customer/admin confirmation.
- Use a simple booking lifecycle: `draft`, `pending_assignment`, `assigned`, `accepted`, `confirmed`, `in_progress`, `completed`, `cancelled`.
- Keep `accepted` and `confirmed` separate: partner acceptance comes first, final confirmation/payment readiness comes next.
- Support both `live_video` and `home_visit` in V1.
- Allow partners to decline assigned bookings with a required reason. Return declined bookings to admin attention and record assignment history.
- Require admin verification and completed video KYC before a partner can receive assignments.
- Hide full customer identity, phone, exact address, payment details, and private support/admin notes from partners until acceptance/final confirmation.
- Use four V1 roles: `customer`, `partner`, `admin`, and `support`.
- Preserve booking status history and assignment history from day one.
- Start with PostgreSQL and Prisma.
- Use TypeScript with NestJS or Fastify for the backend.
- Use customer OTP/JWT auth and extend the auth model to support admin and partner roles.
- Replace static customer app data with API-backed catalog, rituals, testimonials, search, and booking data over time.
- Build the admin dashboard early because manual assignment is part of the product, not an operational workaround.
- Use manual WhatsApp Business or simple SMS/email updates before paid WhatsApp API automation.
- Defer partner availability automation; allow simple partner availability notes or basic working windows first.
- Record assignment events even when assignment is manual, so future automation has history.
- Keep infrastructure lean and avoid Kafka, Kubernetes, Elasticsearch, and ML matching in V1.

## Proposed Modules

- Auth: OTP, JWT, role/session handling.
- Customers: customer profile and contact details.
- Partners: partner profile, video KYC, verification, skills, languages, cities, mode eligibility.
- Catalog: moments, rituals, deliverables, pricing display, active/inactive catalog state.
- Bookings: request creation, lifecycle transitions, assignment state, customer/partner/admin views.
- Assignment: manual assignment records and reassignment history.
- Notifications: simple status-change messaging hooks.
- Admin: operational views for pending bookings, partner management, catalog management, and support actions.
- Payments: post-acceptance payment flow with payment state separate from booking status.
- Partner Earnings: paid completed booking earnings and manual payout tracking.

## API Requirements

The existing customer-focused API plan should be retained and expanded. Existing planned customer APIs:

- `POST /api/v1/auth/otp/request`
- `POST /api/v1/auth/otp/resend`
- `POST /api/v1/auth/otp/verify`
- `GET /api/v1/me`
- `PATCH /api/v1/me`
- `GET /api/v1/moments`
- `GET /api/v1/moments/:momentId/rituals`
- `GET /api/v1/testimonials/top`
- `GET /api/v1/rituals/:ritualId`
- `GET /api/v1/rituals/trending`
- `GET /api/v1/rituals`
- `GET /api/v1/search`

New marketplace APIs needed:

- Customer creates booking request.
- Customer lists own bookings.
- Customer views booking detail.
- Partner lists assigned bookings.
- Partner accepts booking.
- Partner declines booking.
- Partner updates booking status.
- Admin lists pending bookings.
- Admin assigns or reassigns booking.
- Admin updates booking status.
- Admin manages partners.
- Admin manages ritual catalog.
- System creates a customer payment request/invoice after booking confirmation.
- Customer views the payment request for their confirmed booking.
- Admin retries payment request creation when provider/invoice creation fails.
- System creates partner earning entries after a booking is paid and completed.
- Partner views own completed paid booking earnings.
- Admin records manual partner payouts without initiating automated bank transfers.

## Testing Decisions

- Test public behavior, not implementation details.
- Booking lifecycle transitions should have the strongest test coverage.
- API tests should verify what each actor can and cannot do.
- Customer/partner/admin authorization should be tested as observable behavior.
- Avoid testing private helpers directly unless they become deep modules with stable interfaces.
- Use tracer-bullet TDD: one behavior, one failing test, minimal implementation, then repeat.

High-priority behaviors to test first:

- Customer can create a booking request.
- Admin can assign a pending booking to a verified partner.
- Partner can accept an assigned booking.
- Customer sees booking move to confirmed.
- Partner cannot accept a booking assigned to someone else.
- Invalid lifecycle transitions are rejected.

## Out of Scope

- Automated matching.
- ML slot scoring.
- Partner bidding or quote marketplace.
- Full payout automation.
- Automated bank transfer initiation.
- WhatsApp Business API automation.
- Elasticsearch/OpenSearch.
- Kafka or event streaming.
- Kubernetes.
- Multi-city routing optimization.
- Admin analytics beyond basic operational views.
- Automated cancellation/refund policy enforcement.

## Further Notes

The current customer app should not be treated as throwaway. It provides the visual and navigation foundation for the customer experience.

The first marketplace decision pass is locked in `docs/adr/0005-marketplace-lifecycle-and-role-model.md`. The next major product risk is implementing the first booking slice with centralized lifecycle rules and behavior-first tests.
