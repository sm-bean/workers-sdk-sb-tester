import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8765');
});

test("should show H1", async ({page}) => {
    await expect(page.getByTestId('title')).toBeVisible();
})

test("should create an iframe", async({page}) => {
    await expect(page.getByTestId("worker")).toBeVisible();
})

test("should display header within the iframe", async({page}) => {
    const iframe = page.getByTestId("worker")
})