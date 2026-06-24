import { createContext } from 'react';
import type {RentalRequest, RentalResponse} from "../api/types/rental.ts";

export interface RentalsContextType {
    rentals: RentalResponse[];
    loading: boolean;
    onAdd: (data: RentalRequest) => Promise<void>;
    onEdit: (id: number, data: RentalRequest) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const RentalsContext = createContext<RentalsContextType>({} as RentalsContextType);

export default RentalsContext;
