import type { Prisma } from '@prisma/client';
import { AppError } from '../lib/errors.js';
import { parseDateRange } from '../schemas/metricsSchemas.js';

function buildWhere(
  startDate: string,
  endDate: string,
  category?: string,
): Prisma.SaleWhereInput {
  const { start, end } = parseDateRange(startDate, endDate);
  if (start > end) {
    throw new AppError(
      400,
      'INVALID_DATE_RANGE',
      'Start date must be on or before end date.',
    );
  }

  const where: Prisma.SaleWhereInput = {
    orderDate: { gte: start, lte: end },
  };

  if (category && category !== 'all') {
    where.category = category;
  }

  return where;
}

export async function getSummary(
  prisma: { sale: { aggregate: Function; count: Function } },
  startDate: string,
  endDate: string,
  category?: string,
) {
  const where = buildWhere(startDate, endDate, category);

  const [agg, orderCount] = await Promise.all([
    prisma.sale.aggregate({
      where,
      _sum: { revenue: true },
    }),
    prisma.sale.count({ where }),
  ]);

  const revenue = agg._sum.revenue ?? 0;
  const avgOrderValue = orderCount > 0 ? revenue / orderCount : 0;

  return {
    revenue: Math.round(revenue * 100) / 100,
    orderCount,
    avgOrderValue: Math.round(avgOrderValue * 100) / 100,
  };
}

export async function getTrend(
  prisma: { sale: { findMany: Function } },
  startDate: string,
  endDate: string,
  category?: string,
) {
  const where = buildWhere(startDate, endDate, category);
  const sales = await prisma.sale.findMany({
    where,
    select: { orderDate: true, revenue: true },
    orderBy: { orderDate: 'asc' },
  });

  const byDay = new Map<string, number>();
  for (const sale of sales) {
    const day = (sale.orderDate as Date).toISOString().slice(0, 10);
    byDay.set(day, (byDay.get(day) ?? 0) + sale.revenue);
  }

  const points = [...byDay.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, revenue]) => ({
      date,
      revenue: Math.round(revenue * 100) / 100,
    }));

  return { points };
}

export async function getBreakdown(
  prisma: { sale: { groupBy: Function } },
  startDate: string,
  endDate: string,
  category?: string,
) {
  const where = buildWhere(startDate, endDate, category);

  const [byCategoryRaw, byRegionRaw] = await Promise.all([
    prisma.sale.groupBy({
      by: ['category'],
      where,
      _sum: { revenue: true },
      orderBy: { category: 'asc' },
    }),
    prisma.sale.groupBy({
      by: ['region'],
      where,
      _sum: { revenue: true },
      orderBy: { region: 'asc' },
    }),
  ]);

  const mapRows = (rows: { category?: string; region?: string; _sum: { revenue: number | null } }[], key: 'category' | 'region') =>
    rows.map((r) => ({
      name: (r[key] as string) ?? 'Unknown',
      revenue: Math.round((r._sum.revenue ?? 0) * 100) / 100,
    }));

  return {
    byCategory: mapRows(byCategoryRaw, 'category'),
    byRegion: mapRows(byRegionRaw, 'region'),
  };
}

export async function getCategories(prisma: { sale: { findMany: Function } }) {
  const rows = await prisma.sale.findMany({
    distinct: ['category'],
    select: { category: true },
    orderBy: { category: 'asc' },
  });
  return rows.map((r: { category: string }) => r.category);
}
