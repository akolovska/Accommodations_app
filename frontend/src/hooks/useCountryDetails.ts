import { useContext } from 'react';
import CountryDetailsContext, {type CountryDetailsContextType} from "../context/countryDetailsContext.ts";

const useCountryDetails = () => useContext<CountryDetailsContextType>(CountryDetailsContext);

export default useCountryDetails;