import { validateApiResponse } from '../utils/global';
import { CreateAlertRequest, CreateAlertResponse } from '../interfaces/alerts.interface';

export const createAlert = async (request: any, baseURL: string, data: CreateAlertRequest): Promise<CreateAlertResponse> => {
  const res = await request.post(`${baseURL}/v1/alerts`, { data });
  return validateApiResponse<CreateAlertResponse>(res, `${baseURL}/v1/alerts`);
};

export const updateAlertStatus = async (request: any, baseURL: string, alertId: string, status: number): Promise<string> => {
  const res = await request.put(`${baseURL}/v1/alerts/${alertId}/status`, {
    data: { status },
  });
  return validateApiResponse<string>(res, `${baseURL}/v1/alerts/${alertId}/status`);
};