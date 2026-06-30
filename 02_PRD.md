# Product Requirements Document — MetricPulse

**Version:** 1.0  
**Date:** June 30, 2026  
**Input:** `01_IDEA_BRIEF.md`

---

## 1. Problem Statement

Small e-commerce teams rely on manual spreadsheet work to understand sales performance. Data is scattered, updates are slow, and non-technical stakeholders cannot self-serve answers. MetricPulse provides a read-only analytics dashboard with filters and plain-language summaries from a realistic sales dataset.

---

## 2. Target Users

| Persona | Context | Primary need |
|---------|---------|--------------|
| **Jordan — Ops manager** | Builds weekly reports in Excel | Fast dashboard with date + category filters |
| **Sam — Founder** | Non-technical; wants headline numbers | Summary cards and simple charts |
| **Alex — Course evaluator** | Reviews capstone submission | Live URL, no login, core features work |

---

## 3. User Stories

| ID | Story | Priority |
|----|-------|----------|
| US-01 | As Jordan, I want to see total revenue, orders, and AOV for a date range so I can report weekly performance. | Must Have |
| US-02 | As Sam, I want a line chart of revenue over time so I can spot trends. | Must Have |
| US-03 | As Jordan, I want to filter by category so I can drill into product lines. | Must Have |
| US-04 | As Sam, I want bar and pie charts by category and region so I understand mix. | Must Have |
| US-05 | As Jordan, I want to pick a date range so charts reflect the period I care about. | Must Have |
| US-06 | As any user, I want clear error messages when data fails to load so I know what to do. | Must Have (Sprint 2) |
| US-07 | As Sam, I want the dashboard readable on mobile so I can check metrics away from desk. | Should Have (Sprint 2) |

---

## 4. Core Features

| Feature | Description | Priority | Acceptance Criteria |
|---------|-------------|----------|---------------------|
| **Summary API + cards** | KPIs for selected filters | Must Have | Returns revenue, orderCount, avgOrderValue; cards update when filters change; values match filtered dataset |
| **Revenue trend chart** | Line chart by day | Must Have | Shows daily revenue for date range; empty state if no data; loading spinner while fetching |
| **Category bar chart** | Revenue by category | Must Have | Horizontal or vertical bars; respects date + category filters |
| **Region pie chart** | Revenue share by region | Must Have | Shows percentage labels; sums to 100% of filtered revenue |
| **Date range filter** | Start and end date inputs | Must Have | Defaults to last 30 days; invalid range shows user-friendly error |
| **Category filter** | Dropdown including "All" | Must Have | Filters all charts and summary consistently |
| **User-friendly errors** | No technical jargon in UI | Must Have | Network/API errors show actionable message with retry button |
| **Mobile layout** | Responsive on key screens | Should Have | Dashboard and summary readable at 320px width |
| **Loading states** | Spinners/skeletons on fetch | Should Have | All API-driven views show loading until data arrives |

---

## 5. Non-Functional Requirements

| Area | Requirement |
|------|-------------|
| **Performance** | Dashboard loads in under 3 seconds on broadband; API responses under 500ms for seed dataset |
| **Security** | No secrets in client; CORS restricted to frontend origin; no auth in v1 (read-only public data) |
| **Accessibility** | Semantic HTML; chart containers have aria-labels; form inputs labeled |
| **Browser support** | Latest Chrome, Firefox, Edge; responsive 320px–1920px |
| **Error handling** | API returns `{ error: string, code: string }`; UI never shows stack traces |

---

## 6. Out of Scope (v1) — Minimum 5 Items

1. Live connection to Shopify, Stripe, or warehouse APIs
2. User authentication and role-based access
3. Data export (CSV/PDF download)
4. Real-time WebSocket updates
5. Custom chart builder or drag-and-drop dashboards
6. Email scheduled reports
7. Multi-tenant / multi-store support
8. AI-generated narrative insights (Claude API)
9. Dark mode
10. Admin panel to upload CSV files

---

## 7. Success Metrics

| Metric | Target |
|--------|--------|
| Time to answer "revenue this month?" | Under 30 seconds for new user |
| Dashboard load (p95) | Under 3 seconds |
| Evaluator checklist | All core features work on deployed URL |
| Test coverage | All service functions + 3 integration tests |

---

## 8. Open Questions

| Question | Decision | Rationale |
|----------|----------|-----------|
| Real DB or mock JSON? | SQLite + Prisma seed | Easiest full-stack path; satisfies "database" requirement |
| Auth required? | No | Minimum scope; public read-only demo data |
| Which chart library? | Recharts | Course-recommended stack for Option B |

---

## 9. Constraints

| Constraint | Detail |
|------------|--------|
| Timeline | Minimum capstone — ship MVP, not enterprise polish |
| Stack | React 18 + TypeScript + Vite + Recharts; Node 20 + Express + Prisma + SQLite |
| Hosting | Vercel (frontend) + Railway/Render (backend) — free tiers |
| Team | Solo developer with AI assistance |
| Certification | All 11 deliverables submitted; self-assessment ? 40/56 |
