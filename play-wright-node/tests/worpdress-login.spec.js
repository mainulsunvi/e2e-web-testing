const { test, expect } = require('@playwright/test');

test.describe('WordPress Login', () => {
	test("Wordpress Login check", async ({ page, baseURL }) => {
		await test.step('Go to Tourfic Settings Panel', async () => {
			await page.goto('/wp-admin/admin.php?page=tf_settings#tab=general');

			await expect(page.locator('.tf-setting-top-bar')).toBeVisible();
		});
		await test.step('Disable Apartment Post Types', async () => {
			test.skip( await page.locator('#general label').filter({ hasText: /^Apartment$/ }).isChecked() == true, "Apartment Post Type is already disabled" )

			await page.locator('#general label').filter({ hasText: /^Apartment$/ }).click();
			await page.getByRole('button', { name: 'Save' }).click();
			await page.locator('div').filter({ hasText: 'Options saved successfully!' }).isVisible();
			await page.reload();
			await page.waitForLoadState('networkidle', { timeout: 3000 });
			await expect( page.locator("#menu-posts-tf_apartment")).not.toBeVisible();
		});
	});
 });