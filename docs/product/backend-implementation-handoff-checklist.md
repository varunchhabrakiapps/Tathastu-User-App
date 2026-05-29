# Backend Implementation Handoff Checklist

This checklist turns the completed marketplace service/API-contract slices into a backend build sequence.

## Source Of Truth

- Lifecycle and role decisions: `docs/adr/0005-marketplace-lifecycle-and-role-model.md`
- Marketplace slice tracker: `docs/product/tathastu-marketplace-v1-issues.md`
- API contracts: `docs/api/*.md`
- Behavior tests: `__tests__/*.test.ts`

## Current Verification Baseline

Run before and after backend-facing changes:

```sh
npm test -- --watchman=false
npx tsc --noEmit
```

Current local baseline: 15 Jest suites, 41 tests.

## Backend Module Order

1. **Auth and roles**
   - Contracts: `docs/api/customer-auth-catalog-v1.md`
   - Implement OTP request/resend/verify, JWT sessions, `customer`, `partner`, `admin`, and `support` roles.
   - Preserve customer JWT/profile response shape expected by the app.

2. **Catalog**
   - Contracts: `docs/api/admin-catalog-v1.md`, `docs/api/customer-auth-catalog-v1.md`
   - Implement active customer reads and admin active/inactive management.
   - Seed existing static moments/rituals before switching app config to network-first catalog.

3. **Bookings and status history**
   - Contracts: `docs/api/booking-requests-v1.md`, `docs/api/admin-booking-requests-v1.md`, `docs/api/booking-status-audit-admin-override-v1.md`
   - Implement booking request creation, customer/admin reads, immutable status history, and admin override guardrails.

4. **Partners and assignment**
   - Contracts: `docs/api/admin-partner-profiles-v1.md`, `docs/api/admin-booking-assignment-v1.md`, `docs/api/partner-assigned-bookings-v1.md`
   - Enforce video KYC/verification before assignment.
   - Preserve partner pre-acceptance privacy filtering.

5. **Partner response and customer confirmation**
   - Contracts: `docs/api/partner-booking-response-v1.md`, `docs/api/customer-confirmed-bookings-v1.md`
   - Keep `accepted` and `confirmed` separate.
   - Store preparation instructions and hide internal confirmation notes from customer/partner reads.

6. **Fulfillment**
   - Contract: `docs/api/partner-booking-fulfillment-v1.md`
   - Partner can move assigned confirmed bookings to `in_progress` and `completed`.
   - Completed booking history is partner-scoped.

7. **Notifications**
   - Contract: `docs/api/booking-status-notification-hooks-v1.md`
   - Start with durable `admin_visible` and manual SMS/email events.
   - Do not add paid WhatsApp automation in V1.

8. **Payments and refunds**
   - Contracts: `docs/api/customer-payment-intent-invoice-v1.md`, `docs/api/booking-cancellations-refunds-v1.md`
   - Payment request creation begins after confirmation.
   - Payment/refund state remains separate from booking status.
   - Provider integration and reconciliation can remain manual/provider-agnostic first.

9. **Partner earnings and payouts**
   - Contract: `docs/api/partner-earnings-payouts-v1.md`
   - Earnings accrue only when booking is completed and customer payment is paid.
   - Manual payout tracking comes before payout automation.

## Cross-Cutting Rules

- Every booking status transition must preserve audit history.
- Assignment history and status history are separate ledgers.
- Customer and partner responses must not expose internal admin/support notes.
- Partners must not see customer payment URLs, invoice numbers, provider ids, refund state, or payout internals.
- Support can inspect operational records where contracts allow it, but cannot mutate admin-only state.
- Manual flows must still be recorded durably so future automation has reliable history.

## Open Backend Choices

- API framework: NestJS or Fastify, per `docs/backend-architecture-plan.md`.
- Payment provider: unresolved; keep `manual` and `provider_agnostic` paths working.
- Payout provider: unresolved; manual payout tracking is the V1 default.
- Cancellation/refund thresholds: operational policy still needs business approval before automation.
