import axiosInstance from '../axios/axios.ts';
import type {RentalProjection, RentalRequest, RentalResponse} from "./types/rental.ts";

const rentalApi = {
    findAll: async () => {
        return await axiosInstance.get<RentalResponse[]>('/rentals')
    },
    findById: async (id: string) => {
        return await axiosInstance.get<RentalProjection>(`/rentals/${id}`)
    },
    add: async (data: RentalRequest) => {
        return await axiosInstance.post<RentalResponse>('/rentals/add', data);
    },
    edit: async (id: string, data: RentalRequest) => {
        return await axiosInstance.put<RentalResponse>(`/rentals/${id}/edit`, data);
    },
    delete: async (id: string) => {
        return await axiosInstance.delete<RentalResponse>(`/rentals/${id}/delete`);
    }

}

export default rentalApi;