import { Box, Paper, Stack, Typography } from '@mui/material';
import { FeedContainer } from '../components/FeedContainer';

export const Home = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        alignItems: 'start',
        gridTemplateColumns: { sm: '1fr', md: '2fr 1fr' },
        gap: { sm: 4, md: 3 },
      }}
    >
      <FeedContainer />

      <Stack
        sx={{
          gap: 4,
        }}
      >
        <Paper>
          <Typography variant='h4' component='h2'>
            Goals
          </Typography>
          <Typography>Coming soon</Typography>
        </Paper>

        <Paper>
          <Typography variant='h4' component='h2'>
            Statistics
          </Typography>
          <Typography>Coming soon</Typography>
        </Paper>
      </Stack>
    </Box>
  );
};
