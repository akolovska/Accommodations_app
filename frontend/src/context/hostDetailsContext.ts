import { createContext } from 'react';
import type {HostRequest, HostResponse} from "../api/types/host.ts";

export interface HostDetailsContextType {
    host: HostResponse;
    loading: boolean;
    onEdit: (id: number, data: HostRequest) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const HostDetailsContext = createContext<HostDetailsContextType>({} as HostDetailsContextType);

export default HostDetailsContext;
