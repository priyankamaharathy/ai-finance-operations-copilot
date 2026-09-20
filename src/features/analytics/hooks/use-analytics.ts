"use client";

import { useQuery } from "@tanstack/react-query";

import { useAnalyticsStore } from "@/stores/analytics-store";

import { getAnalytics } from "../services/analytics-service";

export function useAnalytics() {
  const dateRange = useAnalyticsStore(
    (state) => state.dateRange,
  );

  return useQuery({
    queryKey: ["analytics", dateRange],
    queryFn: () => getAnalytics(dateRange),
    staleTime: 1000 * 60 * 5,
  });
}