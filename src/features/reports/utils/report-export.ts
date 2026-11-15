
import type {
  FinancialSummary,
  ReportDateRange,
} from "../types/report";

import type { Transaction } from "@/features/transactions/types/transaction";

function escapeCsvValue(value: string | number): string {
  const stringValue = String(value);

  return `"${stringValue.replace(/"/g, '""')}"`;
}

function downloadCsv(filename: string, rows: string[][]) {
  const csvContent = rows
    .map((row) => row.map(escapeCsvValue).join(","))
    .join("\n");

  // BOM helps spreadsheet applications recognize UTF-8 correctly.
  const blob = new Blob(["\uFEFF", csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

export function exportFinancialSummaryCsv(
  summary: FinancialSummary,
  periodLabel: string,
  dateRange?: ReportDateRange | null,
) {
  const rows = [
    ["Financial Summary"],
    ["Reporting period", periodLabel],
    ...(dateRange
      ? [
          ["Start date", dateRange.startDate],
          ["End date", dateRange.endDate],
        ]
      : []),
    [],
    ["Metric", "Amount"],
    ["Total Revenue", String(summary.totalRevenue)],
    ["Total Expenses", String(summary.totalExpenses)],
    ["Net Profit", String(summary.netProfit)],
    ["Profit Margin", `${summary.profitMargin.toFixed(2)}%`],
    ["Revenue Change", `${summary.revenueChange}%`],
    ["Expenses Change", `${summary.expensesChange}%`],
    ["Profit Change", `${summary.profitChange}%`],
    ["Margin Change", `${summary.marginChange}%`],
  ];

  downloadCsv("financial-summary.csv", rows);
}

export function exportTransactionsCsv(
  transactions: Transaction[],
) {
  const rows = [
    [
      "Transaction ID",
      "Date",
      "Description",
      "Vendor",
      "Category",
      "Type",
      "Amount (INR)",
      "Status",
      "Payment Method",
    ],
    ...transactions.map((transaction) => [
      transaction.id,
      transaction.date,
      transaction.description,
      transaction.vendor,
      transaction.category,
      transaction.type,
      String(transaction.amount),
      transaction.status,
      transaction.paymentMethod,
    ]),
  ];

  downloadCsv("transaction-details.csv", rows);
}
