import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export const AppFooter = () => {
  return (
    <Container
      component='footer'
      sx={{
        p: 4,
        mt: 4,
        borderTop: '1px solid lightgray',
      }}
    >
      <Typography variant='body2' color='text.secondary' align='center'>
        {'Copyright © '}
        <Link color='inherit' href='https://filipurban.cz/'>
          Urban Webdesign
        </Link>{' '}
        {new Date().getFullYear()}
      </Typography>
    </Container>
  );
};
