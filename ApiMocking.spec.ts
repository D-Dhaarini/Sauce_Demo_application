import { test, expect } from '@playwright/test';

test("Mock Inventory API", async ({ page }) => {
    // Log all outgoing requests
    page.on('request', request => {
        console.log('Request URL:', request.url());
    });

    await page.route('**/inventory*', async route => {
        console.log("Intercepted request:", route.request().url());
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                products: [
                    {
                        id: 1,
                        name: 'Mock Backpack',
                        price: 999
                    }
                ]
            })
        });
    });

    await page.goto('https://www.saucedemo.com/');
    await expect(page.getByText("Swag Labs")).toBeVisible();
    await page.getByRole("textbox", { name: 'Username' }).fill("standard_user");
    await page.getByRole("textbox", { name: 'Password' }).fill("secret_sauce");
    await page.getByRole('button', { name: 'Login' }).click();
    await page.goto("https://www.saucedemo.com/inventory.html");
});
