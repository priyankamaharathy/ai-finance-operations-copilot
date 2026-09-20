import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { VendorSpend } from "../types/analytics";

interface TopVendorsProps {
  data: VendorSpend[];
}

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function TopVendors({
  data,
}: TopVendorsProps) {
  const sortedVendors = [...data]
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  const maxAmount = sortedVendors[0]?.amount ?? 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Vendors</CardTitle>
        <CardDescription>
          Vendors with the highest spending in the selected period.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-5">
          {sortedVendors.map((vendor, index) => {
            const percentage =
              (vendor.amount / maxAmount) * 100;

            return (
              <div key={vendor.vendorId} className="space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                      {index + 1}
                    </span>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {vendor.vendorName}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {vendor.transactionCount} transactions
                      </p>
                    </div>
                  </div>

                  <p className="shrink-0 text-sm font-semibold">
                    {currencyFormatter.format(vendor.amount)}
                  </p>
                </div>

                <div
                  className="h-2 overflow-hidden rounded-full bg-muted"
                  aria-hidden="true"
                >
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}