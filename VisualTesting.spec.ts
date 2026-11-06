import { test, expect } from '@playwright/test';
test.describe("Visual Testing of the pages", () => {
    //Home page
    test('Home page visual comparison', async ({ page }) => {
        await page.goto("https://www.saucedemo.com/");
        const home = await page.screenshot({ path: 'homepage.png', fullPage: true });
        await expect(page).toHaveScreenshot('homepage.png')
        console.log("Visual Comparison of home page done")
    })
    //Product page
    test('Product page visual comparison', async ({ page }) => {
        await page.goto("https://www.saucedemo.com/");
        await page.getByRole("textbox", { name: 'Username' }).fill("standard_user");
        await page.getByRole("textbox", { name: 'Password' }).fill("secret_sauce");
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        console.log("Login Success");
      //  const product = await page.screenshot({ path: 'productpage.png', fullPage: true });
        await expect(page).toHaveScreenshot('productpage.png')
        console.log("Visual Comparison of product page done")

    })
    //Checkout page
    test('Checkout page visual comparison', async ({ page }) => {
        await page.goto("https://www.saucedemo.com/");
        await page.getByRole("textbox", { name: 'Username' }).fill("standard_user");
        await page.getByRole("textbox", { name: 'Password' }).fill("secret_sauce");
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
        console.log("Login Success");
        await page.locator("#add-to-cart-sauce-labs-backpack").click();
        await page.locator(".shopping_cart_link").click();
        await page.getByRole('button', { name: 'Checkout' }).click();

        //const checkout = await page.screenshot({ path:'checkoutpage.png', fullPage: true });
        await expect(page).toHaveScreenshot('checkoutpage.png')
        console.log("Visual Comparison of checkout page done")

    })
})