import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Box } from '@mui/material';

export const AppFooter = () => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
        height: '100px',
        display: 'flex',
        p: 4,
        alignItems: 'center',
      }}
      component='footer'
    >
      <Container maxWidth='sm'>
        <Typography variant='body2' color='text.secondary' align='center'>
          {'Copyright © '}
          <Link color='inherit' href='https://filipurban.cz/'>
            Urban Webdesign
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
};
