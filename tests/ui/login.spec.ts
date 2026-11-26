import { test, expect } from "@fixtures/pages.fixture";

test.describe("Login Page", () => {
  test("login with valid credentials", async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login("qa.engineer", "Klauders#2026", true);
    await expect(loginPage.successMessage).toBeVisible();
    await expect(loginPage.successMessage).toContainText("QA Engineer");
  });
});
