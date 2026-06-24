import { useContext } from 'react';
import CountriesContext, {type CountriesContextType} from "../context/countriesContext.ts";

const useCountries = () => useContext<CountriesContextType>(CountriesContext);

export default useCountries;