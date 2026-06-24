import { Grid } from '@mui/material';
import CountryCard from "../CountryCard/CountryCard.tsx";
import type {CountryResponse} from "../../../../api/types/country.ts";

interface CountryGridProps {
    countries: CountryResponse[];
}

const CountryGrid = ({ countries }: CountryGridProps) => {
    return (
        <Grid container spacing={{ xs: 2, md: 3 }}>
            {countries.map((country) => (
                <Grid key={country.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                    <CountryCard country={country}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default CountryGrid;