
"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useReports } from "../../hooks/use-reports";

const COLORS = [
  "#64748b",
  "#0f766e",
  "#6366f1",
  "#d97706",
  "#0891b2",
];

function formatCurrency(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function ExpenseBreakdownChart() {
  const { data, isLoading, isError } = useReports();

  if (isLoading) {
    return (
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-base">Expense Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[280px] animate-pulse rounded-lg bg-muted/40" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card className="shadow-none">
        <CardContent className="p-6 text-sm text-destructive">
          Unable to load expense breakdown.
        </CardContent>
      </Card>
    );
  }

  const categories = data.expenseBreakdown;

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Expense Breakdown
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          Spending distribution by category
        </p>
      </CardHeader>

      <CardContent>
        {categories.length === 0 ? (
          <div className="flex h-[280px] items-center justify-center text-sm text-muted-foreground">
            No expense data available.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 sm:items-center">
            <div className="h-[240px] min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categories}
                    dataKey="amount"
                    nameKey="category"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={3}
                  >
                    {categories.map((category, index) => (
                      <Cell
                        key={category.category}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      formatCurrency(Number(value))
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {categories.map((category, index) => (
                <div
                  key={category.category}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor:
                          COLORS[index % COLORS.length],
                      }}
                    />

                    <span className="truncate text-sm text-muted-foreground">
                      {category.category}
                    </span>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {formatCurrency(category.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {category.percentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
