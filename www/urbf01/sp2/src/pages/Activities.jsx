import { Paper } from '@mui/material';
import { fetchActivitiesData } from '../service/apiService';
import { useEffect, useState } from 'react';
import { FeedContainer } from '../components/FeedContainer';

export const Activities = () => {
  const [activitiesData, setActivities] = useState();

  useEffect(() => {
    if (!localStorage.getItem('activities')) {
      fetchActivitiesData();
    }

    setActivities(JSON.parse(localStorage.getItem('activities')));
  }, []);

  return (
    <Paper>
      <FeedContainer activitiesData={activitiesData} />
    </Paper>
  );
};
