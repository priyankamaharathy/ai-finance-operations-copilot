"use client";

import { useEffect, useMemo, useState } from "react";

import {usePathname, useRouter, useSearchParams,} from "next/navigation";

import { TransactionDetails } from "@/features/transactions/components/transaction-details";
import { TransactionFilters } from "@/features/transactions/components/transaction-filters";
import { TransactionTable } from "@/features/transactions/components/transaction-table";
import { useTransactions } from "@/features/transactions/hooks/use-transactions";
import { Pagination } from "@/components/shared/pagination";

import type {SortDirection, Transaction, TransactionFilters as TransactionFilterValues, TransactionSortField, TransactionStatus,} from "@/features/transactions/types/transaction";

export default function TransactionsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const requestedPage = Number(
    searchParams.get("page"),
  );

  const page =
    Number.isInteger(requestedPage) &&
      requestedPage > 0
      ? requestedPage
      : 1;

  const filters = useMemo<TransactionFilterValues>(
    () => ({
      search: searchParams.get("search") ?? "",
      status:
        (searchParams.get("status") as
          | TransactionStatus
          | "all"
          | null) ?? "all",
      category:
        searchParams.get("category") ?? "all",
      sortBy:
        (searchParams.get("sortBy") as
          | TransactionSortField
          | undefined) ?? "date",
      sortDirection:
        (searchParams.get("sortDirection") as
          | SortDirection
          | undefined) ?? "desc",
    }),
    [searchParams],
  );

  const {
    data,
    isLoading,
    isError,
  } = useTransactions(page, filters);

  useEffect(() => {
  if (!data || page <= data.totalPages) {
    return;
  }
  updateUrl({
    page: String(data.totalPages),
  });
}, [data, page]);

  const updateUrl = (
    updates: Record<string, string | null>,
  ) => {
    const params = new URLSearchParams(
      searchParams.toString(),
    );

    Object.entries(updates).forEach(
      ([key, value]) => {
        if (
          value === null ||
          value === "" ||
          value === "all" ||
          (key === "page" && value === "1")
        ) {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      },
    );

    router.push(
      `${pathname}?${params.toString()}`,
    );
  };

  const handleFiltersChange = (
    nextFilters: TransactionFilterValues,
  ) => {
    updateUrl({
      search: nextFilters.search ?? null,
      status: nextFilters.status ?? "all",
      category: nextFilters.category ?? "all",
      page: "1",
    });
  };

  const handlePageChange = (nextPage: number) => {
  if (!data) {
    return;
  }
 if (nextPage < 1 || nextPage > data.totalPages) {
    return;
  }
  updateUrl({
    page: String(nextPage),
  });
};

  const handleSelectTransaction = (
    transaction: Transaction,
  ) => {
    setSelectedTransaction(transaction);
  };

  const handleSort = (
    field: TransactionSortField,
  ) => {
    const currentField = filters.sortBy ?? "date";

    const currentDirection =
      filters.sortDirection ?? "desc";

    const nextDirection =
      currentField === field &&
        currentDirection === "asc"
        ? "desc"
        : "asc";

    updateUrl({
      sortBy: field,
      sortDirection: nextDirection,
      page: "1",
    });
  };
  const handleClearFilters = () => {
    updateUrl({
      search: null,
      status: null,
      category: null,
      page: "1",
    });
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Transactions
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage and explore financial transactions.
        </p>
      </div>

      <TransactionFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />

      {isLoading ? (
        <div
          className="h-96 animate-pulse rounded-xl border bg-muted/30"
          aria-label="Loading transactions"
        />
      ) : null}

      {isError ? (
        <div
          role="alert"
          className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm"
        >
          Unable to load transactions.
        </div>
      ) : null}

      {data ? (
        <>
          <TransactionTable
            transactions={data.transactions}
            onSelect={handleSelectTransaction}
            sortBy={filters.sortBy}
            sortDirection={filters.sortDirection}
            onSort={handleSort}
          />
          <Pagination
            page={data.page}
            totalPages={data.totalPages}
            total={data.total}
            pageSize={data.pageSize}
            onPageChange={handlePageChange}
          />
        </>
      ) : null}

      <TransactionDetails
        transaction={selectedTransaction}
        open={selectedTransaction !== null}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedTransaction(null);
          }
        }}
      />
    </div>
  );
}