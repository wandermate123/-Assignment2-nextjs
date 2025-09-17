import { test, expect } from '@playwright/test';

test.describe('Database Page', () => {
  test('should display database selection toggle', async ({ page }) => {
    await page.goto('/database');
    
    // Check if Prisma and Sequelize options are present
    await expect(page.locator('text=Prisma ORM')).toBeVisible();
    await expect(page.locator('text=Sequelize ORM')).toBeVisible();
  });

  test('should switch between Prisma and Sequelize', async ({ page }) => {
    await page.goto('/database');
    
    // Initially Prisma should be selected
    await expect(page.locator('text=Selected: prisma')).toBeVisible();
    
    // Click Sequelize
    await page.click('button:has-text("Sequelize ORM")');
    
    // Check if Sequelize is now selected
    await expect(page.locator('text=Selected: sequelize')).toBeVisible();
  });

  test('should generate CRUD commands', async ({ page }) => {
    await page.goto('/database');
    
    // Click generate CRUD button
    await page.click('button:has-text("Generate CRUD")');
    
    // Check if commands are generated
    await expect(page.locator('text=git config --global user.name')).toBeVisible();
    await expect(page.locator('text=git clone')).toBeVisible();
    await expect(page.locator('text=git add')).toBeVisible();
    await expect(page.locator('text=git commit')).toBeVisible();
    await expect(page.locator('text=git push')).toBeVisible();
  });

  test('should add custom commands', async ({ page }) => {
    await page.goto('/database');
    
    // Add a custom command
    await page.fill('input[placeholder="Enter git command"]', 'git status');
    await page.fill('input[placeholder="Enter description"]', 'Check git status');
    
    // Click add command button
    await page.click('button:has-text("Add Command")');
    
    // Check if command was added
    await expect(page.locator('text=git status')).toBeVisible();
    await expect(page.locator('text=Check git status')).toBeVisible();
  });

  test('should delete commands', async ({ page }) => {
    await page.goto('/database');
    
    // Generate some commands first
    await page.click('button:has-text("Generate CRUD")');
    
    // Get the number of commands before deletion
    const commandsBefore = await page.locator('[data-testid="command-item"]').count();
    
    // Delete the first command
    await page.click('button[aria-label="Delete command"]:first-of-type');
    
    // Check if command was deleted
    const commandsAfter = await page.locator('[data-testid="command-item"]').count();
    expect(commandsAfter).toBe(commandsBefore - 1);
  });

  test('should generate Docker configuration', async ({ page }) => {
    await page.goto('/database');
    
    // Check if Docker configuration section is visible
    await expect(page.locator('text=Docker Configuration')).toBeVisible();
    
    // Check if Dockerfile content is generated
    await expect(page.locator('text=FROM node:18-alpine')).toBeVisible();
    await expect(page.locator('text=WORKDIR /app')).toBeVisible();
    await expect(page.locator('text=EXPOSE 3000')).toBeVisible();
  });

  test('should save commands to database', async ({ page }) => {
    await page.goto('/database');
    
    // Generate some commands
    await page.click('button:has-text("Generate CRUD")');
    
    // Click save to database button
    await page.click('button:has-text("Save to Database")');
    
    // Check if success message appears (this would be mocked in real tests)
    // In a real implementation, you would check for a success notification
    await expect(page.locator('text=Commands saved to database successfully!')).toBeVisible();
  });

  test('should execute commands', async ({ page }) => {
    await page.goto('/database');
    
    // Generate some commands
    await page.click('button:has-text("Generate CRUD")');
    
    // Click execute commands button
    await page.click('button:has-text("Execute Commands")');
    
    // Check if success message appears
    await expect(page.locator('text=Commands executed successfully!')).toBeVisible();
  });

  test('should be accessible', async ({ page }) => {
    await page.goto('/database');
    
    // Check for proper heading structure
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h2')).toBeVisible();
    
    // Check for proper form labels
    await expect(page.locator('label')).toBeVisible();
    
    // Check for proper button labels
    await expect(page.locator('button[aria-label]')).toBeVisible();
  });
});
