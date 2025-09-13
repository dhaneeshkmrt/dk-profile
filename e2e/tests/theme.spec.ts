import { test, expect } from '@playwright/test';

test.describe('Theme System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have correct default theme', async ({ page }) => {
    // Check if theme is applied to html element
    const theme = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme');
    });
    expect(['light', 'dark']).toContain(theme);
  });

  test('should have CSS custom properties for theming', async ({ page }) => {
    const cssVars = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      return {
        primaryColor: styles.getPropertyValue('--color-primary'),
        bgColor: styles.getPropertyValue('--color-bg'),
        textColor: styles.getPropertyValue('--color-text-primary'),
      };
    });

    // Check if CSS variables are defined
    expect(cssVars.primaryColor).toBeTruthy();
    expect(cssVars.bgColor).toBeTruthy();
    expect(cssVars.textColor).toBeTruthy();
  });

  test('should apply correct colors based on theme', async ({ page }) => {
    // Get current theme
    const theme = await page.evaluate(() => {
      return document.documentElement.getAttribute('data-theme');
    });

    const bgColor = await page.evaluate(() => {
      return getComputedStyle(document.body).backgroundColor;
    });

    if (theme === 'light') {
      // Light theme should have white or light background
      expect(bgColor).toMatch(/rgb\(255,\s*255,\s*255\)|rgb\(248,\s*250,\s*252\)/);
    } else {
      // Dark theme should have dark background
      expect(bgColor).toMatch(/rgb\(15,\s*23,\s*42\)/);
    }
  });

  test('should have smooth theme transitions', async ({ page }) => {
    const transitionStyle = await page.evaluate(() => {
      return getComputedStyle(document.body).transition;
    });
    
    // Check if transition is applied for smooth theme switching
    expect(transitionStyle).toContain('background-color');
    expect(transitionStyle).toContain('0.3s');
  });
});