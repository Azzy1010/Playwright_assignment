import { test } from '@playwright/test';
import { DarazPage } from '../pages/DarazPage';
import { captureAndAttachScreenshot } from '../utilities/utilities';

test('Complete flow: search, click, add to cart', async ({ page }, testInfo) => {
  const productTitle = "Cool Skateboard Bear Print Short Sleeve T-shirt, Casual Trendy Round Neck Comfy Summer Tops, Boy's Clothing";
  const email = "temp@gmail.com";
  const password = "0304**qase";
  const url = "https://www.daraz.pk/"

  const daraz = new DarazPage(page, testInfo);

  await daraz.goto(url);
  await captureAndAttachScreenshot(page, testInfo, 'Page_loaded');

  await daraz.searchProduct(productTitle);

  await daraz.clickOnProduct(productTitle);
  await daraz.verifyProductTitleVisible(productTitle);
  await daraz.addToCart();
  await daraz.enter_email_and_password(email,password)
});