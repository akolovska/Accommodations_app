import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import useAuth from "../../../../hooks/useAuth.ts";
import DeleteCountryDialog from "../DeleteCountryDialog/DeleteCountryDialog.tsx";
import type {CountryResponse} from "../../../../api/types/country.ts";
import AddOrEditCountryDialog from "../AddOrEditCountryDialog/AddOrEditCountryDialog.tsx";

interface CountryCardProps {
    country: CountryResponse;
}

const CountryCard = ({ country }: CountryCardProps) => {
    const { user } = useAuth();
    const isAdmin = user?.roles.includes('ROLE_ADMIN') ?? false;

    const navigate = useNavigate();

    const [editCountryDialogOpen, setEditCountryDialogOpen] = useState<boolean>(false);
    const [deleteCountryDialogOpen, setDeleteCountryDialogOpen] = useState<boolean>(false);

    return (
        <>
            <Card sx={{ maxWidth: 300, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h5'>{country.name}</Typography>
                    <Typography variant='subtitle1' sx={{ flexGrow: 1 }}>{country.continent}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button
                        startIcon={<InfoIcon/>}
                        onClick={() => navigate(`/countries/${country.id}`)}
                    >
                        Info
                    </Button>
                    <Box>
                        {isAdmin && (
                            <Button
                                startIcon={<EditIcon/>}
                                color='warning'
                                onClick={() => setEditCountryDialogOpen(true)}
                            >
                                Edit
                            </Button>
                        )}
                        {isAdmin && (
                            <Button
                                startIcon={<DeleteIcon/>}
                                color='error'
                                onClick={() => setDeleteCountryDialogOpen(true)}
                            >
                                Delete
                            </Button>
                        )}
                    </Box>
                </CardActions>
            </Card>
            <AddOrEditCountryDialog
                country={country}
                open={editCountryDialogOpen}
                onClose={() => setEditCountryDialogOpen(false)}
            />
            <DeleteCountryDialog
                country={country}
                open={deleteCountryDialogOpen}
                onClose={() => setDeleteCountryDialogOpen(false)}
            />
        </>
    );
};

export default CountryCard;