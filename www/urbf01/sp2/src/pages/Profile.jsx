import { Box, Paper, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const Profile = () => {
  return (
    <Paper>
      <Typography variant='h4' component='h1' sx={{ mb: 2 }}>
        Profile Detail
      </Typography>

      <Link to='/settings'>
        <Button variant='outlined' size='small'>
          Change Settings
        </Button>
      </Link>

      <Typography variant='h5' component='h2' sx={{ mt: 3 }}>
        Athletes Gear
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '2rem' }}>
        <Box>Gear Item 1</Box>
        <Box>Gear Item 2</Box>
        <Box>Gear Item 3</Box>
      </Box>
    </Paper>
  );
};
