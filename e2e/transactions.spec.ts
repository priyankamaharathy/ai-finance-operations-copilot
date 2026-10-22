
import { test, expect } from "@playwright/test";

test("should load the Transactions page and display data", async ({ page }) => {
  page.on("console", (message) => {
    if (message.type() === "error") {
      console.log("BROWSER CONSOLE ERROR:", message.text());
    }
  });

  page.on("pageerror", (error) => {
    console.log("BROWSER PAGE ERROR:", error.message);
  });

  await page.goto("/transactions");

  await expect(
    page.getByRole("heading", { name: "Transactions" })
  ).toBeVisible();

  await expect(
    page.getByRole("textbox", { name: "Search transactions" })
  ).toBeVisible();

  await expect(
    page.getByText("AWS Cloud Services").first()
  ).toBeVisible();

  await expect(
    page.getByText("Showing 1–10 of 12")
  ).toBeVisible();
});

test("should filter transactions by search query", async ({ page }) => {
  await page.goto("/transactions");

  const searchInput = page.getByRole("textbox", {
    name: "Search transactions",
  });

  await searchInput.fill("AWS");

  await expect(
    page.getByText("AWS Cloud Services").first()
  ).toBeVisible();

  await expect(
    page.getByText("Showing 1–2 of 2")
  ).toBeVisible();

  await expect(
    page.getByText("Slack Business Plan")
  ).toHaveCount(0);
});


test("should filter transactions by status", async ({ page }) => {
  await page.goto("/transactions");

  const statusFilter = page.getByRole("combobox", {
    name: "Filter by transaction status",
  });

  await statusFilter.selectOption("pending");

  // Verify pending transactions appear
  await expect(
    page.getByText("Uber Business Travel").first()
  ).toBeVisible();

  await expect(
    page.getByText("Hotel Accommodation").first()
  ).toBeVisible();

  // Verify only two pending transactions remain
  await expect(
    page.getByText("Showing 1–2 of 2")
  ).toBeVisible();

  // Verify completed transactions are removed
  await expect(
    page.getByText("Slack Business Plan")
  ).toHaveCount(0);
});


test("should sort transactions by amount", async ({ page }) => {
  await page.goto("/transactions");

  // Click Amount column to sort ascending
  await page.getByRole("button", {
    name: /Sort by amount/,
  }).click();

  // Lowest amount should appear first
  await expect(
    page.getByText("Team Lunch").first()
  ).toBeVisible();

  // Click again to sort descending
  await page.getByRole("button", {
    name: /Sort by amount/,
  }).click();

  // Highest amount should appear first
  await expect(
    page.getByText("Client Payment").first()
  ).toBeVisible();
});


test("should navigate between transaction pages", async ({ page }) => {
  await page.goto("/transactions");

  // Verify initial page
  await expect(page.getByText("Page 1 of 2")).toBeVisible();
  await expect(page.getByText("Showing 1–10 of 12")).toBeVisible();

  // Navigate to next page
  await page.getByRole("button", {
    name: "Go to next page",
  }).click();

  // Verify second page
  await expect(page.getByText("Page 2 of 2")).toBeVisible();
  await expect(page.getByText("Showing 11–12 of 12")).toBeVisible();

  // Verify the last two transactions appear
  await expect(
    page.getByText("Team Lunch").first()
  ).toBeVisible();

  await expect(
    page.getByText("Adobe Creative Cloud").first()
  ).toBeVisible();

  // Navigate back to first page
  await page.getByRole("button", {
    name: "Go to previous page",
  }).click();

  await expect(page.getByText("Page 1 of 2")).toBeVisible();
});


test("should open transaction details when a transaction is selected", async ({
  page,
}) => {
  await page.goto("/transactions");

  // Select a transaction
  await page.getByRole("button", {
    name: "View transaction AWS Cloud Services",
  }).first().click();

  // Verify the details panel opens
  await expect(
    page.getByText("AWS Cloud Services").last()
  ).toBeVisible();

  // Verify transaction information
  await expect(page.getByText("Amazon Web Services").last()).toBeVisible();

  await expect(page.getByText("Software").last()).toBeVisible();

  await expect(page.getByText("Completed").last()).toBeVisible();
});


test("should clear active transaction filters", async ({ page }) => {
  await page.goto("/transactions");

  // Apply a search filter
  await page.getByRole("textbox", {
    name: "Search transactions",
  }).fill("AWS");

  // Confirm filtered results
  await expect(
    page.getByText("Showing 1–2 of 2")
  ).toBeVisible();

  // Clear filters
  await page.getByRole("button", {
    name: "Clear filters",
  }).click();

  // Verify search input is cleared
  await expect(
    page.getByRole("textbox", {
      name: "Search transactions",
    })
  ).toHaveValue("");

  // Verify all transactions are restored
  await expect(
    page.getByText("Showing 1–10 of 12")
  ).toBeVisible();

  await expect(
    page.getByText("Slack Business Plan").first()
  ).toBeVisible();
});

