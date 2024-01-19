import { Box, Typography, Paper, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { Edit, KeyboardArrowRight, OpenInNew } from '@mui/icons-material/';
import { format } from 'date-fns';

const convertTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  seconds -= hours * 3600;
  const minutes = Math.floor(seconds / 60);
  seconds -= minutes * 60;
  return `${hours}h ${minutes}m ${seconds}s`;
};

export const FeedItem = ({ activity }) => {
  const date = activity.start_date ? format(activity.start_date, 'MMMM do yyyy, H:mm') : '';
  const elapsedTime = convertTime(activity.elapsed_time);

  return (
    <Paper
      component='li'
      sx={{
        listStyleType: 'none',
        p: 2,
        border: 1,
        borderColor: grey[300],
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
      }}
    >
      <Typography variant='caption'>
        {activity.sport_type} | {date}
      </Typography>

      <Typography variant='h6' component='h3'>
        {activity.name}
      </Typography>

      <Typography>
        Distance: {Math.floor(activity.distance / 10) / 100}km
        <br />
        Elapsed Time: {elapsedTime}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          borderTop: 1,
          borderColor: grey[200],
          flexDirection: 'row',
          gap: '1rem',
          mt: 1,
          pt: 1,
        }}
      >
        <Link to={`/activities/${activity.id}`}>
          <Button variant='text' color='info' size='small' endIcon={<KeyboardArrowRight />}>
            Detail
          </Button>
        </Link>

        <Link to={`/activities/edit/${activity.id}`}>
          <Button variant='text' color='success' size='small' endIcon={<Edit />}>
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
    </Paper>
  );
};
