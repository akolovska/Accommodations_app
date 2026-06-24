import useHostDetails from '../../../../hooks/useHostDetails.ts';
import { Link, useNavigate } from 'react-router';
import {
    Avatar, Box, Breadcrumbs, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography
} from '@mui/material';
import { ArrowBack, Category } from '@mui/icons-material';
import './HostDetailsPage.css';

const HostDetailsPage = () => {
    const navigate = useNavigate();
    const { host } = useHostDetails();

    if (!host) {
        return <Box className='progress-box'><CircularProgress/></Box>;
    }

    return (
        <Box>
            <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 3 }}>
                <Link to='/hosts' style={{ textDecoration: 'none', color: 'inherit' }}
                      onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                      onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                >
                    Hosts
                </Link>
                <Typography color='text.primary'>{host.name}</Typography>
            </Breadcrumbs>

            <Paper elevation={2} sx={{ p: 4, borderRadius: 4 }}>
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mb: 4,
                            bgcolor: 'background.paper',
                            p: 3,
                            borderRadius: 3,
                            boxShadow: 1
                        }}>
                            <Avatar
                                src='/placeholder-Host.jpg'
                                variant='rounded'
                                sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                            />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 9 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant='h3' gutterBottom sx={{ fontWeight: 600 }}>
                                {host.name}
                            </Typography>

                            <Typography variant='h4' color='primary.main' sx={{ mb: 3 }}>
                                {host.surname}
                            </Typography>

                            <Stack direction='row' spacing={1} sx={{ mb: 3 }}>
                                <Chip
                                    icon={<Category/>}
                                    label={host.country.name}
                                    color='primary'
                                    variant='outlined'
                                    sx={{ p: 2 }}
                                />
                            </Stack>
                        </Box>
                    </Grid>

                    <Grid size={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant='outlined' startIcon={<ArrowBack/>} onClick={() => navigate('/hosts')}>
                            Back to hosts
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default HostDetailsPage;