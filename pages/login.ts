import { Locator, Page } from "@playwright/test";

export class Login {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly password: Locator;
    readonly roleSelector: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator;
    readonly header: Locator;

    constructor (page: Page) {
        this.page = page;
        this.usernameInput = page.getByLabel("Username");
        this.password = page.getByLabel("Password");
        this.roleSelector = page.getByLabel("Select Role");
        this.submitButton = page.getByRole('button', {name: "Login"});
        this.errorMessage = page.getByTestId("error-message");
        this.header = page.locator('h1');  
    }

async login(username: string, password: string, userType: string){
    await this.usernameInput.fill(username)
    await this.password.fill(password)
    await this.roleSelector.selectOption(userType)
    await this.submitButton.click()
    }        
}
