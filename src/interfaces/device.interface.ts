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

export interface DevicesStatusResponse {
    is_success: boolean;
    status_code: number;
    message: string;
    data: DeviceStatus[];
}

export interface DeviceStatus {
    id: string;
    uuid: string;
    category: string;
    customName: string;
    productId: string;
    productName: string;
    model: string;
    icon: string;
    ip: string;
    lat: string;
    lon: string;
    timeZone: string;
    isOnline: boolean;
    location: any;
}
