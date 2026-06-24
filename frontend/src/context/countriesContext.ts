import { createContext } from 'react';
import type {CountryRequest, CountryResponse} from "../api/types/country.ts";

export interface CountriesContextType {
    countries: CountryResponse[];
    loading: boolean;
    onAdd: (data: CountryRequest) => Promise<void>;
    onEdit: (id: number, data: CountryRequest) => Promise<void>;
    onDelete: (id: number) => Promise<void>;
}

const CountriesContext = createContext<CountriesContextType>({} as CountriesContextType);

export default CountriesContext;
