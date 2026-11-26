import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const UI_BASE_URL = process.env.UI_BASE_URL ?? "https://klauders.com/";
const API_BASE_URL =
  process.env.API_BASE_URL ?? "https://klauders.com/automate-the-internet";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [["list"], ["html", { open: "never" }], ["github"]]
    : [["list"], ["html"]],

  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    // ---------- UI ----------
    {
      name: "chromium",
      testDir: "./tests/ui",
      use: { ...devices["Desktop Chrome"], baseURL: UI_BASE_URL },
    },
    {
      name: "firefox",
      testDir: "./tests/ui",
      use: { ...devices["Desktop Firefox"], baseURL: UI_BASE_URL },
    },
    {
      name: "webkit",
      testDir: "./tests/ui",
      use: { ...devices["Desktop Safari"], baseURL: UI_BASE_URL },
    },

    // ---------- API ----------
    {
      name: "api",
      testDir: "./tests/api",
      use: {
        baseURL: API_BASE_URL,
        extraHTTPHeaders: {
          Accept: "application/json",
          ...(process.env.API_TOKEN && {
            Authorization: `Bearer ${process.env.API_TOKEN}`,
          }),
        },
      },
    },
  ],
});
