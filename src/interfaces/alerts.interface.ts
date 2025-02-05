export interface AlertLocation {
    lat: number;
    lng: number;
    name: string;
    location_type: number;
}

export interface CreateAlertRequest {
    device_id: string;
}

export interface CreateAlertResponse {
    id: string;
    username: string;
    tenantId: number;
    alertStatus: number;
    location: {
        lat: number;
        lng: number;
        name: string;
        locationType: number;
    };
}