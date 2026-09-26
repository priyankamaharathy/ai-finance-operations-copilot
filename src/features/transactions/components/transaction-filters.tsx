"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import type {
  TransactionFilters as TransactionFilterValues,
  TransactionStatus,
} from "../types/transaction";

interface TransactionFiltersProps {
  filters: TransactionFilterValues;
  onFiltersChange: (
    filters: TransactionFilterValues,
  ) => void;
}

const statuses: {
  label: string;
  value: TransactionStatus | "all";
}[] = [
  { label: "All statuses", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
  { label: "Failed", value: "failed" },
];

const categories = [
  "all",
  "Software",
  "Travel",
  "Office",
  "Food",
  "Revenue",
];

export function TransactionFilters({
  filters,
  onFiltersChange,
}: TransactionFiltersProps) {
  return (
    <div className="flex flex-col gap-3 md:flex-row">
      <div className="relative flex-1">
        <Search
          className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />

        <Input
          value={filters.search ?? ""}
          onChange={(event) =>
            onFiltersChange({
              ...filters,
              search: event.target.value,
            })
          }
          placeholder="Search transactions..."
          className="pl-9"
          aria-label="Search transactions"
        />
      </div>

      <select
        value={filters.status ?? "all"}
        onChange={(event) =>
          onFiltersChange({
            ...filters,
            status: event.target
              .value as TransactionStatus | "all",
          })
        }
        className="h-10 rounded-md border bg-background px-3 text-sm"
        aria-label="Filter by transaction status"
      >
        {statuses.map((status) => (
          <option
            key={status.value}
            value={status.value}
          >
            {status.label}
          </option>
        ))}
      </select>

      <select
        value={filters.category ?? "all"}
        onChange={(event) =>
          onFiltersChange({
            ...filters,
            category: event.target.value,
          })
        }
        className="h-10 rounded-md border bg-background px-3 text-sm"
        aria-label="Filter by transaction category"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category === "all"
              ? "All categories"
              : category}
          </option>
        ))}
      </select>
    </div>
  );
}