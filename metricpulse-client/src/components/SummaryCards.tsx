import type { SummaryResponse } from '../types';
import { LoadingSpinner } from './LoadingSpinner';

interface SummaryCardsProps {
  data: SummaryResponse | null;
  loading: boolean;
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
}

export function SummaryCards({ data, loading }: SummaryCardsProps) {
  if (loading) {
    return (
      <section className="summary-cards" aria-label="Key metrics">
        <LoadingSpinner label="Loading summary…" />
      </section>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <section className="summary-cards" aria-label="Key metrics">
      <article className="card">
        <h2>Total revenue</h2>
        <p className="metric">{formatCurrency(data.revenue)}</p>
      </article>
      <article className="card">
        <h2>Orders</h2>
        <p className="metric">{data.orderCount.toLocaleString()}</p>
      </article>
      <article className="card">
        <h2>Avg. order value</h2>
        <p className="metric">{formatCurrency(data.avgOrderValue)}</p>
      </article>
    </section>
  );
}
