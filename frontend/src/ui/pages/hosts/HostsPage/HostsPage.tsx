import './HostsPage.css';
import useHosts from '../../../../hooks/useHosts.ts';
import { Box, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import useAuth from '../../../../hooks/useAuth.ts';
import HostGrid from "../../../components/host/HostGrid/HostGrid.tsx";
import AddOrEditHostDialog from "../../../components/host/AddOrEditHostDialog/AddOrEditHostDialog.tsx";


const HostsPage = () => {
    const { user } = useAuth();
    const isAdmin = user?.roles.includes('ROLE_ADMIN') ?? false;

    const { hosts, loading } = useHosts();

    const [addHostDialogOpen, setAddHostDialogOpen] = useState<boolean>(false);

    return (
        <Box className='Hosts-box'>
            {loading && (
                <Box className='progress-box'>
                    <CircularProgress/>
                </Box>
            )}
            {!loading &&
                <>
                    {isAdmin && (
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                            <Button variant='contained' color='primary' onClick={() => setAddHostDialogOpen(true)}>
                                Add Host
                            </Button>
                        </Box>
                    )}
                    <HostGrid hosts={hosts}/>
                    <AddOrEditHostDialog
                        open={addHostDialogOpen}
                        onClose={() => setAddHostDialogOpen(false)}
                    />
                </>}
        </Box>
    );
};

export default HostsPage;