export interface AuthTokens {
    access_token: string;
    refresh_token: string;
}

export interface AuthResponse extends ApiResponse<AuthTokens> { }

export interface ApiResponse<T> {
    is_success: boolean;
    status_code: number;
    message: string;
    data: T;
}
