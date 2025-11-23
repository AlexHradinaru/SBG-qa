// @ts-check
export class BasePage {
  constructor(page) {
    this.page = page;
    this.url = '/';
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async scrollToBottom() {
    await this.page.keyboard.press('End');
  }

  async scrollToBottomAndWait() {
    await this.page.keyboard.press('End');
    await this.page.waitForTimeout(100);
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

