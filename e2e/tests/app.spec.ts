import { test, expect } from '@playwright/test';

test.describe('Portfolio Application', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the application', async ({ page }) => {
    // Check if the app root is present
    await expect(page.locator('app-root')).toBeVisible();
  });

  test('should have correct page title', async ({ page }) => {
    await expect(page).toHaveTitle(/Dhaneesh Kumar T - Senior Technical Lead/);
  });

  test('should have proper meta tags', async ({ page }) => {
    // Check meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toContain('Senior Technical Lead');
    expect(metaDescription).toContain('11+ years');
    expect(metaDescription).toContain('Angular');
  });

  test('should load with correct font', async ({ page }) => {
    // Check if Inter font is loaded
    const bodyFont = await page.evaluate(() => {
      const computedStyle = window.getComputedStyle(document.body);
      return computedStyle.fontFamily;
    });
    expect(bodyFont).toContain('Inter');
  });

  test('should support responsive viewport', async ({ page }) => {
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('body')).toBeVisible();

    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
  });
});