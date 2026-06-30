import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { BreakdownItem } from '../types';
import { LoadingSpinner } from './LoadingSpinner';

const COLORS = ['#2563eb', '#0d9488', '#d97706', '#7c3aed'];

interface RegionChartProps {
  data: BreakdownItem[];
  loading: boolean;
}

export function RegionChart({ data, loading }: RegionChartProps) {
  if (loading) {
    return (
      <section className="chart-panel" aria-label="Revenue by region">
        <h2>Revenue by region</h2>
        <LoadingSpinner label="Loading chart…" />
      </section>
    );
  }

  return (
    <section className="chart-panel" aria-label="Revenue by region">
      <h2>Revenue by region</h2>
      {data.length === 0 ? (
        <p className="empty">No regional data for this range.</p>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              dataKey="revenue"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v: number) => [`$${v.toFixed(2)}`, 'Revenue']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}
