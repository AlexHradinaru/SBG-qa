import { BasePage } from './BasePage.js';

export class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = '/dashboard';
  }

  async navigate() {
    await this.goto(this.url);
  }
}