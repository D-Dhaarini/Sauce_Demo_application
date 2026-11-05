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
    await page.locator('[id="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('6');
    console.log("Products are added to the cart");
})
//Remove products and validate
test('Remove products and validate',async({page})=>{
    await page.locator("#add-to-cart-sauce-labs-backpack").click();
    await page.locator("#add-to-cart-sauce-labs-onesie").click();
    await page.locator("#add-to-cart-sauce-labs-bike-light").click();
    await page.locator("#add-to-cart-sauce-labs-bolt-t-shirt").click();
    await page.locator("#add-to-cart-sauce-labs-fleece-jacket").click();
    await page.locator('[id="add-to-cart-test.allthethings()-t-shirt-(red)"]').click();
    await page.locator("#remove-sauce-labs-backpack").click();
    await page.locator("#remove-sauce-labs-onesie").click();
    await page.locator("#remove-sauce-labs-bike-light").click();
    await page.locator("#remove-sauce-labs-bolt-t-shirt").click();
   // await page.locator("#remove-sauce-labs-fleece-jacket").click();
   // await page.locator('[id="remove-test.allthethings()-t-shirt-(red)"]').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
    console.log("Four Products are  Removed from the cart");
})
//validate Cart Items
test("validate Cart Items",async({page})=>{
    await page.locator("#add-to-cart-sauce-labs-backpack").click();
    await page.locator("#add-to-cart-sauce-labs-onesie").click();
    await page.locator(".shopping_cart_link").click();
    const products = await page.locator(".inventory_item_name").allTextContents();  
    expect(products).toContain("Sauce Labs Backpack");
    // Log the array to see its contents
    console.log(products);
    expect(products).toContain("Sauce Labs Onesie");
    console.log("Validation of Cart Items is successful");

})
//validate Total Price
test("validate Total Price",async({page})=>{
    await page.locator("#add-to-cart-sauce-labs-backpack").click();
    await page.locator("#add-to-cart-sauce-labs-onesie").click();
    await page.locator(".shopping_cart_link").click();
    const itemPrices = await page.locator(".inventory_item_price").allTextContents();
    let totalPrice = 0;
    for (const price of itemPrices) {
        totalPrice += parseFloat(price.replace("$", ""));
    }
    console.log("Total Price: " + totalPrice);
    console.log("Validation of Total Price is successful");
})
