import './CountryPage.css';
import useCountries from '../../../../hooks/useCountries.ts';
import { Box, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import useAuth from '../../../../hooks/useAuth.ts';
import CountryGrid from "../../../components/country/CountryGrid/CountryGrid.tsx";
import AddOrEditCountryDialog from "../../../components/country/AddOrEditCountryDialog/AddOrEditCountryDialog.tsx";


const CountriesPage = () => {
    const { user } = useAuth();
    const isAdmin = user?.roles.includes('ROLE_ADMIN') ?? false;

    const { countries, loading } = useCountries();

    const [addCountryDialogOpen, setAddCountryDialogOpen] = useState<boolean>(false);

    return (
        <Box className='Countries-box'>
            {loading && (
                <Box className='progress-box'>
                    <CircularProgress/>
                </Box>
            )}
            {!loading &&
                <>
                    {isAdmin && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                            <Button variant='contained' color='primary' onClick={() => setAddCountryDialogOpen(true)}>
                                Add Country
                            </Button>
                        </Box>
                    )}
                    <CountryGrid countries={countries}/>
                    <AddOrEditCountryDialog
                        open={addCountryDialogOpen}
                        onClose={() => setAddCountryDialogOpen(false)}
                    />
                </>}
        </Box>
    );
};

export default CountriesPage;