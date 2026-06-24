import { useContext } from 'react';
import HostDetailsContext, {type HostDetailsContextType} from "../context/hostDetailsContext.ts";

const useHostDetails = () => useContext<HostDetailsContextType>(HostDetailsContext);

export default useHostDetails;