import type { ApiErrorBody } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export class ApiError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
  }
}

const USER_MESSAGES: Record<string, string> = {
  VALIDATION_ERROR: 'Please check your dates and filters, then try again.',
  INVALID_DATE_RANGE: 'The start date must be before the end date.',
  NETWORK_ERROR: 'We could not reach the server. Check your connection and try again.',
  INTERNAL_ERROR: 'Something went wrong loading your data. Please try again shortly.',
};

export function friendlyMessage(code: string, serverMessage?: string): string {
  if (code === 'VALIDATION_ERROR' || code === 'INVALID_DATE_RANGE') {
    return USER_MESSAGES[code] ?? serverMessage ?? USER_MESSAGES.INTERNAL_ERROR;
  }
  return USER_MESSAGES[code] ?? serverMessage ?? USER_MESSAGES.INTERNAL_ERROR;
}

async function request<T>(path: string, params: Record<string, string>): Promise<T> {
  const url = new URL(`${API_URL}${path}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v) url.searchParams.set(k, v);
  });

  let res: Response;
  try {
    res = await fetch(url.toString());
  } catch {
    throw new ApiError(USER_MESSAGES.NETWORK_ERROR, 'NETWORK_ERROR');
  }

  if (!res.ok) {
    let body: ApiErrorBody = {
      error: 'Request failed',
      code: 'INTERNAL_ERROR',
    };
    try {
      body = (await res.json()) as ApiErrorBody;
    } catch {
      // use default
    }
    throw new ApiError(friendlyMessage(body.code, body.error), body.code);
  }

  return res.json() as Promise<T>;
}

export function fetchSummary(params: Record<string, string>) {
  return request<import('../types').SummaryResponse>('/api/metrics/summary', params);
}

export function fetchTrend(params: Record<string, string>) {
  return request<import('../types').TrendResponse>('/api/metrics/trend', params);
}

export function fetchBreakdown(params: Record<string, string>) {
  return request<import('../types').BreakdownResponse>('/api/metrics/breakdown', params);
}

export function fetchCategories() {
  return request<import('../types').CategoriesResponse>('/api/metrics/categories', {});
}
