import { createContext } from 'react';
import type {CountryRequest, CountryResponse} from "../api/types/country.ts";

export interface CountryDetailsContextType {
    country: CountryResponse;
    loading: boolean;
    onEdit: (id: number, data: CountryRequest) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const countryDetailsContext = createContext<CountryDetailsContextType>({} as CountryDetailsContextType);

export default countryDetailsContext;
