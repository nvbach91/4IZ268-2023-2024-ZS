import { AppBar, Toolbar, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Logout } from '@mui/icons-material';

export const Navbar = () => {
  const { logout } = useAuth();

  return (
    <AppBar sx={{ bgcolor: 'white' }} position='fixed' component='nav' elevation={0}>
      <Toolbar
        variant='dense'
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 1,
        }}
      >
        <Link to='/'>
          <img src='/images/logo.svg' style={{ width: '140px' }} alt='Strarmin' />
        </Link>

        <Stack direction={'row'} gap={3}>
          <Link to='/'>
            <Button variant='text'>Home</Button>
          </Link>
          <Link to='/activities'>
            <Button variant='text'>Activities</Button>
          </Link>
          <Link to='/goals'>
            <Button variant='text'>Goals</Button>
          </Link>
          <Link to='/statistics'>
            <Button variant='text'>Statistics</Button>
          </Link>
        </Stack>

        <Button
          size='small'
          color='error'
          variant='contained'
          disableElevation
          onClick={logout}
          startIcon={<Logout />}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
