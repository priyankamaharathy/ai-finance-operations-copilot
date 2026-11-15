
"use client";

import {
    Download,
    FileSpreadsheet,
    FileText,
    MoreHorizontal,
} from "lucide-react";

import type { GeneratedReport } from "../../types/report";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface GeneratedReportsTableProps {
    reports: GeneratedReport[];
    onDownload?: (report: GeneratedReport) => void;
}

function formatDate(value: string) {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date);
}

function formatReportType(type: GeneratedReport["type"]) {
    const labels: Record<GeneratedReport["type"], string> = {
        "financial-summary": "Financial Summary",
        "expense-analysis": "Expense Analysis",
        "cash-flow": "Cash Flow",
        "revenue-analysis": "Revenue Analysis",
    };

    return labels[type];
}

function StatusBadge({
    status,
}: {
    status: GeneratedReport["status"];
}) {
    const styles = {
        ready: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
        processing:
            "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
        failed: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${styles[status]}`}
        >
            <span
                aria-hidden="true"
                className={`mr-1.5 h-1.5 w-1.5 rounded-full ${status === "ready"
                        ? "bg-emerald-500"
                        : status === "processing"
                            ? "bg-amber-500"
                            : "bg-red-500"
                    }`}
            />
            {status}
        </span>
    );
}

function ReportFormatIcon({
    format,
}: {
    format: GeneratedReport["format"];
}) {
    return format === "pdf" ? (
        <FileText className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
    ) : (
        <FileSpreadsheet
            className="h-4 w-4 text-muted-foreground"
            aria-hidden="true"
        />
    );
}

function ReportActions({
    report,
    onDownload,
}: {
    report: GeneratedReport;
    onDownload?: (report: GeneratedReport) => void;
}) {
    const canDownload = report.status === "ready";

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                disabled={!canDownload}
                aria-label={`Actions for ${report.name}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
                <MoreHorizontal className="h-4 w-4" />
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    disabled={!canDownload}
                    onClick={() => onDownload?.(report)}
                >
                    <Download className="mr-2 h-4 w-4" />
                    Download {report.format.toUpperCase()}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

function EmptyReports() {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <FileText
                    className="h-6 w-6 text-muted-foreground"
                    aria-hidden="true"
                />
            </div>

            <h3 className="font-medium text-foreground">No reports yet</h3>

            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Generated financial reports will appear here when they are available.
            </p>
        </div>
    );
}

export function GeneratedReportsTable({
    reports,
    onDownload,
}: GeneratedReportsTableProps) {
    if (reports.length === 0) {
        return <EmptyReports />;
    }

    return (
        <>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
                <table className="w-full text-left text-sm">
                    <caption className="sr-only">
                        Generated financial reports
                    </caption>

                    <thead className="border-b bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
                        <tr>
                            <th scope="col" className="px-5 py-3 font-medium">
                                Report
                            </th>
                            <th scope="col" className="px-5 py-3 font-medium">
                                Period
                            </th>
                            <th scope="col" className="px-5 py-3 font-medium">
                                Generated
                            </th>
                            <th scope="col" className="px-5 py-3 font-medium">
                                Status
                            </th>
                            <th scope="col" className="px-5 py-3 text-right font-medium">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-border">
                        {reports.map((report) => (
                            <tr
                                key={report.id}
                                className="transition-colors hover:bg-muted/30"
                            >
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <ReportFormatIcon format={report.format} />
                                        <div>
                                            <p className="font-medium text-foreground">
                                                {report.name}
                                            </p>
                                            <p className="mt-0.5 text-xs text-muted-foreground">
                                                {formatReportType(report.type)}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-5 py-4 text-muted-foreground">
                                    {report.period}
                                </td>

                                <td className="px-5 py-4 text-muted-foreground">
                                    {formatDate(report.generatedAt)}
                                </td>

                                <td className="px-5 py-4">
                                    <StatusBadge status={report.status} />
                                </td>

                                <td className="px-5 py-4 text-right">
                                    <ReportActions
                                        report={report}
                                        onDownload={onDownload}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile cards */}
            <div className="space-y-3 p-4 md:hidden">
                {reports.map((report) => (
                    <article
                        key={report.id}
                        className="rounded-lg border border-border p-4"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-start gap-3">
                                <ReportFormatIcon format={report.format} />

                                <div className="min-w-0">
                                    <h3 className="truncate text-sm font-medium">
                                        {report.name}
                                    </h3>
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {formatReportType(report.type)}
                                    </p>
                                </div>
                            </div>

                            <ReportActions
                                report={report}
                                onDownload={onDownload}
                            />
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-3">
                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">Period</p>
                                <p className="text-sm">{report.period}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">Generated</p>
                                <p className="text-sm">{formatDate(report.generatedAt)}</p>
                            </div>

                            <div className="space-y-1">
                                <p className="text-xs text-muted-foreground">Status</p>
                                <StatusBadge status={report.status} />
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </>
    );
}
