import { create } from "zustand";

import type { DateRange } from "@/features/analytics/types/analytics";

interface AnalyticsStore {
  dateRange: DateRange;
  setDateRange: (dateRange: DateRange) => void;
}

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  dateRange: "30d",

  setDateRange: (dateRange) => {
    set({ dateRange });
  },
}));
