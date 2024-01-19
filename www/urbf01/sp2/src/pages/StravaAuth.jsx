import { useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { stravaAuth } from '../service/apiService';
import { Typography, Paper, Box } from '@mui/material';

export const StravaAuth = () => {
  const { login } = useAuth();

  useEffect(() => {
    const authenticate = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const code = urlParams.get('code');

      const accessToken = await stravaAuth(code);
      login(accessToken);
      window.location.href = '/';
    };

    authenticate();
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh ',
        backgroundImage: 'url("/images/strarmin-cover.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <Paper
        sx={{
          px: 6,
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'white',
        }}
      >
        <Typography variant='h5' component='h1'>
          Strava Authentication Callback
        </Typography>
        <Typography>Processing authentication...</Typography>
      </Paper>
    </Box>
  );
};
