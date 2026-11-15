
import { FileBarChart } from "lucide-react";

import type { GeneratedReport } from "../../types/report";
import { GeneratedReportsTable } from "./generated-reports-table";

interface GeneratedReportsSectionProps {
  reports: GeneratedReport[];
  onDownload?: (report: GeneratedReport) => void;
}

export function GeneratedReportsSection({
  reports,
  onDownload,
}: GeneratedReportsSectionProps) {
  return (
    <section
      aria-labelledby="generated-reports-heading"
      className="overflow-hidden rounded-xl border bg-card"
    >
      <div className="flex items-center gap-3 border-b p-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
          <FileBarChart
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
        </div>

        <div>
          <h2
            id="generated-reports-heading"
            className="font-semibold tracking-tight"
          >
            Generated Reports
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            View and download your financial reports.
          </p>
        </div>
      </div>

      <GeneratedReportsTable
        reports={reports}
        onDownload={onDownload}
      />
    </section>
  );
}
