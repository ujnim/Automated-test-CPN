// tests/tuya-integration.spec.ts
import { expect } from '@playwright/test';
import { test } from '../pages/base';
import { getTuyaUsers, getTuyaAccessToken } from '../helpers/tuya.helper';

/**
 * ✅ UNIT TESTS
 */
test.describe('Tuya Integration - Unit Tests', () => {
    test('Should synchronize all Tuya devices successfully', async ({ request, baseURL }) => {
        const body = await getTuyaUsers(request, baseURL!);

        expect(body).toEqual(expect.objectContaining({
            users: expect.objectContaining({
                value: expect.arrayContaining([
                    expect.objectContaining({
                        uId: expect.any(String),
                        username: expect.any(String),
                        email: expect.any(String),
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                        countryCode: expect.any(String),
                    }),
                ]),
                errorMessage: expect.any(String),
                isSuccess: true,
                isFailure: false,
                statusCode: 200,
            }),
        }));
    });

    test('Should retrieve Tuya access token successfully', async ({ request, baseURL }) => {
        const body = await getTuyaAccessToken(request, baseURL!);

        expect(body).toEqual(expect.objectContaining({
            access_token: expect.objectContaining({
                result: expect.objectContaining({
                    access_token: expect.any(String),
                    expire_time: expect.any(Number),
                    refresh_token: expect.any(String),
                    uid: expect.any(String),
                }),
                code: expect.any(Number),
                msg: expect.any(String),
                success: true,
                t: expect.any(Number),
                tid: expect.any(String),
            }),
        }));
    });
});
