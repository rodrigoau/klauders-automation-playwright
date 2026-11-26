import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  protected readonly path = "/automate-the-internet?lang=es#login";

  readonly usernameInput = this.page.getByTestId("login-username");
  readonly passwordInput = this.page.getByTestId("login-password");
  readonly rememberMeCheckbox = this.page.getByTestId("login-remember");
  readonly signInButton = this.page.getByTestId("login-submit");
  readonly successMessage = this.page.locator("#session-name");

  async login(
    username: string,
    password: string,
    rememberMe: boolean = false,
  ): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    if (rememberMe) {
      await this.rememberMeCheckbox.check();
    }
    await this.signInButton.click();
  }
}
