
import { transactions } from "@/features/transactions/api/mock-transactions";

import type {
  ExpenseCategoryData,
  FinancialInsight,
  FinancialSummary,
} from "../types/report";

const completedTransactions = transactions.filter(
  (transaction) => transaction.status === "completed",
);

const completedIncome = completedTransactions.filter(
  (transaction) => transaction.type === "income",
);

const completedExpenses = completedTransactions.filter(
  (transaction) => transaction.type === "expense",
);

const pendingExpenses = transactions.filter(
  (transaction) =>
    transaction.type === "expense" && transaction.status === "pending",
);

const failedExpenses = transactions.filter(
  (transaction) =>
    transaction.type === "expense" && transaction.status === "failed",
);

const sumAmounts = (items: typeof transactions): number =>
  items.reduce((total, item) => total + item.amount, 0);

const totalRevenue = sumAmounts(completedIncome);
const totalExpenses = sumAmounts(completedExpenses);
const netProfit = totalRevenue - totalExpenses;

const profitMargin =
  totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

export const financialSummary: FinancialSummary = {
  totalRevenue,
  totalExpenses,
  netProfit,
  profitMargin,
  revenueChange: 0,
  expensesChange: 0,
  profitChange: 0,
  marginChange: 0,
};

export const expenseBreakdown: ExpenseCategoryData[] = (() => {
  const categoryTotals = new Map<string, number>();

  completedExpenses.forEach((transaction) => {
    const currentTotal = categoryTotals.get(transaction.category) ?? 0;

    categoryTotals.set(
      transaction.category,
      currentTotal + transaction.amount,
    );
  });

  return Array.from(categoryTotals.entries())
    .map(([category, amount]) => ({
      category,
      amount,
      percentage:
        totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
})();

export const financialInsights: FinancialInsight[] = [
  {
    id: "insight_001",
    title: "Positive net profit",
    description:
      "Your recognized revenue exceeds completed expenses for this reporting period.",
    type: "positive",
    metric: `₹${netProfit.toLocaleString("en-IN")}`,
  },
  {
    id: "insight_002",
    title: "Pending expenses",
    description:
      "These expenses are awaiting payment confirmation and are excluded from recognized expenses.",
    type: "warning",
    metric: `₹${sumAmounts(pendingExpenses).toLocaleString("en-IN")}`,
  },
  {
    id: "insight_003",
    title: "Failed transactions",
    description:
      "Failed expenses are excluded from financial totals and may need review.",
    type: "neutral",
    metric: `₹${sumAmounts(failedExpenses).toLocaleString("en-IN")}`,
  },
];
