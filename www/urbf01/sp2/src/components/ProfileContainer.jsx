import { Paper, Avatar, Typography, Button, Alert, CircularProgress, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { fetchAthleteData } from '../service/apiService';
import { useQuery } from 'react-query';

const fetchAthlete = async () => {
  const data = await fetchAthleteData();
  return data;
};

export const ProfileContainer = () => {
  const { data: athleteData, status } = useQuery('fetchedAthlete', fetchAthlete);

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      {status === 'error' && (
        <Alert variant='filled' severity='error'>
          Error fetching data.
        </Alert>
      )}
      {status === 'loading' && (
        <Box sx={{ display: 'flex', mt: 5, justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {status === 'success' && (
        <>
          <Avatar
            alt={athleteData.firstname + ' ' + athleteData.lastname}
            src={athleteData.profile}
            sx={{ width: 120, height: 120 }}
          />
          <Typography variant='h5' component='h3'>
            {athleteData.firstname} {athleteData.lastname}
          </Typography>
          <Typography>
            {athleteData.city}, {athleteData.country}
          </Typography>
          <Link to='/profile'>
            <Button color='primary' variant='outlined'>
              Profile Detail
            </Button>
          </Link>
        </>
      )}
    </Paper>
  );
};
