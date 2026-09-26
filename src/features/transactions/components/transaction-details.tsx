"use client";

import { CalendarDays, CreditCard, Tag, UserRound, LucideIcon,} from "lucide-react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle,} from "@/components/ui/sheet";

import type { Transaction } from "../types/transaction";
import { TransactionStatusBadge } from "./transaction-status";

interface TransactionDetailsProps {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export function TransactionDetails({
  transaction,
  open,
  onOpenChange,
}: TransactionDetailsProps) {
  if (!transaction) {
    return null;
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Transaction Details</SheetTitle>

          <SheetDescription>
            Review the details of this financial transaction.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-8 space-y-8">
          <div className="rounded-xl border bg-muted/30 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Amount
                </p>

                <p className="mt-1 text-3xl font-semibold tracking-tight">
                  {transaction.type === "income"
                    ? "+"
                    : "-"}
                  {currencyFormatter.format(
                    transaction.amount,
                  )}
                </p>
              </div>

              <TransactionStatusBadge
                status={transaction.status}
              />
            </div>
          </div>

          <div className="space-y-5">
            <DetailRow
              icon={CalendarDays}
              label="Date"
              value={dateFormatter.format(
                new Date(transaction.date),
              )}
            />

            <DetailRow
              icon={UserRound}
              label="Vendor"
              value={transaction.vendor}
            />

            <DetailRow
              icon={Tag}
              label="Category"
              value={transaction.category}
            />

            <DetailRow
              icon={CreditCard}
              label="Payment method"
              value={transaction.paymentMethod}
            />
          </div>

          <div className="border-t pt-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Description
            </p>

            <p className="mt-2 text-sm">
              {transaction.description}
            </p>
          </div>

          <div className="border-t pt-5">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Transaction ID
            </p>

            <p className="mt-2 font-mono text-xs text-muted-foreground">
              {transaction.id}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

interface DetailRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: DetailRowProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon
          className="size-4 text-muted-foreground"
          aria-hidden="true"
        />
      </div>

      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}