import { Page, TestInfo } from '@playwright/test';
import path from 'path';

export async function captureAndAttachScreenshot(page: Page, testInfo: TestInfo, name: string) {
  const screenshotPath = path.join(process.cwd(), 'screenshot', `${name}.png`);
  const screenshot = await page.screenshot({ path: screenshotPath, fullPage: true });
  await testInfo.attach(name, {
    body: screenshot,
    contentType: 'image/png',
  });
}