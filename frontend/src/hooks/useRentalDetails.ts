import { useContext } from 'react';
import RentalDetailsContext, {type RentalDetailsContextType} from "../context/rentalDetailsContext.ts";

const useRentalDetails = () => useContext<RentalDetailsContextType>(RentalDetailsContext);

export default useRentalDetails;