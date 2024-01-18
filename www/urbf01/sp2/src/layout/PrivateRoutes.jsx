import { Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';
import { Navbar } from '../components/Navbar';
import { AppFooter } from '../components/AppFooter';
import { Container, Box } from '@mui/material';
import { ProfileContainer } from '../components/ProfileContainer';
import { fetchAthleteData } from '../service/apiService';

export const PrivateRoutes = () => {
  const { isLoggedIn } = useAuth();

  const [athleteData, setAthlete] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem('athlete')) {
      fetchAthleteData();
    }

    setTimeout(() => {
      setAthlete(JSON.parse(localStorage.getItem('athlete')));
    }, 1000);
  }, []);

  return isLoggedIn ? (
    <Container sx={{ py: 12, minHeight: '100vh' }}>
      <Navbar />
      <Box
        sx={{
          mt: 3,
          display: 'grid',
          alignItems: 'start',
          gridTemplateColumns: { sm: '1fr', md: '1fr 3fr' },
          gap: { sm: 5, md: 4 },
        }}
      >
        <ProfileContainer athleteData={athleteData} />
        <Outlet />
      </Box>
      <AppFooter />
    </Container>
  ) : (
    <Navigate to='/login' />
  );
};
