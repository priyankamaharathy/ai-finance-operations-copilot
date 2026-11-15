
import {
  ArrowUpRight,
  Wallet,
  TrendingUp,
  Percent,
} from "lucide-react";

import { SummaryCard } from "./summary-card";
import { useReports } from "../../hooks/use-reports";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function SummaryGrid() {
  const { data, isLoading, isError } = useReports();

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-xl border bg-muted/40"
          />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-lg border border-destructive/30 p-4 text-sm text-destructive">
        Unable to load financial summary.
      </div>
    );
  }

  const { summary } = data;

  const cards = [
    {
      title: "Total Revenue",
      value: formatCurrency(summary.totalRevenue),
      description: "Completed income transactions",
      icon: <TrendingUp className="h-4 w-4" />,
    },
    {
      title: "Total Expenses",
      value: formatCurrency(summary.totalExpenses),
      description: "Completed expense transactions",
      icon: <Wallet className="h-4 w-4" />,
    },
    {
      title: "Net Profit",
      value: formatCurrency(summary.netProfit),
      description: "Revenue minus expenses",
      icon: <ArrowUpRight className="h-4 w-4" />,
    },
    {
      title: "Profit Margin",
      value: `${summary.profitMargin.toFixed(2)}%`,
      description: "Net profit as a percentage of revenue",
      icon: <Percent className="h-4 w-4" />,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <SummaryCard key={card.title} {...card} />
      ))}
    </div>
  );
}
