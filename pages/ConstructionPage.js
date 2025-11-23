// @ts-check
import { expect } from "@playwright/test";
import { BasePage } from "./BasePage.js";
import { generateTestUserData } from "../helpers/dataGenerator.js";

export class ConstructionPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = "/industries/construction";
  }

  async navigate() {
    await this.goto(this.url);
  }

  get firstNameInput() {
    return this.page.getByLabel(/First Name/i);
  }

  get lastNameInput() {
    return this.page.getByLabel(/Last Name/i);
  }

  get businessNameInput() {
    return this.page.getByLabel(/Business Name/i);
  }

  get annualRevenueInput() {
    return this.page.getByLabel(/Annual Revenue/i);
  }

  get emailInput() {
    return this.page.getByLabel(/Email Address/i);
  }

  get phoneInput() {
    return this.page.getByLabel(/Phone number/i).first();
  }

  get timeInBusinessSelect() {
    return this.page.getByLabel(/Time in Business/i);
  }

  get creditScoreSelect() {
    return this.page.getByLabel(/Credit Score/i).first();
  }

  async fillForm(data = generateTestUserData()) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.businessNameInput.fill(data.businessName);
    await this.annualRevenueInput.fill(data.annualRevenue);
    await this.emailInput.fill(data.email);
    await this.phoneInput.fill(data.phone);
    await this.timeInBusinessSelect.selectOption(data.timeInBusiness);
    await this.creditScoreSelect.selectOption(data.creditScore);
    return data;
  }

  async verifyFormFilled(data) {
    await expect(this.firstNameInput).toHaveValue(data.firstName);
    await expect(this.lastNameInput).toHaveValue(data.lastName);
    await expect(this.emailInput).toHaveValue(data.email);
  }
}
