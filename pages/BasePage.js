// @ts-check
export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async scrollToBottom() {
    await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  }

  async waitForTimeout(ms) {
    await this.page.waitForTimeout(ms);
  }

  get applyNowLink() {
    return this.page.getByRole('banner').getByRole('link', { name: 'Apply now' });
  }

  get fundingCalculatorLink() {
    return this.page.getByRole('link', { name: 'Funding Calculator', exact: true });
  }
}

