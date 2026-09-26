"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import type {
  SortDirection,
  Transaction,
  TransactionSortField,
} from "../types/transaction";

import { TransactionStatusBadge } from "./transaction-status";

interface TransactionTableProps {
  transactions: Transaction[];
  onSelect: (transaction: Transaction) => void;
  sortBy?: TransactionSortField;
  sortDirection?: SortDirection;
  onSort: (field: TransactionSortField) => void;
}

const currencyFormatter = new Intl.NumberFormat(
  "en-IN",
  {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  },
);

const dateFormatter = new Intl.DateTimeFormat(
  "en-IN",
  {
    day: "2-digit",
    month: "short",
    year: "numeric",
  },
);

const getSortLabel = (
  field: TransactionSortField,
  sortBy?: TransactionSortField,
  sortDirection?: SortDirection,
) => {
  if (sortBy !== field) {
    return "Not sorted";
  }

  return sortDirection === "asc"
    ? "Ascending"
    : "Descending";
};

export function TransactionTable({
  transactions,
  onSelect,
  sortBy,
  sortDirection,
  onSort,
}: TransactionTableProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
  <button
    type="button"
    onClick={() => onSort("date")}
    className="inline-flex items-center gap-1 hover:text-foreground"
    aria-label={`Sort by date. Current: ${getSortLabel(
      "date",
      sortBy,
      sortDirection,
    )}`}
  >
    Date
    <span aria-hidden="true">
      {sortBy === "date"
        ? sortDirection === "asc"
          ? "↑"
          : "↓"
        : "↕"}
    </span>
  </button>
</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Description
                </th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
  <button
    type="button"
    onClick={() => onSort("vendor")}
    className="inline-flex items-center gap-1 hover:text-foreground"
    aria-label={`Sort by vendor. Current: ${getSortLabel(
      "vendor",
      sortBy,
      sortDirection,
    )}`}
  >
    Vendor
    <span aria-hidden="true">
      {sortBy === "vendor"
        ? sortDirection === "asc"
          ? "↑"
          : "↓"
        : "↕"}
    </span>
  </button>
</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Category
                </th>
  <th className="px-4 py-3 text-right font-medium text-muted-foreground">
  <button
    type="button"
    onClick={() => onSort("amount")}
    className="inline-flex items-center gap-1 hover:text-foreground"
    aria-label={`Sort by amount. Current: ${getSortLabel(
      "amount",
      sortBy,
      sortDirection,
    )}`}
  >
    Amount
    <span aria-hidden="true">
      {sortBy === "amount"
        ? sortDirection === "asc"
          ? "↑"
          : "↓"
        : "↕"}
    </span>
  </button>
</th>
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((transaction) => {
                const isIncome =
                  transaction.type === "income";

                return (
                  <tr
                    key={transaction.id}
                    tabIndex={0}
                    role="button"
                    aria-label={`View transaction ${transaction.description}`}
                    className="cursor-pointer border-b transition-colors hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                    onClick={() => onSelect(transaction)}
                    onKeyDown={(event) => {
                      if (
                        event.key === "Enter" ||
                        event.key === " "
                      ) {
                        event.preventDefault();
                        onSelect(transaction);
                      }
                    }}>
                      
                    <td className="whitespace-nowrap px-4 py-4 text-muted-foreground">
                      {dateFormatter.format(
                        new Date(transaction.date),
                      )}
                    </td>

                    <td className="px-4 py-4">
                      <p className="font-medium">
                        {transaction.description}
                      </p>
                    </td>

                    <td className="px-4 py-4 text-muted-foreground">
                      {transaction.vendor}
                    </td>

                    <td className="px-4 py-4 text-muted-foreground">
                      {transaction.category}
                    </td>

                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 font-medium">
                        {isIncome ? (
                          <ArrowUpRight
                            className="size-4"
                            aria-hidden="true"
                          />
                        ) : (
                          <ArrowDownRight
                            className="size-4"
                            aria-hidden="true"
                          />
                        )}

                        {currencyFormatter.format(
                          transaction.amount,
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <TransactionStatusBadge
                        status={transaction.status}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {transactions.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm font-medium">
              No transactions found
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}