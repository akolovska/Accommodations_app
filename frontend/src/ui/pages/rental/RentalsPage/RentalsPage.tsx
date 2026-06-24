import './RentalsPage.css';
import useRentals from '../../../../hooks/useRentals.ts';
import { Box, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import useAuth from '../../../../hooks/useAuth.ts';
import RentalGrid from "../../../components/rental/RentalGrid/RentalGrid.tsx";
import AddOrEditRentalDialog from "../../../components/rental/AddOrEditRentalDialog/AddOrEditRentalDialog.tsx";

const RentalsPage = () => {
    const { user } = useAuth();
    const isAdmin = user?.roles.includes('ROLE_ADMIN') ?? false;

    const { rentals, loading } = useRentals();

    const [addRentalDialogOpen, setAddRentalDialogOpen] = useState<boolean>(false);

    return (
        <Box className='Rentals-box'>
            {loading && (
                <Box className='progress-box'>
                    <CircularProgress/>
                </Box>
            )}
            {!loading &&
                <>
                    {isAdmin && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                            <Button variant='contained' color='primary' onClick={() => setAddRentalDialogOpen(true)}>
                                Add Rental
                            </Button>
                        </Box>
                    )}
                    <RentalGrid rentals={rentals}/>
                    <AddOrEditRentalDialog
                        open={addRentalDialogOpen}
                        onClose={() => setAddRentalDialogOpen(false)}
                    />
                </>}
        </Box>
    );
};

export default RentalsPage;