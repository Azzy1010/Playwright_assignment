import { Page, expect, TestInfo } from '@playwright/test';
import { captureAndAttachScreenshot } from '../utilities/utilities';

export class DarazPage {
  constructor(private page: Page, private testInfo: TestInfo) {}

  // 🎯 LOCATORS AS GETTERS
  private get searchInput() {
    return this.page.locator('#q');
  }

  private get addToCartButton() {
    return this.page.locator("//*[text()='Add to Cart']");
  }

  private productLink(productTitle: string) {
    return this.page.locator(`//a[@title="${productTitle}"]`);
  }

  private productHeading(productTitle: string) {
    return this.page.getByRole('heading', { name: productTitle });
  }

   private get email() {
    return this.page.locator("//input[@placeholder='Please enter your Phone or Email' and @class='iweb-input']");
  }
  private get password() {
    return this.page.locator("//input[@placeholder='Please enter your password' and @class='iweb-input']");
  }

  private get Login() {
    return this.page.locator("//*[text()='LOGIN']");
  }

  // METHODS
  async goto(url: string) {
    await this.page.goto(url);
    await expect(this.page).toHaveURL(/daraz/);
  }

  async searchProduct(productTitle: string) {
    await this.searchInput.fill(productTitle);
    await captureAndAttachScreenshot(this.page, this.testInfo, 'Product_entered');
    await this.page.keyboard.press('Enter');
  }

  async clickOnProduct(productTitle: string) {
    await this.page.waitForTimeout(3000);
    await captureAndAttachScreenshot(this.page, this.testInfo, 'Product_visible');
    await this.productLink(productTitle).click();
  }

  async verifyProductTitleVisible(productTitle: string) {
    await expect(this.productHeading(productTitle)).toBeVisible();
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.page.waitForTimeout(2000);
    await captureAndAttachScreenshot(this.page, this.testInfo, 'Added_to_cart');
  }

  async enter_email_and_password(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.page.waitForTimeout(2000);
    await captureAndAttachScreenshot(this.page, this.testInfo, 'Login_details_entered');
    this.Login.click();
    await this.page.waitForTimeout(10000);
  }
}