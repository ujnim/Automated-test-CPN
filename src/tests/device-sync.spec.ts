// tests/device-sync.spec.ts
import { expect } from '@playwright/test';
import { test } from '../pages/base';
import { syncAllDevices, syncDevicesForUser } from '../helpers/device.helper';

/**
 * ✅ UNIT TESTS
 */
test.describe('Device Sync - Unit Tests', () => {
  const userId: string = '2';

  test('Should synchronize all devices successfully', async ({ request, baseURL }) => {
    const body = await syncAllDevices(request, baseURL!);

    expect(body).toEqual(expect.objectContaining({
      is_success: true,
      status_code: 200,
      message: 'Devices synced successfully',
      data: true,
    }));
  });

  test('Should synchronize devices for a specific user successfully', async ({ request, baseURL }) => {
    const body = await syncDevicesForUser(request, baseURL!, userId);

    expect(body).toEqual(expect.objectContaining({
      is_success: true,
      status_code: 200,
      message: 'Devices synced successfully',
      data: true,
    }));
  });
});
