All locator and actions to Page Object pages and sections
All tests to different file like for "settings" the test will be settings.spec.js


test('test', async ({ page }) => {
  await page.goto('http://tourfic.test.msunvi/tours/cairo-express-tour/');
  await page.getByRole('textbox', { name: 'Select Date' }).first().click();
  await page.locator('.flatpickr-next-month').first().click();
  await page.getByLabel('July 2,').first().click();
  await page.getByRole('textbox', { name: 'Select Date' }).first().click();
  await page.locator('.flatpickr-next-month').first().click();
  await page.getByLabel('August 2,').click();
  await page.locator('.fa-sharp').first().click();
  await page.locator('.flatpickr-prev-month > svg').first().click();
  await page.getByText('JuneJulyAugustSeptemberOctoberNovemberDecember SunMonTueWedThuFriSat').first().click();
  await page.getByRole('textbox', { name: 'Select Date' }).first().click();
  await page.locator('.flatpickr-prev-month').first().click();
  await page.getByLabel('June 4,').first().click();
});