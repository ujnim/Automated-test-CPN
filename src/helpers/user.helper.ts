import { validateApiResponse } from '../utils/global';
import { UserProfile, ApiResponse } from '../interfaces/user.interface';
import { fakerTH as faker } from '@faker-js/faker';

export const syncUsers = async (request: any, baseURL: string) => {
  const res = await request.get(`${baseURL}/v1/users/sync`);
  return validateApiResponse<ApiResponse<boolean>>(res, `${baseURL}/v1/users/sync`);
};

export const createUserProfile = async (request: any, baseURL: string, userId: string) => {
  const profileData: UserProfile = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    contact: {
      phone_number: `08${faker.number.int({ min: 10000000, max: 99999999 })}`,
      country_code: '66',
    },
    address: {
      address_1: faker.location.streetAddress(),
      address_2: faker.location.secondaryAddress(),
      district: faker.location.city(),
      sub_district: faker.location.city(),
      province: faker.location.state(),
      zip_code: faker.location.zipCode('#####'),
    },
  };

  const res = await request.post(`${baseURL}/v1/users/${userId}/profile`, {
    data: profileData,
  });

  return validateApiResponse<ApiResponse<boolean>>(res, `${baseURL}/v1/users/${userId}/profile`);
};

export const getUserProfile = async (request: any, baseURL: string, userId: string) => {
  const res = await request.get(`${baseURL}/v1/users/${userId}/profile`);
  return validateApiResponse<ApiResponse<UserProfile>>(res, `${baseURL}/v1/users/${userId}/profile`);
};

export const updateUserProfile = async (request: any, baseURL: string, userId: string) => {
  const profileData: UserProfile = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    contact: {
      phone_number: `08${faker.number.int({ min: 10000000, max: 99999999 })}`,
      country_code: '66',
    },
    address: {
      address_1: faker.location.streetAddress(),
      address_2: faker.location.secondaryAddress(),
      district: faker.location.city(),
      sub_district: faker.location.city(),
      province: faker.location.state(),
      zip_code: faker.location.zipCode('#####'),
    },
  };

  const res = await request.put(`${baseURL}/v1/users/${userId}/profile`, {
    data: profileData,
  });

  return validateApiResponse<ApiResponse<boolean>>(res, `${baseURL}/v1/users/${userId}/profile`);
};
