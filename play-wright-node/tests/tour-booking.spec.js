const { test, expect } = require('@playwright/test');

const bookingDestails = {
	"date": "2024/07/01"
};

test.describe('Tour Booking', function () {
	test.skip();
	test.use({ storageState: { cookies: [], origins: [] } })
	test.slow();
	test("Tour Booking Design 2", async ({ page, baseURL, context }) => {
		await test.step("Navigating to Single Tour Page", async () => {
			await page.goto('/tours/cairo-express-tour/', { waitUntil: 'load' });
		});

		await test.step("filling the booking date", async () => {
			await page.evaluate((bookingDestails) => {
				document.querySelector("#check-in-out-date").value = bookingDestails.date;
			}, bookingDestails);
		});

		await test.step("checking the booking date", async () => {
			expect(await page.locator("#check-in-out-date").first().inputValue()).toBe(bookingDestails.date);
		});

		await test.step("filling the adult info", async () => {
			await page.getByRole('spinbutton').fill("2");
		});

		await test.step("clicking the book now button", async () => {
			await page.locator(".tf-booking-popup-btn").first().click();
			await page.waitForSelector(".tf-withoutpayment-booking.show", { state: 'visible' });
		});

		// await page.pause();

		await test.step("checking the booking popup", async () => {
			await page.waitForTimeout(2000);
			await expect(await page.locator('.tf-withoutpayment-popup').first()).toBeVisible();
		});
		
		await test.step("proceeding to checkout", async () => {
			await page.waitForTimeout(2000);
			await expect(await page.locator('.tf-withoutpayment-popup').first()).toBeVisible();
			await page.locator('.tf-control-pagination.show button').getByText("Continue").first().click()
		});

		await test.step("checkout page", async () => { 
			await page.waitForURL("/checkout/")
			await expect( await page.url()).toContain("/checkout/")
		});
	});
});