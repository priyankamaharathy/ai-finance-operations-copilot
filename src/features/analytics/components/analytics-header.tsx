"use client";

import { CalendarDays } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  useAnalyticsStore,
} from "@/stores/analytics-store";

import type { DateRange } from "../types/analytics";

const ranges: {
  label: string;
  value: DateRange;
}[] = [
  {
    label: "7 days",
    value: "7d",
  },
  {
    label: "30 days",
    value: "30d",
  },
  {
    label: "90 days",
    value: "90d",
  },
  {
    label: "12 months",
    value: "12m",
  },
];

export function AnalyticsHeader() {
  const dateRange = useAnalyticsStore(
    (state) => state.dateRange,
  );

  const setDateRange = useAnalyticsStore(
    (state) => state.setDateRange,
  );

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Financial Overview
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Monitor revenue, expenses, and financial activity.
        </p>
      </div>

      <div
        className="flex items-center gap-1 overflow-x-auto rounded-lg border p-1"
        aria-label="Analytics date range"
      >
        <CalendarDays
          className="ml-2 size-4 shrink-0 text-muted-foreground"
          aria-hidden="true"
        />

        {ranges.map((range) => {
          const isActive = dateRange === range.value;

          return (
            <Button
              key={range.value}
              type="button"
              variant={isActive ? "secondary" : "ghost"}
              size="sm"
              onClick={() => setDateRange(range.value)}
            >
              {range.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}