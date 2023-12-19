import { Navbar } from './components/Navbar';
import { AppFooter } from './components/AppFooter';
import { Grid, Typography, Skeleton, Container } from '@mui/material';
import { StatusBar } from './components/StatusBar';

function App() {
  return (
    <div className='app'>
      <Navbar />

      <Container
        sx={{
          minHeight: 'calc(100vh - 226px)',
          py: 5,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} lg={3}>
            <div className='profile'>
              <Typography variant='h4' component='h2'>
                Profil
              </Typography>

              <Skeleton animation='wave' sx={{ height: '40px' }} />
              <Skeleton animation='wave' sx={{ height: '40px' }} />
              <Skeleton animation='wave' sx={{ height: '40px' }} />
            </div>
          </Grid>
          <Grid item xs={12} lg={6}>
            <div className='activity-feed'>
              <Typography variant='h4' component='h2'>
                Aktivity
              </Typography>

              <Skeleton animation='wave' sx={{ height: '40px' }} />
              <Skeleton animation='wave' sx={{ height: '40px' }} />
              <Skeleton animation='wave' sx={{ height: '40px' }} />
              <Skeleton animation='wave' sx={{ height: '40px' }} />
              <Skeleton animation='wave' sx={{ height: '40px' }} />
              <Skeleton animation='wave' sx={{ height: '40px' }} />
              <Skeleton animation='wave' sx={{ height: '40px' }} />
              <Skeleton animation='wave' sx={{ height: '40px' }} />
              <Skeleton animation='wave' sx={{ height: '40px' }} />
              <Skeleton animation='wave' sx={{ height: '40px' }} />
              <Skeleton animation='wave' sx={{ height: '40px' }} />
            </div>
          </Grid>
          <Grid item xs={12} lg={3}>
            <div className='achievements'>
              <Typography variant='h4' component='h2'>
                Cíle
              </Typography>
              <StatusBar data={{ title: 'Cíl 1', progress: 80 }} />
              <StatusBar data={{ title: 'Cíl 2', progress: 25 }} />

              <Typography variant='h4' component='h2'>
                Statistiky
              </Typography>
              <StatusBar data={{ title: 'Statistika 1', progress: 55 }} />
              <StatusBar data={{ title: 'Statistika 2', progress: 75 }} />
            </div>
          </Grid>
        </Grid>
      </Container>

      <AppFooter />
    </div>
  );
}

export default App;
