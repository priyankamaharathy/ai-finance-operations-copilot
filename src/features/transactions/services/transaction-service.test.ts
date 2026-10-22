
import { describe, expect, it } from "vitest";

import { getTransactions } from "./transaction-service";

describe("getTransactions", () => {
  describe("filtering", () => {
    it("filters transactions by search term", async () => {
      const result = await getTransactions(1, 10, {
        search: "AWS",
      });

      expect(result.transactions.length).toBe(2);

      expect(
        result.transactions.every((transaction) =>
          `${transaction.description} ${transaction.vendor} ${transaction.category}`
            .toLowerCase()
            .includes("aws"),
        ),
      ).toBe(true);
    });

    it("filters transactions by status", async () => {
      const result = await getTransactions(1, 10, {
        status: "completed",
      });

      expect(result.transactions.length).toBeGreaterThan(0);

      expect(
        result.transactions.every(
          (transaction) => transaction.status === "completed",
        ),
      ).toBe(true);
    });

    it("filters transactions by category", async () => {
      const result = await getTransactions(1, 10, {
        category: "Software",
      });

      expect(result.transactions.length).toBeGreaterThan(0);

      expect(
        result.transactions.every(
          (transaction) => transaction.category === "Software",
        ),
      ).toBe(true);
    });

    it("combines search, status, and category filters", async () => {
      const result = await getTransactions(1, 10, {
        search: "AWS",
        status: "completed",
        category: "Software",
      });

      expect(result.transactions).toHaveLength(1);
      expect(result.transactions[0].id).toBe("txn_001");
    });

    it("returns no transactions when no records match", async () => {
      const result = await getTransactions(1, 10, {
        search: "nonexistent-company",
      });

      expect(result.transactions).toHaveLength(0);
      expect(result.total).toBe(0);
    });
  });

  describe("sorting", () => {
    it("sorts transactions by amount in ascending order", async () => {
      const result = await getTransactions(1, 20, {
        sortBy: "amount",
        sortDirection: "asc",
      });

      const amounts = result.transactions.map(
        (transaction) => transaction.amount,
      );

      expect(amounts).toEqual([...amounts].sort((a, b) => a - b));
    });

    it("sorts transactions by amount in descending order", async () => {
      const result = await getTransactions(1, 20, {
        sortBy: "amount",
        sortDirection: "desc",
      });

      const amounts = result.transactions.map(
        (transaction) => transaction.amount,
      );

      expect(amounts).toEqual([...amounts].sort((a, b) => b - a));
    });

    it("sorts transactions by vendor alphabetically", async () => {
      const result = await getTransactions(1, 20, {
        sortBy: "vendor",
        sortDirection: "asc",
      });

      const vendors = result.transactions.map(
        (transaction) => transaction.vendor,
      );

      expect(vendors).toEqual(
        [...vendors].sort((a, b) => a.localeCompare(b)),
      );
    });

    it("sorts transactions by date newest first by default", async () => {
      const result = await getTransactions(1, 20, {});

      const dates = result.transactions.map(
        (transaction) => new Date(transaction.date).getTime(),
      );

      expect(dates).toEqual(
        [...dates].sort((a, b) => b - a),
      );
    });
  });

  describe("pagination", () => {
    it("returns the first page of transactions", async () => {
      const result = await getTransactions(1, 10);

      expect(result.transactions).toHaveLength(10);
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(10);
      expect(result.total).toBe(12);
      expect(result.totalPages).toBe(2);
    });

    it("returns the remaining transactions on the second page", async () => {
      const result = await getTransactions(2, 10);

      expect(result.transactions).toHaveLength(2);
      expect(result.page).toBe(2);
      expect(result.totalPages).toBe(2);
    });

    it("does not return duplicate transactions across pages", async () => {
      const firstPage = await getTransactions(1, 10);
      const secondPage = await getTransactions(2, 10);

      const firstPageIds = firstPage.transactions.map(
        (transaction) => transaction.id,
      );

      const secondPageIds = secondPage.transactions.map(
        (transaction) => transaction.id,
      );

      expect(
        firstPageIds.some((id) => secondPageIds.includes(id)),
      ).toBe(false);
    });

    it("returns an empty array for an out-of-range page", async () => {
      const result = await getTransactions(999, 10);

      expect(result.transactions).toHaveLength(0);
      expect(result.total).toBe(12);
      expect(result.totalPages).toBe(2);
    });
  });
});
