import { Typography, Paper } from '@mui/material';
import { EditActivityForm } from '../components/EditActivityForm';

export const EditActivity = () => {
  return (
    <Paper sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
      <Typography variant='h4' component='h1'>
        Edit Activity
      </Typography>

      <EditActivityForm />
    </Paper>
  );
};
