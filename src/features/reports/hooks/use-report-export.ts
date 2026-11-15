
"use client";

import { useMemo } from "react";

import { useReports } from "./use-reports";
import { useReportFilters } from "./use-report-filters";

import { getFilteredTransactions } from "../utils/report-calculations";
import {
  exportFinancialSummaryCsv,
  exportTransactionsCsv,
} from "../utils/report-export";

export function useReportExport() {
  const { data } = useReports();
  const { period, customRange } = useReportFilters();

  const filteredTransactions = useMemo(() => {
    if (period === "custom" && customRange) {
      return getFilteredTransactions(
        "custom",
        undefined,
        customRange,
      );
    }

    return getFilteredTransactions(period);
  }, [period, customRange]);

  function handleExportSummary() {
    if (!data) return;

    exportFinancialSummaryCsv(
      data.summary,
      period === "custom" ? "Custom range" : period,
      customRange,
    );
  }

  function handleExportTransactions() {
    exportTransactionsCsv(filteredTransactions);
  }

  return {
    handleExportSummary,
    handleExportTransactions,
  };
}
