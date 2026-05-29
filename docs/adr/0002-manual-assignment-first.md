# ADR 0002: Use Manual Assignment Before Automated Matching

## Status

Accepted

## Context

Urban Company-style marketplaces eventually require sophisticated matching, slot reliability, partner eligibility, and automated assignment. Tathastu does not need that level of automation for the first 6 months because expected demand is fewer than 10 orders per day.

Manual assignment also helps the team learn partner reliability, ritual complexity, customer questions, regional constraints, and pricing behavior before encoding rules into software.

## Decision

V1 will use manual admin assignment:

1. Customer submits a booking request.
2. Booking enters `pending_assignment`.
3. Admin assigns a partner.
4. Partner accepts or declines.
5. Customer sees confirmed booking once partner acceptance and any payment/confirmation requirements are satisfied.

## Consequences

- Admin dashboard is a V1 requirement, not a later nice-to-have.
- Partner app can be simpler: assigned jobs, accept/decline, details, status updates.
- Matching logic can start as filters and admin judgment instead of an automated engine.
- The backend should still record assignment events so automation can be introduced later.

## Alternatives Considered

- Partner bidding/quotes: rejected for V1 because it adds customer uncertainty and operational complexity.
- Auto-dispatch: rejected for V1 because it requires reliable availability, eligibility, cancellation, and notification systems that are not yet validated.
