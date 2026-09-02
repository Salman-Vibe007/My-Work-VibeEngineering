import { test, expect } from '@playwright/test';

test.describe('Kanban Board', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should render 5 columns', async ({ page }) => {
    const columns = await page.locator('[role="region"]').count();
    expect(columns).toBe(5);
  });

  test('should display sample cards', async ({ page }) => {
    const cards = await page.locator('[role="article"]').count();
    expect(cards).toBeGreaterThan(0);
  });

  test('should add a new card', async ({ page }) => {
    const addButtons = await page.locator('button:has-text("Add Card")').first();
    await addButtons.click();

    const titleInput = await page.locator('input[placeholder="Card title"]');
    const detailsInput = await page.locator('textarea[placeholder="Card details"]');
    const submitButton = await page.locator('button:has-text("Add")');

    await titleInput.fill('New Test Card');
    await detailsInput.fill('This is a test card');
    await submitButton.click();

    const newCard = await page.locator('text=New Test Card');
    await expect(newCard).toBeVisible();
  });

  test('should rename a column', async ({ page }) => {
    const editButton = await page.locator('button[aria-label*="Edit column"]').first();
    await editButton.click();

    const input = await page.locator('input[type="text"]').first();
    await input.clear();
    await input.fill('Updated Column');

    const saveButton = await page.locator('button[aria-label="Save column name"]').first();
    await saveButton.click();

    const columnTitle = await page.locator('text=Updated Column');
    await expect(columnTitle).toBeVisible();
  });
});
