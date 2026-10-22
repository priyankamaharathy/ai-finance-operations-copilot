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
  
const sortBy = filters.sortBy ?? "date";
const sortDirection = filters.sortDirection ?? "desc";
filteredTransactions.sort((a, b) => {
  let comparison = 0;

  switch (sortBy) {
    case "amount":
      comparison = a.amount - b.amount;
      break;

    case "vendor":
      comparison = a.vendor.localeCompare(b.vendor);
      break;

    case "date":
    default:
      comparison =
        new Date(a.date).getTime() -
        new Date(b.date).getTime();
      break;
  }

  return sortDirection === "asc" ? comparison : -comparison;
});

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