import{test,expect} from '@playwright/test';
test.describe("Product Catalog Validation",()=>{
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
//Validate all product cards
test('Validate all product cards',async({page})=>{
    const productCards=page.locator('.inventory_item');
    const productCount=await productCards.count();
    for( let i=0;i<productCount;i++){
        const card=productCards.nth(i);
        await expect(card).toBeVisible();
    }
    console.log("The total products available is "+productCount);
    console.log("All products cards are validates");

})

//verify image availability
test("verify image availability",async({page})=>{
    const images=page.locator('.inventory_item_img');
    const count=await images.count();
    for( let i=0;i<count;i++){
        const image=images.nth(i);
        await expect(image).toBeVisible();
    }
        console.log("Images are validated");
    
    
})
//verify prices not empty
test("verify prices not empty",async({page})=>{
    const prices=await page.locator('.inventory_item_price').allTextContents();
    for(const price of prices){
        expect(price.trim()).not.toBe('');

    }
    console.log("There is no empty price values in the card");
})
//verify inventory names unique
test("verify inventory names unique",async({page})=>{
    const names=await page.locator('.inventory_item_name').allTextContents();
const uniqueNames=[...new Set(names)];
expect(uniqueNames.length).toBe(names.length);
// for(let i=0;i<names.length;i++){
//     for(let j=0;j<names.length;j++){
//         expect(names[i]).not.toBe(names[j]);
//     }
// }
console.log("verified inventory names are unique");
})
test.afterAll(async()=>{
    console.log("All product catalog tests completed");
})

})