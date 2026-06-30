# Technical Architecture — MetricPulse

**Version:** 1.0  
**Date:** June 30, 2026  
**Input:** `02_PRD.md`

---

## 1. Tech Stack

| Layer | Technology | Version | Rationale |
|-------|------------|---------|-----------|
| Frontend | React + TypeScript | 18.x / 5.x | Course standard; component model fits dashboard |
| Build | Vite | 5.x | Fast dev; native TS |
| Charts | Recharts | 2.x | Option B recommended stack |
| Styling | CSS modules / inline | — | Minimal deps for capstone MVP |
| Backend | Node.js + Express | 20.x / 4.x | Simple REST API |
| ORM | Prisma | 6.x | Schema-first; SQLite for zero-config local DB |
| Database | SQLite | — | No external DB setup; seed script included |
| Validation | Zod | 3.x | Query param validation |
| Testing | Vitest + supertest | — | Service unit + API integration tests |
| Hosting | Vercel + Railway | — | Free tier deploy |

---

## 2. System Components

### Backend (`metricpulse-server/`)

| Component | Path | Responsibility |
|-----------|------|----------------|
| App entry | `src/index.ts` | Boot Express; CORS; mount routes |
| Prisma client | `src/lib/prisma.ts` | DB connection singleton |
| Error middleware | `src/middleware/errorHandler.ts` | Consistent `{ error, code }` responses |
| Metrics service | `src/services/metricsService.ts` | Aggregate queries for summary, trend, breakdown |
| Metrics routes | `src/routes/metricsRoutes.ts` | HTTP layer for `/api/metrics/*` |
| Query schemas | `src/schemas/metricsSchemas.ts` | Zod validation for date/category params |
| Seed script | `prisma/seed.ts` | Populate realistic sales rows |

### Frontend (`metricpulse-client/`)

| Component | Path | Responsibility |
|-----------|------|----------------|
| App root | `src/App.tsx` | Layout and dashboard page |
| API client | `src/services/api.ts` | Fetch wrapper with error parsing |
| Types | `src/types/index.ts` | Shared interfaces for API responses |
| Filter bar | `src/components/FilterBar.tsx` | Date range + category controls |
| Summary cards | `src/components/SummaryCards.tsx` | KPI display with loading/error |
| Revenue chart | `src/components/RevenueChart.tsx` | Line chart via Recharts |
| Category chart | `src/components/CategoryChart.tsx` | Bar chart via Recharts |
| Region chart | `src/components/RegionChart.tsx` | Pie chart via Recharts |
| Error banner | `src/components/ErrorBanner.tsx` | User-friendly errors + retry |
| Loading spinner | `src/components/LoadingSpinner.tsx` | Shared loading UI |

---

## 3. Data Model

### Entity: Sale

| Field | Type | Constraints |
|-------|------|-------------|
| `id` | String (cuid) | Primary key |
| `orderDate` | DateTime | Not null — sale date |
| `category` | String | Not null — e.g. Electronics, Apparel |
| `region` | String | Not null — e.g. North, South, East, West |
| `revenue` | Float | Not null — order revenue USD |
| `orderId` | String | Not null — unique order reference |

**Indexes:** `orderDate`, `category`, `region`

---

## 4. API Design

### `GET /api/metrics/summary`

| | |
|---|---|
| **Auth** | None (public read-only) |
| **Query** | `startDate` (ISO date, required), `endDate` (ISO date, required), `category` (optional, default all) |
| **Response 200** | `{ revenue: number, orderCount: number, avgOrderValue: number }` |
| **Errors** | `400 INVALID_DATE_RANGE` — start after end; `400 VALIDATION_ERROR` — bad params |

### `GET /api/metrics/trend`

| | |
|---|---|
| **Auth** | None |
| **Query** | Same as summary |
| **Response 200** | `{ points: [{ date: string, revenue: number }] }` |
| **Errors** | Same as summary |

### `GET /api/metrics/breakdown`

| | |
|---|---|
| **Auth** | None |
| **Query** | Same as summary |
| **Response 200** | `{ byCategory: [{ name: string, revenue: number }], byRegion: [{ name: string, revenue: number }] }` |
| **Errors** | Same as summary |

### `GET /api/health`

| | |
|---|---|
| **Auth** | None |
| **Response 200** | `{ status: "ok" }` |

---

## 5. Implementation Sequence

1. Prisma schema + seed data (90 days of sales)
2. `metricsService` — summary, trend, breakdown queries
3. Routes + Zod validation + error middleware
4. Express app + CORS + health check
5. Frontend types + API client
6. FilterBar ? fetch all three endpoints on filter change
7. SummaryCards + three chart components
8. Sprint 2: ErrorBanner, LoadingSpinner, responsive CSS
9. Vitest unit tests (service) + integration tests (3 endpoints)
10. README, API docs, deploy configs

---

## 6. Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| SQLite on Railway (ephemeral disk) | Medium | High | Re-seed on deploy; document `prisma db seed` in README |
| Recharts responsive on mobile | Low | Medium | `ResponsiveContainer`; test at 320px |
| Date filter off-by-one | Medium | Medium | Server parses dates as UTC day boundaries; unit test edge cases |
| CORS in production | Medium | High | `CLIENT_URL` env var; test after deploy |
