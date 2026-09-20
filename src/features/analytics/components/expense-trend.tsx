"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { ExpenseTrend } from "../types/analytics";

interface ExpenseTrendProps {
  data: ExpenseTrend[];
}

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function ExpenseTrendChart({
  data,
}: ExpenseTrendProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expense Trend</CardTitle>

        <CardDescription>
          Track operating expenses over the selected period.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 8,
                right: 8,
                left: 8,
                bottom: 8,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                fontSize={12}
              />

              <YAxis
                tickLine={false}
                axisLine={false}
                fontSize={12}
                tickFormatter={(value) =>
                  currencyFormatter.format(value)
                }
              />

              <Tooltip
                formatter={(value) =>
                  currencyFormatter.format(Number(value))
                }
              />

              <Line
                type="monotone"
                dataKey="expenses"
                stroke="currentColor"
                strokeWidth={2}
                dot={false}
                className="text-primary"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}