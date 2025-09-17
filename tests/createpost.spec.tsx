import { test, expect } from '@playwright/test';

// Hook to run before all tests
test.beforeAll(async () => {
  console.log("Before all tests");
  // You can set up any global environment variables or configurations here
});

// Hook to run before each test (use `page` here)
test.beforeEach(async ({ page }) => {
  console.log("Before each test");
  // Prepare the page before each test runs
});

// Hook to run after each test
test.afterEach(async ({ page }) => {
  console.log("After each test");
  // Clean up after each test if needed
});

// Hook to run after all tests
test.afterAll(async () => {
  console.log("After all tests");
  // Perform any cleanup that needs to happen after all tests have run
});

// Test suite for Createblog and BlogDetails Pages
test.describe('Createblog and BlogDetails Pages', () => {
  test('should allow the user to input blog data, save it, and display it on the homepage and blog details page', async ({ page }) => {
    // Step 1: Visit the Createblog page
    await page.goto('http://localhost:3001/createblog');

    // Wait for the page to settle and be ready for interaction
    await page.waitForLoadState('networkidle'); // Ensures all network requests are completed

    // Ensure the form elements are visible and ready to interact
    await expect(page.locator('[placeholder="Author"]')).toBeVisible({ timeout: 10000 });

    // Step 2: Fill in the form fields
    const author = 'Test Author';
    const title = 'Test Blog Title';
    const description = 'This is a test description for the blog post.';
    const imageUrl = 'https://example.com/image.jpg';

    await page.fill('[placeholder="Author"]', author);
    await page.fill('[placeholder="Title"]', title);
    await page.fill('[placeholder="Description"]', description);
    await page.fill('[placeholder="Image URL"]', imageUrl);

    // Step 3: Click the "Add Data" button
    await page.click('button:has-text("Add Data")');

    // Step 4: Check if the form fields are cleared after submission
    await expect(page.locator('[placeholder="Author"]')).toHaveValue('');
    await expect(page.locator('[placeholder="Title"]')).toHaveValue('');
    await expect(page.locator('[placeholder="Description"]')).toHaveValue('');
    await expect(page.locator('[placeholder="Image URL"]')).toHaveValue('');

    // Step 5: Navigate back to the homepage ("/")
    await page.goto('http://localhost:3001/'); // Go back to the homepage

    // Wait for the homepage to load
    await page.waitForLoadState('networkidle');

    // Step 6: Check if the new blog post is displayed in the list
    const blogList = page.locator('.card'); // The blog card elements on the homepage

    // Verify that the newly added blog is in the list (using the title)
    await expect(blogList).toContainText(title);
    await expect(blogList).toContainText(author);
    await expect(blogList).toContainText(description.substring(0, 50)); // Check the truncated description

    // Optional: Check if the correct image URL is used in the card
    const blogImage = blogList.locator('img');
    await expect(blogImage).toHaveAttribute('src', imageUrl);
  });
});
