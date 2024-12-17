import { test } from './fixtures';
import { expect } from '@playwright/test';
import { PurchasePage } from "../pages/buy";

test.describe('Purchase Page Functionality', () => {
  let purchasePage: PurchasePage;

  test.beforeEach(async ({ loggedIn }) => {
    purchasePage = new PurchasePage(loggedIn);
  });

  test('Successful order with valid inputs', async () => {
    // Arrange
    const productId = "4";
    const quantity = "4";
    const customerName = "Bo";
    const address = "Testgatan10";

    // Act
    await purchasePage.buyOne(productId, quantity, customerName, address);

    // Assert
    await expect(purchasePage.confirmationMessage).toBeVisible({
      timeout: 10000
    });

    const total = await purchasePage.receiptTotal.textContent();
    expect(total).toContain('$16');
  });

  test('Error handling for negative quantity input', async () => {
    // Arrange
    const productId = "4";
    const invalidQuantity = "-2";
    const customerName = "Bo";
    const address = "Testgatan10";

    // Act
    await purchasePage.buyOne(productId, invalidQuantity, customerName, address);

    // Assert
    await expect(purchasePage.buyMessage).toBeVisible({
      timeout: 5000 }
    );

    await expect(purchasePage.buyMessage).toHaveText(
      'Enter an amount higher than 0.',
      { timeout: 5000 }
    );
  });

  test('Order with minimum valid quantity', async () => {
    // Arrange
    const productId = "4";
    const minimumQuantity = "1";
    const customerName = "Bo";
    const address = "Testgatan10";

    // Act
    await purchasePage.buyOne(productId, minimumQuantity, customerName, address);

    // Assert
    await expect(purchasePage.confirmationMessage).toBeVisible({
      timeout: 10000,}
    );
  });
});