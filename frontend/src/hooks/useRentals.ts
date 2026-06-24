import { useContext } from 'react';
import RentalsContext, {type RentalsContextType} from "../context/rentalsContext.ts";

const useRentals = () => useContext<RentalsContextType>(RentalsContext);

export default useRentals;