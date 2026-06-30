import type { FilterState } from '../types';

interface FilterBarProps {
  filters: FilterState;
  categories: string[];
  onChange: (next: FilterState) => void;
}

export function FilterBar({ filters, categories, onChange }: FilterBarProps) {
  return (
    <section className="filter-bar" aria-label="Dashboard filters">
      <div className="filter-field">
        <label htmlFor="startDate">Start date</label>
        <input
          id="startDate"
          type="date"
          value={filters.startDate}
          onChange={(e) => onChange({ ...filters, startDate: e.target.value })}
        />
      </div>
      <div className="filter-field">
        <label htmlFor="endDate">End date</label>
        <input
          id="endDate"
          type="date"
          value={filters.endDate}
          onChange={(e) => onChange({ ...filters, endDate: e.target.value })}
        />
      </div>
      <div className="filter-field">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value })}
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
