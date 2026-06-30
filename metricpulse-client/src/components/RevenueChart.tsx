import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { TrendPoint } from '../types';
import { LoadingSpinner } from './LoadingSpinner';

interface RevenueChartProps {
  data: TrendPoint[];
  loading: boolean;
}

export function RevenueChart({ data, loading }: RevenueChartProps) {
  if (loading) {
    return (
      <section className="chart-panel" aria-label="Revenue over time">
        <h2>Revenue over time</h2>
        <LoadingSpinner label="Loading chart…" />
      </section>
    );
  }

  return (
    <section className="chart-panel" aria-label="Revenue over time">
      <h2>Revenue over time</h2>
      {data.length === 0 ? (
        <p className="empty">No sales in this date range. Try widening your filters.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v: number) => [`$${v.toFixed(2)}`, 'Revenue']} />
            <Line type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}
