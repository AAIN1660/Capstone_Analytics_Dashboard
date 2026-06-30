# Vibe Coding Spec — MetricPulse

**Version:** 1.0  
**Date:** June 30, 2026  
**Status:** Ready for Edit Mode

---

## 1. OVERVIEW

MetricPulse is a read-only e-commerce sales analytics dashboard. Users filter by date range and category, then view summary KPIs and three chart types (line, bar, pie). Built as Module 15 capstone Option B with minimum scope: no auth, SQLite seed data, Express API, React + Recharts frontend.

---

## 2. TECH STACK

See `03_ARCHITECTURE.md` Section 1.

---

## 3. ARCHITECTURE

See `03_ARCHITECTURE.md` Sections 2–4.

---

## 4. DATA MODEL

See `03_ARCHITECTURE.md` Section 3. Prisma schema at `metricpulse-server/prisma/schema.prisma`.

---

## 5. API CONTRACT

All endpoints under `/api/metrics`. Query params: `startDate`, `endDate` (YYYY-MM-DD), optional `category`.

---

## 6. IMPLEMENTATION TASKS (Cursor Composer Prompts)

### Task 1 — Database schema and seed

```
Create Prisma schema in metricpulse-server with a Sale model (id, orderDate, category, region, revenue, orderId).
Use SQLite. Add prisma/seed.ts that inserts ~200 sales rows across 4 categories, 4 regions, over the last 90 days.
Add npm script "db:seed": "tsx prisma/seed.ts". Match field names in 03_ARCHITECTURE.md.
```

### Task 2 — Metrics service

```
In metricpulse-server/src/services/metricsService.ts implement:
- getSummary(startDate, endDate, category?) ? { revenue, orderCount, avgOrderValue }
- getTrend(startDate, endDate, category?) ? { points: [{ date, revenue }] } grouped by day
- getBreakdown(startDate, endDate, category?) ? { byCategory, byRegion }
Use Prisma. Validate startDate <= endDate. Category filter: exact match or omit for all.
```

### Task 3 — Routes and validation

```
Add Zod schemas in src/schemas/metricsSchemas.ts for query params.
Create src/routes/metricsRoutes.ts with GET /summary, /trend, /breakdown.
Add errorHandler middleware returning { error, code }. Wire routes in src/index.ts with CORS and GET /api/health.
```

### Task 4 — Frontend scaffold

```
Scaffold metricpulse-client with Vite React TypeScript. Add types in src/types/index.ts matching API responses.
Create src/services/api.ts with fetchMetricsSummary, fetchMetricsTrend, fetchMetricsBreakdown using VITE_API_URL.
```

### Task 5 — Dashboard UI

```
Build Dashboard in App.tsx: FilterBar (date inputs, category select), SummaryCards, RevenueChart (Recharts LineChart),
CategoryChart (BarChart), RegionChart (PieChart). On filter change, fetch all three endpoints in parallel.
Default date range: last 30 days.
```

### Task 6 — Sprint 2: errors, loading, responsive

```
Add LoadingSpinner shown during all fetches. Add ErrorBanner with plain-language messages and Retry button — no stack traces.
Make Dashboard and SummaryCards responsive: stack cards vertically below 640px; charts use ResponsiveContainer width 100%.
```

### Task 7 — Tests

```
Add Vitest to metricpulse-server. Unit tests for metricsService (empty range, category filter, invalid range).
Integration tests with supertest for GET /api/metrics/summary, /trend, /breakdown.
```

### Task 8 — Documentation

```
Root README in module-15 with setup, env vars, deploy steps, feature list.
Add docs/API.md documenting all endpoints. Add .env.example files.
```

---

## 7. SPRINT 2 CHANGE REQUEST IMPACT

| Change | Impact | Tasks |
|--------|--------|-------|
| User-friendly errors | New ErrorBanner component; api.ts maps codes to messages | Task 6 |
| Mobile responsive | CSS grid/flex breakpoints on Dashboard + SummaryCards | Task 6 |
| Loading states | LoadingSpinner on all data-fetching components | Task 6 |

---

## 8. DEFINITION OF DONE

- [ ] All 3 API endpoints return correct data for seed dataset
- [ ] Dashboard shows summary + 3 charts with filters
- [ ] Error messages are plain language with retry
- [ ] Loading spinners on all fetches
- [ ] 2+ screens responsive at 320px
- [ ] 10+ git commits
- [ ] Tests pass; README and API docs complete
