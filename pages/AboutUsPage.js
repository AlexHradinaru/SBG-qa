// @ts-check
import { BasePage } from './BasePage.js';

export class AboutUsPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = 'https://sbgfunding.com/about-us/';
  }

  async navigate() {
    await this.goto(this.url);
  }

  async scrollToBottomAndWait() {
    await this.scrollToBottom();
    await this.waitForTimeout(2000);
  }

  get fundingCalculatorLink() {
    return this.page.getByRole('link', { name: 'Funding Calculator' }).first();
  }
}

