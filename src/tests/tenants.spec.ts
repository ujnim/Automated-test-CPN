// tests/device-sync.spec.ts
import { expect } from '@playwright/test';
import { test } from '../pages/base';
import { getTenantDevices, getTenantUsers } from '../helpers/tenant.helper';
import { TenantQuery } from '../interfaces/tenant.interface';
/**
 * ✅ UNIT TESTS
 */
test.describe('Tenants - Unit Tests', () => {
  const tenantId: string = '1';

  const data: TenantQuery = {
    Page: 1,
    PageSize: 1,
    Search: "",
    SortBy: "",
    SortOrder: ""
  };

  test('Should retrieve and verify all tenant users and their devices successfully', async ({ request, baseURL }) => {

    const body = await getTenantUsers(request, baseURL!, tenantId, data);

    expect(body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        username: expect.any(String),
        email: expect.any(String),
        contact: expect.objectContaining({
          phoneNumber: expect.any(String),
        }),
        profile: expect.objectContaining({
          firstName: expect.any(String),
          lastName: expect.any(String),
        }),
        devices: expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            productName: expect.any(String),
            name: expect.any(String),
            model: expect.any(String),
          }),
        ]),
      }),
    ]));
  });


  test.only('Should retrieve and verify all devices for the tenant successfully', async ({ request, baseURL }) => {

    const body = await getTenantDevices(request, baseURL!, tenantId, data);

    expect(body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        productName: expect.any(String),
        name: expect.any(String),
        model: expect.any(String),
      }),
    ]));
  });
});
