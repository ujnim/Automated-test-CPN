export interface DeviceLocationData {
    latitude: string;
    longitude: string;
    name: string;
}

export interface CreateDeviceLocationRequest {
    device_id: string;
    location: DeviceLocationData;
}

export interface ApiResponse<T> {
    is_success: boolean;
    status_code: number;
    message: string;
    data: T;
}
