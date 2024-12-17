import { test } from './fixtures'
import { expect } from '@playwright/test';

test('Verify successful login', async ({ loggedIn, store }) => {
  
    const usernameLocator = store.usernameText; 

    await expect(usernameLocator).toBeVisible({
        timeout: 80000,
      });
    const username = await usernameLocator.textContent();
  
    const header = await store.header.textContent() ?? '';
    expect(header).toBe('Store');
  });

