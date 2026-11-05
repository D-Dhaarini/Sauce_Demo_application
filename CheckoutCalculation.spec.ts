import{test,expect} from "@playwright/test";
test.beforeEach(async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    await expect(page.getByText("Swag Labs")).toBeVisible();
   await page.getByRole("textbox",{name:'Username'}).fill("standard_user");
   await page.getByRole("textbox",{name:'Password'}).fill("secret_sauce");
   await page.getByRole('button',{name:'Login'}).click();
   await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
   console.log("Login Success");
});
test("Validate checkout calculation",async({page})=>{
    await page.locator("#add-to-cart-sauce-labs-backpack").click();
    await page.locator("#add-to-cart-sauce-labs-onesie").click();
    await page.locator(".shopping_cart_link").click();
    await page.getByRole('button',{name:'Checkout'}).click();
    await page.getByRole('textbox',{name:'First Name'}).fill("John");
    await page.getByRole('textbox',{name:'Last Name'}).fill("Doe");
    await page.getByRole('textbox',{name:'Zip/Postal Code'}).fill("12345");
    await page.getByRole('button',{name:'Continue'}).click();
    const subtotalText = await page.locator(".summary_subtotal_label").textContent();
    console.log("Subtotal Text:", subtotalText);
    const taxText = await page.locator(".summary_tax_label").textContent();
    console.log("Tax Text:", taxText);
    const totalText = await page.locator(".summary_total_label").textContent();
    console.log("Total Text:", totalText);
    const subtotal = parseFloat(subtotalText?.replace("Item total: $", "") || "0");
    console.log("Parsed Subtotal:", subtotal);
    const tax = parseFloat(taxText?.replace("Tax: $", "") || "0");
    console.log("Parsed Tax:", tax);
    const total = parseFloat(totalText?.replace("Total: $", "") || "0");
    console.log("Parsed Total:", total);  
    expect(total).toBeCloseTo(subtotal + tax, 2);
    console.log("Checkout calculation is validated successfully");
})