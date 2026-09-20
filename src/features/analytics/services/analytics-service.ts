import { fetchAnalytics } from "../api/mock-analytics";
import type {
  AnalyticsData,
  DateRange,
} from "../types/analytics";

export async function getAnalytics(
  dateRange: DateRange,
): Promise<AnalyticsData> {
  return fetchAnalytics(dateRange);
}