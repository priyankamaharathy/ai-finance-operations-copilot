
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TransactionsPage from "./page";
import { useTransactions } from "@/features/transactions/hooks/use-transactions";
import type {
  Transaction,
  TransactionResponse,
} from "@/features/transactions/types/transaction";

const { mockNavigation, mockUseTransactions } = vi.hoisted(() => ({
  mockNavigation: {
    push: vi.fn(),
    search: "",
  },
  mockUseTransactions: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockNavigation.push,
  }),
  usePathname: () => "/transactions",
  useSearchParams: () => new URLSearchParams(mockNavigation.search),
}));

vi.mock("@/features/transactions/hooks/use-transactions", () => ({
  useTransactions: mockUseTransactions,
}));

vi.mock(
  "@/features/transactions/components/transaction-details",
  () => ({
    TransactionDetails: ({
      transaction,
      open,
      onOpenChange,
    }: {
      transaction: Transaction | null;
      open: boolean;
      onOpenChange: (open: boolean) => void;
    }) =>
      open && transaction ? (
        <div role="dialog" aria-label="Transaction details">
          <p>{transaction.description}</p>
          <button onClick={() => onOpenChange(false)}>
            Close details
          </button>
        </div>
      ) : null,
  }),
);

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

const mockResponse: TransactionResponse = {
  transactions: mockTransactions,
  total: 12,
  page: 1,
  pageSize: 10,
  totalPages: 2,
};

function mockSuccessfulQuery(
  overrides = {},
) {
  mockUseTransactions.mockReturnValue({
    data: mockResponse,
    isLoading: false,
    isError: false,
    isPlaceholderData: false,
    ...overrides,
  });
}

describe("TransactionsPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigation.search = "";
  });

  describe("loading, success and error states", () => {
    it("displays the loading skeleton while fetching transactions", () => {
      mockUseTransactions.mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
        isPlaceholderData: false,
      });

      render(<TransactionsPage />);

      expect(
        screen.getByRole("status", {
          name: "Loading transactions",
        }),
      ).toBeInTheDocument();
    });

    it("renders transactions after a successful request", () => {
      mockSuccessfulQuery();

      render(<TransactionsPage />);

      expect(
        screen.getAllByText("AWS Cloud Services"),
      ).toHaveLength(2);

      expect(
        screen.getAllByText("Client Payment"),
      ).toHaveLength(2);

      expect(
        screen.getByRole("navigation", {
          name: "Transactions pagination",
        }),
      ).toBeInTheDocument();
    });

    it("displays an error message when fetching fails", () => {
      mockUseTransactions.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
        isPlaceholderData: false,
      });

      render(<TransactionsPage />);

      expect(screen.getByRole("alert")).toHaveTextContent(
        "Unable to load transactions.",
      );
    });
  });

  describe("URL synchronization", () => {
    it("updates the URL when searching transactions", () => {
      mockSuccessfulQuery();

      render(<TransactionsPage />);

      fireEvent.change(
        screen.getByRole("textbox", {
          name: "Search transactions",
        }),
        {
          target: { value: "AWS" },
        },
      );

      expect(mockNavigation.push).toHaveBeenCalledWith(
        "/transactions?search=AWS",
      );
    });

    it("updates the URL when filtering by status", () => {
      mockNavigation.search = "search=AWS&sortBy=amount&sortDirection=desc&page=2";
      mockSuccessfulQuery();

      render(<TransactionsPage />);

      fireEvent.change(
        screen.getByRole("combobox", {
          name: "Filter by transaction status",
        }),
        {
          target: { value: "pending" },
        },
      );

      expect(mockNavigation.push).toHaveBeenCalledWith(
        "/transactions?search=AWS&sortBy=amount&sortDirection=desc&status=pending",
      );
    });

    it("clears filters while preserving sorting parameters", async () => {
      const user = userEvent.setup();

      mockNavigation.search =
        "search=AWS&status=completed&category=Software&sortBy=amount&sortDirection=desc&page=2";

      mockSuccessfulQuery();

      render(<TransactionsPage />);

      await user.click(
        screen.getByRole("button", {
          name: /Clear filters/i,
        }),
      );

      expect(mockNavigation.push).toHaveBeenCalledWith(
        "/transactions?sortBy=amount&sortDirection=desc",
      );
    });
  });

  describe("sorting and pagination", () => {
    it("updates sorting parameters and resets the page", async () => {
      const user = userEvent.setup();

      mockNavigation.search =
        "status=completed&sortBy=date&sortDirection=desc&page=2";

      mockSuccessfulQuery();

      render(<TransactionsPage />);

      await user.click(
        screen.getByRole("button", {
          name: /Sort by vendor/,
        }),
      );

      expect(mockNavigation.push).toHaveBeenCalledWith(
        "/transactions?status=completed&sortBy=vendor&sortDirection=asc",
      );
    });

    it("updates the URL when moving to the next page", async () => {
      const user = userEvent.setup();

      mockSuccessfulQuery();

      render(<TransactionsPage />);

      await user.click(
        screen.getByRole("button", {
          name: "Go to next page",
        }),
      );

      expect(mockNavigation.push).toHaveBeenCalledWith(
        "/transactions?page=2",
      );
    });

    it("passes URL page and filters to the transactions hook", () => {
      mockNavigation.search =
        "page=2&search=AWS&status=completed&category=Software&sortBy=amount&sortDirection=asc";

      mockSuccessfulQuery();

      render(<TransactionsPage />);

      expect(useTransactions).toHaveBeenCalledWith(2, {
        search: "AWS",
        status: "completed",
        category: "Software",
        sortBy: "amount",
        sortDirection: "asc",
      });
    });
  });

  describe("transaction selection", () => {
    it("opens transaction details when a transaction is selected", async () => {
      const user = userEvent.setup();

      mockSuccessfulQuery();

      render(<TransactionsPage />);

      const transactionRows = screen.getAllByRole("button", {
        name: "View transaction AWS Cloud Services",
      });

      await user.click(transactionRows[0]);

      expect(
        screen.getByRole("dialog", {
          name: "Transaction details",
        }),
      ).toBeInTheDocument();

      expect(
        screen.getByRole("dialog"),
      ).toHaveTextContent("AWS Cloud Services");
    });

    it("closes transaction details when the close action is triggered", async () => {
      const user = userEvent.setup();

      mockSuccessfulQuery();

      render(<TransactionsPage />);

      const transactionRows = screen.getAllByRole("button", {
        name: "View transaction AWS Cloud Services",
      });

      await user.click(transactionRows[0]);

      expect(
        screen.getByRole("dialog"),
      ).toBeInTheDocument();

      await user.click(
        screen.getByRole("button", {
          name: "Close details",
        }),
      );

      expect(
        screen.queryByRole("dialog"),
      ).not.toBeInTheDocument();
    });
  });
});
