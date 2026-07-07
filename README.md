# MetricPulse

MetricPulse is a read-only e-commerce sales analytics dashboard built for Module 15 Capstone Option B. It shows summary KPIs and chart-based breakdowns from seeded sales data using a React frontend and an Express + Prisma backend.

## Stack

- Frontend: React, TypeScript, Vite, Recharts
- Backend: Node.js, Express, Prisma
- Database: SQLite
- Validation: Zod
- Testing: Vitest, Supertest



## Features

- Summary cards for total revenue, order count, and average order value
- Revenue trend line chart
- Revenue by category bar chart
- Revenue by region pie chart
- Date range and category filters
- User-friendly loading and error states
- Responsive dashboard layout

## Local Setup

### 1. Backend

```powershell
cd "d:\AICOE\Vibe Coding\module-15\metricpulse-server"
copy .env.example .env
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Backend runs on `http://localhost:3001`.

Example `metricpulse-server/.env`:

```env
DATABASE_URL="file:./dev.db"
PORT=3001
CLIENT_URL="http://localhost:5173"
```

### 2. Frontend

```powershell
cd "d:\AICOE\Vibe Coding\module-15\metricpulse-client"
copy .env.example .env
npm install
npm run dev
```

Example `metricpulse-client/.env`:

```env
VITE_API_URL=http://localhost:3001
```

Open the Vite URL shown in the terminal. If Vite starts on a port other than `5173`, update `CLIENT_URL` in the backend `.env` and restart the backend.

## Scripts

### Backend

```powershell
npm run dev
npm run build
npm start
npm test
npm run db:seed
```

### Frontend

```powershell
npm run dev
npm run build
npm run preview
```

## API Endpoints

- `GET /api/health`
- `GET /api/metrics/summary`
- `GET /api/metrics/trend`
- `GET /api/metrics/breakdown`
- `GET /api/metrics/categories`

Full API details are in `docs/API.md`.

## Deployment

### Backend on Render

- Root directory: `metricpulse-server`
- Build command:

```bash
npm install && npx prisma migrate deploy && npm run db:seed && npm run build
```

- Start command:

```bash
npm start
```

Render environment variables:

```env
DATABASE_URL=file:./dev.db
PORT=3001
CLIENT_URL=https://metricpulsedashboard.netlify.app/
```

### Frontend on Netlify

- Base directory: `metricpulse-client`
- Build command:

```bash
npm run build
```

- Publish directory:

```text
dist
```

Netlify environment variables:

```env
VITE_API_URL=https://capstone-analytics-dashboard.onrender.com/
```

## Notes

- This project uses seeded demo data and does not require authentication.
- SQLite is suitable for local development and capstone demo deployment, but hosted free instances may reset data on redeploy.
- Do not commit `.env` files.
