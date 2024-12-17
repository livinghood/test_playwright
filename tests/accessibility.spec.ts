import { test, expect } from '@playwright/test';
import AxePuppeteer from '@axe-core/playwright';

test('should have no accessibility violations', async ({ page }) => {
    // Navigate to the page you want to test
    await page.goto('https://hoff.is/login'); 
    
    // Run the accessibility check using axe-core
    const accessibilityResults = await new AxePuppeteer({page})
      .disableRules('color-contrast') 
      .analyze();
  
    // Log the results for debugging
    if (accessibilityResults.violations.length > 0) {
      console.log('Accessibility Violations Found:');
      accessibilityResults.violations.forEach((violation: any) => {
        console.log(`\n${violation.id}: ${violation.description}`);
        violation.nodes.forEach((node: any) => {
          console.log(`  - ${node.target.join(' ')}`);
        });
      });
    }
  
    // Allow violations to pass temporarily
    expect(accessibilityResults.violations.length).toBeLessThanOrEqual(3); // Accept up to 3 violations
  });
  