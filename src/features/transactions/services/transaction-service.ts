import { transactions } from "../api/mock-transactions";

import type {
  TransactionFilters,
  TransactionResponse,
} from "../types/transaction";

export async function getTransactions(
  page = 1,
  pageSize = 10,
  filters: TransactionFilters = {},
): Promise<TransactionResponse> {
  await new Promise((resolve) =>
    setTimeout(resolve, 400),
  );

  let filteredTransactions = [...transactions];

  if (filters.search) {
    const search = filters.search.toLowerCase();

    filteredTransactions =
      filteredTransactions.filter((transaction) =>
        [
          transaction.description,
          transaction.vendor,
          transaction.category,
        ].some((value) =>
          value.toLowerCase().includes(search),
        ),
      );
  }

  if (
    filters.status &&
    filters.status !== "all"
  ) {
    filteredTransactions =
      filteredTransactions.filter(
        (transaction) =>
          transaction.status === filters.status,
      );
  }

  if (
    filters.category &&
    filters.category !== "all"
  ) {
    filteredTransactions =
      filteredTransactions.filter(
        (transaction) =>
          transaction.category === filters.category,
      );
  }
  
  filteredTransactions.sort(
  (a, b) =>
    new Date(b.date).getTime() -
    new Date(a.date).getTime(),
);

  const total = filteredTransactions.length;

  const totalPages = Math.max(
    1,
    Math.ceil(total / pageSize),
  );

  const startIndex = (page - 1) * pageSize;

  const paginatedTransactions =
    filteredTransactions.slice(
      startIndex,
      startIndex + pageSize,
    );

  return {
    transactions: paginatedTransactions,
    total,
    page,
    pageSize,
    totalPages,
  };
}