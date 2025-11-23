# SBG Funding - Playwright Test Suite

Automated end-to-end test suite for [SBG Funding](https://sbgfunding.com/) website using Playwright and Page Object Model (POM) pattern.

---

## 🐛 Bugs Found

### Critical UI Issues
[[Watch the video]](https://youtu.be/zaLI8K0mRYo) 

1. **About Us Page - Apply Now Button Not Clickable**
   - **Location:** `/about-us/` page
   - **Issue:** After scrolling to the bottom, the "Apply Now" button in the header is visible but not clickable due to a swiper overlay blocking pointer events
   - **Impact:** Users cannot access the application form from the About Us page after scrolling
   - **Test:** `BUG: About Us page - Apply Now button visible but not clickable due to swiper overlay`

2. **About Us Page - Funding Calculator Button Not Clickable**
   - **Location:** `/about-us/` page
   - **Issue:** After scrolling to the bottom, the "Funding Calculator" link in the header is visible but not clickable due to the same swiper overlay
   - **Impact:** Users cannot access the funding calculator from the About Us page after scrolling
   - **Test:** `BUG: About Us page - Funding Calculator button visible but not clickable due to swiper overlay`

**⚠️ Important Note:** These bugs were discovered using a viewport size of 1920x1080. If the development team is using Playwright's default viewport (1280x720) or smaller, they may not be reproducing these issues. The overlay blocking behavior appears to be viewport-dependent, which is why these bugs may have gone unnoticed. It's recommended to test at multiple viewport sizes, especially desktop resolutions (1920x1080 and above) where users typically browse.

![Screenshot of a visible but not clickable element](assets/ScreenshotEdited.png)
---

## 📂 Project Structure

```
SBG-qa/
├── pages/
│   ├── BasePage.js          # Common functionality and shared elements
│   ├── HomePage.js          # Homepage-specific actions and elements
│   ├── AboutUsPage.js       # About Us page functionality
│   ├── ConstructionPage.js # Construction page form handling
│   └── DashboardPage.js    # Dashboard page functionality
├── helpers/
│   └── dataGenerator.js     # Test data generation using Faker.js
├── fixtures/                # Playwright fixtures (for future use)
├── tests/
│   └── example.spec.js     # Test suite
├── playwright.config.js     # Playwright configuration with baseURL
└── package.json            # Dependencies and npm scripts
```

---

## 🧪 Test Coverage

- **Homepage Tests:** Page load, navigation menu, header buttons
- **Navigation Tests:** Dropdown menus, footer links, page transitions
- **Form Tests:** Construction page form filling and validation with random test data
- **Security Tests:** Dashboard access control verification
- **Bug Tests:** Documented UI issues with overlay blocking interactions

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
npx playwright install
```

### Run Tests

```bash
# Run all tests
npx playwright test

# Run tests in headed mode
npx playwright test --headed

# Run specific test file
npx playwright test tests/example.spec.js

# Run tests in specific browser
npx playwright test --project=chromium
```

---

## 🔄 CI/CD Implementation

This project includes GitHub Actions CI/CD workflow (`.github/workflows/playwright.yml`) that automatically runs tests on:
- Push to `main` or `master` branches
- Pull requests to `main` or `master` branches

**Current Status:** The CI/CD pipeline is currently failing because the documented bugs are still active. The bug tests are intentionally designed to fail until the issues are resolved. Once the overlay blocking issues on the About Us page are fixed, all tests (including the bug tests) will pass and the CI/CD pipeline will show green status.

The workflow:
1. Installs dependencies
2. Installs Playwright browsers
3. Runs all tests
4. Uploads test reports as artifacts (available for 30 days)

---

## 🏗️ Page Object Model

The project uses a simple POM structure for maintainability:

- **BasePage:** Common methods (navigation, scrolling) and shared elements. All page objects extend this base class.
- **HomePage:** Homepage-specific elements and navigation methods
- **AboutUsPage:** About Us page functionality
- **ConstructionPage:** Form handling with reusable `fillForm()` method that accepts test data
- **DashboardPage:** Dashboard page functionality and access control

### Key Features

- **baseURL Configuration:** All page objects use relative URLs that automatically use the `baseURL` from `playwright.config.js`
- **Test Data Generation:** Uses `@faker-js/faker` to generate random test data for forms
- **Reusable Methods:** Common actions like `scrollToBottomAndWait()` are available in BasePage

## 📊 Test Data Generation

The project uses **Faker.js** for generating realistic test data:

- **Location:** `helpers/dataGenerator.js`
- **Features:**
  - Random names, emails, phone numbers
  - Business names and revenue amounts
  - Dropdown option selection (Time in Business, Credit Score)
- **Usage:** The `ConstructionPage.fillForm()` method automatically generates random data if none is provided
---

## 🛠️ Tech Stack

- **Playwright** - End-to-end testing framework
- **JavaScript** - Test implementation
- **Page Object Model (POM)** - Test architecture pattern
- **@faker-js/faker** - Test data generation library

---

## 📝 Notes

- Viewport size: 1920x1080 (configurable in `playwright.config.js`)
- Tests include both positive test cases and bug documentation
- All tests use async/await for better readability