const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  // globalSetup: require.resolve('./utils/global.setup.js'),
  testDir: './tests',
  timeout: 50000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://tourfic.test.msunvi',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], storageState: './.auth/auth.json' },
      testMatch: '**/*.spec.js',
    },
  ],
});
