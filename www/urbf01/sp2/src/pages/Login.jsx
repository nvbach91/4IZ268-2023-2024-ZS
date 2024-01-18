import { Box, Button, Paper, Typography } from '@mui/material';
import { orange, deepOrange } from '@mui/material/colors';

const { REACT_APP_CLIENT_ID } = process.env;
const authUrl = 'http://localhost:3000/auth';

const handleLogin = () => {
  window.location = `http://www.strava.com/oauth/authorize?client_id=${REACT_APP_CLIENT_ID}&response_type=code&redirect_uri=${authUrl}&approval_prompt=force&scope=read_all,activity:write,activity:read_all`;
};

export const Login = () => {
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
          Login with your Strava account
        </Typography>
        <Button
          variant='contained'
          size='large'
          onClick={handleLogin}
          disableElevation
          sx={{
            my: 3,
            bgcolor: orange[800],
            '&:hover': {
              bgcolor: deepOrange[800],
            },
          }}
        >
          Connect with Strava
        </Button>
      </Paper>
    </Box>
  );
};
