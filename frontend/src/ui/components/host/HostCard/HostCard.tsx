import { Box, Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import AddOrEditHostDialog from "../AddOrEditHostDialog/AddOrEditHostDialog.tsx";
import useAuth from "../../../../hooks/useAuth.ts";
import DeleteHostDialog from "../DeleteHostDialog/DeleteHostDialog.tsx";
import type {HostResponse} from "../../../../api/types/host.ts";

interface HostCardProps {
    host: HostResponse;
}

const HostCard = ({ host }: HostCardProps) => {
    const { user } = useAuth();
    const isAdmin = user?.roles.includes('ROLE_ADMIN') ?? false;

    const navigate = useNavigate();

    const [editHostDialogOpen, setEditHostDialogOpen] = useState<boolean>(false);
    const [deleteHostDialogOpen, setDeleteHostDialogOpen] = useState<boolean>(false);

    return (
        <>
            <Card sx={{ maxWidth: 300, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant='h5'>{host.name}</Typography>
                    <Typography variant='h6' sx={{ textAlign: 'right' }}>{host.surname}</Typography>
                    <Typography variant='body2' sx={{ textAlign: 'left' }}>{host.country.name}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between' }}>
                    <Button
                        startIcon={<InfoIcon/>}
                        onClick={() => navigate(`/hosts/${host.id}`)}
                    >
                        Info
                    </Button>
                    <Box>
                        {isAdmin && (
                            <Button
                                startIcon={<EditIcon/>}
                                color='warning'
                                onClick={() => setEditHostDialogOpen(true)}
                            >
                                Edit
                            </Button>
                        )}
                        {isAdmin && (
                            <Button
                                startIcon={<DeleteIcon/>}
                                color='error'
                                onClick={() => setDeleteHostDialogOpen(true)}
                            >
                                Delete
                            </Button>
                        )}
                    </Box>
                </CardActions>
            </Card>
            <AddOrEditHostDialog
                host={host}
                open={editHostDialogOpen}
                onClose={() => setEditHostDialogOpen(false)}
            />
            <DeleteHostDialog
                host={host}
                open={deleteHostDialogOpen}
                onClose={() => setDeleteHostDialogOpen(false)}
            />
        </>
    );
};

export default HostCard;