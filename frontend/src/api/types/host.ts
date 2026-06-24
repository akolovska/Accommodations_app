import type { Country } from './country.ts'

export interface Host {
    id: number,
    name: string;
    surname: string;
    country: Country;
}

export interface HostResponse {
    id: number,
    name: string;
    surname: string;
    country: Country;
}
export interface HostRequest {
    name: string;
    surname: string;
    country: Country;
}