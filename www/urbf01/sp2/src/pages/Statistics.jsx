import { Typography, Paper } from '@mui/material';
import { useState, useEffect } from 'react';
import { fetchActivitiesData } from '../service/apiService';

export const Statistics = () => {
  const [activitiesData, setActivities] = useState();

  useEffect(() => {
    const fetchActivities = async () => {
      const data = await fetchActivitiesData(200);
      localStorage.setItem('activities', JSON.stringify(data));
      setActivities(data);
    };

    fetchActivities();
  }, []);

  // todo statistics
  console.log(activitiesData);

  return (
    <Paper sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
      <Typography variant='h4' component='h2'>
        Statistics
      </Typography>
      <Typography>Coming soon</Typography>
    </Paper>
  );
};
