# ADR 0001: Build Tathastu as a Two-Sided Managed Marketplace

## Status

Accepted

## Context

The existing React Native app is customer-facing and currently focused on discovery, login, onboarding, and ritual details. The product vision is broader: customers book rituals while pandits and gurujis accept and fulfill bookings through their own partner experience.

The first 6 months are expected to have fewer than 10 orders per day. This means the product does not need Urban Company-scale automation on day one, but it does need the correct marketplace domain model.

## Decision

Tathastu V1 will be designed as a two-sided managed marketplace with:

- Customer mobile app.
- Partner/pandit mobile app.
- Admin/ops dashboard.
- One shared backend serving all three clients.

Booking/order management will be treated as the spine of the system.

## Consequences

- Backend planning must expand beyond the existing customer-focused API list.
- Partner and admin workflows need first-class requirements before implementation.
- Customer booking screens should be designed against a real booking lifecycle, not only static catalog data.
- Admin tools are required early because manual assignment is part of the V1 operating model.

## Alternatives Considered

- Customer-only booking app first: rejected because it would delay the core marketplace workflow and force rework later.
- Fully automated marketplace from day one: rejected because expected order volume does not justify the complexity.
