import { Box, Skeleton, Typography } from '@mui/material';

export const StatusBar = ({ data }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant='h6' component='h3'>
        {data.title}
      </Typography>
      <Skeleton animation='wave' sx={{ height: '40px' }} />
    </Box>
  );
};
