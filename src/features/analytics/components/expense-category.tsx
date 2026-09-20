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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { ExpenseCategory } from "../types/analytics";

interface ExpenseCategoryProps {
  data: ExpenseCategory[];
}

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function ExpenseCategoryChart({
  data,
}: ExpenseCategoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Categories</CardTitle>

        <CardDescription>
          Breakdown of spending by category.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div className="h-[240px] w-full md:w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {data.map((entry) => (
                    <Cell
                      key={entry.category}
                      className="fill-primary"
                      opacity={
                        0.45 +
                        entry.percentage / 200
                      }
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) =>
                    currencyFormatter.format(Number(value))
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 space-y-3">
            {data.map((category) => (
              <div
                key={category.category}
                className="flex items-center justify-between gap-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {category.category}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {category.percentage}% of total
                  </p>
                </div>

                <p className="shrink-0 text-sm font-medium">
                  {currencyFormatter.format(
                    category.amount,
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}