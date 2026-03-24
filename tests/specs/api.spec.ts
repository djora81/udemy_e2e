import { RegistrationBuilder } from '../builders/registration.builder';
import { test, expect } from '../fixtures/registration.fixtures';
import { BasketPage } from '../pages/basket.page';
import { CatalogPage } from '../pages/catalog.page';
import { LoginPage } from '../pages/login.page';
import { RegistrationPage } from '../pages/registration.page';

test.describe('API Tests', () => {
  test('GET placeholder api test', async ({ request }) => {
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody).toHaveProperty('id', 1);
    expect(responseBody).toHaveProperty('title');
  });

  test('POST api test', async ({ request }) => {
    const response = await request.post('https://jsonplaceholder.typicode.com/posts', {
      data: {
        title: 'b ready crew',
        body: 'cafe bar anna',
        userId: 191,
        qwerty: 2345,
        bookTitle: 'Book Title',
        author: 'John Doe',
      },
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },

    });
    expect(response.status()).toBe(201);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody).toHaveProperty('title', 'b ready crew');
    expect(responseBody).toHaveProperty('body', 'cafe bar anna');
    expect(responseBody).toHaveProperty('userId', 191);
    expect(responseBody).toHaveProperty('qwerty', 2345);
    expect(responseBody).toHaveProperty('bookTitle', 'Book Title');
    expect(responseBody).toHaveProperty('author', 'John Doe');
  });

});
  