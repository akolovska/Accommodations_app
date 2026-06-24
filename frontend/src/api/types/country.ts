export interface Country {
    id: number,
    name: string;
    continent: string;
}
export interface CountryResponse {
    id: number,
    name: string;
    continent: string;
}
export interface CountryRequest {
    name: string;
    continent: string;
}