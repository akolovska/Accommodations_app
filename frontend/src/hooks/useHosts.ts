import { useContext } from 'react';
import HostsContext, {type HostsContextType} from "../context/hostsContext.ts";

const useHosts = () => useContext<HostsContextType>(HostsContext);

export default useHosts;