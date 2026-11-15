
import { AlertCircle, FileBarChart, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ReportsLoadingState() {
  return (
    <div className="space-y-6" aria-label="Loading reports" aria-busy="true">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-32 animate-pulse rounded-xl border bg-muted/40"
          />
        ))}
      </div>

      <div className="h-80 animate-pulse rounded-xl border bg-muted/40" />

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="h-72 animate-pulse rounded-xl border bg-muted/40" />
        <div className="h-72 animate-pulse rounded-xl border bg-muted/40" />
      </div>

      <div className="h-64 animate-pulse rounded-xl border bg-muted/40" />
    </div>
  );
}

interface ReportsErrorStateProps {
  onRetry: () => void;
}

export function ReportsErrorState({ onRetry }: ReportsErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-destructive/20 bg-destructive/5 px-6 py-10 text-center"
    >
      <AlertCircle
        className="mb-3 h-8 w-8 text-destructive"
        aria-hidden="true"
      />

      <h2 className="font-semibold">Unable to load reports</h2>

      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Something went wrong while loading your financial reports. Please try
        again.
      </p>

      <Button onClick={onRetry} className="mt-5 gap-2">
        <RefreshCw className="h-4 w-4" aria-hidden="true" />
        Try again
      </Button>
    </div>
  );
}

export function ReportsEmptyState() {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed px-6 py-10 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <FileBarChart
          className="h-6 w-6 text-muted-foreground"
          aria-hidden="true"
        />
      </div>

      <h2 className="font-semibold">No financial data available</h2>

      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        There is no financial activity for the selected period. Try another
        date range to see your reports.
      </p>
    </div>
  );
}
