import { validateApiResponse } from '../utils/global';
import { CreateDeviceLocationRequest, ApiResponse, DeviceLocationData } from '../interfaces/device.interface';


// Device Location
export const createDeviceLocation = async (request: any, baseURL: string, data: CreateDeviceLocationRequest) => {
    const res = await request.post(`${baseURL}/v1/devices/locations`, { data });
    return validateApiResponse<ApiResponse<boolean>>(res, `${baseURL}/v1/devices/locations`);
};

export const getDeviceLocation = async (request: any, baseURL: string, deviceId: string) => {
    const res = await request.get(`${baseURL}/v1/devices/locations/${deviceId}`);
    return validateApiResponse<ApiResponse<DeviceLocationData>>(res, `${baseURL}/v1/devices/locations/${deviceId}`);
};

// Device Sync
export const syncAllDevices = async (request: any, baseURL: string) => {
    const res = await request.post(`${baseURL}/v1/devices/sync`);
    return validateApiResponse<ApiResponse<boolean>>(res, `${baseURL}/v1/devices/sync`);
};

export const syncDevicesForUser = async (request: any, baseURL: string, userId: string) => {
    const res = await request.post(`${baseURL}/v1/devices/sync/users/${userId}`);
    return validateApiResponse<ApiResponse<boolean>>(res, `${baseURL}/v1/devices/sync/users/${userId}`);
};