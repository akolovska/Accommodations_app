import useRentalDetails from '../../../../hooks/useRentalDetails.ts';
import {Link, useNavigate} from 'react-router';
import {
    Avatar, Box, Breadcrumbs, Button, Chip, CircularProgress, Grid, Paper, Stack, Typography
} from '@mui/material';
import {ArrowBack, Category} from '@mui/icons-material';
import './RentalDetailsPage.css';


const RentalDetailsPage = () => {
    const navigate = useNavigate();
    const {rental} = useRentalDetails();

    if (!rental) {
        return <Box className='progress-box'><CircularProgress/></Box>;
    }

    return (
        <>
            <Box>
                <Breadcrumbs aria-label='breadcrumb' sx={{mb: 3}}>
                    <Link to='/rentals' style={{textDecoration: 'none', color: 'inherit'}}
                          onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                          onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                    >
                        Rentals
                    </Link>
                    <Typography color='text.primary'>{rental.name}</Typography>
                </Breadcrumbs>

                <Paper elevation={2} sx={{p: 4, borderRadius: 4}}>
                    <Grid container spacing={4}>
                        <Grid size={{xs: 12, md: 3}}>
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
                                    src='/placeholder-Rental.jpg'
                                    variant='rounded'
                                    sx={{width: '100%', height: 'auto', objectFit: 'contain'}}
                                />
                            </Box>
                        </Grid>

                        <Grid size={{xs: 12, md: 9}}>
                            <Box sx={{mb: 3}}>
                                <Typography variant='h3' gutterBottom sx={{fontWeight: 600}}>
                                    {rental.name}
                                </Typography>

                                <Typography variant='h4' color='primary.main' sx={{mb: 3}}>
                                    ${rental.host.name}
                                </Typography>

                                <Typography variant='subtitle1' sx={{mb: 3}}>
                                    {rental.numRooms} room(s) available
                                </Typography>

                                <Stack direction='row' spacing={1} sx={{mb: 3}}>
                                    <Chip
                                        icon={<Category/>}
                                        label={rental.category}
                                        color='primary'
                                        variant='outlined'
                                        sx={{p: 2}}
                                    />
                                </Stack>
                            </Box>
                        </Grid>

                        <Grid size={12} sx={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button variant='outlined' startIcon={<ArrowBack/>} onClick={() => navigate('/rentals')}>
                                Back to Rentals
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>

        </>
    );
};

export default RentalDetailsPage;