import { test, expect } from '@playwright/test'

test("Count Test", async function ({ page }) {

	await page.goto("http://localhost:5173/")

	

	let randomNumber = Math.floor(Math.random() * 12)
	for (let i = 0; i <= randomNumber; i++) {
		await page.locator(".card button").click();
	}

	await page.pause();
	
})