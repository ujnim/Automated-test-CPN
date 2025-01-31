export interface UserProfile {
    first_name: string;
    last_name: string;
    contact: {
        phone_number: string;
        country_code: string;
    };
    address: {
        address_1: string;
        address_2: string;
        district: string;
        sub_district: string;
        province: string;
        zip_code: string;
    };
}

export interface ApiResponse<T> {
    is_success: boolean;
    status_code: number;
    message: string;
    data: T;
}