import {
  Typography,
  Box,
  TextField,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  Alert,
  MenuItem,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { fetchAthleteData, updateAthlete } from '../service/apiService';

export const Settings = () => {
  const [formsState, setFormsState] = useState({
    isAccountSubmitting: false,
    isSettingsSubmitting: false,
  });
  const [settings, setSettings] = useState({
    perPage: localStorage.getItem('per_page') ? localStorage.getItem('per_page') : '',
    firstname: '',
    lastname: '',
    sex: '',
    weight: '',
    bio: '',
  });

  useEffect(() => {
    const fetchAthlete = async () => {
      const athlete = await fetchAthleteData();

      setSettings({
        perPage: localStorage.getItem('per_page'),
        firstname: athlete.firstname,
        lastname: athlete.lastname,
        sex: athlete.sex,
        weight: athlete.weight,
        bio: athlete.bio,
      });
    };

    fetchAthlete();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSettings((prevState) => ({
      ...prevState,
      [name]: value ? value : '',
    }));
  };

  const handleAccountSubmit = async (event) => {
    event.preventDefault();

    setTimeout(() => {
      setFormsState({ isAccountSubmitting: false });
    }, 3000);
    setFormsState({ isAccountSubmitting: true });

    await updateAthlete({
      firstname: settings.firstname,
      lastname: settings.lastname,
      sex: settings.sex,
      weight: parseFloat(settings.weight),
      bio: settings.bio,
    });
  };

  const handleSettingsSubmit = (event) => {
    event.preventDefault();

    setTimeout(() => {
      setFormsState({ isSettingsSubmitting: false });
    }, 3000);
    setFormsState({ isSettingsSubmitting: true });

    localStorage.setItem('per_page', settings.perPage);
  };

  return (
    <Paper sx={{ display: 'flex', gap: 3, flexDirection: 'column' }}>
      <Typography variant='h4' component='h2'>
        Settings
      </Typography>

      {formsState.isAccountSubmitting === true && (
        <Alert variant='outlined' severity='success' sx={{ maxWidth: 'calc(500px - 34px)' }}>
          Account was sucessfully updated.
        </Alert>
      )}

      <Box>
        <Typography variant='h5' component='h3'>
          My Account
        </Typography>
        <form onSubmit={handleAccountSubmit}>
          <Box
            sx={{
              maxWidth: '500px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mb: 4,
              mt: 2,
            }}
          >
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
              <TextField
                required
                name='firstname'
                value={settings.firstname}
                onChange={handleInputChange}
                type='text'
                label='Firstname'
                variant='outlined'
              />
              <TextField
                required
                name='lastname'
                value={settings.lastname}
                onChange={handleInputChange}
                type='text'
                label='Lastname'
                variant='outlined'
              />
            </Box>
            <FormControl fullWidth sx={{ pt: 1 }}>
              <InputLabel id='gender-select-label'>Gender</InputLabel>
              <Select
                required
                size='small'
                labelId='gender-select-label'
                className='gender-select'
                name='sex'
                value={settings.sex}
                onChange={handleInputChange}
                label='Gender'
              >
                <MenuItem value={'M'}>Man</MenuItem>
                <MenuItem value={'W'}>Woman</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name='weight'
              value={settings.weight}
              onChange={handleInputChange}
              type='number'
              label='Weight'
              variant='outlined'
            />
            <TextField
              name='bio'
              value={settings.bio}
              onChange={handleInputChange}
              type='text'
              label='Bio'
              variant='outlined'
            />
            <Button type='submit' variant='contained'>
              Save Changes
            </Button>
          </Box>
        </form>
      </Box>

      {formsState.isSettingsSubmitting === true && (
        <Alert variant='outlined' severity='success' sx={{ maxWidth: 'calc(500px - 34px)' }}>
          App Settings was sucessfully updated.
        </Alert>
      )}

      <Box>
        <Typography variant='h5' component='h3'>
          App Settings
        </Typography>
        <form onSubmit={handleSettingsSubmit}>
          <Box
            sx={{
              maxWidth: '500px',
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mb: 4,
              mt: 2,
            }}
          >
            <TextField
              name='perPage'
              value={settings.perPage}
              onChange={handleInputChange}
              type='text'
              label='Activities per page'
              variant='outlined'
            />
            <Button type='submit' variant='contained'>
              Save Changes
            </Button>
          </Box>
        </form>
      </Box>
    </Paper>
  );
};
