// @ts-check
import { test, expect } from '@playwright/test';

// ============================================
// HOMEPAGE TESTS
// ============================================

test('Homepage - Verify page loads and title is correct', async ({ page }) => {
  await page.goto('https://sbgfunding.com/');
  await expect(page).toHaveTitle(/SBG Funding|Business Financing/);
});

test('Homepage - Verify navigation menu is functional', async ({ page }) => {
  await page.goto('https://sbgfunding.com/');
  
  await expect(page.getByRole('link', { name: /Resources/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /About us/i }).first()).toBeVisible();
  
  const applyNowHeader = page.getByRole('banner').getByRole('link', { name: 'Apply now' });
  await expect(applyNowHeader).toBeVisible();
});

test('Homepage - Verify Apply Now button in header is clickable', async ({ page }) => {
  await page.goto('https://sbgfunding.com/');
  
  const applyNowLink = page.getByRole('banner').getByRole('link', { name: 'Apply now' });
  await expect(applyNowLink).toBeVisible();
  await expect(applyNowLink).toBeEnabled();
  
  await applyNowLink.click();
  await expect(page.url()).toContain('apply-now');
});

// ============================================
// BUG TESTS - Elements Visible But Not Clickable
// ============================================

test('BUG: About Us page - Apply Now button visible but not clickable due to swiper overlay', async ({ page }) => {
  await page.goto('https://sbgfunding.com/about-us/');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  
  const applyNowLink = page.getByRole('banner').getByRole('link', { name: 'Apply now' });
  await expect(applyNowLink).toBeVisible();
  
  await applyNowLink.click({ timeout: 3000 });
  await expect(page.url()).toContain('apply-now');
});

test('BUG: About Us page - Funding Calculator button visible but not clickable due to swiper overlay', async ({ page }) => {
  await page.goto('https://sbgfunding.com/about-us/');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  
  const calculatorLink = page.getByRole('link', { name: 'Funding Calculator'}).first();
  await expect(calculatorLink).toBeVisible();
  
  await calculatorLink.click({ timeout: 3000 });
  await expect(page.url()).toContain('sbgfunding-calculator');
});

// ============================================
// FORM AND PAGE LOAD TESTS
// ============================================


test('Construction page - Navigate from homepage and fill form without submitting', async ({ page }) => {
  await page.goto('https://sbgfunding.com/');
  await page.waitForLoadState('networkidle');
  
  const financeMenu = page.getByText('Finance your business').first();
  await financeMenu.hover();
  await page.waitForTimeout(500);
  
  await page.getByRole('link', { name: /Construction/i }).first().click();
  await expect(page.url()).toContain('construction');
  
  await page.getByLabel(/First Name/i).fill('John');
  await page.getByLabel(/Last Name/i).fill('Doe');
  await page.getByLabel(/Business Name/i).fill('Test Construction Co');
  await page.getByLabel(/Annual Revenue/i).fill('500000');
  await page.getByLabel(/Email Address/i).fill('john.doe@test.com');
  await page.getByLabel(/Phone number/i).first().fill('3057777777');
  
  await page.getByLabel(/Time in Business/i).selectOption('2 - 5 years');
  await page.getByLabel(/Credit Score/i).first().selectOption('Good (680 - 719)');
  
  await expect(page.getByLabel(/First Name/i)).toHaveValue('John');
  await expect(page.getByLabel(/Last Name/i)).toHaveValue('Doe');
  await expect(page.getByLabel(/Email Address/i)).toHaveValue('john.doe@test.com');
});

// ============================================
// ADDITIONAL TEST CASES
// ============================================

test('Funding Calculator - Navigate from header and verify calculator page loads', async ({ page }) => {
  await page.goto('https://sbgfunding.com/');
  
  const calculatorLink = page.getByRole('link', { name: 'Funding Calculator', exact: true });
  await expect(calculatorLink).toBeVisible();
  await calculatorLink.click();
  
  await expect(page.url()).toMatch(/calculator|sbgfunding-calculator/);
  
  const pageTitle = await page.title();
  expect(pageTitle).toBeTruthy();
});

test('Resources menu - Navigate to Blog page from dropdown', async ({ page }) => {
  await page.goto('https://sbgfunding.com/');
  
  const resourcesMenu = page.getByRole('link', { name: /Resources/i }).first();
  await resourcesMenu.hover();
  await page.waitForTimeout(500);
  
  await page.getByRole('link', { name: /Blog/i }).first().click();
  await expect(page.url()).toContain('blog');
  
  const pageContent = await page.textContent('body');
  expect(pageContent).toBeTruthy();
});

test('Footer links - Verify Privacy Policy and Contact links are functional', async ({ page }) => {
  await page.goto('https://sbgfunding.com/');
  
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  
  const privacyLink = page.getByRole('link', { name: /Privacy Policy/i }).first();
  await expect(privacyLink).toBeVisible();
  await privacyLink.click();
  await expect(page.url()).toContain('privacy-policy');
  
  await page.goBack();
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  
  const contactLink = page.getByRole('link', { name: /Contact us/i }).first();
  await expect(contactLink).toBeVisible();
  await contactLink.click();
  await expect(page.url()).toMatch(/contact|contact-us/);
});
