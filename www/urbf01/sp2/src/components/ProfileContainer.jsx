import { Paper, Avatar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export const ProfileContainer = ({ athleteData }) => {
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
      {athleteData ? (
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
      ) : (
        <Typography>Loading profile data...</Typography>
      )}
    </Paper>
  );
};
