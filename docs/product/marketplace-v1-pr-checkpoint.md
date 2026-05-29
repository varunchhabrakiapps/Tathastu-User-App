# Marketplace V1 PR Checkpoint

This checkpoint summarizes the local marketplace V1 work across slices 1-16 and the backend handoff pass.

## Verification Baseline

```sh
npm test -- --watchman=false
npx tsc --noEmit
```

Current local baseline:

- 15 Jest suites passing.
- 41 tests passing.
- TypeScript check passing.

## Change Groups

### Product and architecture docs

- Marketplace PRD and issue tracker.
- ADR 0005 for lifecycle, roles, payment timing, verification, privacy, and cancellation policy.
- Backend implementation handoff checklist.

Key files:

- `docs/product/tathastu-marketplace-v1-prd.md`
- `docs/product/tathastu-marketplace-v1-issues.md`
- `docs/product/backend-implementation-handoff-checklist.md`
- `docs/adr/0005-marketplace-lifecycle-and-role-model.md`

### API contracts

Contracts now cover customer, partner, admin, payment, notification, cancellation/refund, audit, and payout surfaces.

Key directory:

- `docs/api/`

### Marketplace domains

Added typed domain records for:

- Booking requests and status lifecycle.
- Assignment, confirmation, fulfillment, cancellation, audit, notifications, payments, and partner earnings.
- Partner profiles and partner-safe booking views.
- Catalog records.

Key directory:

- `src/domain/`

### Marketplace services

Added service-layer implementations with in-memory/AsyncStorage stores where useful:

- Customer booking request creation and customer/admin reads.
- Admin assignment to verified partners.
- Partner booking views and accept/decline.
- Admin confirmation and customer-safe confirmed booking views.
- Partner fulfillment progress/completion.
- Admin catalog management and customer catalog reads.
- Auth/OTP session bridge with JWT/profile support.
- Customer catalog API bridge with static fallback.
- Notification event hooks.
- Payment request/invoice tracking.
- Partner earnings/manual payout tracking.
- Cancellation/manual refund tracking.
- Audit history/admin status override.

Key directories:

- `src/services/bookings/`
- `src/services/partners/`
- `src/services/catalog/`
- `src/services/auth.service.ts`
- `src/services/otp.service.ts`

### Customer app integration

Customer app now has backend-shaped seams for auth/catalog and local UI states:

- Auth session can persist access token, token expiry, and user profile.
- OTP verification can map backend responses into auth sessions.
- Home moment/trending hooks can read catalog services with fallback.
- Search screen renders catalog-backed ritual rows with loading/empty/error states.
- Ritual detail can read API-shaped ritual data when available.

Key files:

- `src/context/AuthContext.tsx`
- `src/hooks/useOtpVerification.ts`
- `src/hooks/useMomentCategories.ts`
- `src/hooks/useTrendingRitualsPreview.ts`
- `src/hooks/useRitualDetailScreen.ts`
- `src/screens/SearchScreen.tsx`

### Test coverage

Behavior-first tests now cover:

- Booking request creation.
- Admin booking views.
- Partner profile verification.
- Assignment validation.
- Partner assigned/completed views.
- Partner accept/decline.
- Customer confirmation safety.
- Fulfillment transitions.
- Catalog management.
- Customer auth/catalog integration.
- Notification hooks.
- Payment request/invoice tracking.
- Partner earnings/payouts.
- Cancellation/refund tracking.
- Audit history/admin override.

Key directory:

- `__tests__/`

## Suggested Commit Grouping

1. `docs: define marketplace lifecycle and api contracts`
2. `test: add marketplace behavior coverage`
3. `feat: add booking lifecycle services`
4. `feat: add partner, catalog, and customer integration services`
5. `feat: add notifications payments earnings cancellation audit`

If a smaller PR is preferred, split by slice family:

- Core booking and assignment: slices 2-8.
- Catalog/auth customer integration: slices 10-11.
- Ops/payment/ledger/audit: slices 12-16.

## Remaining Backend Work

- Choose backend framework and persistence implementation.
- Convert service contracts into HTTP handlers and database transactions.
- Add real auth provider, role enforcement, and JWT middleware.
- Add real payment provider integration when chosen.
- Add delivery adapters for SMS/email if manual ops is not enough.
- Build admin/partner dashboards on top of the service/API contracts.

## Known Deferrals

- Automated matching.
- Payment reconciliation/webhooks.
- Automated refunds.
- Partner payout automation.
- WhatsApp Business API automation.
- Admin analytics beyond basic operations.
