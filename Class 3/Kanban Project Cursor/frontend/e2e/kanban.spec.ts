import { test, expect } from "@playwright/test";

test.describe("Kanban Board", () => {
  test("loads dummy data with 5 columns", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Project Board" })).toBeVisible();
    await expect(page.getByTestId("column-col-backlog")).toBeVisible();
    await expect(page.getByTestId("column-col-todo")).toBeVisible();
    await expect(page.getByTestId("column-col-in-progress")).toBeVisible();
    await expect(page.getByTestId("column-col-review")).toBeVisible();
    await expect(page.getByTestId("column-col-done")).toBeVisible();
    await expect(page.getByText("Research competitors")).toBeVisible();
    await expect(page.getByText("Configure Tailwind theme")).toBeVisible();
  });

  test("renames a column", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("column-col-backlog").getByTestId("column-title").click();
    const input = page.getByTestId("column-title-input");
    await input.fill("Ideas");
    await input.press("Enter");
    await expect(
      page.getByTestId("column-col-backlog").getByTestId("column-title"),
    ).toHaveText("Ideas");
  });

  test("adds a card to a column", async ({ page }) => {
    await page.goto("/");
    await page.getByTestId("add-card-toggle-col-todo").click();
    await page.getByTestId("add-card-title-col-todo").fill("E2E test card");
    await page.getByTestId("add-card-details-col-todo").fill("Added via Playwright");
    await page.getByTestId("add-card-submit-col-todo").click();
    await expect(page.getByText("E2E test card")).toBeVisible();
    await expect(page.getByText("Added via Playwright")).toBeVisible();
  });

  test("deletes a card", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Research competitors")).toBeVisible();
    await page.getByTestId("delete-card-card-1").click();
    await expect(page.getByText("Research competitors")).not.toBeVisible();
  });

  test("drags a card between columns", async ({ page }) => {
    await page.goto("/");
    const card = page.getByTestId("card-card-1");
    const targetColumn = page.getByTestId("column-col-todo");
    await card.dragTo(targetColumn);
    await expect(
      page.getByTestId("column-col-todo").getByText("Research competitors"),
    ).toBeVisible();
    await expect(
      page.getByTestId("column-col-backlog").getByText("Research competitors"),
    ).not.toBeVisible();
  });
});
