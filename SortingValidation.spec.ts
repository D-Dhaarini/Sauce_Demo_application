import {test,expect} from '@playwright/test';
test.beforeEach(async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    await expect(page.getByText("Swag Labs")).toBeVisible();
   await page.getByRole("textbox",{name:'Username'}).fill("standard_user");
   await page.getByRole("textbox",{name:'Password'}).fill("secret_sauce");
   await page.getByRole('button',{name:'Login'}).click();
   await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
   console.log("Login Success");

});
test("validate sorting A-Z",async({page})=>{
    await page.getByRole('combobox',{name:'Sort products'}).selectOption('az');
    const actualNames=await page.locator('.inventory_item_name').allTextContents();
    const expectedNames=[...actualNames].sort();
    expect(actualNames).toEqual(expectedNames);
    console.log("Successful Validation of sorting in A-Z");

})
test("validate sorting Z-A",async({page})=>{
    await page.getByRole('combobox',{name:'Sort products'}).selectOption('za');
    const actualNames=await page.locator('.inventory_item_name').allTextContents();
    const expectedNames=[...actualNames].sort().reverse();
    expect(actualNames).toEqual(expectedNames);
    console.log("Successful Validation of sorting in Z-A");

})
test("validate sorting based on price(low-high)",async({page})=>{
    await page.getByRole('combobox',{name:'Sort products'}).selectOption('lohi');
    const prices=page.locator('.inventory_item_price').allTextContents();
    const actualPrices=(await prices).map(price=>Number(price.replace('$','')));
     
    const expectedPrices=[...actualPrices].sort((a,b)=>a-b);
    expect(actualPrices).toEqual(expectedPrices);
    console.log("Successful Validation of sorting based on price(low-high)");

})
test("validate sorting based on price(high-low)",async({page})=>{
    await page.getByRole('combobox',{name:'Sort products'}).selectOption('hilo');
    const prices=page.locator('.inventory_item_price').allTextContents();
    const actualPrices=(await prices).map(price=>Number(price.replace('$','')));
     
    const expectedPrices=[...actualPrices].sort((a,b)=>b-a);
    expect(actualPrices).toEqual(expectedPrices);
    console.log("Successful Validation of sorting based on price(high-low)");


})
