import { Locator, Page } from "@playwright/test";

export class Store {
    readonly page: Page;
    readonly usernameText: Locator;
    readonly header: Locator;
   

    constructor (page: Page) {
        this.page = page;
        this.usernameText = page.getByTestId("username");    
        this.header = page.locator("h1");

   }   
}
