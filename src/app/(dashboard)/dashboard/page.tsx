"use client";

import { AnalyticsHeader } from "@/features/analytics/components/analytics-header";
import { MetricGrid } from "@/features/analytics/components/metric-grid";
import { useAnalytics } from "@/features/analytics/hooks/use-analytics";

export default function DashboardPage() {
  const {
    data,
    isLoading,
    isError,
  } = useAnalytics();

  return (
    <div className="space-y-6 p-4 md:p-6">
      <AnalyticsHeader />

      {isLoading ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-xl border bg-muted/30"
            />
          ))}
        </div>
      ) : null}

      {isError ? (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm"
        >
          Unable to load financial analytics. Please try
          again.
        </div>
      ) : null}

      {data ? (
        <MetricGrid metrics={data.metrics} />
      ) : null}
    </div>
  );
}