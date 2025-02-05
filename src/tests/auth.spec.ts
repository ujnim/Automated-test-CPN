// tests/authentication.spec.ts
import { expect } from '@playwright/test';
import { test } from '../pages/base';
import { loginUser, refreshToken as refreshTokenFunc, logoutUser } from '../helpers/auth.helper';

/**
 * ✅ UNIT TESTS
 */
test.describe('Authentication API - Unit Tests', () => {
  let accessToken: string;

  test.beforeEach(async ({ request, baseURL }) => {
    const response = await loginUser(request, baseURL!, 'admin', 'admin');

    expect(response).toEqual(expect.objectContaining({
      is_success: true,
      status_code: 200,
      message: 'Login successful',
      data: expect.objectContaining({
          access_token: expect.any(String),  // access_token อยู่ตรงนี้
          user: expect.objectContaining({
              id: expect.any(Number),
              username: expect.any(String),
              email: expect.any(String),
              role: expect.any(String),
              tenant_id: expect.any(Number),
          }),
      }),
  }));
    accessToken = response.data.access_token;
  });

  test('Should generate access and refresh tokens after successful login', async () => {
    expect(accessToken).toBeDefined();
  });

  test('Should issue new access and refresh tokens when refreshing token', async ({ request, baseURL }) => {
    const response = await refreshTokenFunc(request, baseURL!, accessToken);

    expect(response).toEqual(expect.objectContaining({
      is_success: true,
      status_code: 200,
      message: 'Refresh token successful',
      data: expect.objectContaining({
        access_token: expect.any(String)
      }),
    }));
  });

  test('Should revoke authentication tokens after logout', async ({ request, baseURL }) => {
    const response = await logoutUser(request, baseURL!, accessToken);

    expect(response).toEqual(expect.objectContaining({
      is_success: true,
      status_code: 200,
      message: 'Logout successful',
      data: true,
    }));
  });
});
