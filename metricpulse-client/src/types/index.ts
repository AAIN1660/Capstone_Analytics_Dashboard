export interface SummaryResponse {
  revenue: number;
  orderCount: number;
  avgOrderValue: number;
}

export interface TrendPoint {
  date: string;
  revenue: number;
}

export interface TrendResponse {
  points: TrendPoint[];
}

export interface BreakdownItem {
  name: string;
  revenue: number;
}

export interface BreakdownResponse {
  byCategory: BreakdownItem[];
  byRegion: BreakdownItem[];
}

export interface CategoriesResponse {
  categories: string[];
}

export interface FilterState {
  startDate: string;
  endDate: string;
  category: string;
}

export interface ApiErrorBody {
  error: string;
  code: string;
}
