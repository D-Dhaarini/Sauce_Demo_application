import{test,expect} from "@playwright/test";
//Login
test.beforeEach(async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    await expect(page.getByText("Swag Labs")).toBeVisible();
   await page.getByRole("textbox",{name:'Username'}).fill("standard_user");
   await page.getByRole("textbox",{name:'Password'}).fill("secret_sauce");
   await page.getByRole('button',{name:'Login'}).click();
   await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
   console.log("Login Success");
});
//Add Products to cart
test('Add products and validate',async({page})=>{
    await page.locator("#add-to-cart-sauce-labs-backpack").click();
    await page.locator("#add-to-cart-sauce-labs-onesie").click();
    await page.locator("#add-to-cart-sauce-labs-bike-light").click();
    await page.locator("#add-to-cart-sauce-labs-bolt-t-shirt").click();
    await page.locator("#add-to-cart-sauce-labs-fleece-jacket").click();
    await page.locator("#add-to-cart-test.allthethings()-t-shirt-(red)").click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('6');
    console.log("Products are added to the cart");
})