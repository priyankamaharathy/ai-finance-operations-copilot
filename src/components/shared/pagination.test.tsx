
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Pagination } from "./pagination";

const defaultProps = {
    page: 1,
    totalPages: 2,
    total: 12,
    pageSize: 10,
    onPageChange: vi.fn(),
};

describe("Pagination", () => {
    it("displays the correct item range", () => {
        render(<Pagination {...defaultProps} />);

        expect(
            screen.getByText(/Showing/),
        ).toHaveTextContent("Showing 1–10 of 12");
    });

    it("displays the current page and total pages", () => {
        render(<Pagination {...defaultProps} />);

        expect(
            screen.getByText(/^Page/),
        ).toHaveTextContent("Page 1 of 2");
    });
    
    it("calls onPageChange with the next page", async () => {
        const user = userEvent.setup();
        const onPageChange = vi.fn();

        render(
            <Pagination
                {...defaultProps}
                onPageChange={onPageChange}
            />,
        );

        await user.click(
            screen.getByRole("button", {
                name: "Go to next page",
            }),
        );

        expect(onPageChange).toHaveBeenCalledWith(2);
    });

    it("calls onPageChange with the previous page", async () => {
        const user = userEvent.setup();
        const onPageChange = vi.fn();

        render(
            <Pagination
                {...defaultProps}
                page={2}
                onPageChange={onPageChange}
            />,
        );

        await user.click(
            screen.getByRole("button", {
                name: "Go to previous page",
            }),
        );

        expect(onPageChange).toHaveBeenCalledWith(1);
    });

    it("disables the previous button on the first page", () => {
        render(<Pagination {...defaultProps} page={1} />);

        expect(
            screen.getByRole("button", {
                name: "Go to previous page",
            }),
        ).toBeDisabled();
    });

    it("disables the next button on the last page", () => {
        render(
            <Pagination
                {...defaultProps}
                page={2}
                totalPages={2}
            />,
        );

        expect(
            screen.getByRole("button", {
                name: "Go to next page",
            }),
        ).toBeDisabled();
    });

    it("does not render when there are no transactions", () => {
        render(
            <Pagination
                {...defaultProps}
                total={0}
            />,
        );

        expect(
            screen.queryByRole("navigation", {
                name: "Transactions pagination",
            }),
        ).not.toBeInTheDocument();
    });
});
