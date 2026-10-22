
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TransactionTable } from "./transaction-table";
import type { Transaction } from "../types/transaction";

const mockTransactions: Transaction[] = [
  {
    id: "txn_001",
    date: "2026-09-22",
    description: "AWS Cloud Services",
    vendor: "Amazon Web Services",
    category: "Software",
    amount: 12400,
    type: "expense",
    status: "completed",
    paymentMethod: "Corporate Card",
  },
  {
    id: "txn_002",
    date: "2026-09-20",
    description: "Client Payment",
    vendor: "Acme Corporation",
    category: "Revenue",
    amount: 85000,
    type: "income",
    status: "pending",
    paymentMethod: "Bank Transfer",
  },
];

const defaultProps = {
  transactions: mockTransactions,
  onSelect: vi.fn(),
  onSort: vi.fn(),
};

describe("TransactionTable", () => {
  describe("rendering", () => {
    it("renders transaction descriptions", () => {
      render(<TransactionTable {...defaultProps} />);

      expect(
        screen.getAllByText("AWS Cloud Services"),
      ).toHaveLength(2);

      expect(
        screen.getAllByText("Client Payment"),
      ).toHaveLength(2);
    });

    it("renders vendors and categories", () => {
      render(<TransactionTable {...defaultProps} />);

      expect(
        screen.getAllByText("Amazon Web Services"),
      ).toHaveLength(2);

      expect(
        screen.getAllByText("Acme Corporation"),
      ).toHaveLength(2);

      expect(screen.getAllByText("Software")).toHaveLength(2);
      expect(screen.getAllByText("Revenue")).toHaveLength(2);
    });

    it("renders transaction amounts and statuses", () => {
      render(<TransactionTable {...defaultProps} />);

      expect(screen.getAllByText(/₹12,400/)).toHaveLength(2);
      expect(screen.getAllByText(/₹85,000/)).toHaveLength(2);

      expect(screen.getAllByText("Completed")).toHaveLength(2);
      expect(screen.getAllByText("Pending")).toHaveLength(2);
    });

    it("renders an empty state when there are no transactions", () => {
      render(
        <TransactionTable
          {...defaultProps}
          transactions={[]}
        />,
      );

      expect(
        screen.getAllByText("No transactions found"),
      ).toHaveLength(2);
    });
  });

  describe("sorting", () => {
    it("calls onSort with the date field", async () => {
      const user = userEvent.setup();
      const onSort = vi.fn();

      render(
        <TransactionTable
          {...defaultProps}
          onSort={onSort}
        />,
      );

      await user.click(
        screen.getByRole("button", {
          name: /Sort by date/,
        }),
      );

      expect(onSort).toHaveBeenCalledWith("date");
    });

    it("calls onSort with the vendor field", async () => {
      const user = userEvent.setup();
      const onSort = vi.fn();

      render(
        <TransactionTable
          {...defaultProps}
          onSort={onSort}
        />,
      );

      await user.click(
        screen.getByRole("button", {
          name: /Sort by vendor/,
        }),
      );

      expect(onSort).toHaveBeenCalledWith("vendor");
    });

    it("calls onSort with the amount field", async () => {
      const user = userEvent.setup();
      const onSort = vi.fn();

      render(
        <TransactionTable
          {...defaultProps}
          onSort={onSort}
        />,
      );

      await user.click(
        screen.getByRole("button", {
          name: /Sort by amount/,
        }),
      );

      expect(onSort).toHaveBeenCalledWith("amount");
    });

    it("announces the current sort direction", () => {
      render(
        <TransactionTable
          {...defaultProps}
          sortBy="amount"
          sortDirection="asc"
        />,
      );

      expect(
        screen.getByRole("button", {
          name: /Sort by amount\. Current: Ascending/,
        }),
      ).toBeInTheDocument();
    });
  });

  describe("transaction selection", () => {
    it("selects a transaction when its desktop row is clicked", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      render(
        <TransactionTable
          {...defaultProps}
          onSelect={onSelect}
        />,
      );

      const transactionRows = screen.getAllByRole("button", {
        name: "View transaction AWS Cloud Services",
      });

      await user.click(transactionRows[0]);

      expect(onSelect).toHaveBeenCalledWith(mockTransactions[0]);
      expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it("selects a transaction when its mobile card is clicked", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      render(
        <TransactionTable
          {...defaultProps}
          onSelect={onSelect}
        />,
      );

      const transactionCards = screen.getAllByRole("button", {
        name: "View transaction AWS Cloud Services",
      });

      await user.click(transactionCards[1]);

      expect(onSelect).toHaveBeenCalledWith(mockTransactions[0]);
      expect(onSelect).toHaveBeenCalledTimes(1);
    });
  });

  describe("keyboard accessibility", () => {
    it("makes desktop transaction rows keyboard focusable", () => {
      render(<TransactionTable {...defaultProps} />);

      const transactionRows = screen.getAllByRole("button", {
        name: "View transaction AWS Cloud Services",
      });

      expect(transactionRows[0]).toHaveAttribute("tabindex", "0");
    });

    it("selects a desktop transaction when Enter is pressed", () => {
      const onSelect = vi.fn();

      render(
        <TransactionTable
          {...defaultProps}
          onSelect={onSelect}
        />,
      );

      const transactionRows = screen.getAllByRole("button", {
        name: "View transaction AWS Cloud Services",
      });

      fireEvent.keyDown(transactionRows[0], {
        key: "Enter",
      });

      expect(onSelect).toHaveBeenCalledWith(mockTransactions[0]);
    });

    it("selects a desktop transaction when Space is pressed", () => {
      const onSelect = vi.fn();

      render(
        <TransactionTable
          {...defaultProps}
          onSelect={onSelect}
        />,
      );

      const transactionRows = screen.getAllByRole("button", {
        name: "View transaction AWS Cloud Services",
      });

      fireEvent.keyDown(transactionRows[0], {
        key: " ",
      });

      expect(onSelect).toHaveBeenCalledWith(mockTransactions[0]);
    });
  });
});