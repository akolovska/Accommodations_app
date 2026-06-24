import useCountryDetails from '../../../../hooks/useCountryDetails.ts';
import { Link, useNavigate } from 'react-router';
import {
    Avatar, Box, Breadcrumbs, Button, CircularProgress, Grid, Paper, Typography
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import './CountryDetailsPage.css';

const CountryDetailsPage = () => {
    const navigate = useNavigate();
    const { country } = useCountryDetails();

    if (!country) {
        return <Box className='progress-box'><CircularProgress/></Box>;
    }

    return (
        <Box>
            <Breadcrumbs aria-label='breadcrumb' sx={{ mb: 3 }}>
                <Link to='/countries' style={{ textDecoration: 'none', color: 'inherit' }}
                      onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                      onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
                >
                    Countries
                </Link>
                <Typography color='text.primary'>{country.name}</Typography>
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
                                src='/placeholder-Country.jpg'
                                variant='rounded'
                                sx={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                            />
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, md: 9 }}>
                        <Box sx={{ mb: 3 }}>
                            <Typography variant='h3' gutterBottom sx={{ fontWeight: 600 }}>
                                {country.name}
                            </Typography>

                            <Typography variant='h4' color='primary.main' sx={{ mb: 3 }}>
                                {country.continent}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant='outlined' startIcon={<ArrowBack/>} onClick={() => navigate('/countries')}>
                            Back to Countries
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default CountryDetailsPage;