# ADR 0004: Use Skill-Driven Planning Before Implementation

## Status

Accepted

## Context

The project is shifting from customer-app frontend polish into marketplace product design and backend implementation. Premature coding would risk building the wrong booking lifecycle, partner workflows, and admin tools.

The following skills have been installed locally for the project workflow:

- `grill-me`
- `frontend-design`
- `to-prd`
- `to-issues`
- `tdd`
- `improve-codebase-architecture`

## Decision

Before major implementation, use this workflow:

1. `grill-me` to resolve product and marketplace decisions.
2. `frontend-design` to shape partner app and admin UX direction.
3. `to-prd` to synthesize the approved product plan.
4. `improve-codebase-architecture` to review the current customer app before large integration work.
5. `to-issues` to break implementation into tracer-bullet vertical slices.
6. `tdd` to implement each slice through behavior-first tests.

## Consequences

- Product decisions are recorded before code.
- Issues should be vertical slices that are demoable, not layer-by-layer chores.
- Tests should verify public behavior and booking lifecycle transitions rather than implementation details.
- Future Codex sessions should restart to automatically pick up the newly installed skills.
