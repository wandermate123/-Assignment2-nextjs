import { test, expect } from '@playwright/test';

// Simple title check for LTU homepage
test('LTU homepage has title', async ({ page }) => {
    await page.goto('https://www.latrobe.edu.au/');
    await expect(page).toHaveTitle(/La Trobe University, Melbourne Victoria Australia/);
});
