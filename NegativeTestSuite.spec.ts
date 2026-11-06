import { test, expect } from "@playwright/test";
test.describe("Negative Test Suite", () => {
    //Locked User Login
    test("Locked User",async ({ page }) => {
        await page.goto("https://www.saucedemo.com/");
        await expect(page.getByText("Swag Labs")).toBeVisible();
        await page.getByRole("textbox", { name: 'Username' }).fill("locked_out_user");
        await page.getByRole("textbox", { name: 'Password' }).fill("secret_sauce");
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator('[data-test="error"]')).toContainText("locked out");
        console.log("validated for Locked User");
    });
    //Invalid user Login
    test("Invalid User",async ({ page }) => {
        await page.goto("https://www.saucedemo.com/");
        await expect(page.getByText("Swag Labs")).toBeVisible();
        await page.getByRole("textbox", { name: 'Username' }).fill("invalid_user");
        await page.getByRole("textbox", { name: 'Password' }).fill("secret_sauce");
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator('[data-test="error"]')).toContainText("Username and password do not match any user in this service");
        console.log("validated for Invalid User");
    });
    //Empty password Login
    test("Empty password Login",async ({ page }) => {
        await page.goto("https://www.saucedemo.com/");
        await expect(page.getByText("Swag Labs")).toBeVisible();
        await page.getByRole("textbox", { name: 'Username' }).fill("standard_user");
        await page.getByRole("textbox", { name: 'Password' }).fill("");
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator('[data-test="error"]')).toContainText("Password is required");
        console.log("validated for Empty Password");

    });
    //Empty username Login
    test("Empty username Login",async ({ page }) => {
        await page.goto("https://www.saucedemo.com/");
        await expect(page.getByText("Swag Labs")).toBeVisible();
        await page.getByRole("textbox", { name: 'Username' }).fill("");
        await page.getByRole("textbox", { name: 'Password' }).fill("secret_sauce");
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator('[data-test="error"]')).toContainText("Username is required");
        console.log("validated for Empty Username");

    });
    //SQL injection string Login
    test("SQL injection string Login",async ({ page }) => {
        await page.goto("https://www.saucedemo.com/");
        await expect(page.getByText("Swag Labs")).toBeVisible();
        await page.getByRole("textbox", { name: 'Username' }).fill("' OR 1=1 --");
        await page.getByRole("textbox", { name: 'Password' }).fill("' OR 1=1 --");
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        console.log("validated for SQL Injection String Login");

    });
    //Long strings of Password and Username
    test("Long strings of Password and Username",async ({ page }) => {
        await page.goto("https://www.saucedemo.com/");
        const LongUser='u'.repeat(100);
        const LongPassword='p'.repeat(100);
        await expect(page.getByText("Swag Labs")).toBeVisible();
        await page.getByRole("textbox", { name: 'Username' }).fill(LongUser);
        await page.getByRole("textbox", { name: 'Password' }).fill(LongPassword);
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        console.log("validated for Long String of username and password");

    });
})


