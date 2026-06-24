import axiosInstance from "../axios/axios.ts";
import type {CountryRequest, CountryResponse} from "./types/country.ts";

const countryApi = {
    findAll: async () => {
        return await axiosInstance.get<CountryResponse[]>('/countries')
    },
    findById: async (id: string) => {
        return await axiosInstance.get<CountryResponse>(`/countries/${id}`)
    },
    add: async (data: CountryRequest) => {
        return await axiosInstance.post<CountryResponse>('/countries/add', data);
    },
    edit: async (id: string, data: CountryRequest) => {
        return await axiosInstance.put<CountryResponse>(`/countries/${id}/edit`, data);
    },
    delete: async (id: string) => {
        return await axiosInstance.delete<CountryResponse>(`/countries/${id}/delete`);
    }
}
export default countryApi;