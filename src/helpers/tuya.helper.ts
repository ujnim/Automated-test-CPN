import { validateApiResponse } from '../utils/global';
import { TuyaUser, TuyaAccessTokenResponse } from '../interfaces/tuya.interface';

export const getTuyaUsers = async (request: any, baseURL: string) => {
  const res = await request.get(`${baseURL}/v1/users/tuya`);
  return validateApiResponse<{ users: { value: TuyaUser[]; errorMessage: string; isSuccess: boolean; isFailure: boolean; statusCode: number } }>(res, `${baseURL}/v1/users/tuya`);
};

export const getTuyaAccessToken = async (request: any, baseURL: string) => {
  const res = await request.get(`${baseURL}/v1/users/tuya/token`);
  return validateApiResponse<{ access_token: TuyaAccessTokenResponse }>(res, `${baseURL}/v1/users/tuya/token`);
};