import { Box, Paper, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FeedContainer } from '../components/FeedContainer';
import { fetchActivitiesData } from '../service/apiService';

export const Home = () => {
  const [activitiesData, setActivities] = useState(null);

  useEffect(() => {
    fetchActivitiesData();

    setTimeout(() => {
      setActivities(JSON.parse(localStorage.getItem('activities')));
    }, 1000);
  }, []);

  return (
    <Box
      sx={{
        display: 'grid',
        alignItems: 'start',
        gridTemplateColumns: { sm: '1fr', md: '2fr 1fr' },
        gap: { sm: 5, md: 4 },
      }}
    >
      <FeedContainer activitiesData={activitiesData} />

      <Stack
        sx={{
          gap: 4,
        }}
      >
        <Paper>
          <Typography variant='h4' component='h2'>
            Goals
          </Typography>
        </Paper>

        <Paper>
          <Typography variant='h4' component='h2'>
            Statistics
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
};
