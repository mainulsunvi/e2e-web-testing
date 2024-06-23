const { test, expect } = require('@playwright/test');

test.describe('Hotel Booking E2E Testing', function () { 
	test.skip("Availability Check", async ({ page }) => {
		test.slow();

		await page.goto('/hotels', { waitUntil: 'networkidle' });
		await page.locator(".tf-section-title-and-location").nth(4).waitFor()

		await expect(page).toHaveTitle("Hotels – Test Tourfic")

		const randomInt = randomIntFromInterval(0, 4);
		const title = await page.locator(".tf-section-title-and-location").nth(randomInt).locator('.tf-section-title').innerText();

		await page.locator(".tf-section-title-and-location").nth(randomInt).click();	
		await page.waitForLoadState('networkidle');

		await expect(page).toHaveTitle(`${title} – Test Tourfic`);
		await page.waitForLoadState('networkidle');

		await page.locator("#check-in-out-date").fill("2024/06/26 - 2024/06/29");

	});
});

function randomIntFromInterval(min, max) { // min and max included 
	return Math.floor(Math.random() * (max - min + 1) + min);
}
