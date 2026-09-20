export type DateRange =
  | "7d"
  | "30d"
  | "90d"
  | "12m";

export interface FinancialMetric {
  revenue: number;
  expenses: number;
  netCashFlow: number;
  transactions: number;
}

export interface ExpenseTrend {
  date: string;
  expenses: number;
}

export interface ExpenseCategory {
  category: string;
  amount: number;
  percentage: number;
}

export interface VendorSpend {
  vendorId: string;
  vendorName: string;
  amount: number;
  transactionCount: number;
}

export interface AnalyticsData {
  metrics: FinancialMetric;
  expenseTrend: ExpenseTrend[];
  expenseCategories: ExpenseCategory[];
  vendorSpend: VendorSpend[];
}