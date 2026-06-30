# MetricPulse — Module 15 Capstone

**Option B:** Analytics Dashboard with Live Data (minimum scope)  
**Stack:** React + TypeScript + Recharts + Express + Prisma + SQLite

E-commerce sales dashboard with summary KPIs, three chart types, and date/category filters. No authentication — public read-only demo data.

---

## Features

- Summary cards: total revenue, order count, average order value
- Line chart: revenue over time
- Bar chart: revenue by category
- Pie chart: revenue by region
- Filters: date range + category
- User-friendly error messages with retry (Sprint 2)
- Loading states on all data fetches (Sprint 2)
- Mobile-responsive dashboard and summary cards (Sprint 2)

---

## Prerequisites

- Node.js 20+
- npm 10+

---

## Quick Start (Local)

### 1. Backend

```bash
cd metricpulse-server
cp .env.example .env    # Windows: copy .env.example .env
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

API runs at `http://localhost:3001`

### 2. Frontend

```bash
cd metricpulse-client
cp .env.example .env
npm install
npm run dev
```

App runs at `http://localhost:5173`

---

## Environment Variables

### `metricpulse-server/.env`

| Variable | Example | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `file:./dev.db` | SQLite database path |
| `PORT` | `3001` | API port |
| `CLIENT_URL` | `http://localhost:5173` | CORS allowed origin |

### `metricpulse-client/.env`

| Variable | Example | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:3001` | Backend base URL |

---

## Tests

```bash
cd metricpulse-server
npm test
```

- Unit tests: `src/services/metricsService.test.ts`
- Integration tests: `src/routes/metricsRoutes.test.ts` (3+ endpoints)

---

## Deployment

### Backend (Railway / Render)

1. Create new Node.js service from `metricpulse-server/`
2. Set env: `DATABASE_URL=file:./prod.db`, `CLIENT_URL=<your-vercel-url>`, `PORT=3001`
3. Build command: `npm install && npx prisma migrate deploy && npm run db:seed && npm run build`
4. Start command: `npm start`

### Frontend (Vercel)

1. Import `metricpulse-client/` repo
2. Set `VITE_API_URL` to deployed backend URL
3. Build: `npm run build` — output: `dist/`

### Deployed URL

> **Update before submission:** Replace with your live Vercel URL after deploy.

`https://YOUR-VERCEL-APP.vercel.app`

---

## Project Structure

```
module-15/
??? 01_IDEA_BRIEF.md          # Deliverable 1
??? 02_PRD.md                 # Deliverable 2
??? 03_ARCHITECTURE.md        # Deliverable 3
??? 04_VIBE_CODING_SPEC.md    # Deliverable 4
??? 05_PROMPT_LIBRARY.md      # Deliverable 5
??? 06_DEBUGGING_JOURNAL.md   # Deliverable 10
??? 07_RETROSPECTIVE.md       # Deliverable 11
??? 08_SELF_ASSESSMENT.md     # Rubric
??? CAPSTONE_SUBMISSION.md    # All 11 deliverables index
??? docs/API.md               # Deliverable 9
??? metricpulse-server/       # Express API
??? metricpulse-client/       # React dashboard
```

---

## Security Notes (v1)

- No auth — acceptable for read-only seed data demo
- CORS restricted to `CLIENT_URL`
- Query params validated with Zod
- No `.env` files committed
- Run `npm audit` before deploy; fix high/critical issues

---

## License

Course capstone project — educational use.
