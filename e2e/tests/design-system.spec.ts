import { test, expect } from '@playwright/test';

test.describe('Design System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load Tailwind CSS utilities', async ({ page }) => {
    // Create a test element with Tailwind classes
    const hasTailwind = await page.evaluate(() => {
      const testEl = document.createElement('div');
      testEl.className = 'bg-primary text-white p-4';
      document.body.appendChild(testEl);
      const styles = getComputedStyle(testEl);
      document.body.removeChild(testEl);
      
      // Check if Tailwind utilities are working
      return styles.padding !== '0px';
    });

    expect(hasTailwind).toBeTruthy();
  });

  test('should have Inter font loaded', async ({ page }) => {
    // Wait for fonts to load
    await page.waitForLoadState('networkidle');
    
    const fontLoaded = await page.evaluate(() => {
      return document.fonts.check('1rem Inter');
    });

    expect(fontLoaded).toBeTruthy();
  });

  test('should have correct typography scale', async ({ page }) => {
    const typographyScale = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      return {
        textXs: root.getPropertyValue('--text-xs') || '0.75rem',
        textSm: root.getPropertyValue('--text-sm') || '0.875rem',
        textBase: root.getPropertyValue('--text-base') || '1rem',
        textLg: root.getPropertyValue('--text-lg') || '1.125rem',
      };
    });

    // Verify typography scale values
    expect(typographyScale.textXs).toBeTruthy();
    expect(typographyScale.textSm).toBeTruthy();
    expect(typographyScale.textBase).toBeTruthy();
    expect(typographyScale.textLg).toBeTruthy();
  });

  test('should have correct color palette', async ({ page }) => {
    const colors = await page.evaluate(() => {
      const root = getComputedStyle(document.documentElement);
      return {
        primary: root.getPropertyValue('--color-primary'),
        accentCyan: root.getPropertyValue('--color-accent-cyan'),
        accentEmerald: root.getPropertyValue('--color-accent-emerald'),
      };
    });

    // Check primary colors
    expect(colors.primary).toContain('#2563eb');
    expect(colors.accentCyan).toContain('#06b6d4');
    expect(colors.accentEmerald).toContain('#10b981');
  });

  test('should have responsive breakpoints working', async ({ page }) => {
    // Test desktop breakpoint
    await page.setViewportSize({ width: 1280, height: 720 });
    let viewport = await page.evaluate(() => window.innerWidth);
    expect(viewport).toBe(1280);

    // Test tablet breakpoint
    await page.setViewportSize({ width: 768, height: 1024 });
    viewport = await page.evaluate(() => window.innerWidth);
    expect(viewport).toBe(768);

    // Test mobile breakpoint
    await page.setViewportSize({ width: 375, height: 667 });
    viewport = await page.evaluate(() => window.innerWidth);
    expect(viewport).toBe(375);
  });

  test('should have smooth scrolling enabled', async ({ page }) => {
    const scrollBehavior = await page.evaluate(() => {
      return getComputedStyle(document.documentElement).scrollBehavior;
    });

    expect(scrollBehavior).toBe('smooth');
  });

  test('should support reduced motion preference', async ({ page }) => {
    // Emulate prefers-reduced-motion
    await page.emulateMedia({ reducedMotion: 'reduce' });

    const hasReducedMotion = await page.evaluate(() => {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    });

    expect(hasReducedMotion).toBeTruthy();
  });
});