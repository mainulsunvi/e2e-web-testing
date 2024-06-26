import { Browser, chromium, expect, Page } from '@playwright/test';
import playwrightConfig from '../playwright.config';

async function globalSetup() {
    const baseURL = playwrightConfig.use.baseURL;
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto(`${baseURL}/wp-login.php`, { waitUntil: 'domcontentloaded' });
    await page.locator("#user_login").fill("admin");
    await page.locator("#user_pass").fill("admin");
    await page.locator("#wp-submit").click();

    if (await page.isVisible("#login_error")) {
        await page.pause();
    }

    await page.waitForURL(`${baseURL}/wp-admin/`);
    await expect(page.url(), "Your WordPress Login credentials is incorrect").toBe(`${baseURL}/wp-admin/`);

    await page.context().storageState({ path: './.auth/auth.json' });

    await browser.close();
}

export default globalSetup;