import { Box, Paper, Typography, Button } from '@mui/material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Profile = () => {
  //const [gearList, setGearList]
  useEffect(() => {}, []);

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
        <Box>
          <Typography variant='h6'>Gear Item 1</Typography>
        </Box>
        <Box>
          <Typography variant='h6'>Gear Item 2</Typography>
        </Box>
        <Box>
          <Typography variant='h6'>Gear Item 3</Typography>
        </Box>
      </Box>
    </Paper>
  );
};
