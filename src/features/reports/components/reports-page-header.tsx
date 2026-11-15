
"use client";

import { CalendarDays, Download, FileSpreadsheet } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ReportsDateRangePicker } from "./reports-date-range-picker";
import { useReportFilters } from "../hooks/use-report-filters";
import type { ReportPeriod } from "../types/report";

interface ReportsPageHeaderProps {
  onExport?: () => void;
  onExportTransactions?: () => void;
}

const periodOptions: {
  label: string;
  value: ReportPeriod;
}[] = [
    { label: "Last 7 days", value: "7d" },
    { label: "Last 30 days", value: "30d" },
    { label: "Last 90 days", value: "90d" },
    { label: "Last 12 months", value: "12m" },
  ];

export function ReportsPageHeader({
  onExport,
  onExportTransactions,
}: ReportsPageHeaderProps) {
  const {
    period,
    customRange,
    setPeriod,
    setCustomRange,
    isPeriodSelected,
  } = useReportFilters();

  const selectedPeriod = !isPeriodSelected
    ? "Select period"
    : periodOptions.find((option) => option.value === period)?.label ??
    "Custom range";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Reports
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor financial performance and gain insights into your business.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground">
              <CalendarDays className="h-4 w-4" />
              {selectedPeriod}
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              {periodOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => setPeriod(option.value)}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}

              <DropdownMenuItem onClick={() => setPeriod("custom")}>
                Custom range
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90">
              <Download className="h-4 w-4" />
              Export CSV
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onExport}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Financial summary
              </DropdownMenuItem>

              <DropdownMenuItem onClick={onExportTransactions}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Transaction details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {period === "custom" && (
        <div className="flex justify-end">
          <ReportsDateRangePicker
            value={customRange}
            onApply={setCustomRange}
          />
        </div>
      )}
    </div>
  );
}
