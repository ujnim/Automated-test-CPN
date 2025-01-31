import { validateApiResponse } from '../utils/global';
import { AuthResponse, ApiResponse } from '../interfaces/auth.interface';

export const loginUser = async (request: any, baseURL: string, identifier: string, password: string): Promise<AuthResponse> => {
  const res = await request.post(`${baseURL}/v1/auth/login`, {
    data: { identifier, password },
  });
  return validateApiResponse<AuthResponse>(res, `${baseURL}/v1/auth/login`);
};

export const refreshToken = async (request: any, baseURL: string, refreshToken: string, accessToken: string): Promise<AuthResponse> => {
  const res = await request.post(`${baseURL}/v1/auth/refresh-token`, {
    data: { refresh_token: refreshToken, access_token: accessToken },
  });
  return validateApiResponse<AuthResponse>(res, `${baseURL}/v1/auth/refresh-token`);
};

export const logoutUser = async (request: any, baseURL: string, refreshToken: string): Promise<ApiResponse<boolean>> => {
  const res = await request.post(`${baseURL}/v1/auth/logout`, {
    data: { refresh_token: refreshToken },
  });
  return validateApiResponse<ApiResponse<boolean>>(res, `${baseURL}/v1/auth/logout`);
};