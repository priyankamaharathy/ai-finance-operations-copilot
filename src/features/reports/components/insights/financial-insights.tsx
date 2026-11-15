
"use client";

import {
  AlertCircle,
  CheckCircle2,
  Info,
  Lightbulb,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useReports } from "../../hooks/use-reports";

const insightStyles = {
  positive: {
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700",
  },
  warning: {
    icon: AlertCircle,
    className: "bg-amber-50 text-amber-700",
  },
  neutral: {
    icon: Info,
    className: "bg-slate-100 text-slate-700",
  },
};

export function FinancialInsights() {
  const { data, isLoading, isError } = useReports();

  if (isLoading) {
    return (
      <Card className="shadow-none">
        <CardContent className="space-y-4 p-5">
          <div className="h-5 w-40 animate-pulse rounded bg-muted" />
          <div className="h-20 animate-pulse rounded bg-muted/40" />
          <div className="h-20 animate-pulse rounded bg-muted/40" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !data) {
    return (
      <Card className="shadow-none">
        <CardContent className="p-5 text-sm text-destructive">
          Unable to load financial insights.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Lightbulb className="h-4 w-4 text-muted-foreground" />
          Financial Insights
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          Highlights from your financial activity
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        {data.insights.map((insight) => {
          const style = insightStyles[insight.type];
          const Icon = style.icon;

          return (
            <div
              key={insight.id}
              className="flex gap-3 rounded-lg border p-4"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${style.className}`}
              >
                <Icon className="h-4 w-4" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm font-medium">
                    {insight.title}
                  </h3>

                  {insight.metric && (
                    <span className="text-sm font-semibold">
                      {insight.metric}
                    </span>
                  )}
                </div>

                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {insight.description}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
