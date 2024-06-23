const { test, expect } = require('@playwright/test');

test.describe('WordPress Login', () => {
	test("Wordpress Login check", async ({ page }) => {
		test.slow
		await page.goto('/wp-login.php', { waitUntil: 'domcontentloaded' });
		await page.locator("#user_login").fill("admin");
		await page.locator("#user_pass").fill("admin");
		await page.locator("#wp-submit").click();

		if (await page.isVisible("#login_error")) { 
			await page.pause();
		}

		await page.waitForURL('/wp-admin/');
		await expect(page.url(), "Your WordPress Login credentials is incorrect" ).toBe('http://tourfic.test.msunvi/wp-admin/')

	});
 });