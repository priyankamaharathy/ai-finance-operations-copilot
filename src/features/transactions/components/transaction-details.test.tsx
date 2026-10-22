
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TransactionDetails } from "./transaction-details";
import type { Transaction } from "../types/transaction";

const mockTransaction: Transaction = {
    id: "txn_001",
    date: "2026-09-22",
    description: "AWS Cloud Services",
    vendor: "Amazon Web Services",
    category: "Software",
    amount: 12400,
    type: "expense",
    status: "completed",
    paymentMethod: "Corporate Card",
};

const defaultProps = {
    transaction: mockTransaction,
    open: true,
    onOpenChange: vi.fn(),
};

describe("TransactionDetails", () => {
    describe("rendering", () => {
        it("renders the transaction details sheet", () => {
            render(<TransactionDetails {...defaultProps} />);

            expect(
                screen.getByRole("dialog"),
            ).toBeInTheDocument();

            expect(
                screen.getByText("Transaction Details"),
            ).toBeInTheDocument();

            expect(
                screen.getByText(
                    "Review the details of this financial transaction.",
                ),
            ).toBeInTheDocument();
        });

        it("renders the transaction amount", () => {
            render(<TransactionDetails {...defaultProps} />);

            expect(
                screen.getByText("-₹12,400"),
            ).toBeInTheDocument();
        });

        it("renders the transaction information", () => {
            render(<TransactionDetails {...defaultProps} />);

            expect(
                screen.getByText("22 September 2026"),
            ).toBeInTheDocument();

            expect(
                screen.getByText("Amazon Web Services"),
            ).toBeInTheDocument();

            expect(
                screen.getByText("Software"),
            ).toBeInTheDocument();

            expect(
                screen.getByText("Corporate Card"),
            ).toBeInTheDocument();

            expect(
                screen.getByText("AWS Cloud Services"),
            ).toBeInTheDocument();

            expect(
                screen.getByText("txn_001"),
            ).toBeInTheDocument();
        });

        it("renders the transaction status", () => {
            render(<TransactionDetails {...defaultProps} />);

            expect(
                screen.getByText("Completed"),
            ).toBeInTheDocument();
        });

        it("renders an income amount with a positive sign", () => {
            const incomeTransaction: Transaction = {
                ...mockTransaction,
                type: "income",
                amount: 85000,
                status: "pending",
            };

            render(
                <TransactionDetails
                    {...defaultProps}
                    transaction={incomeTransaction}
                />,
            );

            expect(
                screen.getByText("+₹85,000"),
            ).toBeInTheDocument();

            expect(
                screen.getByText("Pending"),
            ).toBeInTheDocument();
        });

        it.each([
            ["completed", "Completed"],
            ["pending", "Pending"],
            ["failed", "Failed"],
        ] as const)(
            "renders the %s status correctly",
            (status, label) => {
                render(
                    <TransactionDetails
                        {...defaultProps}
                        transaction={{
                            ...mockTransaction,
                            status,
                        }}
                    />,
                );

                expect(
                    screen.getByText(label),
                ).toBeInTheDocument();
            },
        );
    });

    describe("visibility", () => {
        it("does not render when transaction is null", () => {
            render(
                <TransactionDetails
                    {...defaultProps}
                    transaction={null}
                />,
            );

            expect(
                screen.queryByRole("dialog"),
            ).not.toBeInTheDocument();
        });

        it("does not show the sheet when open is false", () => {
            render(
                <TransactionDetails
                    {...defaultProps}
                    open={false}
                />,
            );

            expect(
                screen.queryByRole("dialog"),
            ).not.toBeInTheDocument();
        });
    });

    describe("closing behavior", () => {
        it("calls onOpenChange with false when the close button is clicked", async () => {
            const user = userEvent.setup();
            const onOpenChange = vi.fn();

            render(
                <TransactionDetails
                    {...defaultProps}
                    onOpenChange={onOpenChange}
                />,
            );

            await user.click(
                screen.getByRole("button", { name: /close/i }),
            );

            expect(onOpenChange).toHaveBeenCalled();
            expect(onOpenChange.mock.calls[0][0]).toBe(false);
        });

        it("calls onOpenChange with false when Escape is pressed", async () => {
            const user = userEvent.setup();
            const onOpenChange = vi.fn();

            render(
                <TransactionDetails
                    {...defaultProps}
                    onOpenChange={onOpenChange}
                />,
            );

            await user.keyboard("{Escape}");

            expect(onOpenChange).toHaveBeenCalled();
            expect(onOpenChange.mock.calls[0][0]).toBe(false);
        });
    });
});
