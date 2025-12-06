import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/e2e/',
  timeout: 60 * 1000,
  expect: { timeout: 10000 },
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    video: 'on',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});