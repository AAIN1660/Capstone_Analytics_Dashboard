# Capstone Retrospective — MetricPulse

**Project:** MetricPulse (Option B — Analytics Dashboard)  
**Date:** June 30, 2026  
**Approach:** Minimum requirements only

---

## How did the original plan change during execution?

The PRD originally listed optional Claude API narrative insights. I cut that entirely to meet minimum scope. I also dropped PostgreSQL in favor of SQLite so local setup requires zero external services. The Sprint 2 stakeholder change request (friendly errors, loading states, mobile layout) was planned from the start in the spec rather than discovered late — that kept implementation orderly.

## What was the hardest part?

Getting Prisma migrations correct on Windows with a hand-written migration folder. The `migration_lock.toml` typo blocked seeding and tests until I compared against a working project. Environment setup on PowerShell (no `&&`) also cost time that bash-first docs do not mention.

## What failure occurred?

Prisma P3019 migration provider mismatch, TypeScript missing Vite env types, and attempting to seed before migrations applied. All three are documented in `06_DEBUGGING_JOURNAL.md` with recovery steps.

## What would you build differently?

With more time I would add CSV upload for real user data and deploy to Railway + Vercel with a verified live URL in this document. I would also split chart components into lazy-loaded chunks to reduce the 500KB bundle warning. Auth is correctly out of scope for minimum capstone but would be the first v2 feature if this were production.

## What are you most proud of?

Shipping a complete vertical slice — planning docs, API, dashboard, tests, and Sprint 2 UX requirements — in the simplest capstone option without auth or paid API keys. The service layer has unit tests and three integration-tested endpoints, which satisfies Phase 7 minimums while keeping the feature set small enough to finish in one session.

## Key learnings

Choosing the easiest project (Option B, no auth) was the right call for certification minimums: a working, documented MVP beats an ambitious half-finished system. Plan Mode deliverables are not bureaucracy — they made Edit Mode prompts precise. Documenting failures honestly is faster than hiding them and re-scoring later.
