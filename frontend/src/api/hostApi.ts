import axiosInstance from "../axios/axios.ts";
import type {HostRequest, HostResponse} from "./types/host.ts";

const hostApi = {
    findAll: async () => {
        return await axiosInstance.get<HostResponse[]>('/hosts')
    },
    findById: async (id: string) => {
        return await axiosInstance.get<HostResponse>(`/hosts/${id}`)
    },
    add: async (data: HostRequest) => {
        return await axiosInstance.post<HostResponse>('/hosts/add', data);
    },
    edit: async (id: string, data: HostRequest) => {
        return await axiosInstance.put<HostResponse>(`/hosts/${id}/edit`, data);
    },
    delete: async (id: string) => {
        return await axiosInstance.delete<HostResponse>(`/hosts/${id}/delete`);
    }
}
export default hostApi;