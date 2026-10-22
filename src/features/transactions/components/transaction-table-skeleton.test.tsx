
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { TransactionTableSkeleton } from "./transaction-table-skeleton";

describe("TransactionTableSkeleton", () => {
  it("renders the loading status", () => {
    render(<TransactionTableSkeleton />);

    expect(
      screen.getByRole("status", {
        name: "Loading transactions",
      }),
    ).toBeInTheDocument();
  });

  it("sets aria-busy to true while loading", () => {
    render(<TransactionTableSkeleton />);

    expect(
      screen.getByRole("status"),
    ).toHaveAttribute("aria-busy", "true");
  });

  it("renders an accessible loading message", () => {
    render(<TransactionTableSkeleton />);

    expect(
      screen.getByText("Loading transactions..."),
    ).toBeInTheDocument();
  });

 
it("renders five desktop skeleton rows", () => {
  const { container } = render(
    <TransactionTableSkeleton />,
  );

  const desktopSkeleton = container.querySelector(
    ".hidden.md\\:block",
  );

  expect(desktopSkeleton).toBeInTheDocument();

  const transactionRows = desktopSkeleton?.querySelectorAll(
    ".border-b.px-4.py-5",
  );

  expect(transactionRows).toHaveLength(5);
});

  it("renders four mobile skeleton cards", () => {
    const { container } = render(
      <TransactionTableSkeleton />,
    );

    const mobileSkeleton = container.querySelector(
      ".space-y-2.md\\:hidden",
    );

    expect(mobileSkeleton).toBeInTheDocument();
    expect(mobileSkeleton?.children).toHaveLength(4);
  });

  it("hides decorative skeleton elements from assistive technology", () => {
    const { container } = render(
      <TransactionTableSkeleton />,
    );

    const skeletonElements = container.querySelectorAll(
      '[aria-hidden="true"]',
    );

    expect(skeletonElements.length).toBeGreaterThan(0);
  });
});
