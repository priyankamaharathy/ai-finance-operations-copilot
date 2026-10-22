
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { TransactionFilters } from "./transaction-filters";

describe("TransactionFilters", () => {
  const defaultFilters = {
    search: "",
    status: "all" as const,
    category: "all",
  };

  it("renders search and filter controls", () => {
    render(
      <TransactionFilters
        filters={defaultFilters}
        onFiltersChange={vi.fn()}
        onClearFilters={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("textbox", {
        name: /search transactions/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("combobox", {
        name: /filter by transaction status/i,
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("combobox", {
        name: /filter by transaction category/i,
      }),
    ).toBeInTheDocument();
  });

  it("calls onFiltersChange when searching", async () => {
    const user = userEvent.setup();
    const onFiltersChange = vi.fn();

    render(
      <TransactionFilters
        filters={defaultFilters}
        onFiltersChange={onFiltersChange}
        onClearFilters={vi.fn()}
      />,
    );

    await user.type(
      screen.getByRole("textbox", {
        name: /search transactions/i,
      }),
      "AWS",
    );

    expect(onFiltersChange).toHaveBeenLastCalledWith({
      ...defaultFilters,
      search: "S",
    });
  });

  it("calls onFiltersChange when status changes", async () => {
    const user = userEvent.setup();
    const onFiltersChange = vi.fn();

    render(
      <TransactionFilters
        filters={defaultFilters}
        onFiltersChange={onFiltersChange}
        onClearFilters={vi.fn()}
      />,
    );

    await user.selectOptions(
      screen.getByRole("combobox", {
        name: /filter by transaction status/i,
      }),
      "completed",
    );

    expect(onFiltersChange).toHaveBeenCalledWith({
      ...defaultFilters,
      status: "completed",
    });
  });

  it("calls onFiltersChange when category changes", async () => {
    const user = userEvent.setup();
    const onFiltersChange = vi.fn();

    render(
      <TransactionFilters
        filters={defaultFilters}
        onFiltersChange={onFiltersChange}
        onClearFilters={vi.fn()}
      />,
    );

    await user.selectOptions(
      screen.getByRole("combobox", {
        name: /filter by transaction category/i,
      }),
      "Software",
    );

    expect(onFiltersChange).toHaveBeenCalledWith({
      ...defaultFilters,
      category: "Software",
    });
  });

  it("disables Clear filters when no filters are active", () => {
    render(
      <TransactionFilters
        filters={defaultFilters}
        onFiltersChange={vi.fn()}
        onClearFilters={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: /clear filters/i }),
    ).toBeDisabled();
  });

  it("enables Clear filters when filters are active", () => {
    render(
      <TransactionFilters
        filters={{
          search: "AWS",
          status: "completed",
          category: "Software",
        }}
        onFiltersChange={vi.fn()}
        onClearFilters={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("button", { name: /clear filters/i }),
    ).toBeEnabled();
  });

  it("calls onClearFilters when clicked", async () => {
    const user = userEvent.setup();
    const onClearFilters = vi.fn();

    render(
      <TransactionFilters
        filters={{
          search: "AWS",
          status: "completed",
          category: "Software",
        }}
        onFiltersChange={vi.fn()}
        onClearFilters={onClearFilters}
      />,
    );

    await user.click(
      screen.getByRole("button", { name: /clear filters/i }),
    );

    expect(onClearFilters).toHaveBeenCalledTimes(1);
  });
});
