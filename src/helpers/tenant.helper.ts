import { validateApiResponse } from '../utils/global';
import { TenantQuery, TenantResponse } from '../interfaces/tenant.interface';

// Device Location
export const getTenantUsers = async (request: any, baseURL: string, tenantId: string, data: TenantQuery) => {
    const res = await request.get(`${baseURL}/v1/domains/${tenantId}/users`, { data });
    return validateApiResponse<TenantResponse>(res, `${baseURL}/v1/domains/${tenantId}/users`);
};

export const getTenantDevices = async (request: any, baseURL: string, tenantId: string, data: TenantQuery) => {
    const res = await request.get(`${baseURL}/v1/domains/${tenantId}/devices` , {data});
    return validateApiResponse<TenantResponse>(res, `${baseURL}/v1/domains/${tenantId}/devices`);
};
