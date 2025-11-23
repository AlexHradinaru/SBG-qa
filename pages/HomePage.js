// @ts-check
import { BasePage } from "./BasePage.js";

export class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.url = "/";
  }

  async navigate() {
    await this.goto(this.url);
  }

  get resourcesLink() {
    return this.page.getByRole("link", { name: /Resources/i }).first();
  }

  get aboutUsLink() {
    return this.page.getByRole("link", { name: /About us/i }).first();
  }

  get financeMenu() {
    return this.page.getByText("Finance your business").first();
  }

  async openFinanceMenu() {
    await this.financeMenu.hover();
    await this.waitForTimeout(500);
  }

  get constructionLink() {
    return this.page.getByRole("link", { name: /Construction/i }).first();
  }

  get healthcareLink() {
    return this.page.getByRole("link", { name: /Healthcare/i }).first();
  }

  async navigateToConstruction() {
    await this.navigate();
    await this.page.waitForLoadState();
    await this.openFinanceMenu();
    await this.constructionLink.click();
  }

  async navigateToHealthcare() {
    await this.navigate();
    await this.page.waitForLoadState();
    await this.openFinanceMenu();
    await this.healthcareLink.click();
  }

  get blogLink() {
    return this.page.getByRole("link", { name: /Blog/i }).first();
  }

  async openResourcesMenu() {
    await this.resourcesLink.hover();
    await this.waitForTimeout(500);
  }

  async navigateToBlog() {
    await this.navigate();
    await this.openResourcesMenu();
    await this.blogLink.click();
  }

  get privacyPolicyLink() {
    return this.page.getByRole("link", { name: /Privacy Policy/i }).first();
  }

  get contactUsLink() {
    return this.page.getByRole("link", { name: /Contact us/i }).first();
  }
}
