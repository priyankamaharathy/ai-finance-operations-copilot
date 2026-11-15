
import { transactions } from "@/features/transactions/api/mock-transactions";

import type {
  ExpenseCategoryData,
  FinancialSummary,
  ReportDateRange,
  ReportPeriod,
  RevenueExpenseData,
} from "../types/report";

function getPeriodStart(period: ReportPeriod, endDate: Date): Date {
  const startDate = new Date(endDate);

  switch (period) {
    case "7d":
      startDate.setDate(startDate.getDate() - 6);
      break;

    case "30d":
      startDate.setDate(startDate.getDate() - 29);
      break;

    case "90d":
      startDate.setDate(startDate.getDate() - 89);
      break;

    case "12m":
      startDate.setFullYear(startDate.getFullYear() - 1);
      startDate.setDate(startDate.getDate() + 1);
      break;
  }

  startDate.setHours(0, 0, 0, 0);

  return startDate;
}

export const REPORT_REFERENCE_DATE = new Date(
  "2026-09-22T23:59:59",
);


export function getFilteredTransactions(
  period: ReportPeriod,
  referenceDate = REPORT_REFERENCE_DATE,
  customRange?: ReportDateRange | null,
) {
  if (period === "custom") {
    if (!customRange) {
      return [];
    }

    const { startDate, endDate } = customRange;

    return transactions.filter((transaction) => {
      return (
        transaction.date >= startDate &&
        transaction.date <= endDate
      );
    });
  }

  const endDate = new Date(referenceDate);
  endDate.setHours(23, 59, 59, 999);

  const startDate = getPeriodStart(period, endDate);

  return transactions.filter((transaction) => {
    const transactionDate = new Date(`${transaction.date}T00:00:00`);

    return transactionDate >= startDate && transactionDate <= endDate;
  });
}



export function calculateRevenueExpenseData(
  periodTransactions: ReturnType<typeof getFilteredTransactions>,
  period: ReportPeriod,
  referenceDate = REPORT_REFERENCE_DATE,
): RevenueExpenseData[] {
  const dailyTotals = new Map<
    string,
    { revenue: number; expenses: number }
  >();

  periodTransactions
    .filter((transaction) => transaction.status === "completed")
    .forEach((transaction) => {
      const current = dailyTotals.get(transaction.date) ?? {
        revenue: 0,
        expenses: 0,
      };

      if (transaction.type === "income") {
        current.revenue += transaction.amount;
      } else {
        current.expenses += transaction.amount;
      }

      dailyTotals.set(transaction.date, current);
    });

  const endDate = new Date(referenceDate);
  endDate.setHours(0, 0, 0, 0);

  const startDate = getPeriodStart(period, endDate);

  const result: RevenueExpenseData[] = [];

  const cursor = new Date(startDate);

  while (cursor <= endDate) {
    const year = cursor.getFullYear();
    const month = String(cursor.getMonth() + 1).padStart(2, "0");
    const day = String(cursor.getDate()).padStart(2, "0");

    const dateKey = `${year}-${month}-${day}`;

    const totals = dailyTotals.get(dateKey) ?? {
      revenue: 0,
      expenses: 0,
    };

    result.push({
      date: cursor.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),
      revenue: totals.revenue,
      expenses: totals.expenses,
    });

    cursor.setDate(cursor.getDate() + 1);
  }

  return result;
}

export function calculateFinancialSummary(
  periodTransactions: ReturnType<typeof getFilteredTransactions>,
): FinancialSummary {
  const completed = periodTransactions.filter(
    (transaction) => transaction.status === "completed",
  );

  const totalRevenue = completed
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const totalExpenses = completed
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const netProfit = totalRevenue - totalExpenses;

  return {
    totalRevenue,
    totalExpenses,
    netProfit,
    profitMargin:
      totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0,
    revenueChange: 0,
    expensesChange: 0,
    profitChange: 0,
    marginChange: 0,
  };
}

export function calculateExpenseBreakdown(
  periodTransactions: ReturnType<typeof getFilteredTransactions>,
): ExpenseCategoryData[] {
  const completedExpenses = periodTransactions.filter(
    (transaction) =>
      transaction.type === "expense" &&
      transaction.status === "completed",
  );

  const categoryTotals = new Map<string, number>();

  completedExpenses.forEach((transaction) => {
    const currentAmount =
      categoryTotals.get(transaction.category) ?? 0;

    categoryTotals.set(
      transaction.category,
      currentAmount + transaction.amount,
    );
  });

  const totalExpenses = completedExpenses.reduce(
    (total, transaction) => total + transaction.amount,
    0,
  );

  return Array.from(categoryTotals.entries())
    .map(([category, amount]) => ({
      category,
      amount,
      percentage:
        totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
}
