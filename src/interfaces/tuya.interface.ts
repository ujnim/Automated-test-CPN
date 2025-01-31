export interface TuyaUser {
    uId: string;
    username: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    countryCode: string;
}

export interface TuyaAccessTokenResult {
    access_token: string;
    expire_time: number;
    refresh_token: string;
    uid: string;
}

export interface TuyaAccessTokenResponse {
    result: TuyaAccessTokenResult;
    code: number;
    msg: string;
    success: boolean;
    t: number;
    tid: string;
}
