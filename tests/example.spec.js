// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { AboutUsPage } from '../pages/AboutUsPage.js';
import { ConstructionPage } from '../pages/ConstructionPage.js';

// ============================================
// BUG TESTS - Elements Visible But Not Clickable
// ============================================

test('BUG: About Us page - Apply Now button visible but not clickable due to swiper overlay', async ({ page }) => {
  const aboutUsPage = new AboutUsPage(page);
  await aboutUsPage.navigate();
  await aboutUsPage.scrollToBottomAndWait();
  
  await expect(aboutUsPage.applyNowLink).toBeVisible();
  await aboutUsPage.applyNowLink.click({ timeout: 3000 });
  await expect(page.url()).toContain('apply-now');
});

test('BUG: About Us page - Funding Calculator button visible but not clickable due to swiper overlay', async ({ page }) => {
  const aboutUsPage = new AboutUsPage(page);
  await aboutUsPage.navigate();
  await aboutUsPage.scrollToBottomAndWait();
  
  await expect(aboutUsPage.fundingCalculatorLink).toBeVisible();
  await aboutUsPage.fundingCalculatorLink.click({ timeout: 3000 });
  await expect(page.url()).toContain('sbgfunding-calculator');
});

// ============================================
// HOMEPAGE TESTS
// ============================================

test('Homepage - Verify page loads and title is correct', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await expect(page).toHaveTitle(/SBG Funding|Business Financing/);
});

test('Homepage - Verify navigation menu is functional', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  
  await expect(homePage.resourcesLink).toBeVisible();
  await expect(homePage.aboutUsLink).toBeVisible();
  await expect(homePage.applyNowLink).toBeVisible();
});

test('Homepage - Verify Apply Now button in header is clickable', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  
  await expect(homePage.applyNowLink).toBeVisible();
  await expect(homePage.applyNowLink).toBeEnabled();
  await homePage.applyNowLink.click();
  await expect(page.url()).toContain('apply-now');
});

// ============================================
// FORM AND PAGE LOAD TESTS
// ============================================

test('Construction page - Navigate from homepage and fill form without submitting', async ({ page }) => {
  const homePage = new HomePage(page);
  const constructionPage = new ConstructionPage(page);
  
  await homePage.navigateToConstruction();
  await expect(page.url()).toContain('construction');
  
  const formData = {
    firstName: 'John',
    lastName: 'Doe',
    businessName: 'Test Construction Co',
    annualRevenue: '500000',
    email: 'john.doe@test.com',
    phone: '3057777777',
    timeInBusiness: '2 - 5 years',
    creditScore: 'Good (680 - 719)'
  };
  
  await constructionPage.fillForm(formData);
  await constructionPage.verifyFormFilled(formData);
});

// ============================================
// ADDITIONAL TEST CASES
// ============================================

test('Funding Calculator - Navigate from header and verify calculator page loads', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  
  await expect(homePage.fundingCalculatorLink).toBeVisible();
  await homePage.fundingCalculatorLink.click();
  
  await expect(page.url()).toMatch(/calculator|sbgfunding-calculator/);
  const pageTitle = await page.title();
  expect(pageTitle).toBeTruthy();
});

test('Resources menu - Navigate to Blog page from dropdown', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToBlog();
  
  await expect(page.url()).toContain('blog');
  const pageContent = await page.textContent('body');
  expect(pageContent).toBeTruthy();
});

test('Footer links - Verify Privacy Policy and Contact links are functional', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  
  await homePage.scrollToBottom();
  await homePage.waitForTimeout(1000);
  
  await expect(homePage.privacyPolicyLink).toBeVisible();
  await homePage.privacyPolicyLink.click();
  await expect(page.url()).toContain('privacy-policy');
  
  await page.goBack();
  await homePage.scrollToBottom();
  await homePage.waitForTimeout(1000);
  
  await expect(homePage.contactUsLink).toBeVisible();
  await homePage.contactUsLink.click();
  await expect(page.url()).toMatch(/contact|contact-us/);
});
