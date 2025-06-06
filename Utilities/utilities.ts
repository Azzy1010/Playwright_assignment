import { Page, TestInfo } from '@playwright/test';

export async function captureAndAttachScreenshot(page: Page, testInfo: TestInfo, name: string) {
  const screenshot = await page.screenshot({ path: `${name}.png`, fullPage: true });
  await testInfo.attach(name, {
    body: screenshot,
    contentType: 'image/png',
  });
}