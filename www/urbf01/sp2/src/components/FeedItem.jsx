import { Box, Typography, Paper, Button } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { Edit, OpenInNew } from '@mui/icons-material/';
import { format } from 'date-fns';

export const FeedItem = ({ activity }) => {
  const activityLink = 'https://www.strava.com/activities/' + activity.id;
  const date = format(activity.start_date, 'MMMM do yyyy, h:mm:ss a');

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
        <Link to={`/edit/${activity.id}`}>
          <Button variant='text' color='info' size='small' endIcon={<Edit />}>
            Edit
          </Button>
        </Link>

        <Link to={activityLink} target='_blank' rel='noreferrer'>
          <Button variant='text' color='warning' size='small' endIcon={<OpenInNew />}>
            Show in Strava{' '}
          </Button>
        </Link>
      </Box>
    </Paper>
  );
};
