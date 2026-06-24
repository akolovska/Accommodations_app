import { createContext } from 'react';
import type {HostRequest, HostResponse} from "../api/types/host.ts";

export interface HostsContextType {
    hosts: HostResponse[];
    loading: boolean;
    onAdd: (data: HostRequest) => Promise<void>;
    onEdit: (id: number, data: HostRequest) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const HostsContext = createContext<HostsContextType>({} as HostsContextType);

export default HostsContext;
