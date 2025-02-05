import { expect } from '@playwright/test';
import { test } from '../pages/base';
import { createAlert, updateAlertStatus } from '../helpers/alerts.helper';
import { CreateAlertRequest } from '../interfaces/alerts.interface';

/**
 * ✅ UNIT TESTS
 */
test.describe('Alerts - Unit Tests', () => {
  let alertId: string;

  test('Should create a new alert and synchronize devices successfully', async ({ request, baseURL }) => {
    const alertData: CreateAlertRequest = {
      device_id: 'ebd9d8745175442ed3hms9'
    };

    const body = await createAlert(request, baseURL!, alertData);

    expect(body).toEqual(expect.objectContaining({
      id: expect.any(String),
      username: expect.any(String),
      tenantId: expect.any(Number),
      alertStatus: expect.any(Number),
      location: {
        lat: expect.any(Number),
        lng: expect.any(Number),
        name: expect.any(String),
        locationType: expect.any(Number),
      },
    }));

    alertId = body.id;
  });

  test('Should update the alert status successfully for the created alert', async ({ request, baseURL }) => {
    expect(alertId).toBeDefined();

    const body = await updateAlertStatus(request, baseURL!, alertId, 1);
    expect(body).toContain('already resolved.');
  });
});