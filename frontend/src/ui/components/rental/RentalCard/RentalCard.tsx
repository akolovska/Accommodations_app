import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import type {RentalResponse} from "../../../../api/types/rental.ts";
import AddOrEditRentalDialog from "../AddOrEditRentalDialog/AddOrEditRentalDialog.tsx";
import useAuth from "../../../../hooks/useAuth.ts";
import DeleteRentalDialog from "../DeleteRentalDialog/DeleteRentalDialog.tsx";

interface RentalCardProps {
    rental: RentalResponse;
}

const RentalCard = ({ rental }: RentalCardProps) => {
    const { user } = useAuth();
    const isAdmin = user?.roles.includes('ROLE_ADMIN') ?? false;

    const navigate = useNavigate();

    const [editRentalDialogOpen, setEditRentalDialogOpen] = useState<boolean>(false);
    const [deleteRentalDialogOpen, setDeleteRentalDialogOpen] = useState<boolean>(false);
    return (
        <>
            <Card sx={{ maxWidth: 300, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h5'>{rental.name}</Typography>
                    <Typography variant='subtitle1' sx={{ flexGrow: 1 }}>{rental.host.name}</Typography>
                    <Typography variant='h6' sx={{ textAlign: 'right' }}>{rental.category}</Typography>
                    <Typography variant='body2' sx={{ textAlign: 'left' }}>{rental.numRooms} room(s) available</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button
                        startIcon={<InfoIcon/>}
                        onClick={() => navigate(`/rentals/${rental.id}`)}
                    >
                        Info
                    </Button>
                    <Box>
                        {isAdmin && (
                            <Button
                                startIcon={<EditIcon/>}
                                color='warning'
                                onClick={() => setEditRentalDialogOpen(true)}
                            >
                                Edit
                            </Button>
                        )}
                        {isAdmin && (
                            <Button
                                startIcon={<DeleteIcon/>}
                                color='error'
                                onClick={() => setDeleteRentalDialogOpen(true)}
                            >
                                Delete
                            </Button>
                        )}
                    </Box>
                </CardActions>
            </Card>
            <AddOrEditRentalDialog
                rental={rental}
                open={editRentalDialogOpen}
                onClose={() => setEditRentalDialogOpen(false)}
            />
            <DeleteRentalDialog
                rental={rental}
                open={deleteRentalDialogOpen}
                onClose={() => setDeleteRentalDialogOpen(false)}
            />
        </>
    );
};

export default RentalCard;