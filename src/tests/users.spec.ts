// tests/user-profile.spec.ts
import { expect } from '@playwright/test';
import { test } from '../pages/base';
import { syncUsers, createUserProfile, getUserProfile, updateUserProfile } from '../helpers/user.helper';

/**
 * ✅ UNIT TESTS
 */
test.describe.serial('Users - Unit Tests', () => {
    const userId: string = '1';

    test('Should create a new user profile successfully', async ({ request, baseURL }) => {
        const body = await createUserProfile(request, baseURL!, userId);

        expect(body).toEqual(expect.objectContaining({
            is_success: true,
            status_code: 200,
            message: 'User profile created successfully',
            data: true,
        }));
    });

    test('Should retrieve an existing user profile successfully', async ({ request, baseURL }) => {
        const body = await getUserProfile(request, baseURL!, userId);

        expect(body).toEqual(expect.objectContaining({
            is_success: true,
            status_code: 200,
            message: 'User profile retrieved successfully',
            data: expect.objectContaining({
                first_name: expect.any(String),
                last_name: expect.any(String),
                contact: {
                    phone_number: expect.any(String),
                    country_code: expect.any(String),
                },
                address: {
                    address_1: expect.any(String),
                    address_2: expect.any(String),
                    district: expect.any(String),
                    sub_district: expect.any(String),
                    province: expect.any(String),
                    zip_code: expect.any(String),
                },
            }),
        }));
    });

    test('Should update user profile successfully', async ({ request, baseURL }) => {
        const body = await updateUserProfile(request, baseURL!, userId);

        expect(body).toEqual(expect.objectContaining({
            is_success: true,
            status_code: 200,
            message: 'User profile updated successfully',
            data: true,
        }));
    });

    test('Should successfully synchronize user data', async ({ request, baseURL }) => {
        const body = await syncUsers(request, baseURL!);

        expect(body).toEqual(expect.objectContaining({
            is_success: true,
            status_code: 200,
            message: 'Users synced successfully',
            data: true,
        }));
    });
});
