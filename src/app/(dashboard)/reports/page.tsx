
"use client";

import { Suspense } from "react";

import { ReportsPageHeader } from "@/features/reports/components/reports-page-header";
import { SummaryGrid } from "@/features/reports/components/reports-summary/summary-grid";
import { RevenueExpenseChart } from "@/features/reports/components/analytics/revenue-expense-chart";
import { ExpenseBreakdownChart } from "@/features/reports/components/analytics/expense-breakdown-chart";
import { FinancialInsights } from "@/features/reports/components/insights/financial-insights";
import { GeneratedReportsSection } from "@/features/reports/components/generated-reports/generated-reports-section";

import {
  ReportsEmptyState,
  ReportsErrorState,
  ReportsLoadingState,
} from "@/features/reports/components/reports-states";

import { useReports } from "@/features/reports/hooks/use-reports";
import { useReportExport } from "@/features/reports/hooks/use-report-export";

import type { GeneratedReport } from "@/features/reports/types/report";

function ReportsContent() {
  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useReports();

  const {
    handleExportSummary,
    handleExportTransactions,
  } = useReportExport();

  function handleDownloadGeneratedReport(report: GeneratedReport) {
    if (report.status !== "ready") return;

    if (report.type === "financial-summary") {
      handleExportSummary();
      return;
    }

    handleExportTransactions();
  }

  if (isLoading) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <ReportsLoadingState />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <ReportsPageHeader />
        <ReportsErrorState onRetry={() => void refetch()} />
      </div>
    );
  }

  const hasFinancialData =
    data.summary.totalRevenue !== 0 ||
    data.summary.totalExpenses !== 0;

  return (
    <div className="space-y-6 p-4 md:p-6">
      <ReportsPageHeader
        onExport={handleExportSummary}
        onExportTransactions={handleExportTransactions}
      />

      {hasFinancialData ? (
        <>
          <SummaryGrid />

          <RevenueExpenseChart />

          <div className="grid gap-6 xl:grid-cols-2">
            <ExpenseBreakdownChart />
            <FinancialInsights />
          </div>
        </>
      ) : (
        <ReportsEmptyState />
      )}

      <GeneratedReportsSection
        reports={data.reports}
        onDownload={handleDownloadGeneratedReport}
      />
    </div>
  );
}

export default function ReportsPage() {
  return (
    <Suspense
      fallback={
        <div className="space-y-6 p-4 md:p-6">
          <ReportsLoadingState />
        </div>
      }
    >
      <ReportsContent />
    </Suspense>
  );
}
