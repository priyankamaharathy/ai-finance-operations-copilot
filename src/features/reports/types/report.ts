
export type ReportPeriod =
  | "7d"
  | "30d"
  | "90d"
  | "12m" | "custom";

export type ReportStatus =
  | "ready"
  | "processing"
  | "failed";

export type ReportFormat = "pdf" | "csv";

export type ReportType =
  | "financial-summary"
  | "expense-analysis"
  | "cash-flow"
  | "revenue-analysis";

export type ReportSortField =
  | "name"
  | "generatedAt"
  | "period";

export type SortDirection = "asc" | "desc";

export interface ReportFilters {
  search?: string;
  type?: ReportType | "all";
  status?: ReportStatus | "all";
  sortBy?: ReportSortField;
  sortDirection?: SortDirection;
}

export interface ReportDateRange {
  startDate: string;
  endDate: string;
}

export interface FinancialSummary {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  profitMargin: number;
  revenueChange: number;
  expensesChange: number;
  profitChange: number;
  marginChange: number;
}

export interface RevenueExpenseData {
  date: string;
  revenue: number;
  expenses: number;
}

export interface ExpenseCategoryData {
  category: string;
  amount: number;
  percentage: number;
}

export interface CashFlowData {
  month: string;
  inflow: number;
  outflow: number;
  netCashFlow: number;
}

export interface FinancialInsight {
  id: string;
  title: string;
  description: string;
  type: "positive" | "warning" | "neutral";
  metric?: string;
}

export interface GeneratedReport {
  id: string;
  name: string;
  type: ReportType;
  period: string;
  generatedAt: string;
  status: ReportStatus;
  format: ReportFormat;
}

export interface ReportsDashboardData {
  summary: FinancialSummary;
  revenueExpense: RevenueExpenseData[];
  expenseBreakdown: ExpenseCategoryData[];
  cashFlow: CashFlowData[];
  insights: FinancialInsight[];
  reports: GeneratedReport[];
}
