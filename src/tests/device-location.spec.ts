import { expect } from '@playwright/test';
import { test } from '../pages/base';
import { createDeviceLocation, getDeviceLocation } from '../helpers/device.helper';
import { CreateDeviceLocationRequest } from '../interfaces/device.interface';

/**
 * ✅ UNIT TESTS
 */
test.describe('Device Location - Unit Tests', () => {
  const deviceId: string = 'ebd9d8745175442ed3hms9';

  test('Should create a new device location successfully', async ({ request, baseURL }) => {
    const locationData: CreateDeviceLocationRequest = {
      device_id: deviceId,
      location: {
        latitude: '11',
        longitude: '111',
        name: 'Bot test',
      },
    };

    const body = await createDeviceLocation(request, baseURL!, locationData);

    expect(body).toEqual(expect.objectContaining({
      is_success: true,
      status_code: 200,
      message: 'Device location created successfully',
      data: true,
    }));
  });

  test('Should retrieve the device location successfully', async ({ request, baseURL }) => {
    const body = await getDeviceLocation(request, baseURL!, deviceId);

    expect(body).toEqual(expect.objectContaining({
      is_success: true,
      status_code: 200,
      message: 'Device location query successfully',
      data: expect.objectContaining({
        latitude: expect.any(String),
        longitude: expect.any(String),
        name: expect.any(String),
      }),
    }));
  });
});
