import { test, expect } from '@playwright/test';

  test('Validate response from /price/1', async ({ request }) => {
    const response = await request.get('https://hoff.is/store2/api/v1/price/4');

    // Check response validation
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    // Parsing 
    const jsonData = await response.json();

    // Validate schema
    expect(jsonData).toMatchObject({
        id: expect.any(Number),
        price: expect.any(Number),
        vat: expect.any(Number),
        name: expect.any(String)
      });
      
      // Assert
      expect(jsonData.id).toBe(4);
      expect(jsonData.name).toBe('Grape');
      expect(jsonData.price).toBeGreaterThan(0);
      expect(jsonData.vat).toBeGreaterThan(0);
    });
    
  
