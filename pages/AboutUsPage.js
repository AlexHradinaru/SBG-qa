// @ts-check
import { BasePage } from './BasePage.js';

export class AboutUsPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = '/about-us';
  }

  async navigate() {
    await this.goto(this.url);
  }

  get fundingCalculatorLink() {
    return this.page.getByRole('link', { name: 'Funding Calculator' }).first();
  }
}

