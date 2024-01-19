import { Box, Button, Paper, Typography, CircularProgress, Alert } from '@mui/material';
import { Link } from 'react-router-dom';
import { FeedItem } from './FeedItem';
import { Add } from '@mui/icons-material';
import { useQuery } from 'react-query';
import { fetchActivitiesData } from '../service/apiService';

const fetchData = async () => {
  const data = await fetchActivitiesData();
  return data;
};

export const FeedContainer = () => {
  const { data, status } = useQuery('fetchedActivities', fetchData);
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
      {status === 'error' && (
        <Alert variant='filled' severity='error' sx={{ mt: 5 }}>
          Error fetching data.
        </Alert>
      )}
      {status === 'loading' && (
        <Box sx={{ display: 'flex', mt: 5, justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
      {status === 'success' && (
        <Box
          component='ul'
          sx={{
            p: 0,
          }}
        >
          {data.data.map((activity) => {
            return <FeedItem activity={activity} key={activity.id} />;
          })}
        </Box>
      )}
    </Paper>
  );
};
