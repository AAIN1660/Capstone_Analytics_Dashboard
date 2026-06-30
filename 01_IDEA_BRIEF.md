# MetricPulse — Idea Brief (Phase 1)

**Capstone Option:** B — Analytics Dashboard with Live Data  
**Project:** MetricPulse — E-commerce Sales Dashboard  
**Date:** June 30, 2026  
**Approach:** Minimum viable capstone — simplest option (no auth, no Claude API, SQLite seed data)

---

## Problem Statement

When **a small e-commerce operations manager** tries to **understand weekly sales performance**, they struggle with **raw CSV exports and spreadsheet pivot tables that take hours to update and are hard to share with non-technical stakeholders**.

---

## Target User

**Jordan, 29, operations manager at a 12-person online retail shop.** They receive weekly sales CSVs from the warehouse system and manually build charts in Excel for the founder. They need a **single dashboard** showing revenue trends, top categories, and a plain-language summary — viewable in a browser without installing software. They use Chrome on a laptop in the office and occasionally checks metrics on their phone.

---

## Core Value Proposition

**MetricPulse turns seeded sales data into an at-a-glance dashboard with charts, filters, and a stakeholder-friendly summary — without spreadsheet gymnastics.**

---

## MVP Scope (Minimum)

1. **Summary cards** — Total revenue, order count, average order value for the selected date range.
2. **Charts** — Line chart (revenue over time), bar chart (revenue by category), pie chart (revenue by region).
3. **Filters** — Date range picker and category dropdown; data refreshes from the API.

---

## Top 3 Risks

| Risk | Mitigation |
|------|------------|
| Scope creep (real-time DB connectors) | Use SQLite with seed data; document live connector as out of scope |
| Chart library learning curve | Recharts — well-documented, AI-friendly |
| Date/timezone bugs in filters | Store ISO dates in DB; filter server-side with explicit start/end |

---

## Biggest Assumption

**Assumption:** Stakeholders will find value in a read-only dashboard with realistic sample data, even without a live warehouse connection in v1.

**Validation:** Demo to 2 colleagues — can they answer "how did we do this month?" in under 30 seconds without training?

---

## Project Selection Rationale

Option B was chosen as the **easiest capstone path**:
- No user authentication (evaluator can access without credentials)
- No Claude API key required
- No multi-user roles or streaming
- SQLite avoids external database setup for local development
