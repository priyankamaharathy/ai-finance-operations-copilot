
"use client";

import { useQuery } from "@tanstack/react-query";

import { getReportsDashboard } from "../services/report-service";
import { useReportFilters } from "./use-report-filters";

export function useReports() {
  const { period } = useReportFilters();

  return useQuery({
    queryKey: ["reports", "dashboard", period],
    queryFn: () => getReportsDashboard(period),
    staleTime: 1000 * 60 * 5,
  });
}
