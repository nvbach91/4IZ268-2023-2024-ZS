import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

export const ActivityDetail = () => {
  const { id } = useParams();

  return <Typography variant='h1'>Activity {id} detail</Typography>;
};
