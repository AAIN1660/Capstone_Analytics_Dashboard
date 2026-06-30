import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { metricsQuerySchema } from '../schemas/metricsSchemas.js';
import {
  getSummary,
  getTrend,
  getBreakdown,
  getCategories,
} from '../services/metricsService.js';

export const metricsRouter = Router();

metricsRouter.get('/summary', async (req, res, next) => {
  try {
    const query = metricsQuerySchema.parse(req.query);
    const result = await getSummary(
      prisma,
      query.startDate,
      query.endDate,
      query.category,
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
});

metricsRouter.get('/trend', async (req, res, next) => {
  try {
    const query = metricsQuerySchema.parse(req.query);
    const result = await getTrend(
      prisma,
      query.startDate,
      query.endDate,
      query.category,
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
});

metricsRouter.get('/breakdown', async (req, res, next) => {
  try {
    const query = metricsQuerySchema.parse(req.query);
    const result = await getBreakdown(
      prisma,
      query.startDate,
      query.endDate,
      query.category,
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
});

metricsRouter.get('/categories', async (_req, res, next) => {
  try {
    const categories = await getCategories(prisma);
    res.json({ categories });
  } catch (err) {
    next(err);
  }
});
