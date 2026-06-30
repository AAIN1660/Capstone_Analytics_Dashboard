import { useCallback, useEffect, useState } from 'react';
import type {
  BreakdownResponse,
  FilterState,
  SummaryResponse,
  TrendResponse,
} from './types';
import {
  fetchBreakdown,
  fetchCategories,
  fetchSummary,
  fetchTrend,
  ApiError,
} from './services/api';
import { FilterBar } from './components/FilterBar';
import { SummaryCards } from './components/SummaryCards';
import { RevenueChart } from './components/RevenueChart';
import { CategoryChart } from './components/CategoryChart';
import { RegionChart } from './components/RegionChart';
import { ErrorBanner } from './components/ErrorBanner';

function defaultFilters(): FilterState {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 30);
  return {
    startDate: start.toISOString().slice(0, 10),
    endDate: end.toISOString().slice(0, 10),
    category: 'all',
  };
}

function queryParams(filters: FilterState): Record<string, string> {
  const params: Record<string, string> = {
    startDate: filters.startDate,
    endDate: filters.endDate,
  };
  if (filters.category !== 'all') {
    params.category = filters.category;
  }
  return params;
}

export default function App() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [categories, setCategories] = useState<string[]>([]);
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [trend, setTrend] = useState<TrendResponse['points']>([]);
  const [breakdown, setBreakdown] = useState<BreakdownResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    fetchCategories()
      .then((res) => setCategories(res.categories))
      .catch(() => {
        // categories are optional; filters still work with static list
      });
  }, []);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    const params = queryParams(filters);
    try {
      const [summaryRes, trendRes, breakdownRes] = await Promise.all([
        fetchSummary(params),
        fetchTrend(params),
        fetchBreakdown(params),
      ]);
      setSummary(summaryRes);
      setTrend(trendRes.points);
      setBreakdown(breakdownRes);
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'We could not load your dashboard. Please try again.';
      setError(message);
      setSummary(null);
      setTrend([]);
      setBreakdown(null);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard, reloadKey]);

  return (
    <div className="app">
      <header className="header">
        <h1>MetricPulse</h1>
        <p className="subtitle">E-commerce sales at a glance</p>
      </header>

      <FilterBar filters={filters} categories={categories} onChange={setFilters} />

      {error && (
        <ErrorBanner
          message={error}
          onRetry={() => setReloadKey((k) => k + 1)}
        />
      )}

      <SummaryCards data={summary} loading={loading} />

      <div className="charts-grid">
        <RevenueChart data={trend} loading={loading} />
        <CategoryChart data={breakdown?.byCategory ?? []} loading={loading} />
        <RegionChart data={breakdown?.byRegion ?? []} loading={loading} />
      </div>

      <footer className="footer">
        <p>Sample data for demonstration — Module 15 Capstone (Option B)</p>
      </footer>
    </div>
  );
}
