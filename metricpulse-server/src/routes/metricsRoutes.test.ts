import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../index.js';

describe('metrics API integration', () => {
  const qs = 'startDate=2026-04-01&endDate=2026-06-30';

  it('GET /api/health returns ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  it('GET /api/metrics/summary returns KPIs', async () => {
    const res = await request(app).get(`/api/metrics/summary?${qs}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      revenue: expect.any(Number),
      orderCount: expect.any(Number),
      avgOrderValue: expect.any(Number),
    });
  });

  it('GET /api/metrics/trend returns points array', async () => {
    const res = await request(app).get(`/api/metrics/trend?${qs}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.points)).toBe(true);
  });

  it('GET /api/metrics/breakdown returns byCategory and byRegion', async () => {
    const res = await request(app).get(`/api/metrics/breakdown?${qs}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.byCategory)).toBe(true);
    expect(Array.isArray(res.body.byRegion)).toBe(true);
  });

  it('GET /api/metrics/summary rejects invalid date range', async () => {
    const res = await request(app).get(
      '/api/metrics/summary?startDate=2026-06-30&endDate=2026-06-01',
    );
    expect(res.status).toBe(400);
    expect(res.body.code).toBe('INVALID_DATE_RANGE');
  });
});
