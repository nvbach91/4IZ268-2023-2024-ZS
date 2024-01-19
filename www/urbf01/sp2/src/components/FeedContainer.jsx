import { Box, Button, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FeedItem } from './FeedItem';
import { Add } from '@mui/icons-material';

export const FeedContainer = ({ activitiesData }) => {
  return (
    <Paper>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexDirection: { xs: 'column', lg: 'row' },
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='h4' component='h2'>
          Latest Activities
        </Typography>

        <Link to='/activities/add'>
          <Button variant='outlined' color='success' startIcon={<Add />}>
            Add Manual Entry
          </Button>
        </Link>
      </Box>

      {activitiesData ? (
        <Box
          component='ul'
          sx={{
            p: 0,
          }}
        >
          {activitiesData.map((activity) => {
            return <FeedItem activity={activity} key={activity.id} />;
          })}
        </Box>
      ) : (
        <Typography>Loading activities...</Typography>
      )}
    </Paper>
  );
};
