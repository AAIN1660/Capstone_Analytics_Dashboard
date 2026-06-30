import { describe, it, expect } from 'vitest';
import { prisma } from '../lib/prisma.js';
import { getSummary, getTrend, getBreakdown } from '../services/metricsService.js';
import { AppError } from '../lib/errors.js';

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

describe('metricsService', () => {
  const end = new Date();
  const start = new Date();
  start.setUTCDate(end.getUTCDate() - 30);
  const startDate = formatDate(start);
  const endDate = formatDate(end);

  it('getSummary returns revenue and order count for date range', async () => {
    const result = await getSummary(prisma, startDate, endDate);
    expect(result.orderCount).toBeGreaterThan(0);
    expect(result.revenue).toBeGreaterThan(0);
    expect(result.avgOrderValue).toBeGreaterThan(0);
  });

  it('getSummary filters by category', async () => {
    const all = await getSummary(prisma, startDate, endDate);
    const electronics = await getSummary(prisma, startDate, endDate, 'Electronics');
    expect(electronics.orderCount).toBeLessThanOrEqual(all.orderCount);
    expect(electronics.revenue).toBeLessThanOrEqual(all.revenue);
  });

  it('getTrend returns daily points', async () => {
    const result = await getTrend(prisma, startDate, endDate);
    expect(result.points.length).toBeGreaterThan(0);
    expect(result.points[0]).toHaveProperty('date');
    expect(result.points[0]).toHaveProperty('revenue');
  });

  it('getBreakdown returns category and region arrays', async () => {
    const result = await getBreakdown(prisma, startDate, endDate);
    expect(result.byCategory.length).toBeGreaterThan(0);
    expect(result.byRegion.length).toBeGreaterThan(0);
  });

  it('throws INVALID_DATE_RANGE when start after end', async () => {
    await expect(getSummary(prisma, '2026-06-30', '2026-06-01')).rejects.toMatchObject({
      code: 'INVALID_DATE_RANGE',
    } satisfies Partial<AppError>);
  });
});
