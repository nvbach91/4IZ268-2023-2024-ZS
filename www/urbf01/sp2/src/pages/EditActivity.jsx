import { Typography } from '@mui/material';

export const EditActivity = ({ activity }) => {
  return (
    <>
      <Typography variant='h3' component='h1'>
        Edit activity - {activity.name}
      </Typography>
    </>
  );
};
