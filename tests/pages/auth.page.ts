import { expect, Page } from "@playwright/test";
import { BasePage } from "./base.page.js";

export class AuthPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get heading() {
    return this.page.getByRole("heading", { name: /sign in/i });
  }

  get emailInput() {
    return this.page.getByLabel("Email");
  }

  get passwordInput() {
    return this.page.getByLabel("Password");
  }

  get loginButton() {
    return this.page.getByRole("button", { name: "Login" });
  }

  get registerToggle() {
    return this.page.getByText("Create new account!");
  }

  get usernameInput() {
    return this.page.getByLabel("Username");
  }

  get signUpButton() {
    return this.page.getByRole("button", { name: "Sign up" });
  }

  async open() {
    await this.goto("/auth");
  }

  async login(email: string, password: string) {
    await this.open();
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);

    await Promise.all([
      this.page.waitForURL(/\/profiles\/?$/),
      this.loginButton.click(),
    ]);

    await expect(
      this.page.getByRole("heading", { name: /who is watching now\?/i }),
    ).toBeVisible();
  }

  async switchToRegister() {
    await this.registerToggle.click();
    await expect(
      this.page.getByRole("heading", { name: /register/i }),
    ).toBeVisible();
  }
}
