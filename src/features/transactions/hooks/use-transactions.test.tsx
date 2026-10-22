
import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

import { useTransactions } from "./use-transactions";
import { getTransactions } from "../services/transaction-service";
import type { TransactionFilters, TransactionResponse } from "../types/transaction";

vi.mock("../services/transaction-service", () => ({
  getTransactions: vi.fn(),
}));

const mockResponse: TransactionResponse = {
  transactions: [],
  total: 12,
  page: 1,
  pageSize: 10,
  totalPages: 2,
};

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };
}

describe("useTransactions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns a loading state while fetching transactions", () => {
    vi.mocked(getTransactions).mockReturnValue(
      new Promise(() => {}),
    );

    const { result } = renderHook(
      () => useTransactions(1, {}),
      { wrapper: createWrapper() },
    );

    expect(result.current.isLoading).toBe(true);
    expect(result.current.isPending).toBe(true);
  });

  it("returns transaction data after a successful request", async () => {
    vi.mocked(getTransactions).mockResolvedValue(mockResponse);

    const { result } = renderHook(
      () => useTransactions(1, {}),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockResponse);
    expect(getTransactions).toHaveBeenCalledWith(1, 10, {});
  });

  it("exposes an error when the request fails", async () => {
    const error = new Error("Failed to fetch transactions");

    vi.mocked(getTransactions).mockRejectedValue(error);

    const { result } = renderHook(
      () => useTransactions(1, {}),
      { wrapper: createWrapper() },
    );

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toEqual(error);
  });

  it("refetches transactions when filters change", async () => {
    vi.mocked(getTransactions).mockResolvedValue(mockResponse);

    const initialFilters: TransactionFilters = {};
    const updatedFilters: TransactionFilters = {
      search: "AWS",
      status: "completed",
    };

    const { result, rerender } = renderHook(
      ({ filters }) => useTransactions(1, filters),
      {
        initialProps: {
          filters: initialFilters,
        },
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    rerender({
      filters: updatedFilters,
    });

    await waitFor(() => {
      expect(getTransactions).toHaveBeenLastCalledWith(
        1,
        10,
        updatedFilters,
      );
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(getTransactions).toHaveBeenCalledTimes(2);
  });

  it("uses a different query when the page changes", async () => {
    vi.mocked(getTransactions).mockResolvedValue({
      ...mockResponse,
      page: 1,
    });

    const { result, rerender } = renderHook(
      ({ page }) => useTransactions(page, {}),
      {
        initialProps: {
          page: 1,
        },
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    rerender({ page: 2 });

    await waitFor(() => {
      expect(getTransactions).toHaveBeenLastCalledWith(
        2,
        10,
        {},
      );
    });

    expect(getTransactions).toHaveBeenCalledTimes(2);
  });
});
