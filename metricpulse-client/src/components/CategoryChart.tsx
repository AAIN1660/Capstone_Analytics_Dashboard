import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { BreakdownItem } from '../types';
import { LoadingSpinner } from './LoadingSpinner';

interface CategoryChartProps {
  data: BreakdownItem[];
  loading: boolean;
}

export function CategoryChart({ data, loading }: CategoryChartProps) {
  if (loading) {
    return (
      <section className="chart-panel" aria-label="Revenue by category">
        <h2>Revenue by category</h2>
        <LoadingSpinner label="Loading chart…" />
      </section>
    );
  }

  return (
    <section className="chart-panel" aria-label="Revenue by category">
      <h2>Revenue by category</h2>
      {data.length === 0 ? (
        <p className="empty">No category data for this range.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(v: number) => [`$${v.toFixed(2)}`, 'Revenue']} />
            <Bar dataKey="revenue" fill="#0d9488" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}
