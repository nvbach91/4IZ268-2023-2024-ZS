import { Typography, Paper } from '@mui/material';

export const Goal = () => {
  return (
    <Paper sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
      <Typography variant='h4' component='h2'>
        Goals
      </Typography>
      <Typography>Coming soon</Typography>
    </Paper>
  );
};
