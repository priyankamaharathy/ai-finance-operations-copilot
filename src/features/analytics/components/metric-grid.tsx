import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  Receipt,
  Wallet,
} from "lucide-react";

import { MetricCard } from "./metric-card";

interface MetricGridProps {
  metrics: {
    revenue: number;
    expenses: number;
    netCashFlow: number;
    transactions: number;
  };
}

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const numberFormatter = new Intl.NumberFormat("en-IN");

export function MetricGrid({
  metrics,
}: MetricGridProps) {
  const {
    revenue,
    expenses,
    netCashFlow,
    transactions,
  } = metrics;

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard
        title="Revenue"
        value={currencyFormatter.format(revenue)}
        description="Total revenue"
        icon={DollarSign}
      />

      <MetricCard
        title="Expenses"
        value={currencyFormatter.format(expenses)}
        description="Total operating expenses"
        icon={Wallet}
      />

      <MetricCard
        title="Net Cash Flow"
        value={currencyFormatter.format(netCashFlow)}
        description="Revenue minus expenses"
        icon={
          netCashFlow >= 0
            ? ArrowUpRight
            : ArrowDownRight
        }
      />

      <MetricCard
        title="Transactions"
        value={numberFormatter.format(transactions)}
        description="Recorded transactions"
        icon={Receipt}
      />
    </div>
  );
}