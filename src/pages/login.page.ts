import { Page } from "@playwright/test";

export class LoginPage {

    baseUrl = 'http://localhost:5038'

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto(): Promise<void> {
        await this.page.goto(this.baseUrl);
    }

}