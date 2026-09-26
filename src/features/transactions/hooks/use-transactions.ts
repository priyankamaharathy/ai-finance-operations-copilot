"use client";

import { useQuery } from "@tanstack/react-query";

import { getTransactions } from "../services/transaction-service";

import type { TransactionFilters } from "../types/transaction";

export function useTransactions(
  page: number,
  filters: TransactionFilters,
) {
  return useQuery({
    queryKey: [
      "transactions",
      page,
      filters,
    ],
    queryFn: () =>
      getTransactions(
        page,
        10,
        filters,
      ),
    staleTime: 1000 * 60 * 5,
  });
}