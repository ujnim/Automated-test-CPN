export type TenantResponse = Tenant[];

export interface Tenant {
    id: number;
    username: string;
    email: string;
    contact: Contact;
    profile: Profile;
    devices: Device[];
}

export interface Contact {
    phoneNumber: string;
}

export interface Profile {
    firstName: string;
    lastName: string;
}

export interface Device {
    id: string;
    productName: string;
    name: string;
    model: string;
}

export interface TenantQuery {
    Page?: number;
    PageSize?: number;
    Search?: string;
    SortBy?: string;
    SortOrder?: string
}
