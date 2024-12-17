import { test as base, Page } from '@playwright/test';
import { Login } from '../pages/login';
import { Store } from '../pages/store';

export const test = base.extend<{ login: Login, store: Store, loggedIn: Page }>({
login: async ({ page }, use) => {
const login = new Login(page);
await page.goto('https://hoff.is/login');
await use(login);
 },

store: async ({ page }, use) => {
const store = new Store(page);
await use(store);
 },

loggedIn: async ({ page, login }, use) => {
let password = process.env.PASSWORD || 'defaultPassword';
await page.goto('https://hoff.is/login');
await login.login('Markus', password, 'consumer');
await use(page);
 }
});

export { expect } from '@playwright/test';