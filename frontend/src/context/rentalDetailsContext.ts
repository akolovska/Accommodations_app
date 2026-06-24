import { createContext } from 'react';
import type {RentalProjection, RentalRequest} from "../api/types/rental.ts";

export interface RentalDetailsContextType {
    rental: RentalProjection;
    loading: boolean;
    onEdit: (id: number, data: RentalRequest) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const RentalDetailsContext = createContext<RentalDetailsContextType>({} as RentalDetailsContextType);

export default RentalDetailsContext;
