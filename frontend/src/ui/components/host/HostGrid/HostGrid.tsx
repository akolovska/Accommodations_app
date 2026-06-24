import { Grid } from '@mui/material';
import type {HostResponse} from "../../../../api/types/host.ts";
import HostCard from "../HostCard/HostCard.tsx";

interface HostGridProps {
    hosts: HostResponse[];
}

const HostGrid = ({ hosts }: HostGridProps) => {
    return (
        <Grid container spacing={{ xs: 2, md: 3 }}>
            {hosts.map((host) => (
                <Grid key={host.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <HostCard host={host}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default HostGrid;