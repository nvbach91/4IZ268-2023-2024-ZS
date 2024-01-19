import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { Navbar } from '../components/Navbar';
import { AppFooter } from '../components/AppFooter';
import { Container, Box } from '@mui/material';
import { ProfileContainer } from '../components/ProfileContainer';

export const PrivateRoutes = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Container sx={{ py: 8, minHeight: '100vh' }}>
      <Navbar />
      <Box
        sx={{
          mt: 3,
          display: 'grid',
          alignItems: 'start',
          gridTemplateColumns: { sm: '1fr', md: '1fr 3fr' },
          gap: { sm: 4, md: 3 },
        }}
      >
        <ProfileContainer />
        <Outlet />
      </Box>
      <AppFooter />
    </Container>
  ) : (
    <Navigate to='/login' />
  );
};
