import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Activities } from './pages/Activities';
import { Goal } from './pages/Goal';
import { Statistics } from './pages/Statistics';
import { StravaAuth } from './pages/StravaAuth';
import { AuthProvider } from './components/AuthContext';
import { PrivateRoutes } from './layout/PrivateRoutes';
import { PublicRoutes } from './layout/PublicRoutes';
import { createTheme, ThemeProvider } from '@mui/material';
import { EditActivity } from './pages/EditActivity';
import { AddActivity } from './pages/AddActivity';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { ActivityDetail } from './pages/ActivityDetail';
import { QueryClient, QueryClientProvider } from 'react-query';

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          maxWidth: '300px',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          padding: '0',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: '0',
      },
      styleOverrides: {
        root: {
          padding: '18px',
        },
      },
    },
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Router>
            <div className='app'>
              <Routes>
                <Route element={<PrivateRoutes />}>
                  <Route path='/' element={<Home />} />
                  <Route path='/activities/add' element={<AddActivity />} />
                  <Route path='/activities/edit/:id?' element={<EditActivity />} />
                  <Route path='/profile' element={<Profile />} />
                  <Route path='/settings' element={<Settings />} />
                  <Route path='/activities' element={<Activities />} />
                  <Route path='/activities/:id' element={<ActivityDetail />} />

                  <Route path='/goals' element={<Goal />} />
                  <Route path='/statistics' element={<Statistics />} />
                </Route>
                <Route element={<PublicRoutes />}>
                  <Route path='/login' element={<Login />} />
                  <Route path='/auth' element={<StravaAuth />} />
                </Route>
              </Routes>
            </div>
          </Router>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
