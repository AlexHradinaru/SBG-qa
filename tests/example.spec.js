// @ts-check
import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage.js";
import { AboutUsPage } from "../pages/AboutUsPage.js";
import { ConstructionPage } from "../pages/ConstructionPage.js";
import { DashboardPage } from "../pages/DashboardPage.js";

// ============================================
// BUG TESTS - Elements Visible But Not Clickable
// ============================================

test("BUG: About Us page - Apply Now button visible but not clickable due to swiper overlay", {tag: '@bug'}, async ({
  page,
}) => {
  const aboutUsPage = new AboutUsPage(page);
  await aboutUsPage.navigate();
  await aboutUsPage.scrollToBottomAndWait();

  await expect(aboutUsPage.applyNowLink).toBeVisible();
  await aboutUsPage.applyNowLink.click({ timeout: 3000 });
  await expect(page.url()).toContain("apply-now");
});

test("BUG: About Us page - Funding Calculator button visible but not clickable due to swiper overlay", {tag: '@bug'}, async ({
  page,
}) => {
  const aboutUsPage = new AboutUsPage(page);
  await aboutUsPage.navigate();
  await aboutUsPage.scrollToBottomAndWait();

  await expect(aboutUsPage.fundingCalculatorLink).toBeVisible();
  await aboutUsPage.fundingCalculatorLink.click({ timeout: 3000 });
  await expect(page.url()).toContain("sbgfunding-calculator");
});

// ============================================
// HOMEPAGE TESTS
// ============================================

test("Homepage - Verify page loads and title is correct", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();
  await expect(page).toHaveTitle(/SBG Funding|Business Financing/);
});

test("Homepage - Verify navigation menu is functional", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigate();

  await expect(homePage.resourcesLink).toBeVisible();
  await expect(homePage.aboutUsLink).toBeVisible();
  await expect(homePage.applyNowLink).toBeVisible();
});

test("Homepage - Verify Apply Now button in header is clickable", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  await homePage.navigate();

  await expect(homePage.applyNowLink).toBeVisible();
  await expect(homePage.applyNowLink).toBeEnabled();
  await homePage.applyNowLink.click();
  await expect(page.url()).toContain("apply-now");
});

// ============================================
// FORM AND PAGE LOAD TESTS
// ============================================

test("Construction page - Navigate from homepage and fill form without submitting", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  const constructionPage = new ConstructionPage(page);

  await homePage.navigateToConstruction();
  await expect(page.url()).toContain("construction");

  const formData = await constructionPage.fillForm();
  await constructionPage.verifyFormFilled(formData);
});

// ============================================
// ADDITIONAL TEST CASES
// ============================================

test("Funding Calculator - Navigate from header and verify calculator page loads", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  await homePage.navigate();

  await expect(homePage.fundingCalculatorLink).toBeVisible();
  await homePage.fundingCalculatorLink.click();

  await expect(page.url()).toMatch(/calculator|sbgfunding-calculator/);
  const pageTitle = await page.title();
  expect(pageTitle).toBeTruthy();
});

test("Resources menu - Navigate to Blog page from dropdown", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  await homePage.navigateToBlog();

  await expect(page.url()).toContain("blog");
  const pageContent = await page.textContent("body");
  expect(pageContent).toBeTruthy();
});

test("Footer links - Verify Privacy Policy and Contact links are functional", async ({
  page,
}) => {
  const homePage = new HomePage(page);
  await homePage.navigate();

  await homePage.scrollToBottom();

  await expect(homePage.privacyPolicyLink).toBeVisible();
  await homePage.privacyPolicyLink.click();
  await expect(page.url()).toContain("privacy-policy");

  await page.goBack();
  await homePage.scrollToBottomAndWait();

  await expect(homePage.contactUsLink).toBeVisible();
  await homePage.contactUsLink.click();
  await expect(page.url()).toMatch(/contact|contact-us/);
});

test("Cannot access dashboard without token", async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.navigate();
  await expect(page.url()).not.toContain("dashboard");

  const localStorage = await page.evaluate(() => {
    return Object.keys(window.localStorage).filter(
      (key) =>
        key.toLowerCase().includes("token") ||
        key.toLowerCase().includes("auth")
    );
  });

  const sessionStorage = await page.evaluate(() => {
    return Object.keys(window.sessionStorage).filter(
      (key) =>
        key.toLowerCase().includes("token") ||
        key.toLowerCase().includes("auth")
    );
  })
  expect(localStorage.length).toBe(0);
  expect(sessionStorage.length).toBe(0);
});
