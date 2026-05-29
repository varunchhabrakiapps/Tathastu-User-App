# ADR 0003: Keep Infrastructure Lean for the First Six Months

## Status

Accepted

## Context

The business expects fewer than 10 orders per day for the first 6 months. The team already has Vercel Pro. The main technical risks are domain correctness, operational reliability, and product learning, not traffic scale.

## Decision

V1 infrastructure should stay lean:

- Vercel for web/admin deployment where applicable.
- PostgreSQL through a managed provider such as Supabase, Neon, or similar.
- TypeScript backend using NestJS or Fastify.
- Prisma for database access.
- SMS/OTP provider for authentication.
- Manual WhatsApp Business or basic SMS/email notifications before paid WhatsApp API automation.
- S3-compatible storage only when uploads/documents become necessary.

Avoid Kafka, Kubernetes, Elasticsearch/OpenSearch, ML matching, and complex queue/event systems until operational volume justifies them.

## Consequences

- Lower monthly spend and faster iteration.
- Fewer moving parts for a small team.
- Some operational work remains manual by design.
- Architecture should keep module interfaces clean enough that queues/search/automation can be added later.
