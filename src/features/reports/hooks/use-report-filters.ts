
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ReportDateRange, ReportPeriod } from "../types/report";

const VALID_PERIODS: ReportPeriod[] = ["7d", "30d", "90d", "12m", "custom"];

function isValidDate(value: string | null): value is string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00`);

  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  );
}

export function useReportFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const queryPeriod = searchParams.get("period");
  const queryStartDate = searchParams.get("startDate");
  const queryEndDate = searchParams.get("endDate");

  const isPeriodSelected = VALID_PERIODS.includes(
    queryPeriod as ReportPeriod,
  );

  const period: ReportPeriod = isPeriodSelected
    ? (queryPeriod as ReportPeriod)
    : "30d";

  const isValidCustomRange =
    isValidDate(queryStartDate) &&
    isValidDate(queryEndDate) &&
    queryStartDate <= queryEndDate;

  const customRange: ReportDateRange | null =
    period === "custom" && isValidCustomRange
      ? {
          startDate: queryStartDate,
          endDate: queryEndDate,
        }
      : null;

  function updateUrl(params: URLSearchParams) {
    const query = params.toString();

    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  }

  function setPeriod(nextPeriod: ReportPeriod) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("period", nextPeriod);

    if (nextPeriod !== "custom") {
      params.delete("startDate");
      params.delete("endDate");
    }

    updateUrl(params);
  }

  function setCustomRange(range: ReportDateRange) {
    if (
      !isValidDate(range.startDate) ||
      !isValidDate(range.endDate) ||
      range.startDate > range.endDate
    ) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());

    params.set("period", "custom");
    params.set("startDate", range.startDate);
    params.set("endDate", range.endDate);

    updateUrl(params);
  }

  return {
    period,
    isPeriodSelected,
    customRange,
    setPeriod,
    setCustomRange,
  };
}