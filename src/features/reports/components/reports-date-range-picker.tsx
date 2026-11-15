
"use client";

import { useState } from "react";
import { format, parseISO, startOfDay } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import type { ReportDateRange } from "../types/report";

interface ReportsDateRangePickerProps {
  value: ReportDateRange | null;
  onApply: (range: ReportDateRange) => void;
}

export function ReportsDateRangePicker({
  value,
  onApply,
}: ReportsDateRangePickerProps) {
  const [open, setOpen] = useState(false);

  const [startDate, setStartDate] = useState<Date | undefined>(
    value ? parseISO(value.startDate) : undefined,
  );

  const [endDate, setEndDate] = useState<Date | undefined>(
    value ? parseISO(value.endDate) : undefined,
  );

  const today = startOfDay(new Date());

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      // Initialize the draft from the currently applied range.
      setStartDate(value ? parseISO(value.startDate) : undefined);
      setEndDate(value ? parseISO(value.endDate) : undefined);
    }

    setOpen(nextOpen);
  }

  function handleApply() {
    if (!startDate || !endDate || startDate > endDate) {
      return;
    }

    onApply({
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
    });

    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
        <CalendarIcon className="h-4 w-4" aria-hidden="true" />

        {value
          ? `${format(parseISO(value.startDate), "dd MMM yyyy")} – ${format(parseISO(value.endDate), "dd MMM yyyy")}`
          : "Select date range"}
      </PopoverTrigger>

      <PopoverContent align="end" className="w-auto max-w-[calc(100vw-2rem)] p-3">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">Start date</p>

              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => {
                  setStartDate(date);

                  if (date && endDate && date > endDate) {
                    setEndDate(undefined);
                  }
                }}
                disabled={{ after: today }}
              />
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">End date</p>

              <Calendar
                mode="single"
                selected={endDate}
                onSelect={setEndDate}
                disabled={(date) =>
                  date > today || (!!startDate && date < startDate)
                }
              />
            </div>
          </div>

          <p
            aria-live="polite"
            className="text-sm text-muted-foreground"
          >
            {!startDate
              ? "Select a start date"
              : !endDate
                ? "Now select an end date"
                : `${format(startDate, "dd MMM yyyy")} – ${format(endDate, "dd MMM yyyy")}`}
          </p>

          <Button
            className="w-full"
            onClick={handleApply}
            disabled={!startDate || !endDate || startDate > endDate}
          >
            Apply date range
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
