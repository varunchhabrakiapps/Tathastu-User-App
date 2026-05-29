# Tathastu Marketplace V1 Issue Breakdown

These are tracer-bullet vertical slices. Each slice should be demoable or verifiable on its own and should cut through the relevant schema, API, UI, and tests.

## Proposed Slices

1. **Define marketplace lifecycle and role model**
   - Type: HITL
   - Status: Done
   - Blocked by: None
   - User stories covered: 6, 10, 16, 24, 25
   - Notes: Locked in `docs/adr/0005-marketplace-lifecycle-and-role-model.md`.

2. **Customer can submit a ritual booking request**
   - Type: AFK after slice 1
   - Status: Done locally; backend API pending
   - Blocked by: 1
   - User stories covered: 3, 4, 6
   - Acceptance criteria:
     - Customer can submit ritual, preferred slot, mode, contact/address, and notes.
     - Booking is created as `pending_assignment`.
     - Customer can see the newly requested booking.
     - Behavior is covered by API tests.
   - Notes: Customer app uses local storage behind the future API shape. Backend contract is in `docs/api/booking-requests-v1.md`.

3. **Admin can view pending booking requests**
   - Type: AFK after slice 2
   - Status: Done at service/API-contract level; admin dashboard pending
   - Blocked by: 2
   - User stories covered: 16, 22
   - Acceptance criteria:
     - Admin can list pending bookings.
     - Admin can view booking detail with customer, ritual, slot, mode, and notes.
     - Non-admin users cannot access admin booking views.
   - Notes: Service boundary and tests are in place. Backend contract is in `docs/api/admin-booking-requests-v1.md`.

4. **Admin can create and verify partner profiles**
   - Type: AFK after slice 1
   - Status: Done at service/API-contract level; admin dashboard pending
   - Blocked by: 1
   - User stories covered: 17, 19
   - Acceptance criteria:
     - Admin can create partner profile.
     - Admin can set verification status.
     - Admin can record skills, languages, city, and mode eligibility.
     - Unverified partners cannot receive assignments.
   - Notes: Partner profile service and tests are in place. Backend contract is in `docs/api/admin-partner-profiles-v1.md`.

5. **Admin can assign a booking to a verified partner**
   - Type: AFK after slices 3 and 4
   - Status: Done at service/API-contract level; admin dashboard pending
   - Blocked by: 3, 4
   - User stories covered: 17, 18, 22
   - Acceptance criteria:
     - Admin can assign a pending booking to a verified eligible partner.
     - Booking moves to `assigned`.
     - Assignment event is recorded.
     - Invalid assignment attempts are rejected.
   - Notes: Assignment service and tests are in place. Backend contract is in `docs/api/admin-booking-assignment-v1.md`.

6. **Partner can see assigned bookings**
   - Type: AFK after slice 5
   - Status: Done at service/API-contract level; partner app pending
   - Blocked by: 5
   - User stories covered: 10, 11, 13
   - Acceptance criteria:
     - Partner can log in and list bookings assigned to them.
     - Partner can view ritual, slot, mode, customer notes, and preparation details.
     - Partner cannot see another partner's assigned bookings.
   - Notes: Partner booking view service and tests are in place. Backend contract is in `docs/api/partner-assigned-bookings-v1.md`.

7. **Partner can accept or decline an assigned booking**
   - Type: AFK after slice 6
   - Status: Done at service/API-contract level; partner app pending
   - Blocked by: 6
   - User stories covered: 12, 18, 24, 25
   - Acceptance criteria:
     - Partner can accept a booking assigned to them.
     - Accepted booking moves toward customer-visible confirmation.
     - Partner can decline with a reason.
     - Declined booking returns to admin attention.
     - Invalid actor/state transitions are rejected.
   - Notes: Partner response service and tests are in place. Backend contract is in `docs/api/partner-booking-response-v1.md`.

8. **Customer can see confirmed booking status**
   - Type: AFK after slice 7
   - Status: Done at service/API-contract level; customer app API integration pending
   - Blocked by: 7
   - User stories covered: 6, 7, 8
   - Acceptance criteria:
     - Customer sees status change after partner acceptance.
     - Customer sees preparation instructions where available.
     - Customer cannot see internal assignment notes.
   - Notes: Confirmation service and customer-safe booking view are in place. Backend contract is in `docs/api/customer-confirmed-bookings-v1.md`.

9. **Partner can progress booking through fulfillment**
   - Type: AFK after slice 8
   - Status: Done at service/API-contract level; partner app pending
   - Blocked by: 8
   - User stories covered: 14, 15
   - Acceptance criteria:
     - Partner can mark booking `in_progress`.
     - Partner can mark booking `completed`.
     - Customer and admin views reflect status changes.
     - Completed booking appears in partner history.
   - Notes: Fulfillment service and tests are in place. Backend contract is in `docs/api/partner-booking-fulfillment-v1.md`.

10. **Admin can manage ritual catalog for customer app**
    - Type: AFK after slice 1
    - Status: Done at service/API-contract level; admin dashboard and app API integration pending
    - Blocked by: 1
    - User stories covered: 1, 2, 3, 20
    - Acceptance criteria:
      - Admin can create/edit ritual and moment records.
      - Customer app catalog APIs return active rituals and moments.
      - Static customer data has a clear migration path to API data.
    - Notes: Catalog admin/customer services and tests are in place. Backend contract and migration path are in `docs/api/admin-catalog-v1.md`.

11. **Customer app consumes backend auth and catalog**
    - Type: AFK after slice 10
    - Status: Done locally; backend API/config pending
    - Blocked by: 10
    - User stories covered: 1, 2, 3, 24
    - Acceptance criteria:
      - OTP/auth flow stores real JWT/user profile.
      - Home/search/ritual detail can read API-backed catalog data.
      - App still handles loading, empty, and error states gracefully.
    - Notes: Customer auth/catalog integration contract is in `docs/api/customer-auth-catalog-v1.md`. App services now support JWT/profile sessions and API-backed catalog reads with static fallback.

12. **Basic notification hooks for booking status changes**
    - Type: AFK after slice 8
    - Status: Done at service/API-contract level; cancellation/admin override linkage documented; delivery adapters pending
    - Blocked by: 8
    - User stories covered: 7, 23
    - Acceptance criteria:
      - Status changes create notification events.
      - Cancellation and admin override status transitions link notifications to their source domain event ids.
      - V1 can route events to manual/admin-visible messaging or SMS/email.
      - No paid WhatsApp API dependency is required.
    - Notes: Notification event service, transition hooks, and cancellation/admin override linkage contracts are in place. Backend contract is in `docs/api/booking-status-notification-hooks-v1.md`.

13. **Create customer payment request after booking confirmation**
    - Type: AFK after slices 8 and 12
    - Status: Done at service/API-contract level; provider integration pending
    - Blocked by: 8, 12
    - User stories covered: 6, 7, 8, 23, 24
    - Acceptance criteria:
      - Confirming an accepted booking creates one idempotent customer payment request/invoice.
      - Payment state remains separate from booking status.
      - Customer can fetch their own payment request for a confirmed booking.
      - Partners cannot see invoice numbers, payment URLs, provider IDs, or customer payment status.
      - Admin can retry payment request creation if the provider step fails after confirmation.
    - Notes: Payment request service and confirmation hook are in place. Backend contract is in `docs/api/customer-payment-intent-invoice-v1.md`.

14. **Track partner earnings and manual payouts for paid completed bookings**
    - Type: AFK after slices 9 and 13
    - Status: Done at service/API-contract level; payout automation pending
    - Blocked by: 9, 13
    - User stories covered: 15, 22, 23, 24
    - Acceptance criteria:
      - A partner earning entry is created idempotently only after a booking is both `completed` and paid.
      - Partner earning amount and platform fee are recorded from an admin-controlled share policy.
      - Partner can list their own earnings without seeing customer payment internals.
      - Admin can mark earnings as payout pending or manually paid with internal notes.
      - Support cannot manage payouts in V1.
    - Notes: Partner earning service and tests are in place. Backend contract is in `docs/api/partner-earnings-payouts-v1.md`.

15. **Admin can cancel bookings and track manual refunds**
    - Type: AFK after slices 12 and 13
    - Status: Done at service/API-contract level; admin dashboard and refund automation pending
    - Blocked by: 12, 13
    - User stories covered: 6, 7, 21, 22, 23, 24
    - Acceptance criteria:
      - Customer can request cancellation before completion.
      - Admin can review cancellation requests.
      - Admin can cancel any non-completed booking with a required reason.
      - Cancellation records status history and emits notification events.
      - Paid cancelled bookings can create manual refund tracking without automating provider refunds.
      - Admin can review manual refunds and mark refund completion with provider reference and internal notes.
      - Partners and customers cannot see internal cancellation or refund notes.
    - Notes: Cancellation/refund service and tests are in place. Backend contract is in `docs/api/booking-cancellations-refunds-v1.md`.

16. **Admin/support can audit booking status history and admin can override status**
    - Type: AFK after slices 5, 7, 8, 9, 12, and 15
    - Status: Done at service/API-contract level; dashboard pending
    - Blocked by: 5, 7, 8, 9, 12, 15
    - User stories covered: 21, 22, 24
    - Acceptance criteria:
      - Every booking status transition writes an immutable status history entry.
      - Admin and support can view status history for a booking.
      - Admin can override eligible non-terminal booking statuses with a required reason.
      - Support can view audit history but cannot override status.
      - Overrides cannot reopen `completed` or `cancelled` bookings and cannot bypass cancellation/refund rules.
      - Override events create status history transactionally.
      - Override status transitions emit notification events linked to the status override event id.
      - Customer and partner responses expose only the current status, not internal override reasons or notes.
    - Notes: Audit service, transition hooks, notification linkage, and override tests are in place. Backend contract is in `docs/api/booking-status-audit-admin-override-v1.md`.

## Review Questions

- Does this granularity feel right, or should any slices be merged/split?
- Which payment provider should power the post-acceptance payment flow?
- Which provider, if any, should eventually replace manual partner payout recording?
- What cancellation/refund policy thresholds should ops apply manually before automation exists?
