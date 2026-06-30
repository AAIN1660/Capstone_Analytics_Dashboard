# MetricPulse API Reference

Base URL: `http://localhost:3001` (development) or your deployed `API_URL`.

All metrics endpoints are **public read-only** — no authentication required in v1.

---

## `GET /api/health`

**Auth:** None

**Response 200:**
```json
{ "status": "ok" }
```

---

## `GET /api/metrics/summary`

Returns KPI totals for the filtered date range.

**Auth:** None

**Query parameters:**

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| `startDate` | string | Yes | ISO date `YYYY-MM-DD` |
| `endDate` | string | Yes | ISO date `YYYY-MM-DD` |
| `category` | string | No | Exact category name; omit for all |

**Response 200:**
```json
{
  "revenue": 12450.75,
  "orderCount": 42,
  "avgOrderValue": 296.45
}
```

**Errors:**

| Status | Code | Message |
|--------|------|---------|
| 400 | `VALIDATION_ERROR` | Invalid request parameters |
| 400 | `INVALID_DATE_RANGE` | Start date must be on or before end date |
| 500 | `INTERNAL_ERROR` | Server error |

---

## `GET /api/metrics/trend`

Daily revenue series for line charts.

**Auth:** None

**Query:** Same as `/summary`

**Response 200:**
```json
{
  "points": [
    { "date": "2026-06-01", "revenue": 320.5 },
    { "date": "2026-06-02", "revenue": 410.0 }
  ]
}
```

**Errors:** Same as `/summary`

---

## `GET /api/metrics/breakdown`

Category and region aggregates for bar/pie charts.

**Auth:** None

**Query:** Same as `/summary`

**Response 200:**
```json
{
  "byCategory": [
    { "name": "Electronics", "revenue": 5200.0 },
    { "name": "Apparel", "revenue": 3100.0 }
  ],
  "byRegion": [
    { "name": "North", "revenue": 2800.0 },
    { "name": "South", "revenue": 2400.0 }
  ]
}
```

**Errors:** Same as `/summary`

---

## `GET /api/metrics/categories`

List distinct categories for filter dropdown.

**Auth:** None

**Response 200:**
```json
{ "categories": ["Apparel", "Electronics", "Home", "Sports"] }
```
