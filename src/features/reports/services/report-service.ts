
import type {
  ReportPeriod,
  GeneratedReport,
} from "../types/report";

import {
  calculateExpenseBreakdown,
  calculateFinancialSummary,
  calculateRevenueExpenseData,
  getFilteredTransactions,
} from "../utils/report-calculations";

import { financialInsights } from "../api/mock-reports";

const generatedReports: GeneratedReport[] = [
  {
    id: "report_001",
    name: "September Financial Summary",
    type: "financial-summary",
    period: "Sep 1 – Sep 22, 2026",
    generatedAt: "2026-09-22T10:30:00",
    status: "ready",
    format: "csv",
  },
  {
    id: "report_002",
    name: "Expense Analysis",
    type: "expense-analysis",
    period: "Last 30 days",
    generatedAt: "2026-09-21T14:15:00",
    status: "ready",
    format: "csv",
  },
  {
    id: "report_003",
    name: "Cash Flow Report",
    type: "cash-flow",
    period: "Last 90 days",
    generatedAt: "2026-09-20T09:45:00",
    status: "processing",
    format: "pdf",
  },
  {
    id: "report_004",
    name: "Revenue Analysis",
    type: "revenue-analysis",
    period: "Last 12 months",
    generatedAt: "2026-09-18T11:00:00",
    status: "failed",
    format: "pdf",
  },
];

export async function getReportsDashboard(
  period: ReportPeriod = "30d",
) {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const filteredTransactions = getFilteredTransactions(period);

  const summary = calculateFinancialSummary(filteredTransactions);

  const expenseBreakdown =
    calculateExpenseBreakdown(filteredTransactions);

  const revenueExpense = calculateRevenueExpenseData(
    filteredTransactions,
    period,
  );

  return {
    summary,
    expenseBreakdown,
    revenueExpense,
    cashFlow: [],
    insights: financialInsights,
    reports: generatedReports,
  };
}
