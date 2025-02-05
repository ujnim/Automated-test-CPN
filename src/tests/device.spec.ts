// tests/device-sync.spec.ts
import { expect } from '@playwright/test';
import { test } from '../pages/base';
import { syncAllDevices, syncDevicesForUser, createDeviceLocation, getDeviceLocation, devicesForUser } from '../helpers/device.helper';
import { CreateDeviceLocationRequest, DevicesStatusResponse, DeviceStatus } from '../interfaces/device.interface';
/**
 * ✅ UNIT TESTS
 */
test.describe('Device - Unit Tests', () => {
  const userId: string = '2';
  const deviceId: string = 'ebd9d8745175442ed3hms9';

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

  test('Should retrieve a list of devices for the user successfully', async ({ request, baseURL }) => {
    const body: DevicesStatusResponse = await devicesForUser(request, baseURL!, userId);

    expect(body).toEqual(expect.objectContaining({
      is_success: true,
      status_code: 200,
      message: expect.stringContaining('Successfully retrieve devices from userId'),
      data: expect.any(Array),
    }));

    expect(body.data).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        uuid: expect.any(String),
        category: expect.any(String),
        customName: expect.stringMatching(/^\s*.*\s*$/),     // รองรับค่าว่าง
        productId: expect.any(String),
        productName: expect.stringMatching(/^\s*.*\s*$/),    // รองรับค่าว่างหรือข้อความที่มีช่องว่าง
        model: expect.any(String),
        name: expect.stringMatching(/^\s*.*\s*$/),           // รองรับช่องว่าง
        icon: expect.any(String),
        ip: expect.any(String),
        lat: expect.any(String),
        lon: expect.any(String),
        timeZone: expect.any(String),
        isOnline: expect.any(Boolean),
        // location: expect.toBeNull()
      }),
    ]));
  });
});
