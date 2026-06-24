import type { RentalResponse } from '../../../../api/types/rental.ts';
import { Grid } from '@mui/material';
import RentalCard from "../RentalCard/RentalCard.tsx";

interface rentalGridProps {
    rentals: RentalResponse[];
}

const RentalGrid = ({ rentals }: rentalGridProps) => {
    return (
        <Grid container spacing={{ xs: 2, md: 3 }}>
            {rentals.map((rental) => (
                <Grid key={rental.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <RentalCard rental={rental}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default RentalGrid;