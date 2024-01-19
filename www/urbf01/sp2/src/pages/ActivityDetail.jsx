import { Typography, Paper, Box, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { fetchActivityData } from '../service/apiService';
import { OpenInNew, Edit, KeyboardArrowLeft } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export const ActivityDetail = () => {
  const [loading, setLoading] = useState(true);
  const [activity, setActivity] = useState({
    name: '',
    sport_type: '',
    start_date_local: '',
    elapsed_time: '',
    description: '',
    distance: '',
  });

  useEffect(() => {
    const fetchActivity = async () => {
      const pathname = window.location.pathname;
      const id = pathname.split('/').slice(-1)[0];
      const activity = await fetchActivityData(id);
      setActivity(activity);
      setLoading(false);
    };

    fetchActivity();
  }, []);

  const convertTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    const minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const date = activity.start_date ? format(activity.start_date, 'MMMM do yyyy, H:mm') : '';
  const elapsedTime = convertTime(activity.elapsed_time);
  const movingTime = convertTime(activity.moving_time);

  return (
    <Paper sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
      <Link to='/activities'>
        <Button variant='text' color='info' size='small' startIcon={<KeyboardArrowLeft />}>
          Return Back
        </Button>
      </Link>

      {!loading ? (
        <>
          <Typography variant='body2'>
            {activity.sport_type} | {date}
          </Typography>
          <Typography variant='h4' component='h1'>
            {activity.name}
          </Typography>
          <Typography>{activity.description}</Typography>
          <Box
            sx={{
              display: 'flex',
              borderTop: 1,
              borderColor: grey[200],
              flexDirection: 'row',
              gap: '3rem',
              mt: 3,
              pt: 3,
            }}
          >
            <Typography>
              Distance:
              <br />
              {Math.floor(activity.distance / 10) / 100}km
            </Typography>
            <Typography>
              Moving Time:
              <br />
              {movingTime}
            </Typography>
            <Typography>
              Elapsed Time:
              <br />
              {elapsedTime}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              borderTop: 1,
              borderColor: grey[200],
              flexDirection: 'row',
              gap: '1rem',
              mt: 2,
              pt: 3,
            }}
          >
            <Link to={`/activities/edit/${activity.id}`}>
              <Button
                variant='outlined'
                color='info'
                size='small'
                disableElevation
                endIcon={<Edit />}
              >
                Edit
              </Button>
            </Link>

            <Link
              to={`https://www.strava.com/activities/${activity.id}`}
              target='_blank'
              rel='noreferrer'
            >
              <Button variant='text' color='warning' size='small' endIcon={<OpenInNew />}>
                Show in Strava{' '}
              </Button>
            </Link>
          </Box>
        </>
      ) : (
        <Typography>Loading activity...</Typography>
      )}
    </Paper>
  );
};
