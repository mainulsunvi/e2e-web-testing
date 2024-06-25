const { test, expect } = require('@playwright/test');

test.describe('WordPress Login', () => {
	test("Wordpress Login check", async ({ page, baseURL }) => {
		test.slow()
		await page.goto('/wp-login.php', { waitUntil: 'domcontentloaded' });
		await page.locator("#user_login").fill("admin");
		await page.locator("#user_pass").fill("admin");
		await page.locator("#wp-submit").click();

		if (await page.isVisible("#login_error")) {
			await page.pause();
		}


		await page.waitForURL('/wp-admin/');
		await expect(page.url(), "Your WordPress Login credentials is incorrect" ).toBe(`${baseURL}/wp-admin/`)

		await test.step('Go to Tourfic Settings Panel', async () => {
			await page.goto('/wp-admin/admin.php?page=tf_settings#tab=general');

			await expect(page.locator('.tf-setting-top-bar')).toBeVisible();
		});
		await test.step('Disable Apartment Post Types', async () => {
			await page.locator('#general label').filter({ hasText: /^Apartment$/ }).click();
			await page.getByRole('button', { name: 'Save' }).click();
			await page.locator('div').filter({ hasText: 'Options saved successfully!' }).isVisible();
			await page.reload( { waitUntil: 'networkidle' } );
			await expect( page.locator("#menu-posts-tf_apartment")).not.toBeVisible();
		});
	});
 });