const { test, expect } = require('@playwright/test');

test.describe('Tourfic Settings', () => {
	test("General Setting", async ({ page, baseURL }) => {
		await test.step('Navigating to Tourfic General Settings', async () => {
			await page.goto('/wp-admin/admin.php?page=tf_settings#tab=general');
			await expect(page.locator('.tf-setting-top-bar')).toBeVisible();
		});

		if( await page.locator('#general label').filter({ hasText: /^Apartment$/ }).isChecked() == false ) {
			await test.step('Disable Apartment Post Types', async () => {
				await page.locator('#general label').filter({ hasText: /^Apartment$/ }).click();
				await page.getByRole('button', { name: 'Save' }).click();
				await page.locator('div').filter({ hasText: 'Options saved successfully!' }).isVisible();
				await page.waitForTimeout(1000);
				await page.reload();
				await page.waitForLoadState('networkidle', { timeout: 3000 });
				await expect( page.locator("#menu-posts-tf_apartment")).not.toBeVisible();
			});
		}
		
		if( await page.locator('#general label').filter({ hasText: /^Tour$/ }).isChecked() == false ) {
			await test.step('Disable Tour Post Types', async () => {
				await page.locator('#general label').filter({ hasText: /^Tour$/ }).click();
				await page.getByRole('button', { name: 'Save' }).click();
				await page.locator('div').filter({ hasText: 'Options saved successfully!' }).isVisible();
				await page.waitForTimeout(1000);
				await page.reload();
				await page.waitForLoadState('networkidle', { timeout: 3000 });
				await expect( page.locator("#menu-posts-tf_tours")).not.toBeVisible();
			});
		}
	});
 });