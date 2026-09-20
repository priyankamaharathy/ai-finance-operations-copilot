"use client";

import { useAnalytics } from "@/features/analytics/hooks/use-analytics";

export default function DashboardPage() {
  const {
    data,
    isLoading,
    isError,
  } = useAnalytics();

  if (isLoading) {
    return (
      <div className="p-6">
        Loading analytics...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        Failed to load analytics.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-semibold">
        Overview
      </h1>

      <pre className="overflow-auto rounded-lg border p-4 text-sm">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}