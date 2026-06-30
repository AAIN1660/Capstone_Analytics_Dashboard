import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../lib/errors.js';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message, code: err.code });
    return;
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Invalid request parameters. Check your date range and filters.',
      code: 'VALIDATION_ERROR',
    });
    return;
  }

  console.error(err);
  res.status(500).json({
    error: 'Something went wrong on our end. Please try again in a moment.',
    code: 'INTERNAL_ERROR',
  });
}
