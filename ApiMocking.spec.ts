import{test,expect} from '@playwright/test';
test("Mock Inventory API",async({page})=>{
    await page.route('**/inventory*',async route=>{
        await route.fulfill({
            status:200,
            contentType:'application/json',
            body:JSON.stringify({
                products:[
                    {
                        id:1,
                        name:'Mock Backpack',
                        price:999
                    }
                ]
            })
        });
    });
    await page.goto('https://www.saucedemo.com/');
    console.log("Mocking of API done");
})