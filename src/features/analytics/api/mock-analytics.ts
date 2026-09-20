import type {
  AnalyticsData,
  DateRange,
} from "../types/analytics";

const analyticsData: Record<DateRange, AnalyticsData> = {
  "7d": {
    metrics: {
      revenue: 28500,
      expenses: 16200,
      netCashFlow: 12300,
      transactions: 184,
    },

    expenseTrend: [
      { date: "Sep 13", expenses: 2100 },
      { date: "Sep 14", expenses: 2450 },
      { date: "Sep 15", expenses: 1800 },
      { date: "Sep 16", expenses: 2650 },
      { date: "Sep 17", expenses: 2200 },
      { date: "Sep 18", expenses: 2800 },
      { date: "Sep 19", expenses: 2200 },
    ],

    expenseCategories: [
      {
        category: "Software",
        amount: 6200,
        percentage: 38,
      },
      {
        category: "Payroll",
        amount: 4100,
        percentage: 25,
      },
      {
        category: "Marketing",
        amount: 2900,
        percentage: 18,
      },
      {
        category: "Operations",
        amount: 1800,
        percentage: 11,
      },
      {
        category: "Other",
        amount: 1200,
        percentage: 8,
      },
    ],

    vendorSpend: [
      {
        vendorId: "vendor-001",
        vendorName: "AWS",
        amount: 4200,
        transactionCount: 18,
      },
      {
        vendorId: "vendor-002",
        vendorName: "Figma",
        amount: 1800,
        transactionCount: 4,
      },
      {
        vendorId: "vendor-003",
        vendorName: "Google",
        amount: 1500,
        transactionCount: 8,
      },
    ],
  },

  "30d": {
    metrics: {
      revenue: 124500,
      expenses: 78200,
      netCashFlow: 46300,
      transactions: 1248,
    },

    expenseTrend: [
      { date: "Aug 21", expenses: 5200 },
      { date: "Aug 25", expenses: 6100 },
      { date: "Aug 29", expenses: 4800 },
      { date: "Sep 02", expenses: 7200 },
      { date: "Sep 06", expenses: 6500 },
      { date: "Sep 10", expenses: 8100 },
      { date: "Sep 14", expenses: 6900 },
      { date: "Sep 19", expenses: 7600 },
    ],

    expenseCategories: [
      {
        category: "Software",
        amount: 28400,
        percentage: 36,
      },
      {
        category: "Payroll",
        amount: 21200,
        percentage: 27,
      },
      {
        category: "Marketing",
        amount: 12400,
        percentage: 16,
      },
      {
        category: "Operations",
        amount: 8900,
        percentage: 11,
      },
      {
        category: "Other",
        amount: 7300,
        percentage: 10,
      },
    ],

    vendorSpend: [
      {
        vendorId: "vendor-001",
        vendorName: "AWS",
        amount: 12400,
        transactionCount: 52,
      },
      {
        vendorId: "vendor-002",
        vendorName: "Google",
        amount: 8600,
        transactionCount: 28,
      },
      {
        vendorId: "vendor-003",
        vendorName: "Figma",
        amount: 4200,
        transactionCount: 4,
      },
      {
        vendorId: "vendor-004",
        vendorName: "Slack",
        amount: 2800,
        transactionCount: 3,
      },
    ],
  },

  "90d": {
    metrics: {
      revenue: 368500,
      expenses: 231400,
      netCashFlow: 137100,
      transactions: 3684,
    },

    expenseTrend: [
      { date: "Jun 20", expenses: 6800 },
      { date: "Jul 01", expenses: 7200 },
      { date: "Jul 15", expenses: 8100 },
      { date: "Aug 01", expenses: 7600 },
      { date: "Aug 15", expenses: 9200 },
      { date: "Sep 01", expenses: 8600 },
      { date: "Sep 19", expenses: 9700 },
    ],

    expenseCategories: [
      {
        category: "Software",
        amount: 84200,
        percentage: 36,
      },
      {
        category: "Payroll",
        amount: 62400,
        percentage: 27,
      },
      {
        category: "Marketing",
        amount: 38400,
        percentage: 17,
      },
      {
        category: "Operations",
        amount: 26400,
        percentage: 11,
      },
      {
        category: "Other",
        amount: 20000,
        percentage: 9,
      },
    ],

    vendorSpend: [
      {
        vendorId: "vendor-001",
        vendorName: "AWS",
        amount: 38400,
        transactionCount: 156,
      },
      {
        vendorId: "vendor-002",
        vendorName: "Google",
        amount: 26400,
        transactionCount: 84,
      },
      {
        vendorId: "vendor-003",
        vendorName: "Figma",
        amount: 12600,
        transactionCount: 12,
      },
    ],
  },

  "12m": {
    metrics: {
      revenue: 1482000,
      expenses: 924000,
      netCashFlow: 558000,
      transactions: 14892,
    },

    expenseTrend: [
      { date: "Oct", expenses: 68000 },
      { date: "Nov", expenses: 72000 },
      { date: "Dec", expenses: 74000 },
      { date: "Jan", expenses: 71000 },
      { date: "Feb", expenses: 76000 },
      { date: "Mar", expenses: 79000 },
      { date: "Apr", expenses: 75000 },
      { date: "May", expenses: 82000 },
      { date: "Jun", expenses: 78000 },
      { date: "Jul", expenses: 85000 },
      { date: "Aug", expenses: 81000 },
      { date: "Sep", expenses: 83000 },
    ],

    expenseCategories: [
      {
        category: "Software",
        amount: 332000,
        percentage: 36,
      },
      {
        category: "Payroll",
        amount: 249000,
        percentage: 27,
      },
      {
        category: "Marketing",
        amount: 157000,
        percentage: 17,
      },
      {
        category: "Operations",
        amount: 101000,
        percentage: 11,
      },
      {
        category: "Other",
        amount: 85000,
        percentage: 9,
      },
    ],

    vendorSpend: [
      {
        vendorId: "vendor-001",
        vendorName: "AWS",
        amount: 148000,
        transactionCount: 624,
      },
      {
        vendorId: "vendor-002",
        vendorName: "Google",
        amount: 102000,
        transactionCount: 336,
      },
      {
        vendorId: "vendor-003",
        vendorName: "Figma",
        amount: 48600,
        transactionCount: 48,
      },
    ],
  },
};

export async function fetchAnalytics(
  dateRange: DateRange,
): Promise<AnalyticsData> {
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  return analyticsData[dateRange];
}