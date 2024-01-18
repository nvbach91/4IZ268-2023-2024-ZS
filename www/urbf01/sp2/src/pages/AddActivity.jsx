import { Typography, Paper } from '@mui/material';
import { ActivityForm } from '../components/ActivityForm';

export const AddActivity = () => {
  return (
    <Paper sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
      <Typography variant='h4' component='h1'>
        Add an Activity
      </Typography>

      <ActivityForm />
    </Paper>
  );
};
