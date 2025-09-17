import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should display student number in header', async ({ page }) => {
    await page.goto('/');
    
    // Check if student number is displayed in header
    await expect(page.locator('text=Student: 12345678')).toBeVisible();
  });

  test('should have working navigation menu', async ({ page }) => {
    await page.goto('/');
    
    // Check if navigation links are present
    await expect(page.locator('a[href="/"]')).toBeVisible();
    await expect(page.locator('a[href="/about"]')).toBeVisible();
    await expect(page.locator('a[href="/github"]')).toBeVisible();
    await expect(page.locator('a[href="/database"]')).toBeVisible();
    await expect(page.locator('a[href="/docker"]')).toBeVisible();
  });

  test('should have theme toggle functionality', async ({ page }) => {
    await page.goto('/');
    
    // Check if theme toggle button exists
    const themeButton = page.locator('button[aria-label*="theme"]');
    await expect(themeButton).toBeVisible();
    
    // Click theme toggle
    await themeButton.click();
    
    // Check if dark mode is applied (body should have dark class)
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('should generate git commands when form is filled', async ({ page }) => {
    await page.goto('/');
    
    // Fill in the form
    await page.fill('input[name="username"]', 'testuser');
    await page.fill('input[name="token"]', 'test-token');
    await page.fill('input[name="owner"]', 'testowner');
    await page.fill('input[name="repo"]', 'testrepo');
    
    // Click generate commands button
    await page.click('button:has-text("Generate Commands")');
    
    // Check if commands are generated
    await expect(page.locator('text=Generated Git Commands')).toBeVisible();
    await expect(page.locator('text=git config --global user.name')).toBeVisible();
  });

  test('should be accessible', async ({ page }) => {
    await page.goto('/');
    
    // Check for skip link
    await expect(page.locator('a.skip-link')).toBeVisible();
    
    // Check for proper heading structure
    await expect(page.locator('h1')).toBeVisible();
    
    // Check for proper form labels
    await expect(page.locator('label[for="username"]')).toBeVisible();
    await expect(page.locator('label[for="token"]')).toBeVisible();
    await expect(page.locator('label[for="owner"]')).toBeVisible();
    await expect(page.locator('label[for="repo"]')).toBeVisible();
  });

  test('should be responsive', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Check if mobile menu button is visible
    await expect(page.locator('button[aria-label="Toggle menu"]')).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1200, height: 800 });
    await page.goto('/');
    
    // Check if desktop navigation is visible
    await expect(page.locator('nav.hidden.md\\:flex')).toBeVisible();
  });
});
